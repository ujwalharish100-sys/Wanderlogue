import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  publicId: {
    type: String, // For Cloudinary
  },
});

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
      validate: {
        validator: function(value) {
          return value >= this.startDate;
        },
        message: 'End date must be after start date',
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    story: {
      type: String,
      maxlength: [10000, 'Story cannot exceed 10000 characters'],
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    media: [mediaSchema],
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
      address: String,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for geospatial queries
tripSchema.index({ location: '2dsphere' });

// Index for text search
tripSchema.index({ title: 'text', destination: 'text', tags: 'text' });

// Index for filtering
tripSchema.index({ user: 1, startDate: -1 });
tripSchema.index({ user: 1, isFavorite: 1 });

// Virtual for duration in days
tripSchema.virtual('duration').get(function() {
  const diff = this.endDate - this.startDate;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Virtual for year
tripSchema.virtual('year').get(function() {
  return this.startDate.getFullYear();
});

// Method to increment views
tripSchema.methods.incrementViews = async function() {
  this.views += 1;
  await this.save();
};

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;

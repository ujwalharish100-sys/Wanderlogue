import Trip from '../models/Trip.js';

// @desc    Get all trips for logged in user
// @route   GET /api/trips
// @access  Private
export const getTrips = async (req, res, next) => {
  try {
    const { search, year, tags, isFavorite, sort } = req.query;

    // Build query
    const query = { user: req.user.id };

    // Search by title or destination
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by year
    if (year) {
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31, 23, 59, 59);
      query.startDate = { $gte: startOfYear, $lte: endOfYear };
    }

    // Filter by tags
    if (tags) {
      const tagArray = tags.split(',');
      query.tags = { $in: tagArray };
    }

    // Filter by favorite
    if (isFavorite === 'true') {
      query.isFavorite = true;
    }

    // Sorting
    let sortOption = { startDate: -1 }; // Default: newest first
    if (sort === 'oldest') {
      sortOption = { startDate: 1 };
    } else if (sort === 'title-asc') {
      sortOption = { title: 1 };
    } else if (sort === 'title-desc') {
      sortOption = { title: -1 };
    }

    const trips = await Trip.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Private
export const getTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    // Make sure user owns trip
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this trip',
      });
    }

    // Increment views
    await trip.incrementViews();

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
export const createTrip = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const trip = await Trip.create(req.body);

    res.status(201).json({
      success: true,
      trip,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
export const updateTrip = async (req, res, next) => {
  try {
    let trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    // Make sure user owns trip
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this trip',
      });
    }

    trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
export const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    // Make sure user owns trip
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this trip',
      });
    }

    await trip.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Trip deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle favorite status
// @route   PUT /api/trips/:id/favorite
// @access  Private
export const toggleFavorite = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    // Make sure user owns trip
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this trip',
      });
    }

    trip.isFavorite = !trip.isFavorite;
    await trip.save();

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trip statistics
// @route   GET /api/trips/stats
// @access  Private
export const getTripStats = async (req, res, next) => {
  try {
    const stats = await Trip.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          totalTrips: { $sum: 1 },
          totalDestinations: { $addToSet: '$destination' },
          totalFavorites: {
            $sum: { $cond: ['$isFavorite', 1, 0] },
          },
          totalPhotos: { $sum: { $size: '$media' } },
        },
      },
      {
        $project: {
          _id: 0,
          totalTrips: 1,
          totalDestinations: { $size: '$totalDestinations' },
          totalFavorites: 1,
          totalPhotos: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: stats[0] || {
        totalTrips: 0,
        totalDestinations: 0,
        totalFavorites: 0,
        totalPhotos: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

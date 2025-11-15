import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Trip from '../models/Trip.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Trip.deleteMany();
    console.log('🗑️  Cleared existing data');

    // Create demo user
    const demoUser = await User.create({
      email: 'demo@wanderlogue.com',
      username: 'demo_user',
      password: 'demo123',
      firstName: 'Demo',
      lastName: 'User',
    });
    console.log('👤 Created demo user');

    // Create demo trips
    const trips = [
      {
        user: demoUser._id,
        title: 'Magical Kyoto',
        destination: 'Kyoto, Japan',
        startDate: new Date('2023-03-15'),
        endDate: new Date('2023-03-22'),
        description: 'Explored ancient temples, traditional tea houses, and stunning cherry blossoms in the cultural heart of Japan.',
        story: '# Discovering Kyoto\n\nKyoto exceeded all my expectations. From the moment I arrived, I was captivated by the perfect blend of ancient tradition and modern life.\n\n## Highlights\n\n- **Fushimi Inari Shrine**: Walked through thousands of vermillion torii gates\n- **Arashiyama Bamboo Grove**: An otherworldly experience\n- **Traditional Tea Ceremony**: Learned the art of matcha preparation\n\nThe cherry blossoms were in full bloom, creating a magical atmosphere throughout the city.',
        coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
        media: [
          { type: 'image', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', caption: 'Fushimi Inari Shrine' },
          { type: 'image', url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800', caption: 'Bamboo Forest' },
          { type: 'image', url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800', caption: 'Cherry Blossoms' },
        ],
        tags: ['japan', 'culture', 'temples', 'cherry-blossoms'],
        isFavorite: true,
      },
      {
        user: demoUser._id,
        title: 'Swiss Alps Adventure',
        destination: 'Interlaken, Switzerland',
        startDate: new Date('2023-07-10'),
        endDate: new Date('2023-07-17'),
        description: 'Breathtaking mountain scenery, charming alpine villages, and thrilling outdoor adventures in the heart of the Swiss Alps.',
        story: '# Alpine Paradise\n\nThe Swiss Alps are truly a natural wonder. Every view was like a postcard come to life.\n\n## Adventures\n\n- Paragliding over Interlaken\n- Hiking to Harder Kulm viewpoint\n- Visiting Jungfraujoch - Top of Europe\n- Exploring Lauterbrunnen valley\n\nThe combination of adventure and natural beauty made this trip unforgettable.',
        coverImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
        media: [
          { type: 'image', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800', caption: 'Mountain Vista' },
          { type: 'image', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', caption: 'Alpine Lake' },
        ],
        tags: ['switzerland', 'mountains', 'adventure', 'hiking'],
        isFavorite: true,
      },
      {
        user: demoUser._id,
        title: 'Santorini Sunsets',
        destination: 'Santorini, Greece',
        startDate: new Date('2023-09-05'),
        endDate: new Date('2023-09-12'),
        description: 'White-washed buildings, blue-domed churches, and the most spectacular sunsets over the Aegean Sea.',
        story: '# Greek Island Paradise\n\nSantorini is everything you imagine and more. The iconic blue and white architecture against the deep blue sea is simply stunning.\n\n## Experiences\n\n- Watched sunset in Oia (best in the world!)\n- Wine tasting at local vineyards\n- Explored ancient Akrotiri ruins\n- Sailed around the caldera\n\nThe combination of history, culture, and natural beauty is unmatched.',
        coverImage: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
        media: [
          { type: 'image', url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800', caption: 'Oia Sunset' },
          { type: 'image', url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', caption: 'Blue Domes' },
        ],
        tags: ['greece', 'islands', 'sunset', 'mediterranean'],
        isFavorite: false,
      },
      {
        user: demoUser._id,
        title: 'Iceland Road Trip',
        destination: 'Reykjavik, Iceland',
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-01-28'),
        description: 'Epic journey through volcanic landscapes, massive waterfalls, and the magical Northern Lights.',
        story: '# Land of Fire and Ice\n\nIceland is unlike anywhere else on Earth. The raw, untamed beauty of the landscape is awe-inspiring.\n\n## Highlights\n\n- Witnessed the Northern Lights\n- Bathed in the Blue Lagoon\n- Explored ice caves\n- Chased waterfalls (Seljalandsfoss, Skógafoss)\n\nEvery turn revealed a new wonder of nature.',
        coverImage: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800',
        media: [
          { type: 'image', url: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800', caption: 'Northern Lights' },
          { type: 'image', url: 'https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800', caption: 'Waterfall' },
        ],
        tags: ['iceland', 'northern-lights', 'nature', 'adventure'],
        isFavorite: true,
      },
      {
        user: demoUser._id,
        title: 'Bali Retreat',
        destination: 'Ubud, Bali',
        startDate: new Date('2024-02-14'),
        endDate: new Date('2024-02-21'),
        description: 'Spiritual journey through rice terraces, ancient temples, and yoga retreats in the heart of Bali.',
        story: '# Finding Peace in Bali\n\nBali offers the perfect blend of spirituality, nature, and culture.\n\n## Experiences\n\n- Daily yoga and meditation\n- Visited Tegalalang Rice Terraces\n- Explored Ubud Monkey Forest\n- Traditional Balinese massage\n\nThis trip was about reconnecting with myself and nature.',
        coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        media: [
          { type: 'image', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', caption: 'Rice Terraces' },
          { type: 'image', url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800', caption: 'Temple' },
        ],
        tags: ['bali', 'wellness', 'culture', 'temples'],
        isFavorite: false,
      },
      {
        user: demoUser._id,
        title: 'New York City Vibes',
        destination: 'New York, USA',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-05'),
        description: 'The city that never sleeps - iconic landmarks, world-class museums, and incredible food scene.',
        story: '# Big Apple Adventure\n\nNew York City is an experience like no other. The energy, diversity, and endless possibilities make it truly special.\n\n## Highlights\n\n- Visited Central Park\n- Saw a Broadway show\n- Explored MoMA and Met Museum\n- Brooklyn Bridge walk at sunset\n\nEvery neighborhood has its own unique character and charm.',
        coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
        media: [
          { type: 'image', url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', caption: 'NYC Skyline' },
          { type: 'image', url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800', caption: 'Brooklyn Bridge' },
        ],
        tags: ['usa', 'city', 'culture', 'urban'],
        isFavorite: false,
      },
    ];

    await Trip.insertMany(trips);
    console.log('✈️  Created demo trips');

    console.log('\n✅ Seed completed successfully!');
    console.log('\n📝 Demo credentials:');
    console.log('   Email: demo@wanderlogue.com');
    console.log('   Password: demo123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();

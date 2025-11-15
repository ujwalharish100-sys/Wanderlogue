import { TravelEntry } from './types';

export const dummyTravelData: TravelEntry[] = [
  {
    id: 'trip-1',
    title: 'Magical Kyoto',
    destination: 'Kyoto, Japan',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-22'),
    description: 'Exploring ancient temples, serene gardens, and traditional tea houses in the cultural heart of Japan.',
    story: `# A Journey Through Time

Kyoto welcomed us with cherry blossoms in full bloom. The city felt like stepping into a living postcard, where every corner revealed centuries of preserved culture and tradition.

## Day 1: Fushimi Inari Shrine
The iconic thousand torii gates created a mesmerizing tunnel of vermillion. We hiked to the summit at sunrise, and the view was absolutely breathtaking.

## Day 2: Arashiyama Bamboo Grove
Walking through the towering bamboo forest felt otherworldly. The way the sunlight filtered through the green stalks created the most peaceful atmosphere.

## Culinary Adventures
- Traditional kaiseki dinner
- Matcha tea ceremony
- Street food at Nishiki Market

The trip was a perfect blend of spiritual exploration and culinary delights. Can't wait to return! 🍵`,
    media: [
      {
        id: 'media-1',
        url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
        type: 'image',
        caption: 'Fushimi Inari Shrine at sunset',
      },
      {
        id: 'media-2',
        url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
        type: 'image',
        caption: 'Arashiyama Bamboo Grove',
      },
      {
        id: 'media-3',
        url: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800',
        type: 'image',
        caption: 'Traditional tea ceremony',
      },
    ],
    tags: ['culture', 'temples', 'food', 'nature'],
    isFavorite: true,
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200',
    location: { lat: 35.0116, lng: 135.7681 },
    createdAt: new Date('2024-03-25'),
    updatedAt: new Date('2024-03-25'),
  },
  {
    id: 'trip-2',
    title: 'Swiss Alps Adventure',
    destination: 'Interlaken, Switzerland',
    startDate: new Date('2024-07-10'),
    endDate: new Date('2024-07-18'),
    description: 'Breathtaking mountain peaks, pristine lakes, and charming alpine villages in the heart of Switzerland.',
    story: `# Alpine Paradise

Switzerland exceeded every expectation. The majestic peaks, crystal-clear lakes, and charming villages created a fairy-tale landscape.

## Jungfraujoch - Top of Europe
Taking the cogwheel train to Europe's highest railway station was unforgettable. Standing at 3,454 meters surrounded by eternal snow and ice was surreal.

## Activities
- Paragliding over Interlaken
- Hiking to hidden waterfalls
- Boat ride on Lake Thun
- Swiss chocolate tasting

The combination of adventure and natural beauty made this trip truly special. 🏔️`,
    media: [
      {
        id: 'media-4',
        url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
        type: 'image',
        caption: 'View from Jungfraujoch',
      },
      {
        id: 'media-5',
        url: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800',
        type: 'image',
        caption: 'Interlaken valley',
      },
    ],
    tags: ['mountains', 'adventure', 'nature', 'hiking'],
    isFavorite: true,
    coverImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200',
    location: { lat: 46.6863, lng: 7.8632 },
    createdAt: new Date('2024-07-20'),
    updatedAt: new Date('2024-07-20'),
  },
  {
    id: 'trip-3',
    title: 'Santorini Sunsets',
    destination: 'Santorini, Greece',
    startDate: new Date('2024-09-05'),
    endDate: new Date('2024-09-12'),
    description: 'White-washed buildings, blue-domed churches, and the most spectacular sunsets over the Aegean Sea.',
    story: `# Island of Dreams

Santorini is pure magic. The iconic white and blue architecture against the deep blue sea creates the most photogenic scenery imaginable.

## Oia Sunsets
Every evening, we'd find a spot to watch the sun dip into the Aegean. The sky would transform into shades of orange, pink, and purple - absolutely mesmerizing.

## Highlights
- Wine tasting at local vineyards
- Exploring ancient Akrotiri ruins
- Swimming at Red Beach
- Fresh seafood by the caldera

This island captured our hearts completely. Already planning our return! 🌅`,
    media: [
      {
        id: 'media-6',
        url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
        type: 'image',
        caption: 'Oia village at sunset',
      },
      {
        id: 'media-7',
        url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
        type: 'image',
        caption: 'Blue domed churches',
      },
      {
        id: 'media-8',
        url: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
        type: 'image',
        caption: 'Caldera view',
      },
    ],
    tags: ['beach', 'culture', 'romance', 'food'],
    isFavorite: false,
    coverImage: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200',
    location: { lat: 36.3932, lng: 25.4615 },
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date('2024-09-15'),
  },
  {
    id: 'trip-4',
    title: 'Iceland Road Trip',
    destination: 'Reykjavik, Iceland',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-10'),
    description: 'Chasing waterfalls, witnessing geysers, and soaking in hot springs under the midnight sun.',
    story: `# Land of Fire and Ice

Iceland is unlike anywhere else on Earth. The raw, untamed landscapes feel almost otherworldly.

## Golden Circle
- Þingvellir National Park
- Geysir geothermal area
- Gullfoss waterfall

## South Coast Wonders
The black sand beaches, towering waterfalls, and glacier lagoons were absolutely stunning.

## Unique Experiences
- Soaking in the Blue Lagoon
- Exploring ice caves
- Midnight sun photography
- Northern lights hunt

Nature's power is on full display here. Truly unforgettable! ❄️`,
    media: [
      {
        id: 'media-9',
        url: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800',
        type: 'image',
        caption: 'Seljalandsfoss waterfall',
      },
      {
        id: 'media-10',
        url: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800',
        type: 'image',
        caption: 'Jökulsárlón glacier lagoon',
      },
    ],
    tags: ['nature', 'adventure', 'photography', 'waterfalls'],
    isFavorite: true,
    coverImage: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200',
    location: { lat: 64.1466, lng: -21.9426 },
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-06-15'),
  },
  {
    id: 'trip-5',
    title: 'Bali Retreat',
    destination: 'Ubud, Bali',
    startDate: new Date('2024-02-14'),
    endDate: new Date('2024-02-21'),
    description: 'Tropical paradise with lush rice terraces, ancient temples, and a vibrant spiritual culture.',
    story: `# Finding Peace in Paradise

Bali offered the perfect blend of relaxation, culture, and adventure. Ubud, in particular, felt like a sanctuary.

## Tegalalang Rice Terraces
The emerald green rice paddies cascading down the hillsides were breathtaking. We spent hours just walking and taking photos.

## Spiritual Journey
- Sunrise at Mount Batur
- Tirta Empul water temple
- Traditional Balinese dance performance
- Yoga and meditation sessions

## Food & Culture
The local cuisine was incredible, and the people were so warm and welcoming.

Bali healed my soul. 🌴`,
    media: [
      {
        id: 'media-11',
        url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        type: 'image',
        caption: 'Tegalalang rice terraces',
      },
      {
        id: 'media-12',
        url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800',
        type: 'image',
        caption: 'Pura Ulun Danu Bratan temple',
      },
    ],
    tags: ['culture', 'nature', 'wellness', 'temples'],
    isFavorite: false,
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
    location: { lat: -8.5069, lng: 115.2625 },
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-02-25'),
  },
  {
    id: 'trip-6',
    title: 'New York City Vibes',
    destination: 'New York, USA',
    startDate: new Date('2024-11-20'),
    endDate: new Date('2024-11-25'),
    description: 'The city that never sleeps - iconic landmarks, world-class museums, and incredible food scene.',
    story: `# Concrete Jungle Dreams

NYC is electric. The energy, the diversity, the endless possibilities - it's intoxicating.

## Must-See Spots
- Central Park in autumn colors
- Brooklyn Bridge at sunrise
- Top of the Rock observation deck
- Times Square lights

## Food Adventures
From dollar pizza to Michelin-starred restaurants, NYC has it all. The food diversity is unmatched.

## Cultural Immersion
- MoMA and Met Museum
- Broadway show
- Jazz club in Greenwich Village

Five days wasn't enough! 🗽`,
    media: [
      {
        id: 'media-13',
        url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
        type: 'image',
        caption: 'Brooklyn Bridge',
      },
      {
        id: 'media-14',
        url: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800',
        type: 'image',
        caption: 'Central Park autumn',
      },
    ],
    tags: ['city', 'culture', 'food', 'architecture'],
    isFavorite: false,
    coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200',
    location: { lat: 40.7128, lng: -74.0060 },
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-11-28'),
  },
];

# 🌍 Wanderlogue - Personal Travel Journal

A beautifully designed travel journal web application built with **React**, **TypeScript**, and **Webpack**. Wanderlogue helps you document your travel experiences with stunning photos, detailed stories, and organized timelines.

![Wanderlogue Banner](https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop)

## ✨ Features

### Core Features
- 📝 **Travel Entry Creation** - Add trips with titles, destinations, dates, descriptions, and rich stories
- 🖼️ **Media Gallery** - Beautiful photo/video grid layout with hover effects and lightbox viewer
- 📅 **Timeline View** - Chronological display of all your travel adventures
- 🔍 **Search & Filter** - Find trips by title, destination, year, tags, or favorites
- ⭐ **Favorites** - Mark your special trips as favorites
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Fully optimized for mobile, tablet, and desktop

### Technical Highlights
- ⚡ **Fast Performance** - Optimized Webpack build with code splitting
- 🎨 **Beautiful Animations** - Smooth transitions using Framer Motion
- 🎯 **Type Safety** - Full TypeScript support
- 🎭 **Modern UI** - Tailwind CSS with custom design system
- 📦 **State Management** - Zustand for simple and efficient state handling
- 🧭 **Client-side Routing** - React Router v6 for seamless navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd travelogue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open automatically at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```
   Production files will be in the `dist/` directory

## 📁 Project Structure

```
wanderlogue/
├── src/
│   ├── assets/              # Static images, icons, fonts
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── TextArea.tsx
│   │   ├── Modal.tsx
│   │   └── Lightbox.tsx
│   ├── features/
│   │   └── travel/
│   │       ├── components/  # Travel-specific components
│   │       │   └── TripCard.tsx
│   │       ├── pages/       # Travel pages
│   │       │   ├── TripListPage.tsx
│   │       │   ├── TripDetailPage.tsx
│   │       │   ├── AddTripPage.tsx
│   │       │   ├── TimelinePage.tsx
│   │       │   └── SearchPage.tsx
│   │       ├── types.ts     # TypeScript types
│   │       ├── state.ts     # Zustand store
│   │       └── dummyData.ts # Sample data
│   ├── layouts/             # Layout components
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/               # Main pages
│   │   └── HomePage.tsx
│   ├── styles/              # Global styles
│   │   └── globals.css
│   ├── App.tsx              # Root component
│   ├── router.tsx           # Route configuration
│   └── index.tsx            # Entry point
├── public/
│   ├── index.html
│   └── favicon.ico
├── webpack.config.js        # Webpack configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── package.json
└── README.md
```

## 🎨 Tech Stack

### Frontend Framework
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **React Router v6** - Client-side routing

### Build Tools
- **Webpack 5** - Module bundler with optimizations
- **Babel** - JavaScript/TypeScript transpilation

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Custom Design System** - Warm color palette and typography

### State Management
- **Zustand** - Lightweight state management

### UI & Animations
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Beautiful icon library

### Utilities
- **date-fns** - Date formatting and manipulation
- **react-markdown** - Markdown rendering for stories

## 🎯 Usage Guide

### Adding a New Trip

1. Click **"Add Trip"** in the navigation
2. Fill in the trip details:
   - Trip title and destination
   - Start and end dates
   - Description and story (supports Markdown)
   - Photo URLs (use Unsplash or your own hosting)
   - Tags for categorization
3. Click **"Save Trip"** to add it to your collection

### Viewing Trips

- **Home Page** - See your recent adventures and statistics
- **Trips Page** - Browse all trips in a grid or list view
- **Timeline Page** - View trips chronologically by year
- **Search Page** - Filter by keywords, year, tags, or favorites

### Trip Details

Click on any trip card to view:
- Full-size hero image
- Complete story with Markdown formatting
- Photo gallery with lightbox viewer
- Trip metadata (dates, location, tags)
- Actions (favorite, edit, delete)

## 🎨 Customization

### Color Scheme

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {
    // Your custom colors
  },
  warm: {
    // Your custom warm tones
  },
}
```

### Animations

All animations are defined in:
- `tailwind.config.js` - Tailwind animation utilities
- `src/styles/globals.css` - Custom CSS animations
- Component-level Framer Motion animations

### Fonts

Update fonts in `public/index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

## 🔧 Scripts

- `npm start` - Start development server
- `npm run dev` - Alternative dev server command
- `npm run build` - Build for production
- `npm run type-check` - Run TypeScript type checking

## 🌟 Features Roadmap

### Planned Enhancements
- [ ] Backend integration (Firebase/Spring Boot)
- [ ] User authentication
- [ ] Map integration (Google Maps/Mapbox)
- [ ] Export trips as PDF scrapbook
- [ ] Image upload from device
- [ ] Social sharing
- [ ] Trip statistics dashboard
- [ ] Collaborative trips
- [ ] Travel budget tracking

## 📝 Sample Data

The app comes with 6 pre-populated sample trips showcasing:
- Kyoto, Japan 🇯🇵
- Swiss Alps, Switzerland 🇨🇭
- Santorini, Greece 🇬🇷
- Iceland Road Trip 🇮🇸
- Bali, Indonesia 🇮🇩
- New York City, USA 🇺🇸

Feel free to delete or modify these in `src/features/travel/dummyData.ts`

## 🤝 Contributing

This is a personal project template, but feel free to:
1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Fonts from [Google Fonts](https://fonts.google.com)

## 📧 Support

For questions or issues, please open an issue on the repository.

---

**Happy Traveling! ✈️🌎**

Made with ❤️ for travelers around the world

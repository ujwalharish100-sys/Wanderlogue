# 🚀 Quick Start Guide - Wanderlogue

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```
The app will open at `http://localhost:8080`

### 3. Build for Production
```bash
npm run build
```

## 📱 Available Pages

- **Home** (`/`) - Welcome page with hero section and recent trips
- **Trips** (`/trips`) - Browse all your travel entries
- **Timeline** (`/timeline`) - Chronological view of your journeys
- **Search** (`/search`) - Filter and search trips
- **Add Trip** (`/add-trip`) - Create a new travel entry
- **Trip Detail** (`/trip/:id`) - View individual trip details

## 🎨 Key Features to Explore

### 1. Add Your First Trip
- Click "Add Trip" in the navigation
- Fill in trip details (title, destination, dates)
- Add photo URLs (use Unsplash for free images)
- Write your story using Markdown
- Add tags for easy filtering

### 2. View & Manage Trips
- Browse trips in grid or list view
- Click any trip card to see full details
- Mark trips as favorites with the heart icon
- Use the lightbox gallery to view photos

### 3. Search & Filter
- Search by title or destination
- Filter by year
- Filter by tags
- Show only favorite trips

### 4. Dark Mode
- Toggle dark mode using the moon/sun icon in the navbar
- Theme persists across page navigation

## 🎯 Sample Data

The app includes 6 sample trips:
1. Magical Kyoto, Japan
2. Swiss Alps Adventure, Switzerland
3. Santorini Sunsets, Greece
4. Iceland Road Trip
5. Bali Retreat, Indonesia
6. New York City Vibes, USA

## 💡 Tips

### Using Image URLs
- **Unsplash**: `https://images.unsplash.com/photo-[id]?w=800`
- **Imgur**: Upload to Imgur and use direct link
- **Your hosting**: Use any publicly accessible image URL

### Markdown in Stories
```markdown
# Heading 1
## Heading 2
**Bold text**
*Italic text*
- Bullet point
1. Numbered list
```

### Customizing Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

## 🐛 Troubleshooting

### Port Already in Use
If port 8080 is busy, edit `webpack.config.js`:
```javascript
devServer: {
  port: 3002, // Change to any available port
}
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Hot Reload Not Working
- Save the file again
- Refresh the browser manually
- Restart the dev server

## 📦 Project Structure Overview

```
src/
├── components/       # Reusable UI components
├── features/travel/  # Travel-specific features
├── layouts/          # Page layouts (Navbar, Footer)
├── pages/           # Main pages
├── styles/          # Global styles
└── App.tsx          # Root component
```

## 🔥 Next Steps

1. **Customize the design** - Update colors and fonts
2. **Add more trips** - Document your own travels
3. **Extend features** - Add map integration, export to PDF
4. **Backend integration** - Connect to Firebase or your own API
5. **Deploy** - Host on Netlify, Vercel, or GitHub Pages

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)

---

**Happy Coding! 🎉**

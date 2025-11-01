# 🎵 Spotify Clone - Ionic Angular

A stunning mobile-first Spotify clone built with Ionic Framework and Angular. Features a beautiful dark theme with Spotify's signature green accent, smooth animations, and a complete music player experience.

![Spotify Clone](https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400)

## ✨ Features

### Pages
- **Home / Discover** - Personalized playlists and recommendations with horizontal carousels
- **Search** - Browse music by genre with instant search functionality
- **Library** - Your saved playlists, artists, and albums organized in a grid layout
- **Favorites** - All your liked songs in one beautiful list
- **Now Playing** - Full-screen player with large album artwork and playback controls
- **Playlist** - Detailed playlist view with track listings
- **Settings** - App preferences and account management

### Components
- **Mini Player** - Persistent bottom player that follows you across all pages
- **Track Item** - Beautiful track cards with play animations and favorite button
- **Playlist Card** - Stylish playlist cards with hover effects

### Design Features
- Dark theme with Spotify green accent (#1DB954)
- Modern Poppins typography
- Rounded cards with subtle shadows
- Smooth page transitions
- Micro-interactions (play button morph, card lift on hover)
- Progress bar animations
- Responsive design for all screen sizes

### Icons
All custom SVG icons included:
- Play, Pause, Next, Previous
- Shuffle, Repeat
- Heart (outline & filled)
- Search, Menu, More
- Download, Share
- Home, Library

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The production build will be available in the `dist/app` directory.

## 📱 PWA Ready

This app is configured as a Progressive Web App (PWA), which means:
- Can be installed on mobile devices
- Works offline (with proper service worker configuration)
- App-like experience on mobile
- Fast loading and smooth performance

## 🎨 Design System

### Colors
```scss
--spotify-green: #1DB954       // Primary action color
--spotify-black: #000000       // Header/tab bar background
--spotify-dark: #121212        // Main background
--spotify-gray: #181818        // Card background
--spotify-text: #ffffff        // Primary text
--spotify-text-secondary: #b3b3b3  // Secondary text
```

### Typography
- Font Family: Poppins (via Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Spacing System
- Base unit: 8px
- Consistent spacing throughout the app

## 🎯 Mock Data

The app uses mock data for demonstration purposes:
- 8 sample tracks with Pexels placeholder images
- 6 curated playlists
- 3 featured artists
- No real API calls or backend required

All mock data is managed through the `MusicService` located in `src/app/services/music.service.ts`.

## 🏗️ Architecture

### Project Structure
```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── icons/          # SVG icon components
│   │   ├── mini-player/    # Persistent player
│   │   ├── playlist-card/  # Playlist card
│   │   └── track-item/     # Track list item
│   ├── models/             # TypeScript interfaces
│   ├── pages/              # Page components
│   │   ├── home/
│   │   ├── search/
│   │   ├── library/
│   │   ├── favorites/
│   │   ├── now-playing/
│   │   ├── playlist/
│   │   ├── settings/
│   │   └── tabs/
│   ├── services/           # Business logic
│   │   └── music.service.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── global.scss             # Global styles & theme
├── index.html
└── main.ts
```

### Key Technologies
- **Ionic Framework 8.4** - Mobile UI components
- **Angular 20** - Application framework
- **Standalone Components** - Modern Angular architecture
- **Signals** - Reactive state management
- **SCSS** - Styling with variables and mixins

## 🎮 Usage

### Playing Music
1. Navigate to Home to see recommended playlists and tracks
2. Tap any track to start playing
3. Use the mini player at the bottom to control playback
4. Tap the mini player to open the full Now Playing screen

### Search
1. Go to the Search tab
2. Browse by genre or use the search bar
3. Search for songs, artists, or playlists

### Favorites
1. Tap the heart icon on any track to add to favorites
2. Access all liked songs from the Favorites tab

### Playlists
1. Browse playlists in Library or Home
2. Tap a playlist to see all tracks
3. Play entire playlist or shuffle

## 🔧 Customization

### Adding Your Own Tracks
Edit `src/app/services/music.service.ts` and update the `mockTracks` array:

```typescript
{
  id: 'unique-id',
  title: 'Song Title',
  artist: 'Artist Name',
  album: 'Album Name',
  duration: 180, // in seconds
  coverUrl: 'https://your-image-url.jpg'
}
```

### Changing Theme Colors
Edit `src/global.scss` and update the CSS variables:

```scss
:root {
  --spotify-green: #1DB954;  // Change to your accent color
  --spotify-dark: #121212;   // Change to your background
}
```

## 📄 License

This is a demo project created for educational purposes. Spotify is a registered trademark of Spotify AB.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

Made with ❤️ using Ionic and Angular

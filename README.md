# Mushtaq Ahmad Saqi — 3D Interactive Portfolio

Step into the interactive 3D studio of **Mushtaq Ahmad Saqi** — Full-Stack Developer, AI enthusiast, and COMSATS CS student building practical, education-focused products.

This project is a highly immersive, interactive 3D portfolio built with React, Three.js, and WebGL. It features a fully realized 3D environment, spatial audio, particle systems, interactive holographic models of projects, and an accessible 2D mobile fallback.

## 🌟 Key Features

- **Immersive 3D Experience**: A customized 3D environment rendered using Three.js and React Three Fiber.
- **Interactive Holograms**: Browse projects via floating holographic screens, fully integrated into the 3D scene.
- **Accessible Fallback Mode**: A robust, lightweight 2D version of the portfolio automatically available for low-power devices, mobile users, or those preferring a classic view.
- **Spatial Audio Design**: Ambient sounds, UI interaction sound effects, and volume controls via Howler.js.
- **Advanced State Management**: Global UI state, camera target transitions, and interactive modals managed by Zustand.
- **Dynamic Theming & Aesthetics**: Uses custom CSS variables with a deep, modern palette and smooth animations.

## 🛠️ Tech Stack

- **React** (v18)
- **Three.js** / **@react-three/fiber** / **@react-three/drei**
- **Vite** (Build Tool)
- **Zustand** (State Management)
- **Howler.js** (Audio Management)
- **Vanilla CSS** (Custom styling system with dynamic theming)

## 📁 Project Structure

```text
├── public/
│   └── assets/           # Project previews, resume, profile photo, and audio files
├── src/
│   ├── components/       # UI overlays, Modals, 3D Canvas elements, and 2D Fallback
│   ├── data/             # Centralized JSON-like data stores (projects.js, profile.js)
│   ├── styles/           # Global CSS variables and utility classes
│   ├── utils/            # Zustand store (useStore.js) and other helpers
│   ├── App.jsx           # Main App entry, Handles 3D Scene and 2D UI switching
│   └── main.jsx          # React DOM entry point
└── index.html            # Entry HTML
```

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/MushtaqAhmadSaqi/3D-Portfolio.git
   cd 3D-Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📝 Customization

The project is designed to be easily updatable without touching the complex 3D logic:
- **Projects**: Edit `src/data/projects.js` to add or remove projects. The 3D scene automatically re-arranges the holographic screens.
- **Profile Data**: Edit `src/data/profile.js` to update bio, resume links, and general information.
- **Assets**: Place your images and audio in `public/assets/` and reference them in the data files.

## 📄 License

This project is open-source and available for reference.
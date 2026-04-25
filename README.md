# Mushtaq Ahmad Saqi — 3D Interactive Portfolio

A polished, performance-aware 3D interactive portfolio for **Mushtaq Ahmad Saqi** — Full-Stack Developer, AI enthusiast, and COMSATS CS student building practical, education-focused products.

This portfolio presents a minimal floating space studio built with React, Vite, Three.js, and React Three Fiber. It combines holographic project screens, cinematic camera focus, guided tour mode, adaptive performance, accessible modals, spatial audio, and a lightweight 2D fallback for mobile and low-power devices.

## Brand Direction

- **Primary accent:** `#38bdf8` cyan
- **Secondary:** `#a78bfa` purple
- **Tertiary:** `#f472b6` pink
- **Background:** `#0b1120` deep space dark
- **Vibe:** Minimal Floating Space with subtle playful physics elements — clean, premium, modern, and not too game-like

## Key Features

### Immersive 3D Portfolio Experience

- Interactive WebGL studio built with React Three Fiber and Three.js
- Floating MAS logo centerpiece with subtle orbit rings and glow
- Holographic project screens using project preview textures
- Clickable About, Contact, Resume, Skills, and Project objects
- Minimal space environment with stars, particles, fog, lighting, contact shadows, and a subtle studio floor

### Adaptive Performance and 60fps Smoothness

- Automatic quality scaling for low, medium, and high capability devices
- Adaptive DPR and event handling
- Performance-aware bloom, shadows, environment lighting, particle count, and star count
- Reduced per-frame CPU and GPU work for smoother interaction
- Reduced-motion and save-data friendly behavior

### Mobile and 2D Fallback

- Lightweight 2D portfolio mode for low-power, mobile, reduced-motion, or data-saving users
- Automatic device capability detection
- Manual mode overrides with query parameters
- Touch-friendly buttons and responsive layout
- 2D fallback includes hero, projects, skills, about, resume, and contact sections

### Camera and Interaction Quality

- Smooth cinematic camera focus transitions
- Art-directed camera targets for MAS, About, Projects, Skills, Resume, and Contact
- Guided tour mode with intentional framing
- Interactive minimap for focusing key scene areas
- Active focus state for selected project screens

### UI, Accessibility, and UX

- Accessible modal dialogs with Escape close, focus trap, and focus return
- Keyboard-safe guided tour shortcut
- Accessible form status messages
- Clear HUD controls for Free Explore, Guided Tour, sound, and 2D mode
- Enter screen with sound and silent entry options
- Quick Links drawer for Resume, GitHub, LinkedIn, Email, About, Contact, and 2D mode

### Audio

- Ambient background audio
- Hover and click interaction sounds
- Sound toggle in the HUD
- Howler.js-based sound management integrated with Zustand instead of global browser functions

## Tech Stack

- **React 18**
- **Vite**
- **Three.js**
- **React Three Fiber**
- **@react-three/drei**
- **@react-three/postprocessing**
- **Zustand**
- **Howler.js**
- **Vanilla CSS with custom properties**

## Project Structure

```text
├── public/
│   ├── assets/
│   │   ├── project preview images
│   │   ├── profile photo
│   │   └── resume PDF
│   └── sounds/
│       ├── ambient.mp3
│       ├── hover.mp3
│       └── click.mp3
├── src/
│   ├── components/
│   │   ├── AboutModal.jsx
│   │   ├── AboutPedestal.jsx
│   │   ├── CameraRig.jsx
│   │   ├── ContactModal.jsx
│   │   ├── ContactTerminal.jsx
│   │   ├── EnterOverlay.jsx
│   │   ├── GuidedTour.jsx
│   │   ├── HUD.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── MASLogo.jsx
│   │   ├── Minimap.jsx
│   │   ├── MobileFallback.jsx
│   │   ├── Particles.jsx
│   │   ├── ProjectHologram.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── QuickLinks.jsx
│   │   ├── ResumeObelisk.jsx
│   │   ├── Scene.jsx
│   │   ├── SkillsCluster.jsx
│   │   ├── SoundManager.jsx
│   │   ├── StudioFloor.jsx
│   │   └── TourOverlay.jsx
│   ├── data/
│   │   ├── profile.js
│   │   └── projects.js
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   ├── focusTargets.js
│   │   ├── useDeviceCapability.js
│   │   ├── useModalAccessibility.js
│   │   └── useStore.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MushtaqAhmadSaqi/3D-Portfolio.git
cd 3D-Portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will usually be available at:

```text
http://localhost:5173/
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## Experience Modes

The project supports automatic and manual experience modes.

```text
/              Automatic mode based on device capability
/?mode=2d      Force lightweight 2D portfolio
/?mode=3d      Force full 3D experience
/?force=3d     Force full 3D experience
```

Use `?mode=2d` to test the fallback layout and `?mode=3d` or `?force=3d` to test the full 3D scene on devices that may otherwise receive the 2D fallback.

## Main Interaction Guide

- Click project holograms to open project details
- Drag to orbit around the studio
- Scroll to zoom
- Use the minimap to focus key areas
- Press `T` to start or pause the guided tour
- Use the HUD to switch between Free Explore and Guided Tour
- Use Quick Links for Resume, GitHub, LinkedIn, Email, Contact, About, and 2D mode

## Customization

### Update profile information

Edit:

```text
src/data/profile.js
```

Use this file to update:

- Name
- Role
- Tagline
- Email
- GitHub
- LinkedIn
- Resume path
- Profile photo path
- About text
- Stats
- Skills
- Journey
- Brand colors

### Update projects

Edit:

```text
src/data/projects.js
```

Each project can include:

- `id`
- `number`
- `title`
- `tag`
- `featured`
- `accent`
- `preview`
- `short`
- `description`
- `highlights`
- `tech`
- `links`
- `position`
- `rotation`

The 3D scene automatically renders the project as a holographic screen.

### Update assets

Place images and documents in:

```text
public/assets/
```

Recommended assets:

```text
public/assets/photo.jpg
public/assets/Mushtaq_Ahmad_Saqi_Resume.pdf
public/assets/comsatsprephub-preview.png
public/assets/edulearn-preview.png
public/assets/video-downloader-preview.png
public/assets/openprep-preview.png
public/assets/hotel-preview.png
public/assets/grade-preview.png
```

### Update audio

Place audio files in:

```text
public/sounds/
```

Expected files:

```text
public/sounds/ambient.mp3
public/sounds/hover.mp3
public/sounds/click.mp3
```

## Performance Notes

The scene is designed to adapt to device capability.

Quality levels affect:

- Device pixel ratio
- Star count
- Particle count
- Bloom intensity
- Contact shadows
- Environment lighting
- Auto-rotation
- Antialiasing

The app also considers:

- WebGL support
- Viewport size
- Touch input
- CPU cores
- Device memory
- Save-data mode
- Reduced-motion preference

## Accessibility Notes

The portfolio includes:

- 2D fallback for accessibility and low-power devices
- Reduced-motion handling
- Keyboard-safe guided tour shortcut
- Accessible modal dialogs
- Focus trap and Escape close behavior
- Form status announcements
- Visible focus states
- Touch-friendly button sizing

## Recommended Production Checklist

Before deployment, verify:

- All project preview images load correctly
- Resume PDF exists at the path used in `profile.js`
- Sound files exist in `public/sounds/`
- `npm run build` completes successfully
- 3D mode works on desktop
- 2D mode works with `?mode=2d`
- Forced 3D mode works with `?mode=3d`
- Modals work with keyboard only
- Contact links and resume download work
- Mobile layout does not overflow

## Deployment

This project is Vite-based and can be deployed to platforms such as:

- Vercel
- Netlify
- GitHub Pages

The Vite config uses a relative base path, which helps support static hosting environments such as GitHub Pages.

## License

This project is open-source and available for reference and learning.

---

Built with React, Three.js, React Three Fiber, and a focus on polished interactive web experiences.

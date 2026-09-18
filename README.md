# Formal Atmosphere Controller

An executive, formal presentation interface built with React 19, TypeScript, Vite, and Tailwind CSS. The application provides two calibrated ceremonial visual sequence triggers with real-time 60 FPS canvas particle physics:

- **Snowflakes Protocol**: Medium-sized crystalline snowflakes fall gracefully from top to bottom across the display for exactly 5 seconds, featuring intricate hexagonal branching, rotational sway, and soft crystalline glow.
- **Balloons Protocol**: Medium-sized ceremonial balloons in rich metallic and royal palettes (Imperial Burgundy, Midnight Navy, Champagne Gold, Regal Emerald, Amethyst, and Platinum) ascend from the bottom to the top for exactly 5 seconds, featuring 3D spherical depth shading, tied knots, and undulating silk ribbons.

---

## Features

- **Formal Architectural Aesthetic**: Designed with an executive midnight slate palette, gold/amber hairline borders, classical serif headings (`Cinzel`), and refined sans-serif body typography (`Plus Jakarta Sans`).
- **High-Performance Canvas Particle System**: Custom 60 FPS HTML5 Canvas engine dynamically handling particle spawning, realistic gravity, buoyancy, horizontal oscillation, and smooth 400ms alpha exit transitions at the 5.0-second boundary.
- **Sequence Telemetry**: Real-time timer and progress gauge reporting sequence state, remaining duration, vector direction, and particle scaling.
- **Responsive & Accessible**: Fully adaptable layout with touch-friendly targets, WCAG-compliant contrast ratios, and seamless window resize adaptation via dynamic device-pixel-ratio scaling.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Particle Rendering**: Pure HTML5 2D Canvas API (High-DPI optimized)

---

## Project Structure

```
├── public/
├── src/
│   ├── components/
│   │   ├── AtmosphereCanvas.tsx  # Canvas particle physics engine (snowflakes & balloons)
│   │   ├── FormalConsole.tsx     # Control card with buttons, progress bar & telemetry
│   │   ├── FormalFooter.tsx      # Executive footer bar
│   │   └── FormalHeader.tsx      # Formal header with protocol branding
│   ├── types.ts                  # TypeScript interfaces for particles & states
│   ├── App.tsx                   # Main layout container & timer state manager
│   ├── index.css                 # Tailwind CSS entrypoint & theme fonts
│   └── main.tsx                  # Application root DOM mount
├── index.html                    # HTML document entry with font preconnections
├── metadata.json                 # AI Studio app metadata
├── package.json                  # Dependencies and build scripts
└── vite.config.ts                # Vite configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone or extract the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified in terminal output).

### Production Build

To compile a production-ready bundle:

```bash
npm run build
```

To run the linter and type-checker:

```bash
npm run lint
```

---

## License

Apache-2.0

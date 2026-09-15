# Sagnik Sengupta — Digital Film Portfolio

> **A digital film that happens to be a website.**
> Award-grade interactive portfolio built at the convergence of deep reinforcement learning, cloud backend architecture, and immersive WebGL editorial film.

---

## ✦ Core Philosophy

- **The User's Scroll is the Film Timeline**: The pinned 10-second high-fashion film (`assets/portfolio-film.mp4`) acts as the unifying canvas. Scrolling interpolates video `currentTime` smoothly via RAF lerp and seek throttling.
- **Strict Separation of Concerns**: The animation engine never hard-codes content. All copy, verified GitHub repositories, architecture case study pillars, capabilities, and scene thresholds live exclusively in `src/data/portfolio.ts`.
- **Authentic Engineering Depth**: Features real, verified open-source projects from Sagnik Sengupta's GitHub (`Recurrent-PPO-MotoSim`, `Quantum-TicTacToe`, `FinOps_Enviroment`), complete with technical system architecture flows.
- **Editorial Narratives across 6 Chapters**:
  - `CHAPTER 01 / PROLOGUE`: Hero typography with asymmetric Syne display & live Indian Standard Time clock.
  - `CHAPTER 02 / IDENTITY`: "I don't just build websites. I build systems, experiences and worlds."
  - `CHAPTER 03 / SELECTED WORK`: Cinematic project spreads with kinetic "A becomes B" transitions.
  - `CHAPTER 04 / SIGNATURE 3D REALM`: Three.js perspective camera fly-through in deep Z-space.
  - `CHAPTER 05 / EXPERIMENTS`: Creative coding lab pieces (`Spiral-Creator`, `uvSphere`, `Decoded`, `2D Physics Engine`).
  - `CHAPTER 06 / ABOUT & CAPABILITIES`: 7 technical capability clusters and telemetry mantra.
  - `FINAL TRANSMISSION`: Massive editorial sign-off — **BE A PART.**

---

## ✦ Tech Stack

- **Core**: HTML5, TypeScript 5.8, Modern CSS (Vanilla, zero-bloat tokens, glassmorphism, `@starting-style`)
- **Animation & Motion**: GSAP 3.12, ScrollTrigger, Lenis 1.1 smooth scroll
- **3D Graphics**: Three.js (Perspective Camera fly-through, custom wireframed panels, atmospheric fog & particles)
- **Top-Layer Dialog**: Native HTML5 `<dialog>` with full accessibility focus trapping, light dismiss, and discrete transition behavior
- **Build Tool**: Vite 6 (ultra-fast 116ms production builds)

---

## ✦ Running Locally

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000/` in your browser.

### Build Production Bundle
```bash
npm run build
```
Generates an optimized, minified bundle in `dist/`.

### Preview Production Build
```bash
npm run preview
```

---

## ✦ Project Structure

```text
sagnikV5/
├── assets/
│   ├── experiments/
│   │   ├── fluid-matter.jpg
│   │   └── light-field.jpg
│   ├── projects/
│   │   ├── finops/             # FinOps Engine visual assets
│   │   ├── moto-sim/           # Moto-Sim DRL visual assets
│   │   └── quantum/            # Quantum Tic-Tac-Toe visual assets
│   └── portfolio-film.mp4      # Core 10s cinematic film
├── src/
│   ├── data/
│   │   └── portfolio.ts        # Centralized data model & single source of truth
│   ├── lib/
│   │   ├── caseStudyModal.ts   # Accessible 6-pillar native <dialog> case study drawer
│   │   ├── cursor.ts           # Context-aware desktop cursor
│   │   ├── interactivePlayground.ts # Capabilities hover & reactive brightness
│   │   ├── lenis.ts            # Lenis smooth scroll ticker binding
│   │   ├── masterTimeline.ts   # Master timeline orchestrating all 9 scenes & transitions
│   │   ├── scene3d.ts          # Three.js 3D spatial camera fly-through
│   │   └── videoScrubber.ts    # RAF lerp video currentTime interpolator
│   ├── styles/
│   │   ├── components.css      # Modal, architecture grid, telemetry card, menu
│   │   ├── film.css            # Pinned video, grain overlay, vignette, 3D canvas
│   │   ├── main.css            # Master stylesheet aggregator
│   │   ├── reset.css           # Modern CSS reset
│   │   ├── typography.css      # Syne/Inter typography tokens & masked text lines
│   │   └── variables.css       # Filmic color palette, clamp sizing, and z-indices
│   ├── main.ts                 # Dynamic DOM renderer & application bootstrap
│   └── vite-env.d.ts
├── index.html                  # Semantic HTML5 base with SEO meta & dialog markup
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ✦ Updating Content

To update projects, contact details, social URLs, or capabilities, edit only:
`src/data/portfolio.ts`

No animation logic or CSS code needs to be modified when updating content.

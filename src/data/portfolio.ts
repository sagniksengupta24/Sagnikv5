/**
 * Centralized Portfolio Data Model & Source of Truth
 * 
 * Sagnik Sengupta — Creative Developer / AI & Backend Engineer / Technology Architect
 * 
 * Strict separation of content and animation presentation layer.
 * All timeline metadata, copy, project models, and assets are declared here.
 * Source of truth: verified public GitHub repositories and specified profiles.
 */

// 1. SITE IDENTITY & POSITIONING
export const site = {
  name: "Sagnik Sengupta",
  primaryRole: "Creative Developer",
  secondaryRoles: [
    "AI & Backend Engineer",
    "Technology Architect"
  ],
  location: "India",
  availability: "Available for selected systems & creative engineering",
  tagline: "Building systems and experiences that feel alive.",
  description:
    "Creative developer and systems engineer operating at the convergence of deep reinforcement learning, cloud backend architecture, and immersive WebGL editorial film.",
  email: "sagniksengupta24@gmail.com",
  socials: {
    github: "https://github.com/sagniksengupta24",
    linkedin: "https://www.linkedin.com/in/sagnik-sengupta-3286681b6/",
    instagram: "https://www.instagram.com/sagnik.24"
  },
  navigation: [
    { id: "hero", label: "01 HOME", href: "#hero", sceneIndex: 0 },
    { id: "identity", label: "02 IDENTITY", href: "#identity", sceneIndex: 1 },
    { id: "work", label: "03 WORK", href: "#work-1", sceneIndex: 2 },
    { id: "spatial", label: "04 3D REALM", href: "#spatialScene", sceneIndex: 5 },
    { id: "experiments", label: "05 EXPERIMENTS", href: "#experiments", sceneIndex: 6 },
    { id: "about", label: "06 ABOUT", href: "#about", sceneIndex: 7 },
    { id: "contact", label: "07 CONTACT", href: "#contact", sceneIndex: 8 }
  ],
  ctaLabel: "BE A PART →"
};

// 2. CHAPTER 01 — HERO
export const hero = {
  chapter: "CHAPTER 01",
  eyebrow: "PROLOGUE — 2026",
  title: ["SAGNIK", "SENGUPTA"],
  supportingLabel: "CREATIVE DEVELOPER\nAI / BACKEND / TECHNOLOGY",
  supportingText: "A technically serious builder who creates extraordinary digital experiences.",
  scrollLabel: "SCROLL TO ENTER FILM",
  sceneId: "hero",
  videoStart: 0.00,
  videoEnd: 0.14
};

// 3. CHAPTER 02 — IDENTITY
export const identity = {
  chapter: "CHAPTER 02",
  eyebrow: "01 / PHILOSOPHY",
  headline: ["I DON'T JUST BUILD", "WEBSITES."],
  statement: ["I BUILD SYSTEMS,", "EXPERIENCES", "AND WORLDS."],
  supportingLine: "CREATIVE DEVELOPMENT × AI × SYSTEMS × 3D",
  description:
    "Bridging the tension between uncompromising engineering rigor and haute editorial aesthetics. The visual surface is artistic; the underlying architecture is serious. That contrast is the brand.",
  sceneId: "identity",
  videoStart: 0.14,
  videoEnd: 0.28
};

// 4. PROJECT DATA MODEL
export type ArchitecturePillar = {
  overview: string;
  flow: { step: string; desc: string }[];
};

export type CaseStudy = {
  idea: string;
  process: string;
  architecture: ArchitecturePillar;
  experience: string;
  technology: string;
  result: string;
};

export type Project = {
  id: string;
  index: string;
  chapter: string;
  title: string;
  slug: string;
  year: string;
  category: string[];
  shortDescription: string;
  description: string;
  role: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  theme: {
    background?: string;
    text?: string;
    accent?: string;
  };
  media: {
    hero: string;
    poster?: string;
    gallery?: string[];
  };
  caseStudy: CaseStudy;
  timeline: {
    start: number;
    end: number;
  };
};

export const projects: Project[] = [
  {
    id: "moto-sim-drl",
    index: "01",
    chapter: "CHAPTER 03 — SCENE 01",
    title: "MOTO-SIM DRL",
    slug: "moto-sim-drl",
    year: "2026",
    category: ["Deep Reinforcement Learning", "PyTorch", "Physics Simulation"],
    shortDescription: "Recurrent-PPO agent trained to navigate a thermal-limited dynamic motorcycle simulation.",
    description:
      "High-dimensional continuous control under non-linear thermodynamic constraints. An LSTM-augmented Actor-Critic agent learning traction boundaries, thermal equilibrium, and velocity optimization in simulated multi-body physics.",
    role: ["Reinforcement Learning", "Vehicle Dynamics Simulation", "Algorithmic Control"],
    technologies: ["Python", "PyTorch", "Gymnasium", "Stable-Baselines3", "Physics Simulation", "NumPy"],
    githubUrl: "https://github.com/sagniksengupta24/Recurrent-PPO-MotoSim",
    featured: true,
    theme: {
      background: "#080808",
      text: "#F5F5F0",
      accent: "#FF6E3A"
    },
    media: {
      hero: "./assets/projects/moto-sim/hero.jpg",
      poster: "./assets/projects/moto-sim/poster.jpg",
      gallery: [
        "./assets/projects/moto-sim/hero.jpg",
        "./assets/projects/moto-sim/poster.jpg"
      ]
    },
    caseStudy: {
      idea:
        "Formulating high-dimensional motorcycle vehicle dynamics as a Partially Observable Markov Decision Process (POMDP) where the agent must balance tire traction limits against severe engine and brake thermal throttling.",
      process:
        "Engineered custom reward shaping functions penalizing thermal degradation and catastrophic slip angles while rewarding apex speed and energy conservation across 1.2M environment timesteps.",
      architecture: {
        overview: "End-to-end recurrent reinforcement learning pipeline with parallelized environment workers and ONNX inference export.",
        flow: [
          { step: "Observation Space", desc: "32-dimensional continuous telemetry vector (tire surface temps, slip ratio, lean angle, suspension travel, throttle/brake telemetry)." },
          { step: "Recurrent Policy", desc: "Multi-layer LSTM backbone (128 hidden units) maintaining temporal context, feeding separate Actor and Critic MLP heads." },
          { step: "Optimization Pipeline", desc: "PPO clipping (epsilon=0.2) with Generalized Advantage Estimation (GAE, lambda=0.95) across 8 vectorized SubprocVecEnv workers." },
          { step: "Real-Time Inference", desc: "Exported trained weights to ONNX Runtime with sub-1.8ms inference latency inside the 120Hz vehicle physics loop." }
        ]
      },
      experience:
        "A high-density telemetry HUD displaying latent recurrent activations, real-time reward gradients, tire thermal heatmaps, and simulated chassis strain.",
      technology:
        "Python 3.11, PyTorch, CUDA, Gymnasium, Stable-Baselines3, NumPy, Matplotlib, ONNX Runtime.",
      result:
        "Achieved asymptotic policy convergence with zero thermal burnout trips, outperforming baseline PID and non-recurrent PPO controllers by 27% in lap time efficiency."
    },
    timeline: {
      start: 0.28,
      end: 0.38
    }
  },
  {
    id: "quantum-tictactoe",
    index: "02",
    chapter: "CHAPTER 03 — SCENE 02",
    title: "QUANTUM TIC-TAC-TOE",
    slug: "quantum-tictactoe",
    year: "2026",
    category: ["Quantum Mechanics Simulation", "Graph Algorithms", "Interactive Systems"],
    shortDescription: "Superposition, entanglement cycles, and quantum state collapse implemented as an interactive strategic game.",
    description:
      "Translating non-intuitive quantum physics into an interactive medium. Spooky action at a distance and measurement collapse rendered through real-time graph cycle resolution and dynamic particle amplitude visualizations.",
    role: ["Algorithm Engineering", "Game Theory Modeling", "Interactive Design"],
    technologies: ["TypeScript", "Graph Theory", "Canvas API", "Web Audio API", "Vite"],
    githubUrl: "https://github.com/sagniksengupta24/Quantum-TicTacToe",
    featured: true,
    theme: {
      background: "#060608",
      text: "#FAFAFA",
      accent: "#8B9AFF"
    },
    media: {
      hero: "./assets/projects/quantum/hero.jpg",
      poster: "./assets/projects/quantum/poster.jpg",
      gallery: [
        "./assets/projects/quantum/hero.jpg",
        "./assets/projects/quantum/poster.jpg"
      ]
    },
    caseStudy: {
      idea:
        "Demystifying quantum superposition and wave-function measurement collapse by transforming abstract quantum state vectors into a playable, highly strategic tactile board game.",
      process:
        "Modeled moves as entangled quantum state pairs across a 9-qubit board. Rather than occupying a single cell, each move creates a superposition link between two positions until an entanglement cycle triggers collapse.",
      architecture: {
        overview: "Undirected multi-graph data model with Tarjan cycle detection and classical measurement resolution arbiters.",
        flow: [
          { step: "Entanglement Graph", desc: "Adjacency-list multi-graph storing quantum move tokens as edges connecting dual square indices." },
          { step: "Cycle Detection", desc: "Depth-First Search (DFS) traversal executes every ply to detect closed topological loops among entangled states." },
          { step: "Measurement Arbiter", desc: "Upon cycle closure, classical observation collapses entangled qubits into definite states via non-local cascade resolution." },
          { step: "Visualizer", desc: "Hardware-accelerated HTML5 Canvas rendering particle nodes with oscillatory wave amplitudes and sonic resonance." }
        ]
      },
      experience:
        "Players experience true quantum uncertainty: split tokens glow and pulsate across entangled cells, culminating in a dramatic visual and audio collapse sequence when a cycle is measured.",
      technology:
        "TypeScript, Graph Data Structures, Cycle Detection Algorithms, Canvas 2D API, Web Audio API Synth Engine.",
      result:
        "Published open-source educational software demonstrating that advanced quantum computational principles can be made immediately intuitive through interactive visual design."
    },
    timeline: {
      start: 0.38,
      end: 0.48
    }
  },
  {
    id: "finops-environment",
    index: "03",
    chapter: "CHAPTER 03 — SCENE 03",
    title: "FINOPS ENGINE",
    slug: "finops-environment",
    year: "2026",
    category: ["Cloud Systems", "Telemetry Pipelines", "Distributed Systems"],
    shortDescription: "Cloud financial operations environment modeling multi-tier infrastructure cost telemetry and automated efficiency heuristics.",
    description:
      "High-throughput telemetry platform correlating compute consumption with cloud billing streams in real time, detecting anomalies, idle cluster nodes, and runaway operational expenses.",
    role: ["Backend Architecture", "Data Pipeline Engineering", "Cloud Infrastructure"],
    technologies: ["Python", "FastAPI", "Cloud Telemetry", "Redis", "Docker", "Prometheus"],
    githubUrl: "https://github.com/sagniksengupta24/FinOps_Enviroment",
    featured: true,
    theme: {
      background: "#070709",
      text: "#EDEAE4",
      accent: "#4ECCA3"
    },
    media: {
      hero: "./assets/projects/finops/hero.jpg",
      poster: "./assets/projects/finops/poster.jpg",
      gallery: [
        "./assets/projects/finops/hero.jpg",
        "./assets/projects/finops/poster.jpg"
      ]
    },
    caseStudy: {
      idea:
        "Transforming opaque cloud infrastructure expenses into transparent, real-time unit economics with predictive anomaly detection and automated resource rightsizing heuristics.",
      process:
        "Architected asynchronous ingestion pipelines reconciling raw AWS Cost & Usage Reports (CUR) and GCP Cloud Billing exports with live Prometheus CPU/memory telemetry streams.",
      architecture: {
        overview: "Microservice-based telemetry ingestion, aggregation cache, and high-performance analytical API.",
        flow: [
          { step: "Ingestion Worker Pool", desc: "Asynchronous task workers parsing cloud billing records and container runtime metrics in real-time batches." },
          { step: "Telemetry Correlator", desc: "Normalizes raw costs against microservice pod boundaries to compute true cost-per-request unit economics." },
          { step: "FastAPI Cache Tier", desc: "High-throughput asynchronous FastAPI backend caching time-series aggregations in Redis with sub-8ms latency." },
          { step: "Alerting Heuristics", desc: "Statistical thresholding detecting compute spikes, runaway recursive queries, and unattached EBS/disk volumes." }
        ]
      },
      experience:
        "Engineers and architects gain instantaneous visibility into cluster spend graphs, forecasting monthly run rates and highlighting actionable optimization levers.",
      technology:
        "Python 3.11, FastAPI, Pydantic, Redis, Docker, Prometheus Exporters, Cloud Billing APIs.",
      result:
        "Provides a robust foundation for cloud cost governance and proves engineering discipline in large-scale backend infrastructure."
    },
    timeline: {
      start: 0.48,
      end: 0.58
    }
  }
];

// 5. CHAPTER 04 — SIGNATURE 3D MOMENT
export const spatialMoment = {
  chapter: "CHAPTER 04",
  eyebrow: "SIGNATURE 3D MOMENT",
  title: ["TRANSVERSE", "DIMENSION"],
  supportingText:
    "2D composition collapses into Z-space depth. The camera travels through floating project wireframes, mathematical geometry, and code structures before reforming into editorial print.",
  sceneId: "spatial-3d",
  videoStart: 0.58,
  videoEnd: 0.70
};

// 6. CHAPTER 05 — EXPERIMENTS
export type Experiment = {
  id: string;
  index: string;
  title: string;
  description: string;
  category: string[];
  technologies: string[];
  year: string;
  url: string;
  media: {
    thumbnail: string;
  };
  featured: boolean;
};

export const experiments: Experiment[] = [
  {
    id: "spiral-creator",
    index: "01",
    title: "Spiral Creator",
    description: "Generative mathematical geometry exploring algorithmic logarithmic spirals, polar coordinate transformations, and harmonic ratios.",
    category: ["Generative Art", "Mathematics", "Algorithms"],
    technologies: ["Python", "Parametric Geometry", "Vector Graphics"],
    year: "2026",
    url: "https://github.com/sagniksengupta24/Spiral-Creator",
    media: {
      thumbnail: "./assets/experiments/fluid-matter.jpg"
    },
    featured: true
  },
  {
    id: "uv-sphere",
    index: "02",
    title: "uvSphere Lab",
    description: "Procedural UV-sphere generation with real-time GLSL vertex displacement shaders, normal recalculation, and Fresnel rim caustics.",
    category: ["WebGL", "GLSL Shaders", "Procedural 3D"],
    technologies: ["Three.js", "GLSL", "Procedural Mesh", "TypeScript"],
    year: "2026",
    url: "https://github.com/sagniksengupta24/uvSphere",
    media: {
      thumbnail: "./assets/experiments/light-field.jpg"
    },
    featured: true
  },
  {
    id: "decoded",
    index: "03",
    title: "Decoded ML",
    description: "Exploration of sequence encoding, latent token representations, and lightweight transformer attention modeling.",
    category: ["Machine Learning", "NLP", "Neural Systems"],
    technologies: ["Python", "PyTorch", "Transformers", "NLP"],
    year: "2026",
    url: "https://github.com/sagniksengupta24/Decoded",
    media: {
      thumbnail: "./assets/projects/moto-sim/hero.jpg"
    },
    featured: true
  },
  {
    id: "physics-2d",
    index: "04",
    title: "2D Kinematics Engine",
    description: "Custom particle kinematics, verlet integration, and dynamic collision manifolds written directly on HTML5 Canvas.",
    category: ["Physics Engine", "Collision Geometry", "Interactive"],
    technologies: ["JavaScript", "Verlet Integration", "Canvas 2D"],
    year: "2026",
    url: "https://github.com/sagniksengupta24/2d_Game",
    media: {
      thumbnail: "./assets/projects/quantum/hero.jpg"
    },
    featured: true
  }
];

// 7. CHAPTER 06 — ABOUT & CAPABILITIES
export type Capability = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  subsystems: string[];
};

export const capabilities: Capability[] = [
  {
    id: "creative-development",
    index: "01",
    title: "Creative Development",
    category: "Experience",
    description: "High-fashion editorial art direction merged with real-time WebGL, smooth scroll choreographies, and microinteractions.",
    technologies: ["TypeScript", "GSAP ScrollTrigger", "Lenis", "Modern CSS", "A11y"],
    subsystems: ["KINETIC TYPOGRAPHY", "SCROLL TIMELINES", "MICROINTERACTIONS", "A11Y STANDARDS"]
  },
  {
    id: "ai-systems",
    index: "02",
    title: "AI Systems & DRL",
    category: "Intelligence",
    description: "Deep reinforcement learning policies (PPO, Recurrent-PPO), continuous control optimization, and ONNX runtime integration.",
    technologies: ["Python", "PyTorch", "Gymnasium", "Stable-Baselines3", "ONNX"],
    subsystems: ["RECURRENT POLICIES", "MARKOV DECISION", "ONNX RUNTIME", "PARALLEL WORKERS"]
  },
  {
    id: "backend-architecture",
    index: "03",
    title: "Backend Architecture",
    category: "Systems",
    description: "High-throughput asynchronous API design, microservice pipelines, telemetry ingestion, and distributed caching.",
    technologies: ["FastAPI", "Python", "Redis", "Docker", "REST / WebSockets"],
    subsystems: ["ASYNC FASTAPI", "REDIS TELEMETRY", "HIGH-THROUGHPUT PIPELINES", "SYSTEM TOPOLOGY"]
  },
  {
    id: "3d-webgl",
    index: "04",
    title: "3D / WebGL & Shaders",
    category: "Graphics",
    description: "Procedural geometry generation, custom GLSL fragment/vertex shaders, post-processing pipelines, and spatial cameras.",
    technologies: ["Three.js", "WebGL2", "GLSL", "BufferGeometry", "GPGPU"],
    subsystems: ["PROCEDURAL GEOMETRY", "CUSTOM GLSL", "POST-PROCESSING", "BUFFER ATTRIBUTES"]
  },
  {
    id: "interactive-experiences",
    index: "05",
    title: "Interactive Experiences",
    category: "Design",
    description: "Tactile spatial interfaces, graph algorithm visualizations, physics-based UI, and non-linear storytelling.",
    technologies: ["Canvas API", "Web Audio", "State Machines", "Motion Design"],
    subsystems: ["GRAPH CYCLE RESOLUTION", "CANVAS 2D ENGINE", "WEB AUDIO SYNTH", "SPATIAL UI"]
  },
  {
    id: "frontend-engineering",
    index: "06",
    title: "Frontend Engineering",
    category: "Execution",
    description: "Resilient zero-dependency native architectures, clean modular codebases, sub-millisecond rendering loops, and fluid layouts.",
    technologies: ["TypeScript", "Vite", "Web APIs", "Performance Profiling"],
    subsystems: ["ZERO-DEPENDENCY TS", "NATIVE DIALOGS", "SUB-MS EVENT LOOPS", "VIEWPORT HARMONICS"]
  },
  {
    id: "system-design",
    index: "07",
    title: "System Design",
    category: "Architecture",
    description: "Cloud telemetry modeling, infrastructure cost optimization, modular separation of concerns, and resilient architectures.",
    technologies: ["Cloud Telemetry", "Prometheus", "System Topologies", "Docker"],
    subsystems: ["UNIT ECONOMICS", "PROMETHEUS METRICS", "STATISTICAL HEURISTICS", "CLUSTER TELEMETRY"]
  }
];

export const about = {
  chapter: "CHAPTER 06",
  eyebrow: "ABOUT & CAPABILITIES",
  headline: [
    "DESIGNER.",
    "DEVELOPER.",
    "SYSTEM THINKER.",
    "ALWAYS BUILDING."
  ],
  paragraphs: [
    "I'm Sagnik Sengupta — operating at the intersection of serious system engineering, machine learning, and high-fashion creative development.",
    "I build architectures that don't fail under pressure, wrapped in interfaces that leave an indelible impression. Systems beneath, art on the surface."
  ],
  personality: [
    "BUILDING",
    "BREAKING",
    "LEARNING",
    "REBUILDING."
  ],
  mantra: "SYSTEMS. IDEAS. OBSESSION.",
  location: "India / Available Worldwide",
  currently: "Available for selected engineering & creative systems commissions"
};

// 8. FINAL CHAPTER — CONTACT / TRANSMISSION
export const contact = {
  chapter: "TRANSMISSION",
  eyebrow: "FINAL SCENE",
  primaryCta: ["BE", "A", "PART."],
  questions: [
    "Have an idea?",
    "Building something difficult?",
    "Want to experiment?"
  ],
  buttonLabel: "GET IN TOUCH →",
  email: "sagniksengupta24@gmail.com",
  links: [
    { label: "Email", href: "mailto:sagniksengupta24@gmail.com" },
    { label: "GitHub", href: "https://github.com/sagniksengupta24" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sagnik-sengupta-3286681b6/" },
    { label: "Instagram", href: "https://www.instagram.com/sagnik.24" }
  ]
};

// 9. CINEMATIC SCENE DATA (9 SCENES MAPPED TO TIMELINE)
export type CinematicScene = {
  id: string;
  index: string;
  chapter: string;
  label: string;
  start: number;
  end: number;
  contentId?: string;
  transition?: {
    type: "mask" | "scale" | "slide" | "morph" | "depth" | "fade";
    intensity?: number;
  };
};

export const scenes: CinematicScene[] = [
  {
    id: "hero",
    index: "01",
    chapter: "CH. 01",
    label: "Prologue",
    start: 0.00,
    end: 0.14,
    contentId: "hero",
    transition: { type: "mask", intensity: 1.0 }
  },
  {
    id: "identity",
    index: "02",
    chapter: "CH. 02",
    label: "Identity",
    start: 0.14,
    end: 0.28,
    contentId: "identity",
    transition: { type: "morph", intensity: 1.0 }
  },
  {
    id: "work-1",
    index: "03",
    chapter: "CH. 03",
    label: "Moto-Sim DRL",
    start: 0.28,
    end: 0.38,
    contentId: "moto-sim-drl",
    transition: { type: "depth", intensity: 1.2 }
  },
  {
    id: "work-2",
    index: "04",
    chapter: "CH. 03",
    label: "Quantum Tic-Tac-Toe",
    start: 0.38,
    end: 0.48,
    contentId: "quantum-tictactoe",
    transition: { type: "scale", intensity: 1.1 }
  },
  {
    id: "work-3",
    index: "05",
    chapter: "CH. 03",
    label: "FinOps Engine",
    start: 0.48,
    end: 0.58,
    contentId: "finops-environment",
    transition: { type: "depth", intensity: 1.2 }
  },
  {
    id: "spatial-3d",
    index: "06",
    chapter: "CH. 04",
    label: "3D Realm",
    start: 0.58,
    end: 0.70,
    contentId: "spatial-3d",
    transition: { type: "depth", intensity: 1.5 }
  },
  {
    id: "experiments",
    index: "07",
    chapter: "CH. 05",
    label: "Experiments",
    start: 0.70,
    end: 0.82,
    contentId: "experiments",
    transition: { type: "slide", intensity: 0.9 }
  },
  {
    id: "about",
    index: "08",
    chapter: "CH. 06",
    label: "About & Capabilities",
    start: 0.82,
    end: 0.91,
    contentId: "about",
    transition: { type: "mask", intensity: 0.8 }
  },
  {
    id: "contact",
    index: "09",
    chapter: "FINAL",
    label: "Be A Part",
    start: 0.91,
    end: 1.00,
    contentId: "contact",
    transition: { type: "scale", intensity: 1.0 }
  }
];

// 10. GLOBAL MOTION CONFIGURATION
export const motionConfig = {
  smoothScroll: {
    enabled: true,
    lerp: 0.08,
    wheelMultiplier: 0.9
  },
  video: {
    scrubSmoothing: 0.10,
    minTimeStep: 0.015,
    maxSeekDelta: 0.4
  },
  transitions: {
    duration: 1.0,
    ease: "power3.out"
  },
  reducedMotion: {
    disableVideoScrubbing: false,
    disable3D: true,
    simplifyTransitions: true
  },
  cursor: {
    enabled: true,
    lerp: 0.16
  },
  grain: {
    enabled: true,
    opacity: 0.038
  }
};

// 11. ASSET MANIFEST
export const assets = {
  cinematicFilm: "./assets/portfolio-film.mp4",
  projects: {
    motoSim: {
      hero: "./assets/projects/moto-sim/hero.jpg",
      poster: "./assets/projects/moto-sim/poster.jpg"
    },
    quantum: {
      hero: "./assets/projects/quantum/hero.jpg",
      poster: "./assets/projects/quantum/poster.jpg"
    },
    finops: {
      hero: "./assets/projects/finops/hero.jpg",
      poster: "./assets/projects/finops/poster.jpg"
    }
  },
  experiments: {
    fluidMatter: "./assets/experiments/fluid-matter.jpg",
    lightField: "./assets/experiments/light-field.jpg"
  }
};

// 12. CONTENT HELPERS
export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id || p.slug === id);
}

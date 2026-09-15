/**
 * Signature 3D WebGL Experience — Three.js Spatial Fly-Through
 * Activated during the middle scroll zone (progress ~0.50 to ~0.68)
 * The camera travels through floating editorial panels in deep 3D perspective space.
 */

import * as THREE from 'three';
import { assets } from '../data/portfolio';

export class Scene3D {
  private canvas: HTMLCanvasElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private panels: THREE.Group[] = [];
  private particles: THREE.Points | null = null;
  private isActive: boolean = false;
  private isDisposed: boolean = false;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private targetCameraZ: number = 25;
  private currentCameraZ: number = 25;
  private animationFrameId: number | null = null;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x060607, 0.035);

    this.camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 25);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.setupLighting();
    this.buildSpatialPanels();
    this.buildParticleField();
    this.bindEvents();
  }

  private setupLighting(): void {
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    dirLight.position.set(5, 10, 15);
    this.scene.add(dirLight);

    const rimLight = new THREE.PointLight(0x8ba4ff, 3.5, 50);
    rimLight.position.set(-10, -5, 0);
    this.scene.add(rimLight);
  }

  private buildSpatialPanels(): void {
    const textureLoader = new THREE.TextureLoader();
    // Milestone 2 Fix: Panels flank the corridor sides (X: ±6) and are staged along the flight path
    // so the central viewport (where "TRANSVERSE DIMENSION" and its copy live) remains 100% clear.
    const panelConfigs = [
      {
        src: assets.projects.motoSim.hero,
        pos: new THREE.Vector3(-7.2, -1.5, 8),
        rot: new THREE.Vector3(0, 0.24, -0.03),
        scale: [4.8, 3.0]
      },
      {
        src: assets.projects.quantum.hero,
        pos: new THREE.Vector3(7.5, 1.2, 0),
        rot: new THREE.Vector3(-0.04, -0.24, 0.03),
        scale: [4.8, 3.0]
      },
      {
        src: assets.projects.finops.hero,
        pos: new THREE.Vector3(-9.5, 0.8, -12),
        rot: new THREE.Vector3(0.06, 0.22, -0.02),
        scale: [5.0, 3.1]
      },
      {
        src: assets.experiments.fluidMatter,
        pos: new THREE.Vector3(11.5, -1.2, -22),
        rot: new THREE.Vector3(-0.08, -0.2, 0.04),
        scale: [4.6, 2.8]
      },
      {
        src: assets.experiments.lightField,
        pos: new THREE.Vector3(-14.0, -0.5, -34),
        rot: new THREE.Vector3(0, 0.18, 0),
        scale: [5.8, 3.6]
      }
    ];

    panelConfigs.forEach((config) => {
      const group = new THREE.Group();
      const geom = new THREE.PlaneGeometry(config.scale[0], config.scale[1]);

      textureLoader.load(config.src, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        const mat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.25,
          metalness: 0.1,
          side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geom, mat);
        group.add(mesh);

        // Architectural thin neon wireframe border
        const edges = new THREE.EdgesGeometry(geom);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.35
        });
        const wireframe = new THREE.LineSegments(edges, lineMat);
        group.add(wireframe);
      });

      group.position.copy(config.pos);
      group.rotation.set(config.rot.x, config.rot.y, config.rot.z);
      this.panels.push(group);
      this.scene.add(group);
    });
  }

  private buildParticleField(): void {
    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 60;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xe0ded8,
      size: 0.08,
      transparent: true,
      opacity: 0.65
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private bindEvents(): void {
    window.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
      if (this.isDisposed) return;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  public updateTimeline(progress: number): void {
    // 3D Spatial Zone is active around progress 0.58 to 0.70 (Chapter 04)
    const rangeStart = 0.58;
    const rangeEnd = 0.70;

    if (progress >= rangeStart && progress <= rangeEnd) {
      if (!this.isActive) {
        this.isActive = true;
        this.canvas.classList.add('active');
        this.startLoop();
      }

      // Map progress smoothly through camera travel path: Z = 24 down to -18
      const localNorm = (progress - rangeStart) / (rangeEnd - rangeStart);
      this.targetCameraZ = 24 - localNorm * 42;

      // Slight camera rotation / pitch based on movement
      this.camera.rotation.z = Math.sin(localNorm * Math.PI) * 0.04;
      this.camera.rotation.y = (this.mouseX * 0.08) + Math.sin(localNorm * Math.PI) * -0.05;
      this.camera.rotation.x = -this.mouseY * 0.06;
    } else {
      if (this.isActive) {
        this.isActive = false;
        this.canvas.classList.remove('active');
        this.stopLoop();
      }
    }
  }

  private startLoop(): void {
    if (this.animationFrameId) return;

    const render = () => {
      if (!this.isActive || this.isDisposed) return;

      // Smooth camera Z interpolation
      this.currentCameraZ += (this.targetCameraZ - this.currentCameraZ) * 0.12;
      this.camera.position.z = this.currentCameraZ;
      this.camera.position.x += ((this.mouseX * 1.5) - this.camera.position.x) * 0.08;
      this.camera.position.y += ((-this.mouseY * 1.2) - this.camera.position.y) * 0.08;

      // Subtle float animation on panels
      const time = performance.now() * 0.001;
      this.panels.forEach((panel, i) => {
        panel.position.y += Math.sin(time + i * 1.2) * 0.002;
      });

      this.renderer.render(this.scene, this.camera);
      this.animationFrameId = requestAnimationFrame(render);
    };

    this.animationFrameId = requestAnimationFrame(render);
  }

  private stopLoop(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public destroy(): void {
    this.isDisposed = true;
    this.stopLoop();
    this.renderer.dispose();
    this.scene.clear();
  }
}

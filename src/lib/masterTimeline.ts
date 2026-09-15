/**
 * Master Timeline Orchestrator
 * Maps scroll progress [0, 1] to a single deterministic timeline.
 * Synchronizes:
 * - Video currentTime scrubbing
 * - Scene visibility & masked typography reveals
 * - Project transition choreography ("A becomes B": clip-path, scale, crop, travel)
 * - 3D spatial camera fly-through
 * - Chapter indicator & progress track
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VideoScrubber } from './videoScrubber';
import { Scene3D } from './scene3d';
import { scenes } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export interface MasterTimelineOptions {
  stageElement: HTMLElement;
  videoScrubber: VideoScrubber;
  scene3d: Scene3D;
  onSceneChange?: (sceneId: string, sceneIndex: number, totalScenes: number) => void;
}

export class MasterTimeline {
  private stage: HTMLElement;
  private videoScrubber: VideoScrubber;
  private scene3d: Scene3D;
  private onSceneChangeCallback?: (sceneId: string, sceneIndex: number, totalScenes: number) => void;
  private scrollTriggerInstance: ScrollTrigger | null = null;
  private trackFillEl: HTMLElement | null = null;
  private sceneNumEl: HTMLElement | null = null;
  private currentActiveSceneId: string = '';

  constructor(options: MasterTimelineOptions) {
    this.stage = options.stageElement;
    this.videoScrubber = options.videoScrubber;
    this.scene3d = options.scene3d;
    this.onSceneChangeCallback = options.onSceneChange;

    this.trackFillEl = document.getElementById('trackFill');
    this.sceneNumEl = document.getElementById('sceneNum');

    this.initTimeline();
  }

  private initTimeline(): void {
    const sceneElements = Array.from(document.querySelectorAll<HTMLElement>('.scene'));

    this.scrollTriggerInstance = ScrollTrigger.create({
      trigger: this.stage,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.15,
      onUpdate: (self) => {
        const progress = self.progress;

        // 1. Scrub video deterministically
        this.videoScrubber.setProgress(progress);

        // 2. Update 3D spatial scene camera and state
        this.scene3d.updateTimeline(progress);

        // 3. Update scene progress bar
        if (this.trackFillEl) {
          this.trackFillEl.style.height = `${(progress * 100).toFixed(1)}%`;
        }

        // 4. Determine and update active scene
        let activeSceneIndex = 0;
        scenes.forEach((s, idx) => {
          if (progress >= s.start && progress <= s.end) {
            activeSceneIndex = idx;
          }
        });

        const activeScene = scenes[activeSceneIndex];
        if (activeScene && activeScene.id !== this.currentActiveSceneId) {
          this.currentActiveSceneId = activeScene.id;
          
          if (this.sceneNumEl) {
            this.sceneNumEl.textContent = `${activeScene.chapter} // ${activeScene.index}`;
          }

          sceneElements.forEach((el) => {
            const elId = el.getAttribute('data-scene-id');
            const isActive = elId === activeScene.id;
            el.classList.toggle('active', isActive);
          });

          this.onSceneChangeCallback?.(activeScene.id, activeSceneIndex, scenes.length);
        }

        // 5. Kinetic project transition choreography ("A becomes B") — Milestone 2 Clean Clearing
        const card1 = document.querySelector<HTMLElement>('#projectVisualMotoSim');
        const card2 = document.querySelector<HTMLElement>('#projectVisualQuantum');
        const card3 = document.querySelector<HTMLElement>('#projectVisualFinops');

        // Project 01: Moto-Sim DRL (0.28 to 0.38)
        if (card1) {
          if (progress >= 0.28 && progress <= 0.38) {
            const normP1 = (progress - 0.28) / (0.38 - 0.28);
            const scale = 1 + normP1 * 0.15;
            const translateY = -normP1 * 35;
            const cropX = normP1 * 6;
            const op = normP1 > 0.85 ? Math.max(0, 1 - (normP1 - 0.85) / 0.15) : 1;
            card1.style.opacity = `${op}`;
            card1.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
            card1.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
            card1.style.clipPath = `inset(0% ${cropX}% 0% ${cropX}% round 2px)`;
          } else {
            card1.style.opacity = '0';
            card1.style.pointerEvents = 'none';
            card1.style.transform = 'translate3d(0, 0, 0) scale(1)';
            card1.style.clipPath = 'none';
          }
        }

        // Project 02: Quantum Tic-Tac-Toe (0.38 to 0.48)
        if (card2) {
          if (progress >= 0.38 && progress <= 0.48) {
            const normP2 = (progress - 0.38) / (0.48 - 0.38);
            let scale: number;
            let translateY: number;
            let cropX: number;

            if (normP2 < 0.5) {
              const entryNorm = normP2 / 0.5;
              scale = 1.18 - entryNorm * 0.18;
              translateY = 35 - entryNorm * 35;
              cropX = (1 - entryNorm) * 8;
            } else {
              const exitNorm = (normP2 - 0.5) / 0.5;
              scale = 1.0 + exitNorm * 0.15;
              translateY = -exitNorm * 35;
              cropX = exitNorm * 6;
            }

            const op = normP2 > 0.88 ? Math.max(0, 1 - (normP2 - 0.88) / 0.12) : 1;
            card2.style.opacity = `${op}`;
            card2.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
            card2.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
            card2.style.clipPath = `inset(0% ${cropX}% 0% ${cropX}% round 2px)`;
          } else {
            card2.style.opacity = '0';
            card2.style.pointerEvents = 'none';
            card2.style.transform = 'translate3d(0, 0, 0) scale(1)';
            card2.style.clipPath = 'none';
          }
        }

        // Project 03: FinOps Engine (0.48 to 0.58)
        if (card3) {
          if (progress >= 0.48 && progress <= 0.58) {
            const normP3 = (progress - 0.48) / (0.58 - 0.48);
            let scale: number;
            let translateY: number;

            if (normP3 < 0.5) {
              const entryNorm = normP3 / 0.5;
              scale = 1.18 - entryNorm * 0.18;
              translateY = 35 - entryNorm * 35;
            } else {
              const exitNorm = (normP3 - 0.5) / 0.5;
              scale = 1.0 + exitNorm * 0.18;
              translateY = -exitNorm * 40;
            }

            // Milestone 2 Fix: FinOps card fully fades out before 0.58 so NO card lingers into Chapter 04
            const op = normP3 > 0.80 ? Math.max(0, 1 - (normP3 - 0.80) / 0.20) : 1;
            card3.style.opacity = `${op}`;
            card3.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
            card3.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
          } else {
            card3.style.opacity = '0';
            card3.style.pointerEvents = 'none';
            card3.style.transform = 'translate3d(0, 0, 0) scale(1)';
          }
        }
      }
    });
  }

  public destroy(): void {
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
    }
  }
}

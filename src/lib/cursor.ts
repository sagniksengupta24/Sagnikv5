/**
 * Minimalist Desktop Cursor
 * Subtle micro-interaction cursor, active exclusively on pointer: fine devices.
 */

import { motionConfig } from '../data/portfolio';

export class MinimalCursor {
  private cursorEl: HTMLElement | null = null;
  private mouseX: number = window.innerWidth / 2;
  private mouseY: number = window.innerHeight / 2;
  private currentX: number = window.innerWidth / 2;
  private currentY: number = window.innerHeight / 2;
  private isHoverProject: boolean = false;
  private isHoverLink: boolean = false;
  private rafId: number | null = null;

  constructor() {
    // Only initialize on desktop / fine pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    this.cursorEl = document.getElementById('customCursor');
    if (!this.cursorEl) return;

    this.bindEvents();
    this.startLoop();
  }

  private bindEvents(): void {
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const projectCard = target.closest('.project-visual-card, [data-project-open]');
      const link = target.closest('a, button, .nav-btn, .experiment-card, .capability-item');

      if (projectCard) {
        this.isHoverProject = true;
        this.isHoverLink = false;
        if (this.cursorEl) {
          this.cursorEl.classList.add('hover-project');
          this.cursorEl.classList.remove('hover-link');
          this.cursorEl.textContent = 'VIEW';
        }
      } else if (link) {
        this.isHoverLink = true;
        this.isHoverProject = false;
        if (this.cursorEl) {
          this.cursorEl.classList.add('hover-link');
          this.cursorEl.classList.remove('hover-project');
          this.cursorEl.textContent = '';
        }
      } else {
        if (this.isHoverProject || this.isHoverLink) {
          this.isHoverProject = false;
          this.isHoverLink = false;
          if (this.cursorEl) {
            this.cursorEl.classList.remove('hover-project', 'hover-link');
            this.cursorEl.textContent = '';
          }
        }
      }
    });
  }

  private startLoop(): void {
    const loop = () => {
      if (this.cursorEl) {
        const lerpFactor = motionConfig.cursor.lerp;
        this.currentX += (this.mouseX - this.currentX) * lerpFactor;
        this.currentY += (this.mouseY - this.currentY) * lerpFactor;

        this.cursorEl.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0) translate(-50%, -50%)`;
      }
      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  public destroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

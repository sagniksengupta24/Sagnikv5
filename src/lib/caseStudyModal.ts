/**
 * Case Study Drawer & Modal Controller
 * Built on HTML5 native <dialog> with @starting-style and discrete transition-behavior.
 * Adheres to WAI-ARIA modal dialog accessibility patterns.
 * Showcases all 6 pillars including architectural system diagrams and request flows.
 */

import { Project, getProjectById } from '../data/portfolio';

export class CaseStudyModal {
  private dialog: HTMLDialogElement | null = null;
  private container: HTMLElement | null = null;
  private eventsBound: boolean = false;

  constructor() {
    this.ensureElements();
    this.bindEvents();
  }

  private ensureElements(): boolean {
    if (!this.dialog) {
      this.dialog = document.getElementById('caseStudyModal') as HTMLDialogElement | null;
    }
    if (!this.container && this.dialog) {
      this.container = this.dialog.querySelector('.modal-inner') as HTMLElement | null;
    }
    return !!(this.dialog && this.container);
  }

  private bindEvents(): void {
    if (!this.dialog || this.eventsBound) return;
    this.eventsBound = true;

    // Event delegation for close buttons & backdrop click
    this.dialog.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target === this.dialog || target.closest('.modal-close-btn, .modal-dismiss-bottom')) {
        this.close();
      }
    });

    // Close on Escape key
    this.dialog.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  public open(projectId: string): void {
    if (!this.ensureElements()) return;
    this.bindEvents();

    const project = getProjectById(projectId);
    if (!project || !this.dialog || !this.container) return;

    this.renderContent(project);
    this.dialog.showModal();
    document.body.style.overflow = 'hidden';
    
    const closeBtn = this.container.querySelector<HTMLButtonElement>('.modal-close-btn');
    closeBtn?.focus();
  }

  public close(): void {
    if (this.dialog && this.dialog.open) {
      this.dialog.close();
    }
    document.body.style.overflow = '';
  }

  private renderContent(project: Project): void {
    if (!this.container) return;
    const heroImage = project.media.hero;
    const { idea, process, architecture, experience, technology, result } = project.caseStudy;

    this.container.innerHTML = `
      <button class="modal-close-btn" aria-label="Close Case Study">Close ✕</button>
      
      <div class="eyebrow">${project.chapter} — CASE STUDY / ${project.year}</div>
      <h2 class="project-title" style="font-size: clamp(2.5rem, 6vw, 5.5rem); margin-bottom: 1.5rem;">${project.title}</h2>
      
      <div class="project-meta-row" style="margin-bottom: 2rem;">
        ${project.category.map(c => `<span>${c}</span>`).join('')}
      </div>

      <p class="body-editorial" style="max-width: 68ch; font-size: clamp(1rem, 1.25vw, 1.35rem); line-height: 1.65;">
        ${project.description}
      </p>

      <img class="case-study-hero-img" src="${heroImage}" alt="${project.title} Showcase" loading="lazy" />

      <div class="case-study-pillars">
        <!-- 01 THE IDEA -->
        <div class="pillar-item">
          <div class="eyebrow">01 — The Idea</div>
          <h3>Concept & Problem Formulation</h3>
          <p>${idea}</p>
        </div>

        <!-- 02 PROCESS -->
        <div class="pillar-item">
          <div class="eyebrow">02 — Process</div>
          <h3>Methodology & Algorithmic Strategy</h3>
          <p>${process}</p>
        </div>

        <!-- 03 ARCHITECTURE (FULL-WIDTH TECHNICAL SYSTEM SHOWCASE) -->
        <div class="pillar-item pillar-architecture-block">
          <div class="eyebrow">03 — Architecture & System Topography</div>
          <h3>System Architecture & Data Flow</h3>
          <p style="margin-bottom: 1.75rem; font-size: 0.92rem; color: var(--color-fg-subtle);">${architecture.overview}</p>
          
          <div class="architecture-flow-grid">
            ${architecture.flow.map((node, i) => `
              <div class="arch-node-card">
                <div class="arch-node-step">0${i + 1} / ${node.step}</div>
                <div class="arch-node-desc">${node.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 04 EXPERIENCE -->
        <div class="pillar-item">
          <div class="eyebrow">04 — Experience</div>
          <h3>Interaction & Visual Feedback</h3>
          <p>${experience}</p>
        </div>

        <!-- 05 TECHNOLOGY -->
        <div class="pillar-item">
          <div class="eyebrow">05 — Technology</div>
          <h3>Engineering Stack & Tools</h3>
          <p>${technology}</p>
        </div>

        <!-- 06 RESULT -->
        <div class="pillar-item">
          <div class="eyebrow">06 — Result</div>
          <h3>Convergence & Benchmark Impact</h3>
          <p>${result}</p>
        </div>
      </div>

      <div style="margin-top: 4.5rem; padding-top: 2.5rem; border-top: 1px solid var(--color-line); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <span class="sub-editorial">Roles: ${project.role.join(', ')}</span>
          <span class="sub-editorial" style="font-size: 0.75rem; color: var(--color-muted);">Technologies: ${project.technologies.join(' • ')}</span>
        </div>
        <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
          <a class="project-cta-btn" href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">View Source Code on GitHub ↗</a>
          <button class="project-cta-btn modal-dismiss-bottom" style="cursor: pointer; background: transparent; border-color: var(--color-line);">Back to timeline ↑</button>
        </div>
      </div>
    `;
  }
}

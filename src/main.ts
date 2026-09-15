/**
 * Application Bootstrap & Main Entry Point
 * 
 * Orchestrates:
 * - Lenis Smooth Scroll
 * - VideoScrubber (RAF lerp timeline scrubbing)
 * - Three.js Scene3D (Signature 3D Spatial Realm)
 * - MasterTimeline (Synchronized multi-scene choreography)
 * - CaseStudyModal (Accessible 6-pillar native <dialog>)
 * - MinimalCursor & Microinteractions
 */

import './styles/main.css';
import {
  site,
  hero,
  identity,
  projects,
  experiments,
  capabilities,
  about,
  contact,
  scenes
} from './data/portfolio';
import { initSmoothScroll, scrollToSection } from './lib/lenis';
import { VideoScrubber } from './lib/videoScrubber';
import { Scene3D } from './lib/scene3d';
import { MasterTimeline } from './lib/masterTimeline';
import { CaseStudyModal } from './lib/caseStudyModal';
import { MinimalCursor } from './lib/cursor';
import { setupInteractiveCapabilities } from './lib/interactivePlayground';

function bootstrap(): void {
  try {
    // 1. Initialize DOM Elements from Data Layer
    renderDynamicContent();
  } catch (err) {
    console.error('Failed to render dynamic content:', err);
  }

  // 2. Initialize UI Controllers
  let caseStudyModal: CaseStudyModal | null = null;
  try {
    caseStudyModal = new CaseStudyModal();
    new MinimalCursor();
  } catch (err) {
    console.error('Failed to initialize UI controllers:', err);
  }

  // 3. Initialize Video Scrubber Layer
  let videoScrubber: VideoScrubber | null = null;
  try {
    const videoEl = document.getElementById('film') as HTMLVideoElement;
    videoScrubber = new VideoScrubber({
      videoElement: videoEl,
      onReady: () => {
        dismissPreloader();
      }
    });
  } catch (err) {
    console.error('Failed to initialize video scrubber:', err);
  }

  // 4. Initialize Signature 3D WebGL Layer
  let scene3d: Scene3D | null = null;
  try {
    const canvas3d = document.getElementById('canvas-3d') as HTMLCanvasElement;
    scene3d = new Scene3D(canvas3d);
  } catch (err) {
    console.error('Failed to initialize 3D scene:', err);
  }

  // 5. Initialize Smooth Scrolling
  try {
    initSmoothScroll();
  } catch (err) {
    console.error('Failed to initialize smooth scroll:', err);
  }

  // 6. Initialize Master Timeline
  if (videoScrubber && scene3d) {
    try {
      const stageEl = document.getElementById('scrollStage') as HTMLElement;
      new MasterTimeline({
        stageElement: stageEl,
        videoScrubber,
        scene3d
      });
    } catch (err) {
      console.error('Failed to initialize master timeline:', err);
    }
  }

  // 7. Interactive Micro-Interactions & Navigation
  try {
    setupNavigation();
    setupInteractiveCapabilities();
    if (caseStudyModal) {
      setupProjectCaseStudyTriggers(caseStudyModal);
    }
  } catch (err) {
    console.error('Failed to setup interactions:', err);
  }

  // Fallback preloader dismissal
  setTimeout(() => {
    dismissPreloader();
  }, 1200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

function renderDynamicContent(): void {
  // Brand Header
  const brandEl = document.getElementById('brandTitle');
  if (brandEl) brandEl.textContent = site.name;

  // Chapter 01: Hero Scene
  const heroEyebrow = document.getElementById('heroEyebrow');
  if (heroEyebrow) heroEyebrow.textContent = `${hero.chapter} / ${hero.eyebrow}`;

  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    heroTitle.innerHTML = `
      <span class="mask-line"><span class="mask-inner">${hero.title[0]}</span></span>
      <span class="mask-line"><span class="mask-inner indent">${hero.title[1]}</span></span>
    `;
  }

  const heroSub = document.getElementById('heroSub');
  if (heroSub) heroSub.textContent = hero.supportingText;

  const heroPrompt = document.getElementById('heroScrollPrompt');
  if (heroPrompt) heroPrompt.textContent = hero.scrollLabel;

  // Chapter 02: Identity Scene
  const idEyebrow = document.getElementById('identityEyebrow');
  if (idEyebrow) idEyebrow.textContent = `${identity.chapter} / ${identity.eyebrow}`;

  const idTitle = document.getElementById('identityTitle');
  if (idTitle) {
    idTitle.innerHTML = `
      <span class="mask-line"><span class="mask-inner">${identity.headline[0]}</span></span>
      <span class="mask-line"><span class="mask-inner indent">${identity.headline[1]}</span></span>
      <span class="mask-line"><span class="mask-inner" style="margin-top: 0.25em;">${identity.statement[0]}</span></span>
      <span class="mask-line"><span class="mask-inner indent">${identity.statement[1]}</span></span>
      <span class="mask-line"><span class="mask-inner indent">${identity.statement[2]}</span></span>
    `;
  }

  const idSupporting = document.getElementById('identitySupporting');
  if (idSupporting) idSupporting.textContent = identity.supportingLine;

  const idDesc = document.getElementById('identityDesc');
  if (idDesc) idDesc.textContent = identity.description;

  // Chapter 03: Selected Work (Moto-Sim DRL, Quantum Tic-Tac-Toe, FinOps Engine)
  const p1 = projects[0];
  if (p1) {
    const p1Title = document.getElementById('p1Title');
    if (p1Title) p1Title.textContent = p1.title;

    const p1Meta = document.getElementById('p1Meta');
    if (p1Meta) {
      p1Meta.innerHTML = p1.category.map(c => `<span>${c}</span>`).join('') + `<span>${p1.year}</span>`;
    }

    const p1Desc = document.getElementById('p1Desc');
    if (p1Desc) p1Desc.textContent = p1.shortDescription;

    const p1Img = document.getElementById('p1Img') as HTMLImageElement;
    if (p1Img) {
      p1Img.src = p1.media.hero;
      p1Img.alt = `${p1.title} Showcase`;
    }

    const p1Github = document.getElementById('p1Github') as HTMLAnchorElement;
    if (p1Github) p1Github.href = p1.githubUrl;
  }

  const p2 = projects[1];
  if (p2) {
    const p2Title = document.getElementById('p2Title');
    if (p2Title) p2Title.textContent = p2.title;

    const p2Meta = document.getElementById('p2Meta');
    if (p2Meta) {
      p2Meta.innerHTML = p2.category.map(c => `<span>${c}</span>`).join('') + `<span>${p2.year}</span>`;
    }

    const p2Desc = document.getElementById('p2Desc');
    if (p2Desc) p2Desc.textContent = p2.shortDescription;

    const p2Img = document.getElementById('p2Img') as HTMLImageElement;
    if (p2Img) {
      p2Img.src = p2.media.hero;
      p2Img.alt = `${p2.title} Showcase`;
    }

    const p2Github = document.getElementById('p2Github') as HTMLAnchorElement;
    if (p2Github) p2Github.href = p2.githubUrl;
  }

  const p3 = projects[2];
  if (p3) {
    const p3Title = document.getElementById('p3Title');
    if (p3Title) p3Title.textContent = p3.title;

    const p3Meta = document.getElementById('p3Meta');
    if (p3Meta) {
      p3Meta.innerHTML = p3.category.map(c => `<span>${c}</span>`).join('') + `<span>${p3.year}</span>`;
    }

    const p3Desc = document.getElementById('p3Desc');
    if (p3Desc) p3Desc.textContent = p3.shortDescription;

    const p3Img = document.getElementById('p3Img') as HTMLImageElement;
    if (p3Img) {
      p3Img.src = p3.media.hero;
      p3Img.alt = `${p3.title} Showcase`;
    }

    const p3Github = document.getElementById('p3Github') as HTMLAnchorElement;
    if (p3Github) p3Github.href = p3.githubUrl;
  }

  // Chapter 05: Experiments
  const expCardsContainer = document.getElementById('experimentCardsContainer');
  if (expCardsContainer) {
    expCardsContainer.innerHTML = experiments.map(exp => `
      <a class="experiment-card" href="${exp.url}" target="_blank" rel="noopener noreferrer" data-exp-id="${exp.id}" style="text-decoration: none; color: inherit;">
        <div class="exp-thumb">
          <img src="${exp.media.thumbnail}" alt="${exp.title}" loading="lazy" />
        </div>
        <div class="exp-info">
          <h4>${exp.title} ↗</h4>
          <p>${exp.description}</p>
        </div>
      </a>
    `).join('');
  }

  // Chapter 06: Capabilities Matrix
  const capMatrix = document.getElementById('capabilitiesMatrix');
  if (capMatrix) {
    capMatrix.innerHTML = capabilities.map(cap => `
      <div class="capability-item" data-cap-id="${cap.id}">
        <div class="capability-header-row">
          <span class="capability-title">${cap.title}</span>
          <span class="index">${cap.index}</span>
        </div>
        <div class="capability-subsystems">
          ${cap.subsystems.map(s => `<span class="subsystem-tag">${s}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // Chapter 06: About
  const aboutEyebrow = document.getElementById('aboutEyebrow');
  if (aboutEyebrow) aboutEyebrow.textContent = `${about.chapter} / ${about.eyebrow}`;

  const aboutHeadline = document.getElementById('aboutHeadline');
  if (aboutHeadline) {
    aboutHeadline.innerHTML = about.headline.map(line => `
      <span class="mask-line"><span class="mask-inner">${line}</span></span>
    `).join('');
  }

  const aboutDesc = document.getElementById('aboutDesc');
  if (aboutDesc) {
    aboutDesc.innerHTML = about.paragraphs.map(p => `<p style="margin-bottom: 1.25rem; font-size: 1.05rem; line-height: 1.7; color: var(--color-fg-subtle);">${p}</p>`).join('');
  }

  // Final Transmission: Contact (BE A PART.)
  const contactHeadline = document.getElementById('contactHeadline');
  if (contactHeadline) {
    contactHeadline.innerHTML = contact.primaryCta.map((line, i) => `
      <span class="mask-line"><span class="mask-inner ${i === 1 ? 'indent' : ''}">${line}</span></span>
    `).join('');
  }

  const contactSub = document.getElementById('contactSub');
  if (contactSub) {
    contactSub.innerHTML = `
      <span style="display: block; color: var(--color-fg); margin-bottom: 0.5rem; font-family: var(--font-display);">${contact.questions[0]}</span>
      <span style="display: block; color: var(--color-fg-subtle);">${contact.questions[1]} — ${contact.questions[2]}</span>
    `;
  }

  const contactCta = document.getElementById('contactCta') as HTMLAnchorElement;
  if (contactCta) {
    contactCta.href = `mailto:${contact.email}`;
    contactCta.textContent = contact.buttonLabel;
  }

  const contactLinks = document.getElementById('contactLinks');
  if (contactLinks) {
    contactLinks.innerHTML = contact.links.map(l => `
      <a class="contact-link" href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label}</a>
    `).join('');
  }
}

function setupNavigation(): void {
  const menuBtn = document.getElementById('menuBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const navContainer = document.getElementById('menuNavLinks');

  if (navContainer) {
    navContainer.innerHTML = site.navigation.map(item => `
      <a class="menu-nav-link" href="${item.href}" data-scene-index="${item.sceneIndex}">
        ${item.label}
      </a>
    `).join('') + `
      <a class="menu-nav-link menu-nav-cta" href="#contact" data-scene-index="8" style="margin-top: 1.5rem; color: #fff; font-size: clamp(1.4rem, 2.8vw, 2.8rem);">
        ${site.ctaLabel}
      </a>
    `;
  }

  const openMenu = () => {
    menuOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    menuOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuBtn?.addEventListener('click', openMenu);
  menuCloseBtn?.addEventListener('click', closeMenu);

  document.querySelectorAll('.menu-nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
      const sceneIndexStr = (e.currentTarget as HTMLElement).getAttribute('data-scene-index');
      if (sceneIndexStr !== null) {
        const sceneIndex = parseInt(sceneIndexStr, 10);
        const targetScene = scenes[sceneIndex];
        if (targetScene) {
          const stageEl = document.getElementById('scrollStage');
          if (stageEl) {
            const maxScroll = stageEl.offsetHeight - window.innerHeight;
            const targetScroll = stageEl.offsetTop + targetScene.start * maxScroll;
            scrollToSection(targetScroll);
          }
        }
      }
    });
  });
}

function setupProjectCaseStudyTriggers(modal: CaseStudyModal): void {
  document.querySelectorAll('[data-project-open]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const projectId = (e.currentTarget as HTMLElement).getAttribute('data-project-open');
      if (projectId) {
        modal.open(projectId);
      }
    });
  });
}

function dismissPreloader(): void {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('loaded')) {
    preloader.classList.add('loaded');
  }
}

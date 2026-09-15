import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionConfig } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    lerp: motionConfig.smoothScroll.lerp,
    wheelMultiplier: motionConfig.smoothScroll.wheelMultiplier,
    smoothWheel: motionConfig.smoothScroll.enabled,
    touchMultiplier: 1.5,
    autoRaf: false // Managed manually via GSAP ticker
  });

  // Synchronize Lenis with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToSection(target: string | number, options?: { duration?: number; offset?: number }) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options);
  } else {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

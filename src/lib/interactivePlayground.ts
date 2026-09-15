/**
 * Interactive Capabilities Choreographer
 * Focuses on editorial interaction and keyboard accessibility without competing with the background film.
 */

export function setupInteractiveCapabilities(): void {
  const capabilityItems = document.querySelectorAll<HTMLElement>('.capability-item');

  capabilityItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      capabilityItems.forEach((other) => {
        if (other !== item) other.style.opacity = '0.45';
      });
    });

    item.addEventListener('mouseleave', () => {
      capabilityItems.forEach((other) => {
        other.style.opacity = '1';
      });
    });
  });
}

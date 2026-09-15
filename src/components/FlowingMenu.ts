import { gsap } from 'gsap';
import './FlowingMenu.css';

export interface FlowingMenuItem {
  link: string;
  text: string;
  image: string;
}

export interface FlowingMenuOptions {
  items: FlowingMenuItem[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

interface ItemState {
  itemEl: HTMLElement;
  marqueeEl: HTMLElement;
  marqueeInnerEl: HTMLElement;
  loopTween: gsap.core.Tween | null;
  resizeHandler: () => void;
  enterHandler: (ev: MouseEvent) => void;
  leaveHandler: (ev: MouseEvent) => void;
}

export class FlowingMenu {
  private container: HTMLElement;
  private options: Required<FlowingMenuOptions>;
  private itemStates: ItemState[] = [];
  private destroyed: boolean = false;

  constructor(container: HTMLElement, options: FlowingMenuOptions) {
    this.container = container;
    this.options = {
      items: options.items || [],
      speed: options.speed ?? 15,
      textColor: options.textColor ?? '#ffffff',
      bgColor: options.bgColor ?? 'transparent',
      marqueeBgColor: options.marqueeBgColor ?? '#ffffff',
      marqueeTextColor: options.marqueeTextColor ?? '#120F17',
      borderColor: options.borderColor ?? 'rgba(255, 255, 255, 0.12)'
    };

    this.render();
  }

  private distMetric(x: number, y: number, x2: number, y2: number): number {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  }

  private findClosestEdge(mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' {
    const topEdgeDist = this.distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = this.distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  }

  private render(): void {
    this.container.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'menu-wrap';
    if (this.options.bgColor !== 'transparent') {
      wrap.style.backgroundColor = this.options.bgColor;
    }

    const nav = document.createElement('nav');
    nav.className = 'flowing-menu';
    nav.setAttribute('aria-label', 'Interactive Flowing Menu');

    this.options.items.forEach((itemData) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'menu__item';
      itemEl.style.borderColor = this.options.borderColor;

      const linkEl = document.createElement('a');
      linkEl.className = 'menu__item-link';
      linkEl.href = itemData.link;
      linkEl.target = '_blank';
      linkEl.rel = 'noopener noreferrer';
      linkEl.style.color = this.options.textColor;
      linkEl.textContent = itemData.text;

      const marqueeEl = document.createElement('div');
      marqueeEl.className = 'marquee';
      marqueeEl.style.backgroundColor = this.options.marqueeBgColor;

      const innerWrap = document.createElement('div');
      innerWrap.className = 'marquee__inner-wrap';

      const marqueeInner = document.createElement('div');
      marqueeInner.className = 'marquee__inner';
      marqueeInner.setAttribute('aria-hidden', 'true');

      // Default 4 parts initially
      const initialParts = 4;
      for (let i = 0; i < initialParts; i++) {
        const part = this.createMarqueePart(itemData.text, itemData.image);
        marqueeInner.appendChild(part);
      }

      innerWrap.appendChild(marqueeInner);
      marqueeEl.appendChild(innerWrap);
      itemEl.appendChild(linkEl);
      itemEl.appendChild(marqueeEl);
      nav.appendChild(itemEl);

      // Bind directional interactions & infinite marquee loop
      const state = this.bindItem(itemEl, linkEl, marqueeEl, marqueeInner, itemData);
      this.itemStates.push(state);
    });

    wrap.appendChild(nav);
    this.container.appendChild(wrap);

    // Initial setup after rendering in DOM
    requestAnimationFrame(() => {
      this.itemStates.forEach(state => state.resizeHandler());
    });
  }

  private createMarqueePart(text: string, image: string): HTMLElement {
    const part = document.createElement('div');
    part.className = 'marquee__part';
    part.style.color = this.options.marqueeTextColor;

    const span = document.createElement('span');
    span.textContent = text;

    const img = document.createElement('div');
    img.className = 'marquee__img';
    img.style.backgroundImage = `url(${image})`;

    part.appendChild(span);
    part.appendChild(img);
    return part;
  }

  private bindItem(
    itemEl: HTMLElement,
    linkEl: HTMLElement,
    marqueeEl: HTMLElement,
    marqueeInner: HTMLElement,
    itemData: FlowingMenuItem
  ): ItemState {
    const animationDefaults = { duration: 0.6, ease: 'expo' };
    let loopTween: gsap.core.Tween | null = null;

    const calculateAndAnimateLoop = () => {
      if (this.destroyed) return;
      const firstPart = marqueeInner.querySelector<HTMLElement>('.marquee__part');
      if (!firstPart) return;

      const contentWidth = firstPart.offsetWidth;
      const viewportWidth = window.innerWidth;

      if (contentWidth > 0) {
        const needed = Math.ceil(viewportWidth / contentWidth) + 2;
        const targetReps = Math.max(4, needed);
        const currentReps = marqueeInner.children.length;

        if (targetReps > currentReps) {
          for (let i = currentReps; i < targetReps; i++) {
            marqueeInner.appendChild(this.createMarqueePart(itemData.text, itemData.image));
          }
        }

        if (loopTween) {
          loopTween.kill();
        }

        // Animate exactly one content width for seamless continuous loop
        loopTween = gsap.to(marqueeInner, {
          x: -contentWidth,
          duration: this.options.speed,
          ease: 'none',
          repeat: -1
        });
      }
    };

    const enterHandler = (ev: MouseEvent) => {
      if (this.destroyed) return;
      const rect = itemEl.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      const edge = this.findClosestEdge(x, y, rect.width, rect.height);

      gsap
        .timeline({ defaults: animationDefaults })
        .set(marqueeEl, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .set(marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
        .to([marqueeEl, marqueeInner], { y: '0%' }, 0);
    };

    const leaveHandler = (ev: MouseEvent) => {
      if (this.destroyed) return;
      const rect = itemEl.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      const edge = this.findClosestEdge(x, y, rect.width, rect.height);

      gsap
        .timeline({ defaults: animationDefaults })
        .to(marqueeEl, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .to(marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    };

    linkEl.addEventListener('mouseenter', enterHandler);
    linkEl.addEventListener('mouseleave', leaveHandler);

    window.addEventListener('resize', calculateAndAnimateLoop);

    return {
      itemEl,
      marqueeEl,
      marqueeInnerEl: marqueeInner,
      loopTween,
      resizeHandler: calculateAndAnimateLoop,
      enterHandler,
      leaveHandler
    };
  }

  public destroy(): void {
    this.destroyed = true;
    this.itemStates.forEach(({ linkEl, marqueeEl, marqueeInnerEl, loopTween, resizeHandler, enterHandler, leaveHandler }: any) => {
      if (linkEl) {
        linkEl.removeEventListener('mouseenter', enterHandler);
        linkEl.removeEventListener('mouseleave', leaveHandler);
      }
      window.removeEventListener('resize', resizeHandler);
      if (loopTween) {
        loopTween.kill();
      }
      gsap.killTweensOf([marqueeEl, marqueeInnerEl]);
    });
    this.itemStates = [];
    this.container.innerHTML = '';
  }
}

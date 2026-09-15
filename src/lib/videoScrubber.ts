/**
 * Video Scrubber Engine
 * Smoothly interpolates and scrubs video currentTime based on master scroll progress.
 * Prevents video seeking bottlenecks on Safari and mobile devices with high-frequency throttling.
 */

import { motionConfig } from '../data/portfolio';

export interface VideoScrubberOptions {
  videoElement: HTMLVideoElement;
  onReady?: (duration: number) => void;
  onUpdate?: (currentTime: number, progress: number) => void;
}

export class VideoScrubber {
  private video: HTMLVideoElement;
  private duration: number = 10;
  private targetProgress: number = 0;
  private currentProgress: number = 0;
  private currentTime: number = 0;
  private isReady: boolean = false;
  private lastSeekTime: number = 0;
  private seekThrottleMs: number = 16; // 60fps throttle window
  private rafId: number | null = null;
  private onReadyCallback?: (duration: number) => void;
  private onUpdateCallback?: (currentTime: number, progress: number) => void;

  constructor(options: VideoScrubberOptions) {
    this.video = options.videoElement;
    this.onReadyCallback = options.onReady;
    this.onUpdateCallback = options.onUpdate;

    this.initVideo();
    this.startRenderLoop();
  }

  private initVideo(): void {
    this.video.pause();
    this.video.muted = true;
    this.video.playsInline = true;

    const handleLoaded = () => {
      if (this.video.duration && !isNaN(this.video.duration)) {
        this.duration = this.video.duration;
      }
      this.isReady = true;
      this.video.currentTime = 0;
      this.onReadyCallback?.(this.duration);
    };

    if (this.video.readyState >= 1) {
      handleLoaded();
    } else {
      this.video.addEventListener('loadedmetadata', handleLoaded, { once: true });
      this.video.addEventListener('canplay', () => {
        this.isReady = true;
      }, { once: true });
    }
  }

  public setProgress(progress: number): void {
    this.targetProgress = Math.max(0, Math.min(1, progress));
  }

  private startRenderLoop(): void {
    const loop = () => {
      if (this.isReady) {
        const now = performance.now();
        const lerpFactor = motionConfig.video.scrubSmoothing;
        
        // Smooth lerp toward target
        const diff = this.targetProgress - this.currentProgress;
        
        if (Math.abs(diff) < 0.0004) {
          // Precise settle when motion stops
          this.currentProgress = this.targetProgress;
        } else {
          this.currentProgress += diff * lerpFactor;
        }

        const targetT = this.currentProgress * this.duration;
        const delta = Math.abs(this.currentTime - targetT);

        // Apply seek only when delta exceeds minimum threshold and throttle has elapsed
        if (delta > motionConfig.video.minTimeStep && (now - this.lastSeekTime > this.seekThrottleMs)) {
          this.lastSeekTime = now;
          this.currentTime = targetT;
          
          try {
            if ('fastSeek' in this.video && typeof (this.video as any).fastSeek === 'function') {
              (this.video as any).fastSeek(targetT);
            } else {
              this.video.currentTime = targetT;
            }
          } catch {
            this.video.currentTime = targetT;
          }
        }

        this.onUpdateCallback?.(this.currentTime, this.currentProgress);
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  public getDuration(): number {
    return this.duration;
  }

  public destroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

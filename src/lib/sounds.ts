'use client';

/**
 * Sound Effects Manager for Kids Stories
 *
 * Generates fun, child-friendly sounds using Web Audio API.
 * No external audio files needed - all sounds synthesized.
 */

type AudioContextType = AudioContext | null;

class SoundManager {
  private audioContext: AudioContextType = null;
  private isEnabled: boolean = true;
  private volume: number = 0.3;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.audioContext) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioContext = new AudioContextClass();
      } catch {
        return null;
      }
    }
    return this.audioContext;
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Page flip sound - paper rustling effect
   */
  playPageFlip() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // White noise burst for paper sound
    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const envelope = Math.exp(-i / (bufferSize * 0.08)) * Math.sin(i * 0.01);
      data[i] = (Math.random() * 2 - 1) * envelope;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 0.8;

    const gain = ctx.createGain();
    gain.gain.value = this.volume * 0.5;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }

  /**
   * Button hover sound - gentle pop
   */
  playHover() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(this.volume * 0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  /**
   * Button click sound - satisfying click
   */
  playClick() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(this.volume * 0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }

  /**
   * Sparkle/magic sound - twinkling effect
   */
  playSparkle() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Play multiple short high tones
    const frequencies = [1200, 1500, 1800, 2000, 2400];

    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq + Math.random() * 200;

        gain.gain.setValueAtTime(this.volume * 0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }, i * 60);
    });
  }

  /**
   * Celebration sound - happy fanfare
   */
  playCelebration() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Play a happy chord progression
    const notes = [
      { freq: 523.25, delay: 0 },      // C5
      { freq: 659.25, delay: 0 },      // E5
      { freq: 783.99, delay: 0 },      // G5
      { freq: 1046.50, delay: 150 },   // C6
      { freq: 783.99, delay: 300 },    // G5
      { freq: 1046.50, delay: 300 },   // C6
      { freq: 1318.51, delay: 450 },   // E6
    ];

    notes.forEach(({ freq, delay }) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(this.volume * 0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }, delay);
    });
  }

  /**
   * Whoosh sound - for transitions
   */
  playWhoosh() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const envelope = Math.sin(t * Math.PI) * (1 - t);
      data[i] = (Math.random() * 2 - 1) * envelope * 0.5;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(2000, ctx.currentTime + 0.15);
    filter.frequency.linearRampToValueAtTime(500, ctx.currentTime + 0.3);
    filter.Q.value = 1;

    const gain = ctx.createGain();
    gain.gain.value = this.volume * 0.4;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }

  /**
   * Pop sound - for appearing elements
   */
  playPop() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }

  /**
   * Star collect sound - magical ding
   */
  playStar() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.value = 1500;

    osc2.type = 'sine';
    osc2.frequency.value = 2000;

    gain.gain.setValueAtTime(this.volume * 0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.3);
    osc2.stop(ctx.currentTime + 0.3);
  }

  /**
   * Gentle ambient chime - background atmosphere
   */
  playAmbientChime() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const frequencies = [523.25, 659.25, 783.99]; // C, E, G
    const freq = frequencies[Math.floor(Math.random() * frequencies.length)];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(this.volume * 0.05, ctx.currentTime + 0.5);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2);
  }
}

// Singleton instance
export const soundManager = new SoundManager();

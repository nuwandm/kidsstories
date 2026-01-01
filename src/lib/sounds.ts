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
   * Page flip sound - magical whoosh with sparkle
   */
  playPageFlip() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Soft whoosh sound
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(300, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    osc1.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.25);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(800, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
    osc2.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.2);

    filter.type = 'lowpass';
    filter.frequency.value = 2000;

    gain.gain.setValueAtTime(this.volume * 0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.25);
    osc2.stop(ctx.currentTime + 0.25);

    // Add a little sparkle at the end
    setTimeout(() => {
      const sparkleOsc = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      sparkleOsc.type = 'sine';
      sparkleOsc.frequency.value = 1500 + Math.random() * 500;
      sparkleGain.gain.setValueAtTime(this.volume * 0.08, ctx.currentTime);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      sparkleOsc.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);
      sparkleOsc.start();
      sparkleOsc.stop(ctx.currentTime + 0.1);
    }, 100);
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
   * Celebration sound - reward fanfare with applause
   */
  playCelebration() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Victory fanfare notes
    const fanfare = [
      { freq: 523.25, delay: 0, duration: 0.15 },      // C5
      { freq: 523.25, delay: 150, duration: 0.15 },    // C5
      { freq: 523.25, delay: 300, duration: 0.15 },    // C5
      { freq: 523.25, delay: 450, duration: 0.4 },     // C5 (long)
      { freq: 415.30, delay: 450, duration: 0.4 },     // Ab4
      { freq: 466.16, delay: 850, duration: 0.15 },    // Bb4
      { freq: 523.25, delay: 1000, duration: 0.5 },    // C5 (final)
      { freq: 659.25, delay: 1000, duration: 0.5 },    // E5
      { freq: 783.99, delay: 1000, duration: 0.5 },    // G5
    ];

    // Play fanfare
    fanfare.forEach(({ freq, delay, duration }) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(this.volume * 0.25, ctx.currentTime);
        gain.gain.setValueAtTime(this.volume * 0.25, ctx.currentTime + duration * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      }, delay);
    });

    // Clapping sounds
    const clapTimes = [200, 400, 600, 800, 1000, 1200, 1400, 1600];
    clapTimes.forEach((delay) => {
      setTimeout(() => {
        this.playClap();
      }, delay);
    });

    // Sparkle sounds at the end
    setTimeout(() => {
      this.playSparkle();
    }, 1200);
  }

  /**
   * Single clap sound
   */
  private playClap() {
    const ctx = this.getContext();
    if (!ctx) return;

    // Clap is a short noise burst with specific frequency characteristics
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Sharp attack, quick decay
      const envelope = Math.exp(-i / (bufferSize * 0.15));
      // Add some randomness for natural clap sound
      data[i] = (Math.random() * 2 - 1) * envelope;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // Bandpass filter for clap-like frequency
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2500 + Math.random() * 500;
    filter.Q.value = 0.8;

    // Highpass to remove low rumble
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 500;

    const gain = ctx.createGain();
    gain.gain.value = this.volume * 0.4;

    source.connect(filter);
    filter.connect(highpass);
    highpass.connect(gain);
    gain.connect(ctx.destination);
    source.start();
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

  /**
   * Pet meow sound - realistic cat meow
   */
  playMeow() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Main meow sound with realistic frequency modulation
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Primary tone - the "mee" part
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(350, ctx.currentTime);
    osc1.frequency.linearRampToValueAtTime(700, ctx.currentTime + 0.15);
    osc1.frequency.linearRampToValueAtTime(850, ctx.currentTime + 0.3);
    osc1.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.5);
    osc1.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.7);
    osc1.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.85);

    // Harmonic for richness - the "ow" resonance
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(700, ctx.currentTime);
    osc2.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.15);
    osc2.frequency.linearRampToValueAtTime(1700, ctx.currentTime + 0.3);
    osc2.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.5);
    osc2.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.7);
    osc2.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.85);

    // Formant filter for cat-like quality
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.3);
    filter.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.6);
    filter.Q.value = 5;

    // Volume envelope - realistic meow shape
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.35, ctx.currentTime + 0.08);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.4, ctx.currentTime + 0.25);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, ctx.currentTime + 0.5);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.15, ctx.currentTime + 0.7);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

    // Add slight vibrato for realism
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.value = 6;
    vibratoGain.gain.value = 15;
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc1.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    vibrato.start();
    osc1.start();
    osc2.start();
    vibrato.stop(ctx.currentTime + 0.9);
    osc1.stop(ctx.currentTime + 0.9);
    osc2.stop(ctx.currentTime + 0.9);
  }

  /**
   * Pet bark sound - realistic dog bark
   */
  playBark() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Create two barks with slight delay
    const createBark = (startTime: number) => {
      // Noise component for the harsh bark attack
      const bufferSize = ctx.sampleRate * 0.08;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      // Main bark tone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();

      // Low growly component
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(180, startTime);
      osc1.frequency.exponentialRampToValueAtTime(120, startTime + 0.15);

      // Higher bark component
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(350, startTime);
      osc2.frequency.exponentialRampToValueAtTime(250, startTime + 0.1);
      osc2.frequency.exponentialRampToValueAtTime(200, startTime + 0.15);

      // Filter for bark character
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, startTime);
      filter.frequency.exponentialRampToValueAtTime(800, startTime + 0.15);
      filter.Q.value = 2;

      // Noise filter
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1500;
      noiseFilter.Q.value = 1;

      // Gain envelopes
      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0, startTime);
      oscGain.gain.linearRampToValueAtTime(this.volume * 0.4, startTime + 0.02);
      oscGain.gain.linearRampToValueAtTime(this.volume * 0.35, startTime + 0.06);
      oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(this.volume * 0.25, startTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

      // Connect oscillators
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(ctx.destination);

      // Connect noise
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc1.start(startTime);
      osc2.start(startTime);
      noiseSource.start(startTime);
      osc1.stop(startTime + 0.2);
      osc2.stop(startTime + 0.2);
    };

    // Two quick barks
    createBark(ctx.currentTime);
    createBark(ctx.currentTime + 0.25);
  }

  /**
   * Pet bubble sound - fish bubble
   */
  playBubble() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Multiple bubbles
    [0, 0.1, 0.15].forEach((delay, i) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        const baseFreq = 600 + i * 200;
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(this.volume * 0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }, delay * 1000);
    });
  }

  /**
   * Pet happy sound - when pet is clicked
   */
  playPetHappy() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Happy ascending notes
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(this.volume * 0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }, i * 80);
    });
  }
}

// Singleton instance
export const soundManager = new SoundManager();

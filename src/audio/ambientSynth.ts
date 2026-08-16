class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  constructor() {
    // Check localStorage preference
    const saved = localStorage.getItem('intellect_audio_enabled');
    this.isMuted = saved !== 'true';
  }

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      console.warn('Web Audio API not supported on this device');
    }
  }

  public toggleAudio(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    localStorage.setItem('intellect_audio_enabled', (!this.isMuted).toString());

    if (!this.isMuted) {
      this.startAmbientDrone();
      this.playHarmonicChime(440, 'sine', 0.15);
    } else {
      this.stopAmbientDrone();
    }

    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private startAmbientDrone() {
    if (!this.ctx || this.isMuted) return;

    try {
      this.stopAmbientDrone();

      const now = this.ctx.currentTime;

      // Filter for warm, deep cosmic atmosphere
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(180, now);
      this.filterNode.Q.setValueAtTime(3.5, now);

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.06, now + 3);

      // Deep root 55Hz (A1) and harmonic 82.4Hz (E2)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(55, now);

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(82.4, now);

      // Connect graph
      this.droneOsc1.connect(this.filterNode);
      this.droneOsc2.connect(this.filterNode);
      this.filterNode.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc1.start(now);
      this.droneOsc2.start(now);
    } catch (e) {
      console.warn('Drone start failed', e);
    }
  }

  private stopAmbientDrone() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (this.droneGain) {
      try {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        setTimeout(() => {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.droneOsc1 = null;
          this.droneOsc2 = null;
        }, 850);
      } catch {
        // ignore
      }
    }
  }

  public playHarmonicChime(freq: number = 528, type: OscillatorType = 'sine', volume: number = 0.08) {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.5, now);
      filter.Q.setValueAtTime(2, now);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      // subtle upward frequency glissando for ethereal shimmer
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + 0.5);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.25);
    } catch {
      // ignore
    }
  }

  public playNodeHoverSound(index: number) {
    if (this.isMuted) return;
    // Pentatonic frequency array for nodes
    const scale = [440, 493.88, 554.37, 659.25, 739.99, 880, 987.77, 1108.73];
    const freq = scale[index % scale.length];
    this.playHarmonicChime(freq, 'sine', 0.05);
  }

  public playWarpTransition() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.9);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.0);
    } catch {
      // ignore
    }
  }
}

export const ambientAudio = new AmbientAudioEngine();

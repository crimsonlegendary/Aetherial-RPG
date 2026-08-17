import { BIOME_MUSIC, BOSS_MUSIC, AmbientSoundscape } from './audio.js';

class AudioManager {
  constructor() {
    this.ctx = null;
    this.ambientEngine = null;

    // Master volume controls (0.0 to 1.0)
    this.volumes = {
      master: 1.0,
      sfx: 0.8,
      bgm: 0.6,
      ambient: 0.4
    };

    this.currentBgmKey = null;
    this.currentAudio = null;
  }

  /**
   * Initializes the AudioContext and Ambient engine on first user interaction
   */
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.ambientEngine = new AmbientSoundscape(this.ctx);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // ==========================================
  // 1. BIOME & BOSS TRACK SWITCHER
  // ==========================================

  /**
   * Plays a track from BIOME_MUSIC or BOSS_MUSIC with crossfading and ambient sound sync
   * @param {string} trackKey - Key matching BIOME_MUSIC or BOSS_MUSIC (e.g., 'forest', 'volcano', 'final_boss')
   * @param {number} fadeDuration - Crossfade speed in ms
   */
  playBGM(trackKey, fadeDuration = 1200) {
    if (this.currentBgmKey === trackKey) return;
    this.init();

    // Resolve track configuration from audio.js
    const trackData = BIOME_MUSIC[trackKey] || BOSS_MUSIC[trackKey];
    if (!trackData) {
      console.warn(`[AudioManager] Track key "${trackKey}" not found in audio.js`);
      return;
    }

    const src = typeof trackData === 'string' ? trackData : trackData.src;
    const targetVolume = this.volumes.bgm * this.volumes.master;

    // Handle Ambient Soundscape transitions
    if (trackData.ambientType) {
      this.ambientEngine.startAmbient(trackData.ambientType);
    } else {
      this.ambientEngine.stopAmbient();
    }

    // Crossfade Logic
    const newAudio = new Audio(src);
    newAudio.loop = true;
    newAudio.volume = 0;

    const oldAudio = this.currentAudio;
    this.currentAudio = newAudio;
    this.currentBgmKey = trackKey;

    newAudio.play().then(() => {
      const interval = 40;
      const steps = fadeDuration / interval;
      const stepVol = targetVolume / steps;
      let stepCount = 0;

      const fadeInterval = setInterval(() => {
        stepCount++;

        if (newAudio.volume + stepVol <= targetVolume) {
          newAudio.volume = Math.min(targetVolume, newAudio.volume + stepVol);
        }

        if (oldAudio) {
          oldAudio.volume = Math.max(0, oldAudio.volume - stepVol);
        }

        if (stepCount >= steps) {
          clearInterval(fadeInterval);
          if (oldAudio) {
            oldAudio.pause();
            oldAudio.src = "";
          }
        }
      }, interval);
    }).catch(err => {
      console.warn("[AudioManager] Autoplay blocked until user interaction:", err);
    });
  }

  /**
   * Stop BGM and ambient soundscapes completely
   */
  stopAll() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = "";
      this.currentAudio = null;
      this.currentBgmKey = null;
    }
    if (this.ambientEngine) {
      this.ambientEngine.stopAmbient();
    }
  }

  // ==========================================
  // 2. SYNTHESIZED SFX HANDLERS
  // ==========================================

  playSlash() {
    this.init();
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.12);

    const gain = this.ctx.createGain();
    const vol = this.volumes.sfx * this.volumes.master;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  playLevelUp() {
    this.init();
    const now = this.ctx.currentTime;
    const vol = this.volumes.sfx * this.volumes.master;
    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + i * 0.08;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(vol * 0.8, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.35);
    });
  }

  playBuild() {
    this.init();
    const now = this.ctx.currentTime;
    const vol = this.volumes.sfx * this.volumes.master;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.08);

    gain.gain.setValueAtTime(vol * 0.9, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }
}

export const audioManager = new AudioManager();

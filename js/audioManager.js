// ==========================================
// AUDIO MANAGER WITH SYNTHESIZED SFX & BGM TRACKS
// ==========================================

class AudioManager {
  constructor() {
    this.ctx = null; // Lazy-initialized Web Audio Context (bypasses browser autoplay limits)
    
    // Volume Settings (0.0 to 1.0)
    this.volumes = {
      master: 1.0,
      sfx: 0.8,
      bgm: 0.6
    };

    // BGM State
    this.currentBgmKey = null;
    this.currentAudio = null;
    this.isFading = false;

    // Biome & Boss Music Registry (Replace URLs with your actual music asset paths)
    this.bgmRegistry = {
      // Biomes
      forest: "assets/audio/bgm/biome_forest.mp3",
      desert: "assets/audio/bgm/biome_desert.mp3",
      volcano: "assets/audio/bgm/biome_volcano.mp3",
      void_realm: "assets/audio/bgm/biome_void.mp3",
      cyber_city: "assets/audio/bgm/biome_cyber.mp3",

      // Bosses
      boss_mini: "assets/audio/bgm/boss_mini.mp3",
      boss_final: "assets/audio/bgm/boss_final.mp3"
    };
  }

  /**
   * Initializes or resumes the AudioContext on user interaction
   */
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // ==========================================
  // 1. SYNTHESIZED SFX GENERATORS (NO FILE NEEDED)
  // ==========================================

  /**
   * Play dynamic Slashing Sound
   */
  playSlash() {
    this.init();
    const now = this.ctx.currentTime;

    // White noise buffer for blade cut
    const bufferSize = this.ctx.sampleRate * 0.12; // 120ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // High-pass filter sweep for swoosh effect
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.12);
    filter.Q.value = 3.0;

    // Gain envelope
    const gain = this.ctx.createGain();
    const vol = this.volumes.sfx * this.volumes.master;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  /**
   * Play Level Up Triumph Chime
   */
  playLevelUp() {
    this.init();
    const now = this.ctx.currentTime;
    const vol = this.volumes.sfx * this.volumes.master;

    // Major arpeggio notes (C5, E5, G5, C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      const startTime = now + idx * 0.08;
      const duration = 0.35;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(vol * 0.8, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  /**
   * Play Building / Structure Placement Sound
   */
  playBuild() {
    this.init();
    const now = this.ctx.currentTime;
    const vol = this.volumes.sfx * this.volumes.master;

    // Wooden / Stone impact pulse
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

  // ==========================================
  // 2. BACKGROUND MUSIC & BOSS CROSSFADER
  // ==========================================

  /**
   * Play or smoothly switch BGM to a biome or boss track
   * @param {string} trackKey - Registered key (e.g., 'forest', 'volcano', 'boss_final')
   * @param {number} fadeDuration - Crossfade duration in ms
   */
  playBGM(trackKey, fadeDuration = 1500) {
    if (this.currentBgmKey === trackKey || !this.bgmRegistry[trackKey]) return;

    const newSrc = this.bgmRegistry[trackKey];
    const targetVolume = this.volumes.bgm * this.volumes.master;

    const newAudio = new Audio(newSrc);
    newAudio.loop = true;
    newAudio.volume = 0;

    const oldAudio = this.currentAudio;
    this.currentAudio = newAudio;
    this.currentBgmKey = trackKey;

    newAudio.play().then(() => {
      const stepInterval = 50;
      const steps = fadeDuration / stepInterval;
      const volumeStep = targetVolume / steps;
      let currentStep = 0;

      const fadeTimer = setInterval(() => {
        currentStep++;

        // Fade in new audio
        if (newAudio.volume + volumeStep <= targetVolume) {
          newAudio.volume = Math.min(targetVolume, newAudio.volume + volumeStep);
        }

        // Fade out old audio
        if (oldAudio) {
          oldAudio.volume = Math.max(0, oldAudio.volume - volumeStep);
        }

        if (currentStep >= steps) {
          clearInterval(fadeTimer);
          if (oldAudio) {
            oldAudio.pause();
            oldAudio.src = "";
          }
        }
      }, stepInterval);
    }).catch(err => {
      console.warn("BGM playback waiting for user interaction:", err);
    });
  }

  /**
   * Stop currently playing BGM
   */
  stopBGM() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = "";
      this.currentAudio = null;
      this.currentBgmKey = null;
    }
  }

  /**
   * Adjust volumes dynamically
   */
  setVolume(type, val) {
    if (this.volumes[type] !== undefined) {
      this.volumes[type] = Math.max(0, Math.min(1, val));
      if (type === "bgm" && this.currentAudio) {
        this.currentAudio.volume = this.volumes.bgm * this.volumes.master;
      }
    }
  }
}

export const audioManager = new AudioManager();

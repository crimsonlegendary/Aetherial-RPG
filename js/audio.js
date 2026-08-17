// ==========================================
// 1. BIOME & BOSS MUSIC CONFIGURATION
// ==========================================

export const BIOME_MUSIC = {
  forest: {
    id: "forest",
    name: "Whispering Canopy",
    src: "assets/audio/bgm/forest.mp3",
    ambientType: "forest_wind"
  },
  desert: {
    id: "desert",
    name: "Scorched Dunes",
    src: "assets/audio/bgm/desert.mp3",
    ambientType: "desert_breeze"
  },
  volcano: {
    id: "volcano",
    name: "Obsidian Core",
    src: "assets/audio/bgm/volcano.mp3",
    ambientType: "lava_rumble"
  },
  void_realm: "assets/audio/bgm/void.mp3",
  cyber_city: "assets/audio/bgm/cyber.mp3"
};

export const BOSS_MUSIC = {
  mini_boss: {
    id: "mini_boss",
    name: "Guardian Encounter",
    src: "assets/audio/bgm/boss_mini.mp3"
  },
  final_boss: {
    id: "final_boss",
    name: "Wrath of the Void King",
    src: "assets/audio/bgm/boss_final.mp3"
  }
};

// ==========================================
// 2. PROCEDURAL AMBIENT SOUND GENERATOR
// ==========================================

export class AmbientSoundscape {
  constructor(audioContext) {
    this.ctx = audioContext;
    this.activeNodes = [];
  }

  /**
   * Generates continuous procedural background rumble/wind without external files
   * @param {string} type - 'forest_wind', 'desert_breeze', or 'lava_rumble'
   */
  startAmbient(type) {
    this.stopAmbient();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate low-frequency pink/brown noise
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    if (type === "lava_rumble") {
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    } else { // Wind / Breeze
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(350, this.ctx.currentTime);
      filter.Q.setValueAtTime(2.0, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    }

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    this.activeNodes.push(noise, gain);
  }

  stopAmbient() {
    this.activeNodes.forEach(node => {
      if (node.stop) node.stop();
      if (node.disconnect) node.disconnect();
    });
    this.activeNodes = [];
  }
}

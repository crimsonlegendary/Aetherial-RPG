export class AudioManager {
  constructor() {
    this.sfx = {
      bgm: new Audio('assets/bgm.mp3'),
      slash: new Audio('assets/slash.wav'),
      heavy: new Audio('assets/heavy.wav'),
      heal: new Audio('assets/heal.wav'),
      levelup: new Audio('assets/levelup.wav'),
      phase: new Audio('assets/phase.wav')
    };

    if (this.sfx.bgm) {
      this.sfx.bgm.loop = true;
      this.sfx.bgm.volume = 0.3;
    }

    this.soundEnabled = false;
  }

  toggleAudio(buttonEl) {
    this.soundEnabled = !this.soundEnabled;
    buttonEl.innerText = this.soundEnabled ? "🔊 Audio: ON" : "🔇 Audio: OFF";
    
    if (this.soundEnabled) {
      this.sfx.bgm.play().catch(() => console.log("Audio files missing or blocked by browser."));
    } else {
      this.sfx.bgm.pause();
    }
  }

  play(key) {
    if (!this.soundEnabled || !this.sfx[key]) return;
    this.sfx[key].currentTime = 0;
    this.sfx[key].play().catch(() => {});
  }
}

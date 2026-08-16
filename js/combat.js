export class CombatEngine {
  constructor(player, weapons, bosses, audio, logCallback) {
    this.player = player;
    this.weapons = weapons;
    this.bosses = bosses;
    this.audio = audio;
    this.log = logCallback;
    this.enemy = null;

    this.spawnEnemy();
  }

  spawnEnemy() {
    const bossData = this.bosses.find(b => b.triggerKills === this.player.kills);

    if (bossData) {
      const p1 = bossData.phases[0];
      this.enemy = {
        id: bossData.id,
        name: `[BOSS] ${p1.name}`,
        lvl: this.player.lvl + 2,
        maxHp: p1.hp,
        hp: p1.hp,
        atk: p1.atk,
        xp: 300,
        gold: 250,
        isBoss: true,
        bossRef: bossData,
        currentPhaseIndex: 0,
        dropWeapon: bossData.dropWeapon
      };
      this.log(`⚠️ WARNING: ${p1.msg}`);
      this.audio.play('phase');
    } else {
      const pool = ['Forest Slime', 'Skeletal Warrior', 'Dark Cultist', 'Cave Ogre', 'Infernal Golem', 'Void Stalker'];
      const idx = Math.min(pool.length - 1, Math.floor(this.player.kills / 4));
      const scale = 1 + (this.player.kills * 0.25);

      this.enemy = {
        name: pool[idx],
        lvl: 1 + Math.floor(this.player.kills / 3),
        maxHp: Math.floor(30 * scale),
        hp: Math.floor(30 * scale),
        atk: Math.floor(5 * scale),
        xp: Math.floor(25 * scale),
        gold: Math.floor(15 * scale),
        isBoss: false
      };
    }
  }

  executeTurn(slot) {
    if (this.player.hp <= 0 || this.enemy.hp <= 0) return;

    if (slot === 3) {
      const heal = this.player.getHealAmount();
      this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
      this.log(`Guarded and restored ${heal} HP!`);
      this.audio.play('heal');
    } else {
      const dmg = this.player.getDamage(slot);
      this.enemy.hp = Math.max(0, this.enemy.hp - dmg);
      
      if (slot === 1) { this.log(`Quick Slash hit for ${dmg} DMG!`); this.audio.play('slash'); }
      if (slot === 2) { this.log(`Heavy Strike smashed for ${dmg} DMG!`); this.audio.play('heavy'); }
      if (slot === 4) { 
        this.log(`MASTER ULTIMATE: Executed ${this.player.equipped.skill4} for ${dmg} DMG!`); 
        this.audio.play('heavy'); 
      }
    }

    // Check weapon mastery progress
    if (this.player.gainMastery(3.5)) {
      this.log(`MASTERED WEAPON! 4th Skill Unlocked for ${this.player.equipped.name}!`);
      this.audio.play('levelup');
    }

    // Handle boss multi-phase shifts
    if (this.enemy.isBoss) {
      this.checkPhaseTransition();
    }

    // Victory or Counterattack
    if (this.enemy.hp <= 0 && (!this.enemy.isBoss || this.enemy.currentPhaseIndex >= this.enemy.bossRef.phases.length - 1)) {
      this.handleDefeatEnemy();
    } else if (this.enemy.hp > 0) {
      const taken = this.player.takeDamage(this.enemy.atk);
      this.log(`${this.enemy.name} counterattacked for ${taken} DMG!`);

      if (this.player.hp <= 0) {
        this.log(`Defeated! Respawning...`);
        this.player.hp = this.player.maxHp;
        this.spawnEnemy();
      }
    }
  }

  checkPhaseTransition() {
    const currentBoss = this.enemy.bossRef;
    const nextPhaseData = currentBoss.phases[this.enemy.currentPhaseIndex + 1];

    if (this.enemy.hp <= 0 && nextPhaseData) {
      this.enemy.currentPhaseIndex++;
      this.enemy.name = `[BOSS] ${nextPhaseData.name}`;
      this.enemy.maxHp = nextPhaseData.hp;
      this.enemy.hp = nextPhaseData.hp;
      this.enemy.atk = nextPhaseData.atk;

      this.log(`⚠️ PHASE SHIFT: ${nextPhaseData.msg}`);
      this.audio.play('phase');
    }
  }

  handleDefeatEnemy() {
    this.log(`Defeated ${this.enemy.name}! Earned +${this.enemy.xp} XP and +${this.enemy.gold} Gold.`);
    this.player.gold += this.enemy.gold;
    this.player.kills++;

    if (this.enemy.isBoss) {
      this.player.bossKills++;
      if (Math.random() < 0.6) {
        this.player.shards++;
        this.log(`BOSS DROP: Found +1 Void Shard!`);
      }
    }

    if (Math.random() < 0.45) {
      this.player.ore++;
      this.log(`Looted +1 Iron Ore!`);
    }

    if (this.enemy.isBoss && this.enemy.dropWeapon) {
      const drop = this.weapons.find(w => w.id === this.enemy.dropWeapon);
      if (drop && !drop.unlocked) {
        drop.unlocked = true;
        this.log(`EXCLUSIVE BOSS DROP: Claimed ${drop.name}!`);
        this.audio.play('levelup');
      }
    }

    if (this.player.addXp(this.enemy.xp)) {
      this.log(`LEVEL UP! Reached Level ${this.player.lvl}!`);
      this.audio.play('levelup');
    }

    this.spawnEnemy();
  }
}

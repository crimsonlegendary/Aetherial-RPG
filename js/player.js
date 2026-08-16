export class Player {
  constructor(starterWeapon) {
    this.lvl = 1;
    this.xp = 0;
    this.maxXp = 100;
    this.hp = 100;
    this.maxHp = 100;
    this.gold = 0;
    this.ore = 0;
    this.shards = 0;
    this.kills = 0;
    this.bossKills = 0;
    this.equipped = starterWeapon;
  }

  addXp(amount) {
    this.xp += amount;
    let leveledUp = false;

    while (this.xp >= this.maxXp) {
      this.lvl++;
      this.xp -= this.maxXp;
      this.maxXp = Math.floor(this.maxXp * 1.5);
      this.maxHp += 25;
      this.hp = this.maxHp;
      leveledUp = true;
    }

    return leveledUp;
  }

  gainMastery(amount) {
    if (this.equipped.mastery < 100) {
      this.equipped.mastery = Math.min(100, this.equipped.mastery + amount);
      return this.equipped.mastery === 100;
    }
    return false;
  }

  getDamage(slot) {
    const baseAtk = this.equipped.atk + (this.lvl * 3.5);
    
    switch(slot) {
      case 1: return Math.floor(baseAtk * 1.0);
      case 2: return Math.floor(baseAtk * 1.65);
      case 3: return 0; // Guard Slot
      case 4: return Math.floor(baseAtk * this.equipped.skill4Multiplier);
      default: return Math.floor(baseAtk);
    }
  }

  getHealAmount() {
    return Math.floor(25 + (this.lvl * 3.5));
  }

  takeDamage(amount) {
    const reducedDmg = Math.max(1, amount - Math.floor(this.lvl * 0.4));
    this.hp = Math.max(0, this.hp - reducedDmg);
    return reducedDmg;
  }
}

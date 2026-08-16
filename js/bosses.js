export const BOSS_DATABASE = [
  {
    triggerKills: 5,
    id: 'king_slime',
    dropWeapon: 'slime_cleaver',
    phases: [
      {
        phase: 1,
        name: 'King Slime (Phase 1)',
        hp: 180,
        atk: 12,
        msg: 'King Slime bounces down from the canopy!'
      },
      {
        phase: 2,
        name: 'King Slime (Toxic Core)',
        hp: 280,
        atk: 24,
        msg: 'King Slime splits, exposing its corrosive core!'
      }
    ]
  },
  {
    triggerKills: 12,
    id: 'abyssal_warden',
    dropWeapon: 'void_scythe',
    phases: [
      {
        phase: 1,
        name: 'Abyssal Warden',
        hp: 350,
        atk: 28,
        msg: 'Abyssal Warden steps through a dark rift!'
      },
      {
        phase: 2,
        name: 'Abyssal Warden (Shadow Enraged)',
        hp: 520,
        atk: 48,
        msg: 'Warden shatters its armor and unleashes raw shadow!'
      },
      {
        phase: 3,
        name: 'Abyssal Warden (Final Void Form)',
        hp: 750,
        atk: 65,
        msg: 'The Warden fuses with the void for a final stand!'
      }
    ]
  }
];

// ==========================================
// 30 SHOP ABILITIES DEFINITIONS
// ==========================================

export const SHOP_ABILITIES = [
  // --- COMBAT & OFFENSE ---
  {
    id: "whirlwind",
    name: "Whirlwind Strike",
    category: "Combat",
    type: "Active",
    cost: 250,
    cooldown: 6,
    description: "Spin around, dealing 150% weapon damage to all surrounding foes."
  },
  {
    id: "dash_strike",
    name: "Shadow Dash",
    category: "Combat",
    type: "Active",
    cost: 180,
    cooldown: 4,
    description: "Teleport forward 10 meters and strike the first target in your path."
  },
  {
    id: "ground_slam",
    name: "Tremor Slam",
    category: "Combat",
    type: "Active",
    cost: 350,
    cooldown: 8,
    description: "Slam the ground, sending out a shockwave that stuns enemies for 2 seconds."
  },
  {
    id: "berserk_aura",
    name: "Berserk Flame",
    category: "Combat",
    type: "Active",
    cost: 500,
    cooldown: 20,
    description: "Increases attack speed by 50% and damage by 30% for 8 seconds."
  },
  {
    id: "death_mark",
    name: "Execute",
    category: "Combat",
    type: "Active",
    cost: 600,
    cooldown: 12,
    description: "Deals 300% damage to targets currently below 30% health."
  },
  {
    id: "riposte",
    name: "Parry Counter",
    category: "Combat",
    type: "Active",
    cost: 300,
    cooldown: 5,
    description: "Negate incoming damage for 1 second and immediately counter-attack."
  },

  // --- ELEMENTAL & MAGIC ---
  {
    id: "flame_volley",
    name: "Fireball Volley",
    category: "Magic",
    type: "Active",
    cost: 400,
    cooldown: 7,
    description: "Launch 3 fiery projectiles that explode on contact."
  },
  {
    id: "frost_nova",
    name: "Frost Nova",
    category: "Magic",
    type: "Active",
    cost: 350,
    cooldown: 10,
    description: "Freeze all nearby enemies in ice for 3 seconds."
  },
  {
    id: "chain_arc",
    name: "Chain Lightning",
    category: "Magic",
    type: "Active",
    cost: 450,
    cooldown: 9,
    description: "Unleash lightning that bounces between up to 5 adjacent targets."
  },
  {
    id: "stone_skin",
    name: "Earth Shield",
    category: "Magic",
    type: "Active",
    cost: 200,
    cooldown: 15,
    description: "Absorb incoming damage equal to 25% of your max HP."
  },
  {
    id: "poison_nova",
    name: "Venom Burst",
    category: "Magic",
    type: "Active",
    cost: 300,
    cooldown: 11,
    description: "Inflict damage-over-time poison to all foes within radius."
  },
  {
    id: "abyssal_gravity",
    name: "Void Rift",
    category: "Magic",
    type: "Active",
    cost: 750,
    cooldown: 25,
    description: "Summon a black hole pulling all enemies together while dealing void damage."
  },

  // --- MOBILITY & AGILITY ---
  {
    id: "aether_step",
    name: "Phase Dash",
    category: "Mobility",
    type: "Active",
    cost: 220,
    cooldown: 5,
    description: "Become invulnerable and phase through enemies for 1.5 seconds."
  },
  {
    id: "sky_fall",
    name: "Celestial Leap",
    category: "Mobility",
    type: "Active",
    cost: 280,
    cooldown: 8,
    description: "Leap high into the air and crash down at a target location."
  },
  {
    id: "overdrive",
    name: "Speed Burst",
    category: "Mobility",
    type: "Active",
    cost: 150,
    cooldown: 12,
    description: "Increase movement speed by 70% for 5 seconds."
  },
  {
    id: "hookshot",
    name: "Grapple Hook",
    category: "Mobility",
    type: "Active",
    cost: 320,
    cooldown: 6,
    description: "Pull targeted enemy directly to you or pull yourself to walls."
  },
  {
    id: "time_warp",
    name: "Temporal Rewind",
    category: "Mobility",
    type: "Active",
    cost: 850,
    cooldown: 30,
    description: "Teleport back to your position and HP level from 4 seconds ago."
  },
  {
    id: "gale_blast",
    name: "Gale Force",
    category: "Mobility",
    type: "Active",
    cost: 240,
    cooldown: 7,
    description: "Knock back all surrounding enemies with a burst of wind."
  },

  // --- DEFENSE & SURVIVAL ---
  {
    id: "aegis_shield",
    name: "Divine Barrier",
    category: "Defense",
    type: "Active",
    cost: 500,
    cooldown: 18,
    description: "Gain complete immunity to all incoming damage for 3 seconds."
  },
  {
    id: "vampiric_touch",
    name: "Life Drain",
    category: "Defense",
    type: "Active",
    cost: 420,
    cooldown: 10,
    description: "Siphon health from target enemy to restore your own HP."
  },
  {
    id: "mirror_ward",
    name: "Reflective Shield",
    category: "Defense",
    type: "Active",
    cost: 380,
    cooldown: 14,
    description: "Reflect 50% of incoming damage back to attackers for 4 seconds."
  },
  {
    id: "phoenix_heart",
    name: "Phoenix Resurgence",
    category: "Defense",
    type: "Passive",
    cost: 1200,
    cooldown: 120,
    description: "Automatically revive with 50% HP upon receiving fatal damage."
  },
  {
    id: "unshakable",
    name: "Iron Will",
    category: "Defense",
    type: "Passive",
    cost: 350,
    cooldown: 0,
    description: "Grants permanent immunity to knockback and stun effects."
  },
  {
    id: "radiant_field",
    name: "Sanctuary",
    category: "Defense",
    type: "Active",
    cost: 480,
    cooldown: 22,
    description: "Place a zone on the ground that continuously heals allies inside."
  },

  // --- UTILITY & PASSIVE BUFFS ---
  {
    id: "loot_aura",
    name: "Gold Magnet",
    category: "Utility",
    type: "Passive",
    cost: 150,
    cooldown: 0,
    description: "Automatically pulls gold and dropped materials toward the player."
  },
  {
    id: "precision",
    name: "Critical Focus",
    category: "Utility",
    type: "Passive",
    cost: 400,
    cooldown: 0,
    description: "Permanently increases Critical Strike Chance by +15%."
  },
  {
    id: "soul_collector",
    name: "Soul Harvester",
    category: "Utility",
    type: "Passive",
    cost: 500,
    cooldown: 0,
    description: "Gain +1 base damage for every 20 enemies defeated."
  },
  {
    id: "adrenaline",
    name: "Adrenaline Rush",
    category: "Utility",
    type: "Passive",
    cost: 300,
    cooldown: 0,
    description: "Gain +20% movement speed and attack speed when below 35% HP."
  },
  {
    id: "charged_hits",
    name: "Kinetic Overload",
    category: "Utility",
    type: "Passive",
    cost: 650,
    cooldown: 0,
    description: "Every 5th melee attack produces a destructive kinetic shockwave."
  },
  {
    id: "resource_efficiency",
    name: "Master Crafter",
    category: "Utility",
    type: "Passive",
    cost: 300,
    cooldown: 0,
    description: "Reduces material costs for crafting all high-tier weapons by 20%."
  }
];

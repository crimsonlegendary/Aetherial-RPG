export const HIGH_TIER_WEAPONS = [
  {
    id: "void_touched_reaper",
    name: "Void-Touched Reaper",
    tier: "Mythic",
    type: "Scythe",
    damage: 280,
    attackSpeed: 1.2,
    critChance: 0.35,
    description: "Forged in the abyssal core. Drains soul energy on hit.",
    craftingRecipe: { void_core: 3, dark_matter: 10, titanium_bar: 15 },
    specialAbility: "Soul Siphon: Restores 10% of damage dealt as HP."
  },
  {
    id: "eclipse_dynamo",
    name: "Eclipse Dynamo",
    tier: "Legendary",
    type: "Plasma Blade",
    damage: 240,
    attackSpeed: 1.8,
    critChance: 0.25,
    description: "Channels dark star energy to scorch through reinforced armor.",
    craftingRecipe: { plasma_cell: 5, dark_matter: 8, gold_ingot: 20 },
    specialAbility: "Solar Flare: 20% chance on hit to burn and blind foes for 3s."
  },
  {
    id: "soul_forge_hammer",
    name: "Soul-Forge Hammer",
    tier: "Legendary",
    type: "Warhammer",
    damage: 350,
    attackSpeed: 0.7,
    critChance: 0.15,
    description: "Heavy enough to shatter reality. Deals devastating AOE knockback.",
    craftingRecipe: { celestial_ingot: 12, dragon_bone: 5, magma_core: 4 },
    specialAbility: "Quake Stun: Heavy ground slams stun nearby enemies for 1.5s."
  },
  {
    id: "aetherial_dread_bow",
    name: "Aetherial Dread-Bow",
    tier: "Mythic",
    type: "Bow",
    damage: 210,
    attackSpeed: 2.1,
    critChance: 0.40,
    description: "Fires spectral phase-arrows that bypass physical shields.",
    craftingRecipe: { aether_essence: 15, shadow_silk: 10, void_core: 2 },
    specialAbility: "Phase Arrow: Projectiles pierce through up to 3 targets."
  },
  {
    id: "chronos_executioner",
    name: "Chronos Executioner",
    tier: "Divine",
    type: "Dual Daggers",
    damage: 195,
    attackSpeed: 3.0,
    critChance: 0.50,
    description: "Bends temporal flow for lightning-fast consecutive strikes.",
    craftingRecipe: { chronos_crystal: 5, celestial_ingot: 10, aether_essence: 8 },
    specialAbility: "Time Warp: Every 5th hit slows target movement speed by 50%."
  }
];

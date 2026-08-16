// ==========================================
// 1. HIGH-TIER CRAFTED WEAPONS DEFINITIONS
// ==========================================
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
    craftingRecipe: {
      void_core: 3,
      dark_matter: 10,
      titanium_bar: 15
    },
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
    craftingRecipe: {
      plasma_cell: 5,
      dark_matter: 8,
      gold_ingot: 20
    },
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
    craftingRecipe: {
      celestial_ingot: 12,
      dragon_bone: 5,
      magma_core: 4
    },
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
    craftingRecipe: {
      aether_essence: 15,
      shadow_silk: 10,
      void_core: 2
    },
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
    craftingRecipe: {
      chronos_crystal: 5,
      celestial_ingot: 10,
      aether_essence: 8
    },
    specialAbility: "Time Warp: Every 5th hit slows target movement speed by 50%."
  }
];

// ==========================================
// 2. LOCALSTORAGE AUTO-SAVE & LOAD SYSTEM
// ==========================================
const SAVE_KEY = "game_weapons_save_data";

export const WeaponSaveManager = {
  /**
   * Save weapon state to localStorage
   * @param {Object} state - Current player weapons data (e.g., unlocked weapons, equipped ID, materials)
   */
  save(state) {
    try {
      const payload = {
        unlockedWeapons: state.unlockedWeapons || [],
        equippedWeaponId: state.equippedWeaponId || null,
        craftingMaterials: state.craftingMaterials || {},
        lastSaved: Date.now()
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Auto-save failed:", err);
    }
  },

  /**
   * Load weapon state from localStorage
   * @param {Object} fallbackState - Default state if no save exists
   * @returns {Object} Saved state or fallback
   */
  load(fallbackState = { unlockedWeapons: [], equippedWeaponId: null, craftingMaterials: {} }) {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      return saved ? JSON.parse(saved) : fallbackState;
    } catch (err) {
      console.error("Failed to load weapon state:", err);
      return fallbackState;
    }
  },

  /**
   * Starts a background auto-save loop
   * @param {Function} getStateFn - Returns the live weapon state object
   * @param {number} intervalMs - Save frequency in ms (default: 10000ms / 10s)
   */
  initAutoSave(getStateFn, intervalMs = 10000) {
    setInterval(() => {
      const currentState = getStateFn();
      if (currentState) {
        this.save(currentState);
      }
    }, intervalMs);
  },

  /**
   * Reset saved data back to factory defaults
   */
  clearData() {
    localStorage.removeItem(SAVE_KEY);
  }
};

import { HIGH_TIER_WEAPONS } from './weapons.js';
import { SaveManager } from './saveManager.js';

export function craftWeapon(weaponId, playerState) {
  const weapon = HIGH_TIER_WEAPONS.find(w => w.id === weaponId);

  if (!weapon) return { success: false, message: "Recipe not found." };
  if (playerState.unlockedWeapons.includes(weaponId)) {
    return { success: false, message: `${weapon.name} already crafted!` };
  }

  const recipe = weapon.craftingRecipe || {};
  for (const [mat, req] of Object.entries(recipe)) {
    if ((playerState.craftingMaterials[mat] || 0) < req) {
      return { success: false, message: `Missing required materials for ${weapon.name}.` };
    }
  }

  // Deduct materials & unlock
  for (const [mat, req] of Object.entries(recipe)) {
    playerState.craftingMaterials[mat] -= req;
  }
  playerState.unlockedWeapons.push(weaponId);

  // Auto-save using new separate SaveManager
  SaveManager.save(playerState);

  return { success: true, message: `Forged ${weapon.name}!`, weapon };
}

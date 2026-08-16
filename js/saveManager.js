const DEFAULT_SAVE_KEY = "game_save_data";

export const SaveManager = {
  /**
   * Save game state object to localStorage
   * @param {Object} state - Current player/game state
   * @param {string} key - Storage key
   */
  save(state, key = DEFAULT_SAVE_KEY) {
    try {
      const payload = {
        ...state,
        lastSaved: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(payload));
      return true;
    } catch (err) {
      console.error("[SaveManager] Save failed:", err);
      return false;
    }
  },

  /**
   * Load state from localStorage
   * @param {Object} fallbackState - Default state if no save exists
   * @param {string} key - Storage key
   * @returns {Object} Saved state or fallback
   */
  load(fallbackState = {}, key = DEFAULT_SAVE_KEY) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallbackState;
    } catch (err) {
      console.error("[SaveManager] Load failed:", err);
      return fallbackState;
    }
  },

  /**
   * Starts an auto-save loop
   * @param {Function} getStateFn - Returns live state object
   * @param {number} intervalMs - Frequency in ms (default: 10s)
   * @param {string} key - Storage key
   * @returns {number} Interval ID
   */
  initAutoSave(getStateFn, intervalMs = 10000, key = DEFAULT_SAVE_KEY) {
    return setInterval(() => {
      const currentState = getStateFn();
      if (currentState) {
        this.save(currentState, key);
      }
    }, intervalMs);
  },

  /**
   * Wipe save data
   * @param {string} key - Storage key
   */
  clearData(key = DEFAULT_SAVE_KEY) {
    localStorage.removeItem(key);
  }
};

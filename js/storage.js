/**
 * CENTRALIZED STORAGE UTILITY
 * Single source of truth for all app data using localStorage
 * Enables real-time cross-dashboard synchronization
 */

class StorageManager {
  constructor() {
    this.prefix = 'hcs_';
    this.initializeStorage();
  }

  /**
   * Initialize default data structure on first load
   */
  initializeStorage() {
    const keys = [
      'users',
      'jobseekers',
      'applications',
      'services',
      'bookings',
      'tasks',
      'notifications',
      'activity_logs',
      'admin_actions',
      'current_user',
      'system_config'
    ];

    keys.forEach((key) => {
      if (!this.get(key)) {
        if (key === 'current_user') {
          this.set(key, null);
        } else {
          this.set(key, []);
        }
      }
    });
  }

  /**
   * Get data from localStorage
   */
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(`${this.prefix}${key}`);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      return defaultValue;
    }
  }

  /**
   * Set data in localStorage
   */
  set(key, value) {
    try {
      localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
      // Dispatch custom event for real-time sync
      this.dispatchStorageEvent(key, value);
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  }

  /**
   * Update array item by ID
   */
  updateItem(arrayKey, id, updates) {
    const items = this.get(arrayKey, []);
    const index = items.findIndex((item) => item.id === id);

    if (index !== -1) {
      items[index] = { ...items[index], ...updates, updatedAt: Date.now() };
      this.set(arrayKey, items);
      return items[index];
    }
    return null;
  }

  /**
   * Add item to array
   */
  addItem(arrayKey, item) {
    const items = this.get(arrayKey, []);
    const newItem = {
      ...item,
      id: item.id || `${arrayKey}_${Date.now()}`,
      createdAt: Date.now()
    };
    items.push(newItem);
    this.set(arrayKey, items);
    return newItem;
  }

  /**
   * Remove item from array by ID
   */
  removeItem(arrayKey, id) {
    const items = this.get(arrayKey, []);
    const filtered = items.filter((item) => item.id !== id);
    this.set(arrayKey, filtered);
  }

  /**
   * Get item by ID
   */
  getItem(arrayKey, id) {
    const items = this.get(arrayKey, []);
    return items.find((item) => item.id === id) || null;
  }

  /**
   * Filter items
   */
  filterItems(arrayKey, predicate) {
    const items = this.get(arrayKey, []);
    return items.filter(predicate);
  }

  /**
   * Dispatch custom storage event for real-time sync
   */
  dispatchStorageEvent(key, value) {
    const event = new CustomEvent('storageUpdated', {
      detail: { key, value, timestamp: Date.now() }
    });
    document.dispatchEvent(event);
  }

  /**
   * Clear all data (for testing)
   */
  clear() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
    this.initializeStorage();
  }

  /**
   * Export all data (for backup/debugging)
   */
  exportAll() {
    const data = {};
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        data[key.replace(this.prefix, '')] = this.get(key.replace(this.prefix, ''));
      }
    });
    return data;
  }
}

// Global instance
const storage = new StorageManager();

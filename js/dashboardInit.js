/**
 * DASHBOARD INITIALIZATION HELPER
 * Centralizes setup for all dashboards
 * 
 * HOW TO USE:
 * 1. In each dashboard HTML file, add these in order:
 *    - responsive.css and dashboard-responsive.css in <head>
 *    - storage.js, sync.js, mobileResponsive.js in <body> at bottom
 *    - Then call: DashboardInit.setup('dashboard-name', requiredRole)
 * 
 * 2. In each dashboard JS file, call:
 *    - DashboardInit.subscribeToUpdates(dataType, updateCallback)
 *    - DashboardInit.notifyUpdate(dataType, data)
 */

class DashboardInit {
  static dashboardName = '';
  static requiredRole = null;
  static currentUser = null;
  static subscribers = {};

  /**
   * Initialize dashboard
   * @param {string} name - Dashboard name ('superadmin', 'op_admin', 'hr_admin', 'user', 'caregiver')
   * @param {array} roles - Required roles for access
   */
  static setup(name, roles = []) {
    this.dashboardName = name;
    this.requiredRole = roles;
    
    // Check authentication
    if (!this.checkAuth()) {
      window.location.href = '../pages/userLogin.html';
      return;
    }

    // Initialize storage and sync
    this.initializeStorage();
    this.initializeSync();
    this.setupEventListeners();
    
    console.log(`✓ Dashboard initialized: ${name}`);
  }

  /**
   * Check if user has required role
   */
  static checkAuth() {
    const user = window.hcsStorage?.get('current_user');
    if (!user) return false;

    if (this.requiredRole.length > 0) {
      return this.requiredRole.includes(user.role);
    }
    return true;
  }

  /**
   * Initialize storage manager
   */
  static initializeStorage() {
    if (typeof StorageManager !== 'undefined' && !window.hcsStorage) {
      window.hcsStorage = new StorageManager();
      window.hcsStorage.initializeStorage();
    }
  }

  /**
   * Initialize sync/event system
   */
  static initializeSync() {
    if (typeof DashboardSync !== 'undefined' && !window.hcsSync) {
      window.hcsSync = new DashboardSync();
      window.hcsSync.initStorageSync();
    }
  }

  /**
   * Subscribe to data updates
   * @param {string} dataType - Type of data ('users', 'services', 'bookings', etc)
   * @param {function} callback - Function to call when data updates
   * @returns {function} Unsubscribe function
   */
  static subscribeToUpdates(dataType, callback) {
    if (!window.hcsSync) {
      console.error('DashboardSync not initialized');
      return () => {};
    }

    return window.hcsSync.subscribe(dataType, callback);
  }

  /**
   * Notify all subscribed handlers of data update
   * @param {string} dataType - Type of data being updated
   * @param {object} data - Updated data
   */
  static notifyUpdate(dataType, data) {
    if (window.hcsStorage) {
      window.hcsStorage.set(dataType, data);
    }
  }

  /**
   * Get current user
   */
  static getCurrentUser() {
    return window.hcsStorage?.get('current_user');
  }

  /**
   * Get all data of type
   * @param {string} dataType - Type of data to retrieve
   */
  static getData(dataType) {
    return window.hcsStorage?.get(dataType, []);
  }

  /**
   * Add to data collection
   * @param {string} dataType - Type of data
   * @param {object} item - Item to add
   */
  static addData(dataType, item) {
    const data = this.getData(dataType);
    data.push({
      ...item,
      id: item.id || Date.now(),
      createdAt: item.createdAt || new Date().toISOString()
    });
    this.notifyUpdate(dataType, data);
  }

  /**
   * Update item in data collection
   * @param {string} dataType - Type of data
   * @param {number} id - Item id
   * @param {object} updates - Updates to merge
   */
  static updateData(dataType, id, updates) {
    const data = this.getData(dataType);
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
      this.notifyUpdate(dataType, data);
      return data[index];
    }
    return null;
  }

  /**
   * Remove item from data collection
   * @param {string} dataType - Type of data
   * @param {number} id - Item id
   */
  static removeData(dataType, id) {
    const data = this.getData(dataType);
    const filtered = data.filter(item => item.id !== id);
    this.notifyUpdate(dataType, filtered);
  }

  /**
   * Show toast notification
   * @param {string} message - Message to display
   * @param {string} type - 'success', 'error', 'warning', 'info'
   * @param {number} duration - Duration in ms
   */
  static showNotification(message, type = 'info', duration = 3000) {
    Toast(message, type, duration);
  }

  /**
   * Log admin action
   */
  static logAction(action, details = {}) {
    const user = this.getCurrentUser();
    const log = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      userId: user?.id,
      userName: user?.name,
      action,
      details,
      dashboard: this.dashboardName
    };

    const logs = this.getData('activity_logs');
    logs.push(log);
    this.notifyUpdate('activity_logs', logs);
  }

  /**
   * Setup common event listeners
   */
  static setupEventListeners() {
    // Handle back button
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('[data-modal].open');
        openModals.forEach(modal => modal.classList.remove('open'));
      }
    });
  }
}

// Export for use
if (typeof window !== 'undefined') {
  window.DashboardInit = DashboardInit;
}

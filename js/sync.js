/**
 * CROSS-DASHBOARD SYNCHRONIZATION SYSTEM
 * Enables real-time updates across all open dashboards
 */

class DashboardSync {
  constructor() {
    this.listeners = {};
    this.initStorageSync();
  }

  /**
   * Initialize cross-browser/tab storage events
   */
  initStorageSync() {
    // Listen for storage changes from other tabs
    window.addEventListener('storage', (e) => {
      if (e.key && e.key.startsWith('hcs_')) {
        const dataKey = e.key.replace('hcs_', '');
        this.notifyListeners(dataKey, JSON.parse(e.newValue || 'null'));
      }
    });

    // Listen for same-tab custom events
    document.addEventListener('storageUpdated', (e) => {
      const { key, value } = e.detail;
      this.notifyListeners(key, value);
    });
  }

  /**
   * Subscribe to data changes
   */
  subscribe(dataKey, callback) {
    if (!this.listeners[dataKey]) {
      this.listeners[dataKey] = [];
    }
    this.listeners[dataKey].push(callback);

    // Return unsubscribe function
    return () => {
      this.listeners[dataKey] = this.listeners[dataKey].filter((cb) => cb !== callback);
    };
  }

  /**
   * Notify all listeners of changes
   */
  notifyListeners(dataKey, value) {
    if (this.listeners[dataKey]) {
      this.listeners[dataKey].forEach((callback) => {
        try {
          callback(value);
        } catch (error) {
          console.error(`Error in listener for ${dataKey}:`, error);
        }
      });
    }
  }

  /**
   * Trigger dashboard refresh
   */
  refreshDashboard(dashboardId) {
    const event = new CustomEvent('dashboardRefresh', {
      detail: { dashboardId, timestamp: Date.now() }
    });
    document.dispatchEvent(event);
  }

  /**
   * Broadcast notification
   */
  notify(message, type = 'info', duration = 3000) {
    const event = new CustomEvent('globalNotification', {
      detail: { message, type, duration, timestamp: Date.now() }
    });
    document.dispatchEvent(event);
  }

  /**
   * Update table in real-time
   */
  updateTable(tableId, dataKey) {
    const table = document.getElementById(tableId);
    if (!table) return;

    this.subscribe(dataKey, (data) => {
      this.renderTableBody(table, data);
    });
  }

  /**
   * Helper: Render table body
   */
  renderTableBody(table, data) {
    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    data.forEach((item) => {
      const row = this.createTableRow(table, item);
      tbody.appendChild(row);
    });
  }

  /**
   * Helper: Create a table row (override per dashboard)
   */
  createTableRow(table, item) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${JSON.stringify(item)}</td>`;
    return row;
  }

  /**
   * Update badge/counter
   */
  updateBadge(elementId, dataKey, filterFn) {
    const element = document.getElementById(elementId);
    if (!element) return;

    this.subscribe(dataKey, (data) => {
      const count = filterFn ? data.filter(filterFn).length : data.length;
      element.textContent = count;
      element.classList.toggle('has-items', count > 0);
    });
  }

  /**
   * Update profile info
   */
  updateProfile(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    this.subscribe('current_user', (user) => {
      if (user) {
        element.innerHTML = `
          <div class="profile-info">
            <strong>${user.fullName || user.name}</strong>
            <small>${user.role}</small>
          </div>
        `;
      }
    });
  }
}

// Global instance
const sync = new DashboardSync();

/**
 * Helper: Show global notification
 */
function Toast(message, type = 'info', duration = 3000) {
  sync.notify(message, type, duration);
}

/**
 * Helper: Get current user
 */
function getCurrentUser() {
  return storage.get('current_user');
}

/**
 * Helper: Check auth
 */
function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = '/index.html';
    return false;
  }
  return user;
}

/**
 * Helper: Check role-based access
 */
function requireRole(...roles) {
  const user = requireAuth();
  if (!user || !roles.includes(user.role)) {
    Toast('Access denied', 'error');
    return false;
  }
  return user;
}

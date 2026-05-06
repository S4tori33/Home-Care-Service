/**
 * Dashboard Template Engine
 * Creates dashboard UI based on role configuration
 */

const DashboardConfig = {
  super_admin: {
    title: 'Super Admin Dashboard',
    subtitle: 'System Control Center',
    color: '#dc2626',
    icon: '🛡️',
    tabs: ['overview', 'health', 'analytics'],
    stats: [
      { label: 'Total Users', value: '1,248', change: '+127 this month', icon: '👥', cardColor: 'blue' },
      { label: 'Total Admins', value: '12', change: 'All roles', icon: '🔐', cardColor: 'purple' },
      { label: 'Service Providers', value: '342', change: '+14 this month', icon: '🏢', cardColor: 'orange' },
      { label: 'Total Revenue', value: '$145K', change: '+8.4% this month', icon: '💰', cardColor: 'green' }
    ]
  },
  platform_admin: {
    title: 'Platform Admin Dashboard',
    subtitle: 'User Management & Control',
    color: '#3b82f6',
    icon: '👤',
    tabs: ['users', 'analytics'],
    stats: [
      { label: 'Total Users', value: '1,248', change: '+127 this month', icon: '👥', cardColor: 'blue' },
      { label: 'Active Users', value: '1,156', change: '92.6% of total', icon: '✓', cardColor: 'green' },
      { label: 'New This Month', value: '127', change: 'Growing steadily', icon: '📈', cardColor: 'purple' },
      { label: 'Banned Users', value: '5', change: 'Requires attention', icon: '⛔', cardColor: 'orange' }
    ]
  },
  hr_admin: {
    title: 'HR Admin Dashboard',
    subtitle: 'Application Review & Provider Management',
    color: '#ec4899',
    icon: '📋',
    tabs: ['applications', 'providers'],
    stats: [
      { label: 'Pending Review', value: '23', change: 'Requires attention', icon: '⏳', cardColor: 'orange' },
      { label: 'Approved This Month', value: '45', change: 'New providers onboarded', icon: '✓', cardColor: 'green' },
      { label: 'Rejected This Month', value: '8', change: 'Did not meet criteria', icon: '✗', cardColor: 'orange' },
      { label: 'Total Providers', value: '342', change: '+45 this month', icon: '🏢', cardColor: 'purple' }
    ]
  },
  operations_admin: {
    title: 'Operations Admin Dashboard',
    subtitle: 'Booking & Provider Assignment',
    color: '#f97316',
    icon: '📅',
    tabs: ['bookings', 'providers'],
    stats: [
      { label: 'Total Bookings', value: '1,456', change: 'All time', icon: '📅', cardColor: 'blue' },
      { label: 'Active Bookings', value: '89', change: 'In progress', icon: '✓', cardColor: 'green' },
      { label: 'Pending Assignment', value: '12', change: 'Needs provider', icon: '⏳', cardColor: 'orange' },
      { label: 'Completed Today', value: '34', change: 'Finished services', icon: '✓', cardColor: 'purple' }
    ]
  },
  caregiver: {
    title: 'Caregiver Dashboard',
    subtitle: 'Manage Your Bookings & Schedule',
    color: '#22c55e',
    icon: '💚',
    tabs: ['bookings', 'schedule'],
    stats: [
      { label: 'Total Bookings', value: '156', change: 'All time', icon: '📅', cardColor: 'blue' },
      { label: 'Upcoming', value: '5', change: 'This week', icon: '📅', cardColor: 'green' },
      { label: 'Earnings', value: '$3,200', change: 'This month', icon: '💰', cardColor: 'orange' },
      { label: 'Rating', value: '4.8★', change: 'From 127 clients', icon: '⭐', cardColor: 'purple' }
    ]
  },
  regular_user: {
    title: 'Customer Dashboard',
    subtitle: 'Book Services & Manage Bookings',
    color: '#a855f7',
    icon: '🏠',
    tabs: ['bookings', 'providers'],
    stats: [
      { label: 'My Bookings', value: '12', change: 'All time', icon: '📅', cardColor: 'blue' },
      { label: 'Upcoming', value: '2', change: 'Active bookings', icon: '✓', cardColor: 'green' },
      { label: 'Completed', value: '10', change: 'Finished services', icon: '✓', cardColor: 'orange' },
      { label: 'Total Spent', value: '$1,440', change: 'On services', icon: '💰', cardColor: 'purple' }
    ]
  },
  customer_support: {
    title: 'Support Dashboard',
    subtitle: 'Handle Issues & Support Requests',
    color: '#8b5cf6',
    icon: '🎧',
    tabs: ['tickets', 'analytics'],
    stats: [
      { label: 'Open Tickets', value: '23', change: 'Requires attention', icon: '📝', cardColor: 'orange' },
      { label: 'Resolved Today', value: '15', change: 'Closed successfully', icon: '✓', cardColor: 'green' },
      { label: 'Avg Response Time', value: '2.5 hrs', change: 'Within SLA', icon: '⏱️', cardColor: 'blue' },
      { label: 'Customer Satisfaction', value: '92%', change: 'Overall rating', icon: '😊', cardColor: 'purple' }
    ]
  },
  moderator: {
    title: 'Moderator Dashboard',
    subtitle: 'Review & Moderate Platform Content',
    color: '#06b6d4',
    icon: '🛑',
    tabs: ['reports', 'moderation'],
    stats: [
      { label: 'Pending Reports', value: '18', change: 'Requires review', icon: '🚩', cardColor: 'orange' },
      { label: 'Reviewed Today', value: '42', change: 'Processed', icon: '✓', cardColor: 'green' },
      { label: 'Actions Taken', value: '7', change: 'Users warned/banned', icon: '🛑', cardColor: 'red' },
      { label: 'Content Removed', value: '12', change: 'This month', icon: '🗑️', cardColor: 'purple' }
    ]
  }
};

class Dashboard {
  constructor(role) {
    this.role = role;
    this.config = DashboardConfig[role];
    if (!this.config) {
      throw new Error(`Unknown role: ${role}`);
    }
  }

  renderHeader() {
    return `
      <div class="header" style="background: linear-gradient(135deg, ${this.config.color} 0%, ${this.config.color}dd 100%);">
        <div class="header-left">
          <div class="header-icon">${this.config.icon}</div>
          <div class="header-text">
            <h1>${this.config.title}</h1>
            <p>${this.config.subtitle}</p>
          </div>
        </div>
        <div class="header-right">
          <span class="role-badge">${this.role.replace(/_/g, ' ').toUpperCase()}</span>
          <button class="logout-btn" onclick="logout()">↗ Logout</button>
        </div>
      </div>
    `;
  }

  renderStats() {
    return this.config.stats.map(stat => `
      <div class="stat-card ${stat.cardColor}">
        <div class="stat-card-icon">${stat.icon}</div>
        <div class="stat-label">${stat.label}</div>
        <div class="stat-value">${stat.value}</div>
        <div class="stat-change">${stat.change}</div>
      </div>
    `).join('');
  }

  renderTabs() {
    const tabs = {
      'overview': '📊 Overview',
      'health': '❤️ System Health',
      'analytics': '📈 Analytics',
      'users': '👥 Users',
      'bookings': '📅 Bookings',
      'applications': '📋 Applications',
      'providers': '🏢 Providers',
      'schedule': '📆 Schedule',
      'tickets': '🎫 Support Tickets',
      'reports': '🚩 Reports',
      'moderation': '🛡️ Moderation'
    };

    return this.config.tabs.map((tab, idx) => `
      <button class="tab ${idx === 0 ? 'active' : ''}" onclick="switchTab(event, '${tab}')">
        ${tabs[tab]}
      </button>
    `).join('');
  }

  updateHeaderColor() {
    document.querySelectorAll('.header').forEach(el => {
      el.style.background = `linear-gradient(135deg, ${this.config.color} 0%, ${this.config.color}dd 100%)`;
    });

    document.querySelectorAll('.role-badge').forEach(el => {
      el.style.backgroundColor = 'white';
      el.style.color = this.config.color;
    });

    document.querySelectorAll('.tab.active').forEach(el => {
      el.style.borderBottomColor = this.config.color;
      el.style.color = this.config.color;
    });

    document.querySelectorAll('.tab').forEach(el => {
      el.style.setProperty('--primary-color', this.config.color);
    });
  }
}

function logout() {
  appData.logout();
  window.location.href = '../index.html';
}

function switchTab(event, tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  document.getElementById(tabName).classList.add('active');
  event.target.closest('.tab').classList.add('active');
}

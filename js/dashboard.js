/**
 * ============================================================================
 * Dashboard Routing & Initialization System
 * ============================================================================
 * Handles role-based dashboard routing and initialization
 */

class DashboardManager {
  constructor() {
    this.auth = window.auth;
  }

  /**
   * Initialize dashboard based on user role
   */
  initializeDashboard() {
    if (!this.auth.isLoggedIn()) {
      window.location.href = '../pages/userLogin.html';
      return;
    }

    const user = this.auth.getCurrentUser();
    const role = this.auth.getUserRole();

    console.log(`Initializing dashboard for ${user.firstName} (${role.name})`);

    // Update header information
    this.updateHeader(user, role);

    // Load role-specific content
    this.loadRoleContent(user, role);

    // Initialize sidebar
    this.initializeSidebar(user, role);

    // Initialize permissioning
    this.applyPermissions(role);
  }

  /**
   * Update page header with user information
   */
  updateHeader(user, role) {
    // Update welcome message
    const headerName = document.getElementById('headerName');
    if (headerName) {
      headerName.textContent = user.firstName || 'User';
    }

    // Update avatar
    const avatar = document.getElementById('avatarEl') || document.getElementById('profileAvatar');
    if (avatar) {
      avatar.textContent = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
      avatar.style.background = role.color;
    }

    // Update user info in sidebar
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');
    if (userName) userName.textContent = `${user.firstName} ${user.lastName}`;
    if (userRole) userRole.textContent = role.displayName;

    // Update role indicator
    this.updateRoleIndicator(role);
  }

  /**
   * Update role indicator on page
   */
  updateRoleIndicator(role) {
    let indicator = document.getElementById('roleIndicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'roleIndicator';
      indicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 8px 16px;
        background: ${role.color};
        color: white;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        z-index: 10000;
      `;
      document.body.appendChild(indicator);
    }
    indicator.textContent = role.displayName;
    indicator.style.background = role.color;
  }

  /**
   * Initialize sidebar navigation based on role
   */
  initializeSidebar(user, role) {
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (!sidebarNav) return;

    // Get menu items for this role
    const menuItems = this.getMenuForRole(role);

    // Clear existing items (keep profile section)
    const profileSection = sidebarNav.querySelector('.sidebar-profile');
    sidebarNav.innerHTML = '';
    
    if (profileSection) {
      sidebarNav.appendChild(profileSection);
    }

    // Add menu items
    menuItems.forEach(item => {
      const link = document.createElement('a');
      link.href = item.href;
      link.className = 'sidebar-item';
      link.innerHTML = `
        <svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
        ${item.label}
      `;

      if (window.location.pathname.includes(item.href)) {
        link.classList.add('active');
      }

      sidebarNav.appendChild(link);
    });

    // Add divider before logout
    const divider = document.createElement('div');
    divider.className = 'sidebar-divider';
    sidebarNav.appendChild(divider);

    // Add logout button
    const logoutBtn = document.createElement('a');
    logoutBtn.href = '../pages/userLogin.html';
    logoutBtn.className = 'sidebar-item logout';
    logoutBtn.id = 'logoutBtn';
    logoutBtn.innerHTML = `
      <svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Log Out
    `;
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.logout();
    });
    sidebarNav.appendChild(logoutBtn);
  }

  /**
   * Get menu items for specific role
   */
  getMenuForRole(role) {
    const baseIcon = '<path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/>';
    const bookingIcon = '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>';
    const chartIcon = '<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5H17"/>';
    const usersIcon = '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>';
    const messageIcon = '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>';
    const settingsIcon = '<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"/>';
    const checklistIcon = '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>';

    const menuMap = {
      super_admin: [
        { label: 'Overview', href: '/dashboard/superadmin', icon: chartIcon },
        { label: 'User Management', href: '/dashboard/superadmin/users', icon: usersIcon },
        { label: 'Analytics', href: '/dashboard/superadmin/analytics', icon: chartIcon },
        { label: 'System Settings', href: '/dashboard/superadmin/settings', icon: settingsIcon }
      ],
      platform_admin: [
        { label: 'Dashboard', href: '/dashboard/platform', icon: chartIcon },
        { label: 'User Management', href: '/dashboard/platform/users', icon: usersIcon },
        { label: 'Reports', href: '/dashboard/platform/reports', icon: chartIcon }
      ],
      hr_admin: [
        { label: 'Dashboard', href: '/dashboard/hr', icon: chartIcon },
        { label: 'Applications', href: '/dashboard/hr/applications', icon: checklistIcon },
        { label: 'Verify Providers', href: '/dashboard/hr/verify', icon: usersIcon }
      ],
      operations_admin: [
        { label: 'Dashboard', href: '/dashboard/operations', icon: chartIcon },
        { label: 'Bookings', href: '/dashboard/operations/bookings', icon: bookingIcon },
        { label: 'Service Assignment', href: '/dashboard/operations/assign', icon: usersIcon }
      ],
      caregiver: [
        { label: 'Dashboard', href: '/dashboard/caregiver', icon: chartIcon },
        { label: 'My Jobs', href: '/dashboard/caregiver/jobs', icon: bookingIcon },
        { label: 'Messages', href: '/pages/messaging.html', icon: messageIcon }
      ],
      pet_care: [
        { label: 'Dashboard', href: '/dashboard/pet-care', icon: chartIcon },
        { label: 'My Jobs', href: '/dashboard/pet-care/jobs', icon: bookingIcon },
        { label: 'Messages', href: '/pages/messaging.html', icon: messageIcon }
      ],
      garden_maintenance: [
        { label: 'Dashboard', href: '/dashboard/garden', icon: chartIcon },
        { label: 'My Jobs', href: '/dashboard/garden/jobs', icon: bookingIcon },
        { label: 'Messages', href: '/pages/messaging.html', icon: messageIcon }
      ],
      house_cleaning: [
        { label: 'Dashboard', href: '/dashboard/cleaning', icon: chartIcon },
        { label: 'My Jobs', href: '/dashboard/cleaning/jobs', icon: bookingIcon },
        { label: 'Messages', href: '/pages/messaging.html', icon: messageIcon }
      ],
      customer: [
        { label: 'Dashboard', href: '/dashboard/customer', icon: chartIcon },
        { label: 'Book Service', href: '/pages/booking.html', icon: bookingIcon },
        { label: 'My Bookings', href: '/dashboard/customer/bookings', icon: bookingIcon },
        { label: 'Messages', href: '/pages/messaging.html', icon: messageIcon }
      ],
      customer_support: [
        { label: 'Dashboard', href: '/dashboard/support', icon: chartIcon },
        { label: 'Support Tickets', href: '/dashboard/support/tickets', icon: checklistIcon },
        { label: 'Messages', href: '/pages/messaging.html', icon: messageIcon },
        { label: 'Users', href: '/dashboard/support/users', icon: usersIcon }
      ],
      moderator: [
        { label: 'Dashboard', href: '/dashboard/moderator', icon: chartIcon },
        { label: 'Reports', href: '/dashboard/moderator/reports', icon: checklistIcon },
        { label: 'Messages', href: '/pages/messaging.html', icon: messageIcon },
        { label: 'Users', href: '/dashboard/moderator/users', icon: usersIcon }
      ]
    };

    return menuMap[role.id] || [];
  }

  /**
   * Load role-specific content
   */
  loadRoleContent(user, role) {
    // This is where role-specific dashboard UIs would be loaded
    // For now, just log it
    console.log(`Loading content for role: ${role.name}`);
  }

  /**
   * Apply permissions-based access control
   */
  applyPermissions(role) {
    // Hide elements that user doesn't have permission for
    const permissionElements = document.querySelectorAll('[data-permission]');
    
    permissionElements.forEach(element => {
      const requiredPermission = element.getAttribute('data-permission');
      const hasPermission = role.permissions.includes('*') || 
                           role.permissions.includes(requiredPermission);
      
      if (!hasPermission) {
        element.style.display = 'none';
      }
    });
  }

  /**
   * Logout user
   */
  logout() {
    if (confirm('Are you sure you want to log out?')) {
      this.auth.logout();
      window.location.href = '../pages/userLogin.html';
    }
  }

  /**
   * Redirect to appropriate dashboard
   */
  redirectToDashboard() {
    const path = this.auth.getDashboardPath();
    if (path && path !== window.location.pathname) {
      window.location.href = path;
    }
  }

  /**
   * Check access to a resource
   */
  checkAccess(requiredRole = null, requiredPermission = null) {
    const user = this.auth.getCurrentUser();
    
    if (!user) {
      window.location.href = '../pages/userLogin.html';
      return false;
    }

    const role = this.auth.getUserRole();

    // Check role requirement
    if (requiredRole && role.id !== requiredRole) {
      alert('You do not have access to this resource');
      this.redirectToDashboard();
      return false;
    }

    // Check permission requirement
    if (requiredPermission && !this.auth.hasPermission(requiredPermission)) {
      alert('You do not have permission for this action');
      return false;
    }

    return true;
  }

  /**
   * Show role-specific notification
   */
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      z-index: 10001;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  /**
   * Get user statistics for dashboard
   */
  getUserStatistics() {
    const user = this.auth.getCurrentUser();
    const role = this.auth.getUserRole();

    if (role.id === 'customer') {
      const bookings = this.auth.getUserBookings(user.id, 'customer');
      const conversations = this.auth.getUserConversations(user.id);
      
      return {
        totalBookings: bookings.length,
        upcomingBookings: bookings.filter(b => b.status === 'confirmed').length,
        completedBookings: bookings.filter(b => b.status === 'completed').length,
        conversations: conversations.length,
        unreadMessages: conversations.reduce((sum, c) => sum + c.unreadCount, 0)
      };
    } else if (['caregiver', 'pet_care', 'garden_maintenance', 'house_cleaning'].includes(role.id)) {
      const bookings = this.auth.getUserBookings(user.id, role.id);
      const assignments = bookings.filter(b => b.providerId === user.id);
      
      return {
        availableJobs: assignments.filter(b => b.status === 'pending').length,
        activeJobs: assignments.filter(b => b.status === 'confirmed').length,
        completedJobs: assignments.filter(b => b.status === 'completed').length,
        rating: (Math.random() * 1 + 4).toFixed(1)
      };
    }

    return {};
  }
}

// Initialize dashboard manager globally
const dashboard = new DashboardManager();

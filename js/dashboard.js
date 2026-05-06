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

  /** Relative links work from /dashboard/*.html and /pages/*.html */
  linkBase() {
    const path = window.location.pathname || '';
    const href = window.location.href || '';
    const inDashboard =
      path.includes('/dashboard/') || href.includes('/dashboard/');
    return {
      dash: inDashboard ? './' : '../dashboard/',
      pages: inDashboard ? '../pages/' : ''
    };
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

    sidebarNav.innerHTML = '';

    // Add menu items
    menuItems.forEach(item => {
      const link = document.createElement('a');
      link.href = item.href;
      link.className = 'sidebar-item';
      link.innerHTML = `
        <svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
        ${item.label}
      `;

      const base = (item.href || '').split('/').pop();
      if (base && window.location.pathname.endsWith(base)) {
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
    const checklistIcon = '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>';

    const { dash, pages } = this.linkBase();

    const providerMenu = [
      { label: 'Dashboard', href: `${dash}provider.html`, icon: chartIcon },
      { label: 'Messages', href: `${pages}messaging.html`, icon: messageIcon }
    ];

    const menuMap = {
      super_admin: [
        { label: 'Overview', href: `${dash}superadmin.html`, icon: chartIcon },
        { label: 'Users', href: `${dash}superadmin.html`, icon: usersIcon }
      ],
      platform_admin: [
        { label: 'Dashboard', href: `${dash}platform.html`, icon: chartIcon },
        { label: 'Users', href: `${dash}platform.html`, icon: usersIcon }
      ],
      hr_admin: [
        { label: 'Dashboard', href: `${dash}hr.html`, icon: chartIcon },
        { label: 'Applications', href: `${dash}hr.html`, icon: checklistIcon }
      ],
      operations_admin: [
        { label: 'Dashboard', href: `${dash}operations.html`, icon: chartIcon },
        { label: 'Bookings', href: `${dash}operations.html`, icon: bookingIcon }
      ],
      caregiver: providerMenu,
      pet_care: providerMenu,
      garden_maintenance: providerMenu,
      house_cleaning: providerMenu,
      regular_user: [
        { label: 'Dashboard', href: `${dash}user.html`, icon: chartIcon },
        { label: 'Book service', href: `${pages}booking.html`, icon: bookingIcon },
        { label: 'Messages', href: `${pages}messaging.html`, icon: messageIcon }
      ],
      customer: [
        { label: 'Dashboard', href: `${dash}user.html`, icon: chartIcon },
        { label: 'Book service', href: `${pages}booking.html`, icon: bookingIcon },
        { label: 'Messages', href: `${pages}messaging.html`, icon: messageIcon }
      ],
      customer_support: [
        { label: 'Dashboard', href: `${dash}support.html`, icon: chartIcon },
        { label: 'Issues', href: `${dash}support.html`, icon: checklistIcon },
        { label: 'Messages', href: `${pages}messaging.html`, icon: messageIcon }
      ],
      moderator: [
        { label: 'Dashboard', href: `${dash}moderator.html`, icon: chartIcon },
        { label: 'Users', href: `${dash}moderator.html`, icon: usersIcon },
        { label: 'Messages', href: `${pages}messaging.html`, icon: messageIcon }
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

    if (role.id === 'regular_user' || role.id === 'customer') {
      const bookings = this.auth.getUserBookings(user.id, 'regular_user');
      const conversations = this.auth.getUserConversations(user.id);

      return {
        totalBookings: bookings.length,
        upcomingBookings: bookings.filter(b =>
          ['pending', 'assigned', 'accepted'].includes(b.status)
        ).length,
        completedBookings: bookings.filter(b => b.status === 'completed').length,
        conversations: conversations.length,
        unreadMessages: conversations.reduce((sum, c) => sum + c.unreadCount, 0)
      };
    }

    if (
      ['caregiver', 'pet_care', 'garden_maintenance', 'house_cleaning'].includes(
        role.id
      )
    ) {
      const bookings = this.auth.getUserBookings(user.id, role.id);

      return {
        availableJobs: bookings.filter(b => b.status === 'assigned').length,
        activeJobs: bookings.filter(b => b.status === 'accepted').length,
        completedJobs: bookings.filter(b => b.status === 'completed').length,
        rating:
          bookings.filter(b => b.status === 'completed').length >= 3
            ? '4.8'
            : 'New'
      };
    }

    return {};
  }
}

// Initialize dashboard manager globally
const dashboard = new DashboardManager();

let selectedOtherId = null;
    const currentUser = auth.getCurrentUser();

    if (!currentUser) {
      window.location.href = 'userLogin.html';
    } else {
      dashboard.initializeDashboard();
      renderConversationPanel();
      const params = new URLSearchParams(window.location.search);
      const withId = params.get('with');
      if (withId) {
        selectPartner(withId);
      }
    }

    function displayName(u) {
      if (!u) return 'Unknown';
      const n = `${u.firstName || ''} ${u.lastName || ''}`.trim();
      return n || u.email || 'User';
    }

    function initials(u) {
      if (!u) return '?';
      const a = (u.firstName || '').charAt(0);
      const b = (u.lastName || '').charAt(0);
      return (a + b).toUpperCase() || (u.email || '?').charAt(0).toUpperCase();
    }

    function conversationRows() {
      const conv = auth.getUserConversations(currentUser.id);
      const eligible = auth.getEligibleMessagePartners(currentUser.id);
      const seen = new Set(conv.map(c => c.otherUserId));
      const rows = conv.slice();

      eligible.forEach(e => {
        if (!seen.has(e.otherUserId)) {
          rows.push({
            otherUserId: e.otherUserId,
            otherUser: e.otherUser,
            lastMessage: {
              content: 'No messages yet — say hello',
              timestamp: new Date().toISOString()
            },
            unreadCount: 0
          });
          seen.add(e.otherUserId);
        }
      });

      return rows.sort(
        (a, b) =>
          new Date(b.lastMessage.timestamp).getTime() -
          new Date(a.lastMessage.timestamp).getTime()
      );
    }

    function renderConversationPanel() {
      const conversationsList = document.getElementById('conversationsList');
      const rows = conversationRows();

      if (!rows.length) {
        conversationsList.innerHTML =
          '<div style="padding: 20px; text-align: center; color: #9ca3af;">No eligible contacts yet. Complete booking assignment and acceptance first.</div>';
        return;
      }

      conversationsList.innerHTML = rows
        .map(conv => {
          const otherUser = conv.otherUser || auth.getUserById(conv.otherUserId);
          const preview = (conv.lastMessage && conv.lastMessage.content) || '';
          const active = conv.otherUserId === selectedOtherId ? 'active' : '';
          return `
          <div class="conversation-item ${active}" data-other="${conv.otherUserId}">
            <div class="conversation-avatar">${initials(otherUser)}</div>
            <div class="conversation-info">
              <div class="conversation-name">${displayName(otherUser)}</div>
              <div class="conversation-preview">${preview.substring(0, 40)}</div>
            </div>
            ${conv.unreadCount > 0 ? `<div class="conversation-badge">${conv.unreadCount}</div>` : ''}
          </div>`;
        })
        .join('');

      conversationsList.querySelectorAll('.conversation-item').forEach(el => {
        el.addEventListener('click', () => {
          selectPartner(el.getAttribute('data-other'));
        });
      });
    }

    function selectPartner(otherUserId) {
      if (!otherUserId) return;
      selectedOtherId = otherUserId;

      const otherUser = auth.getUserById(otherUserId);
      document.getElementById('chatTitle').textContent = displayName(otherUser);
      document.getElementById('chatSubtitle').textContent =
        (otherUser && otherUser.email) || '';
      document.getElementById('chatInputArea').style.display = 'flex';

      auth.markMessagesAsRead(currentUser.id, otherUserId);

      const msgs = auth.getMessages(currentUser.id, otherUserId);
      const chatContent = document.getElementById('chatContent');
      chatContent.innerHTML = msgs
        .map(
          msg => `
        <div class="message ${msg.senderId === currentUser.id ? 'sent' : 'received'}">
          <div>
            <div class="message-bubble">${msg.content.replace(/</g, '&lt;')}</div>
            <div class="message-timestamp">${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>`
        )
        .join('');
      chatContent.scrollTop = chatContent.scrollHeight;

      renderConversationPanel();
    }

    function sendMessage() {
      if (!selectedOtherId) return;
      const input = document.getElementById('messageInput');
      const content = input.value.trim();
      if (!content) return;

      try {
        auth.sendMessage(currentUser.id, selectedOtherId, content);
        input.value = '';
        selectPartner(selectedOtherId);
      } catch (err) {
        alert(err.message || 'Could not send message');
      }
    }

    document.getElementById('messageInput').addEventListener('keypress', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    document.getElementById('logoutLink').addEventListener('click', e => {
      e.preventDefault();
      dashboard.logout();
    });
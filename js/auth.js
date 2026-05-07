/**
 * Demo auth + shared localStorage data (users, bookings, messages, applications).
 * Session key: currentUser (password stripped).
 */

const demoUsers = [
  { email: 'superadmin@test.com', password: '123456', role: 'super_admin' },
  { email: 'platformadmin@test.com', password: '123456', role: 'platform_admin' },
  { email: 'hradmin@test.com', password: '123456', role: 'hr_admin' },
  { email: 'operationsadmin@test.com', password: '123456', role: 'operations_admin' },
  { email: 'caregiver@test.com', password: '123456', role: 'caregiver' },
  { email: 'petcare@test.com', password: '123456', role: 'pet_care' },
  { email: 'garden@test.com', password: '123456', role: 'garden_maintenance' },
  { email: 'cleaning@test.com', password: '123456', role: 'house_cleaning' },
  { email: 'user@test.com', password: '123456', role: 'regular_user' },
  { email: 'support@test.com', password: '123456', role: 'customer_support' },
  { email: 'moderator@test.com', password: '123456', role: 'moderator' }
];

class AuthSystem {
  constructor() {
    this.STORAGE_KEY_USERS = 'hcs_users';
    this.STORAGE_KEY_BOOKINGS = 'hcs_bookings';
    this.STORAGE_KEY_MESSAGES = 'hcs_messages';
    this.STORAGE_KEY_APPLICATIONS = 'hcs_applications';
    this.STORAGE_KEY_ISSUES = 'hcs_issues';

    this.ROLES = {
      SUPER_ADMIN: {
        id: 'super_admin',
        name: 'Super Admin',
        displayName: 'Super Administrator',
        permissions: ['*'],
        dashboardPath: '../dashboard/superadmin.html',
        color: '#8B0000'
      },
      PLATFORM_ADMIN: {
        id: 'platform_admin',
        name: 'Platform Admin',
        displayName: 'Platform Administrator',
        permissions: ['manage_users', 'view_analytics', 'manage_roles'],
        dashboardPath: '../dashboard/platform.html',
        color: '#1e40af'
      },
      HR_ADMIN: {
        id: 'hr_admin',
        name: 'HR Admin',
        displayName: 'HR Administrator',
        permissions: ['approve_jobseekers', 'verify_providers', 'view_applications'],
        dashboardPath: '../dashboard/hr.html',
        color: '#059669'
      },
      OPERATIONS_ADMIN: {
        id: 'operations_admin',
        name: 'Operations Admin',
        displayName: 'Operations Administrator',
        permissions: ['assign_providers', 'manage_bookings', 'view_services'],
        dashboardPath: '../dashboard/operations.html',
        color: '#d97706'
      },
      CAREGIVER: {
        id: 'caregiver',
        name: 'Caregiver',
        displayName: 'Caregiver',
        permissions: ['accept_bookings', 'view_clients', 'message_clients', 'complete_bookings'],
        dashboardPath: '../dashboard/provider.html',
        color: '#f59e0b',
        serviceType: 'Elderly Care'
      },
      PET_CARE: {
        id: 'pet_care',
        name: 'Pet Care Provider',
        displayName: 'Pet Care Provider',
        permissions: ['accept_bookings', 'view_clients', 'message_clients', 'complete_bookings'],
        dashboardPath: '../dashboard/provider.html',
        color: '#ec4899',
        serviceType: 'Pet Care'
      },
      GARDEN_MAINTENANCE: {
        id: 'garden_maintenance',
        name: 'Garden Maintenance',
        displayName: 'Garden Maintenance Provider',
        permissions: ['accept_bookings', 'view_clients', 'message_clients', 'complete_bookings'],
        dashboardPath: '../dashboard/provider.html',
        color: '#10b981',
        serviceType: 'Garden Maintenance'
      },
      HOUSE_CLEANING: {
        id: 'house_cleaning',
        name: 'House Cleaning',
        displayName: 'House Cleaning Provider',
        permissions: ['accept_bookings', 'view_clients', 'message_clients', 'complete_bookings'],
        dashboardPath: '../dashboard/provider.html',
        color: '#6366f1',
        serviceType: 'House Cleaning'
      },
      REGULAR_USER: {
        id: 'regular_user',
        name: 'Customer',
        displayName: 'Customer',
        permissions: ['book_services', 'view_providers', 'message_providers', 'leave_feedback'],
        dashboardPath: '../dashboard/user.html',
        color: '#3b82f6'
      },
      CUSTOMER_SUPPORT: {
        id: 'customer_support',
        name: 'Customer Support',
        displayName: 'Customer Support Agent',
        permissions: ['view_tickets', 'message_users', 'resolve_issues'],
        dashboardPath: '../dashboard/support.html',
        color: '#8b5cf6'
      },
      MODERATOR: {
        id: 'moderator',
        name: 'Moderator',
        displayName: 'Content Moderator',
        permissions: ['review_reports', 'moderate_content', 'manage_users'],
        dashboardPath: '../dashboard/moderator.html',
        color: '#ef4444'
      }
    };

    this.initializeRoles();
    this.ensureDemoUsersAndData();
    this.migrateLegacyRoles();
  }

  migrateLegacyRoles() {
    const users = this.getAllUsers();
    let changed = false;
    const mapped = users.map(u => {
      if (u.role === 'customer') {
        changed = true;
        return { ...u, role: 'regular_user' };
      }
      return u;
    });
    if (!changed) return;
    localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(mapped));
    const cur = this.getCurrentUser();
    if (cur && cur.role === 'customer') {
      const updated = mapped.find(x => x.id === cur.id);
      if (updated) this.setCurrentUser({ ...updated, role: 'regular_user' });
    }
  }

  initializeRoles() {
    window.ROLE_DEFINITIONS = this.ROLES;
    window.demoUsers = demoUsers;
  }

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }

  generateAvatar(firstName = '', lastName = '') {
    const first = (firstName || '').charAt(0).toUpperCase();
    const last = (lastName || '').charAt(0).toUpperCase();
    return (first + last) || 'U';
  }

  /** Merge demo roster into localStorage once; keeps stable ids on repeat visits. */
  ensureDemoUsersAndData() {
    const existing = this.getAllUsers();
    const byEmail = new Map(existing.map(u => [u.email.toLowerCase(), u]));

    demoUsers.forEach(d => {
      const email = d.email.toLowerCase();
      if (byEmail.has(email)) return;

      const localPart = email.split('@')[0];
      const user = {
        id: this.generateId(),
        email,
        password: d.password,
        role: d.role,
        firstName: localPart.charAt(0).toUpperCase() + localPart.slice(1),
        lastName: 'User',
        phone: '',
        avatar: this.generateAvatar(localPart, 'User'),
        createdAt: new Date().toISOString(),
        verified: true,
        status: 'active',
        lastLogin: null
      };

      if (d.role === 'caregiver') {
        user.firstName = 'John';
        user.lastName = 'Caregiver';
      }
      if (d.role === 'regular_user') {
        user.firstName = 'Jane';
        user.lastName = 'Customer';
      }
      if (d.role === 'operations_admin') {
        user.firstName = 'Operations';
        user.lastName = 'Admin';
      }

      existing.push(user);
      byEmail.set(email, user);
    });

    localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(existing));

    if (!localStorage.getItem(this.STORAGE_KEY_BOOKINGS)) {
      localStorage.setItem(this.STORAGE_KEY_BOOKINGS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.STORAGE_KEY_MESSAGES)) {
      localStorage.setItem(this.STORAGE_KEY_MESSAGES, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.STORAGE_KEY_APPLICATIONS)) {
      localStorage.setItem(this.STORAGE_KEY_APPLICATIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.STORAGE_KEY_ISSUES)) {
      localStorage.setItem(this.STORAGE_KEY_ISSUES, JSON.stringify([]));
    }
  }

  _bookingCustomerId(b) {
    return b.userId || b.customerId;
  }

  loginUser(email, password) {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const users = this.getAllUsers();
    let user = users.find(u => u.email === normalizedEmail);

    if (!user) {
      const demo = demoUsers.find(
        d => d.email === normalizedEmail && d.password === password
      );
      if (!demo) {
        return { success: false, message: 'Invalid email or password' };
      }
      user = {
        id: this.generateId(),
        email: normalizedEmail,
        password: demo.password,
        role: demo.role,
        firstName: 'Demo',
        lastName: 'User',
        phone: '',
        avatar: 'DU',
        createdAt: new Date().toISOString(),
        verified: true,
        status: 'active',
        lastLogin: null
      };
      users.push(user);
      localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));
    }

    if (user.password !== password) {
      return { success: false, message: 'Invalid email or password' };
    }

    if (user.status === 'banned') {
      return { success: false, message: 'This account has been banned.' };
    }

    user.lastLogin = new Date().toISOString();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) users[idx] = user;
    localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));

    this.setCurrentUser(user);

    return {
      success: true,
      user: { ...user, password: undefined },
      role: user.role
    };
  }

  registerUser(userData) {
    const email = (userData.email || '').trim().toLowerCase();
    if (!email || !userData.password) {
      return { success: false, message: 'Email and password are required' };
    }

    const users = this.getAllUsers();
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'User with this email already exists' };
    }

    const role =
      userData.role === 'customer'
        ? 'regular_user'
        : userData.role === 'jobseeker'
          ? 'job_seeker_pending'
          : 'regular_user';

    const user = {
      id: this.generateId(),
      email,
      password: userData.password,
      role: role === 'job_seeker_pending' ? 'regular_user' : role,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: userData.phone || '',
      avatar: this.generateAvatar(userData.firstName, userData.lastName),
      createdAt: new Date().toISOString(),
      verified: false,
      status: 'active',
      lastLogin: null
    };

    users.push(user);
    localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));

    if (userData.role === 'jobseeker') {
      const apps = this.getApplications();
      apps.push({
        id: this.generateId(),
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        desiredRole: 'caregiver',
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem(this.STORAGE_KEY_APPLICATIONS, JSON.stringify(apps));
    }

    return { success: true, user: { ...user, password: undefined } };
  }

  getCurrentUser() {
    const raw =
      localStorage.getItem('currentUser') ||
      localStorage.getItem('hcs_current_user');
    return raw ? JSON.parse(raw) : null;
  }

  setCurrentUser(user) {
    const copy = { ...user };
    delete copy.password;
    localStorage.setItem('currentUser', JSON.stringify(copy));
    localStorage.setItem('hcs_current_user', JSON.stringify(copy));
  }

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('hcs_current_user');
  }

  getUserRole() {
    const user = this.getCurrentUser();
    if (!user) return null;
    const key = user.role.toUpperCase().replace(/-/g, '_');
    return (
      this.ROLES[key] ||
      Object.values(this.ROLES).find(r => r.id === user.role) ||
      this.ROLES.REGULAR_USER
    );
  }

  hasPermission(permission) {
    const role = this.getUserRole();
    if (!role) return false;
    if (role.permissions.includes('*')) return true;
    return role.permissions.includes(permission);
  }

  hasRole(roleId) {
    const user = this.getCurrentUser();
    return user && user.role === roleId;
  }

  getAllUsers() {
    const stored = localStorage.getItem(this.STORAGE_KEY_USERS);
    return stored ? JSON.parse(stored) : [];
  }

  getUserById(userId) {
    return this.getAllUsers().find(u => u.id === userId);
  }

  getUsersByRole(roleId) {
    return this.getAllUsers().filter(u => u.role === roleId);
  }

  updateUserProfile(userId, updates) {
    const users = this.getAllUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) throw new Error('User not found');

    const { password, ...safe } = updates;
    users[idx] = {
      ...users[idx],
      ...safe,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));

    const cur = this.getCurrentUser();
    if (cur && cur.id === userId) {
      this.setCurrentUser(users[idx]);
    }
    return users[idx];
  }

  setUserStatus(userId, status) {
    return this.updateUserProfile(userId, { status });
  }

  deleteUser(userId) {
    const users = this.getAllUsers().filter(u => u.id !== userId);
    localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));
    const cur = this.getCurrentUser();
    if (cur && cur.id === userId) this.logout();
  }

  /** -------- Bookings -------- */

  getAllBookings() {
    const stored = localStorage.getItem(this.STORAGE_KEY_BOOKINGS);
    return stored ? JSON.parse(stored) : [];
  }

  _saveBookings(bookings) {
    localStorage.setItem(this.STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
  }

  getBookingById(bookingId) {
    return this.getAllBookings().find(b => b.id === bookingId);
  }

  createBooking(serviceType, userId) {
    const bookings = this.getAllBookings();
    const booking = {
      id: this.generateId(),
      userId,
      providerId: null,
      serviceType,
      status: 'pending',
      createdAt: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
      location: 'Client address on file',
      price: 75
    };
    bookings.push(booking);
    this._saveBookings(bookings);
    return booking;
  }

  assignProvider(bookingId, providerId) {
    const bookings = this.getAllBookings();
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx === -1) throw new Error('Booking not found');

    const provider = this.getUserById(providerId);
    if (!provider) throw new Error('Provider not found');

    bookings[idx] = {
      ...bookings[idx],
      providerId,
      status: 'assigned',
      assignedAt: new Date().toISOString()
    };
    this._saveBookings(bookings);
    return bookings[idx];
  }

  updateBooking(bookingId, updates) {
    const bookings = this.getAllBookings();
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx === -1) throw new Error('Booking not found');

    bookings[idx] = {
      ...bookings[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this._saveBookings(bookings);
    return bookings[idx];
  }

  getUserBookings(userId, role) {
    const bookings = this.getAllBookings();
    if (role === 'regular_user' || role === 'customer') {
      return bookings.filter(b => this._bookingCustomerId(b) === userId);
    }
    if (
      ['caregiver', 'pet_care', 'garden_maintenance', 'house_cleaning'].includes(
        role
      )
    ) {
      return bookings.filter(b => b.providerId === userId);
    }
    return bookings;
  }

  /** -------- Messages -------- */

  getAllMessages() {
    const stored = localStorage.getItem(this.STORAGE_KEY_MESSAGES);
    return stored ? JSON.parse(stored) : [];
  }

  _saveMessages(messages) {
    localStorage.setItem(this.STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  }

  /**
   * Messaging allowed only between regular user and assigned provider
   * when booking is accepted or completed.
   */
  canUsersMessage(aId, bId) {
    return this.getAllBookings().some(b => {
      const cid = this._bookingCustomerId(b);
      const pid = b.providerId;
      if (!cid || !pid) return false;
      const pair =
        (aId === cid && bId === pid) || (aId === pid && bId === cid);
      if (!pair) return false;
      return ['accepted', 'completed'].includes(b.status);
    });
  }

  sendMessage(senderId, receiverId, content) {
    if (!this.canUsersMessage(senderId, receiverId)) {
      throw new Error(
        'Messaging is only available between you and your assigned provider after the job is accepted.'
      );
    }
    const messages = this.getAllMessages();
    const message = {
      id: this.generateId(),
      senderId,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    messages.push(message);
    this._saveMessages(messages);
    return message;
  }

  getMessages(userId, otherUserId) {
    return this.getAllMessages()
      .filter(
        m =>
          (m.senderId === userId && m.receiverId === otherUserId) ||
          (m.senderId === otherUserId && m.receiverId === userId)
      )
      .sort(
        (x, y) =>
          new Date(x.timestamp).getTime() - new Date(y.timestamp).getTime()
      );
  }

  getConversation(userId1, userId2) {
    return this.getMessages(userId1, userId2);
  }

  markMessagesAsRead(receiverId, senderId) {
    const messages = this.getAllMessages();
    messages.forEach(m => {
      if (m.receiverId === receiverId && m.senderId === senderId) {
        m.read = true;
      }
    });
    this._saveMessages(messages);
  }

  getUserConversations(userId) {
    const users = this.getAllUsers();
    const seen = new Map();

    this.getAllMessages().forEach(msg => {
      if (msg.senderId !== userId && msg.receiverId !== userId) return;
      const otherId =
        msg.senderId === userId ? msg.receiverId : msg.senderId;
      if (!this.canUsersMessage(userId, otherId)) return;

      if (!seen.has(otherId)) {
        seen.set(otherId, []);
      }
      seen.get(otherId).push(msg);
    });

    return Array.from(seen.entries())
      .map(([otherId, list]) => {
        const sorted = list.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        const lastMessage = sorted[sorted.length - 1];
        const unreadCount = sorted.filter(
          m => m.receiverId === userId && !m.read
        ).length;
        return {
          otherUserId: otherId,
          otherUser: users.find(u => u.id === otherId),
          lastMessage,
          unreadCount
        };
      })
      .sort(
        (a, b) =>
          new Date(b.lastMessage.timestamp).getTime() -
          new Date(a.lastMessage.timestamp).getTime()
      );
  }

  /** Booking pairs that may message (accepted / completed). */
  getEligibleMessagePartners(userId) {
    const rows = [];
    this.getAllBookings().forEach(b => {
      if (!['accepted', 'completed'].includes(b.status)) return;
      const cid = this._bookingCustomerId(b);
      const pid = b.providerId;
      if (!cid || !pid) return;
      if (userId === cid) {
        rows.push({
          otherUserId: pid,
          otherUser: this.getUserById(pid),
          booking: b
        });
      } else if (userId === pid) {
        rows.push({
          otherUserId: cid,
          otherUser: this.getUserById(cid),
          booking: b
        });
      }
    });
    return rows;
  }

  /** -------- Applications (HR) -------- */

  getApplications() {
    const stored = localStorage.getItem(this.STORAGE_KEY_APPLICATIONS);
    return stored ? JSON.parse(stored) : [];
  }

  setApplications(apps) {
    localStorage.setItem(this.STORAGE_KEY_APPLICATIONS, JSON.stringify(apps));
  }

  approveApplication(applicationId, newRole) {
    const apps = this.getApplications();
    const app = apps.find(a => a.id === applicationId);
    if (!app) throw new Error('Application not found');

    app.status = 'approved';
    app.resolvedAt = new Date().toISOString();
    this.setApplications(apps);

    this.updateUserProfile(app.userId, {
      role: newRole || 'caregiver',
      verified: true,
      status: 'active'
    });
    return app;
  }

  rejectApplication(applicationId) {
    const apps = this.getApplications();
    const app = apps.find(a => a.id === applicationId);
    if (!app) throw new Error('Application not found');
    app.status = 'rejected';
    app.resolvedAt = new Date().toISOString();
    this.setApplications(apps);
    return app;
  }

  /** -------- Support issues -------- */

  getIssues() {
    const stored = localStorage.getItem(this.STORAGE_KEY_ISSUES);
    return stored ? JSON.parse(stored) : [];
  }

  addIssue(userId, subject, detail) {
    const issues = this.getIssues();
    const issue = {
      id: this.generateId(),
      userId,
      subject,
      detail,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    issues.push(issue);
    localStorage.setItem(this.STORAGE_KEY_ISSUES, JSON.stringify(issues));
    return issue;
  }

  updateIssueStatus(issueId, status) {
    const issues = this.getIssues();
    const idx = issues.findIndex(i => i.id === issueId);
    if (idx === -1) throw new Error('Issue not found');
    issues[idx].status = status;
    issues[idx].updatedAt = new Date().toISOString();
    localStorage.setItem(this.STORAGE_KEY_ISSUES, JSON.stringify(issues));
    return issues[idx];
  }

  /** -------- Routing -------- */

  getDashboardPath() {
    const user = this.getCurrentUser();
    if (!user) return '../index.html';
    const role = this.getUserRole();
    return role ? role.dashboardPath : '../dashboard/user.html';
  }

  getDiagnostics() {
    const users = this.getAllUsers();
    return {
      totalUsers: users.length,
      accountEmails: users.map(u => u.email),
      currentUser: this.getCurrentUser()?.email || 'None',
      currentRole: this.getUserRole()?.name || 'None'
    };
  }
}

const auth = new AuthSystem();

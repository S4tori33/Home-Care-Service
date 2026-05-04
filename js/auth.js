/**
 * ============================================================================
 * Authentication & Role-Based Access Control System
 * ============================================================================
 * Handles user authentication, role management, and permissions
 */

class AuthSystem {
  constructor() {
    this.STORAGE_KEY_USERS = 'hcs_users';
    this.STORAGE_KEY_CURRENT_USER = 'hcs_current_user';
    this.STORAGE_KEY_MESSAGES = 'hcs_messages';
    this.STORAGE_KEY_BOOKINGS = 'hcs_bookings';
    
    // Initialize system
    this.initializeRoles();
    this.initializeDemoAccounts();
  }

  /**
   * ========== ROLE & PERMISSION DEFINITIONS ==========
   */
  
  ROLES = {
    // Super Admin - Full access
    SUPER_ADMIN: {
      id: 'super_admin',
      name: 'Super Admin',
      displayName: 'Super Administrator',
      permissions: ['*'], // All permissions
      dashboardPath: '/dashboard/superadmin',
      color: '#8B0000'
    },
    
    // Platform Admin - User management
    PLATFORM_ADMIN: {
      id: 'platform_admin',
      name: 'Platform Admin',
      displayName: 'Platform Administrator',
      permissions: ['manage_users', 'view_analytics', 'manage_roles'],
      dashboardPath: '/dashboard/platform',
      color: '#1e40af'
    },
    
    // HR Admin - Approve job seekers
    HR_ADMIN: {
      id: 'hr_admin',
      name: 'HR Admin',
      displayName: 'HR Administrator',
      permissions: ['approve_jobseekers', 'verify_providers', 'view_applications'],
      dashboardPath: '/dashboard/hr',
      color: '#059669'
    },
    
    // Operations Admin - Manage bookings
    OPERATIONS_ADMIN: {
      id: 'operations_admin',
      name: 'Operations Admin',
      displayName: 'Operations Administrator',
      permissions: ['assign_providers', 'manage_bookings', 'view_services'],
      dashboardPath: '/dashboard/operations',
      color: '#d97706'
    },
    
    // Service Providers
    CAREGIVER: {
      id: 'caregiver',
      name: 'Caregiver',
      displayName: 'Caregiver',
      permissions: ['accept_bookings', 'view_clients', 'message_clients', 'complete_bookings'],
      dashboardPath: '/dashboard/caregiver',
      color: '#f59e0b',
      serviceType: 'Elderly Care'
    },
    
    PET_CARE: {
      id: 'pet_care',
      name: 'Pet Care Provider',
      displayName: 'Pet Care Provider',
      permissions: ['accept_bookings', 'view_clients', 'message_clients', 'complete_bookings'],
      dashboardPath: '/dashboard/pet-care',
      color: '#ec4899',
      serviceType: 'Pet Care'
    },
    
    GARDEN_MAINTENANCE: {
      id: 'garden_maintenance',
      name: 'Garden Maintenance',
      displayName: 'Garden Maintenance Provider',
      permissions: ['accept_bookings', 'view_clients', 'message_clients', 'complete_bookings'],
      dashboardPath: '/dashboard/garden',
      color: '#10b981',
      serviceType: 'Garden Maintenance'
    },
    
    HOUSE_CLEANING: {
      id: 'house_cleaning',
      name: 'House Cleaning',
      displayName: 'House Cleaning Provider',
      permissions: ['accept_bookings', 'view_clients', 'message_clients', 'complete_bookings'],
      dashboardPath: '/dashboard/cleaning',
      color: '#6366f1',
      serviceType: 'House Cleaning'
    },
    
    // Regular User
    CUSTOMER: {
      id: 'customer',
      name: 'Customer',
      displayName: 'Customer',
      permissions: ['book_services', 'view_providers', 'message_providers', 'leave_feedback'],
      dashboardPath: '/dashboard/customer',
      color: '#3b82f6'
    },
    
    // Support Roles
    CUSTOMER_SUPPORT: {
      id: 'customer_support',
      name: 'Customer Support',
      displayName: 'Customer Support Agent',
      permissions: ['view_tickets', 'message_users', 'resolve_issues'],
      dashboardPath: '/dashboard/support',
      color: '#8b5cf6'
    },
    
    MODERATOR: {
      id: 'moderator',
      name: 'Moderator',
      displayName: 'Content Moderator',
      permissions: ['review_reports', 'moderate_content', 'manage_users'],
      dashboardPath: '/dashboard/moderator',
      color: '#ef4444'
    }
  };

  /**
   * Initialize role definitions in system
   */
  initializeRoles() {
    // Store roles reference globally for easy access
    window.ROLE_DEFINITIONS = this.ROLES;
  }

  /**
   * ========== USER MANAGEMENT ==========
   */

  /**
   * Create a new user
   */
  registerUser(userData) {
    // Validate input
    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required');
    }

    // Check if user exists
    const users = this.getAllUsers();
    if (users.some(u => u.email === userData.email)) {
      throw new Error('User with this email already exists');
    }

    // Create user object
    const user = {
      id: this.generateId(),
      email: userData.email,
      password: userData.password, // In production, should be hashed
      role: userData.role || 'customer',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: userData.phone || '',
      avatar: userData.avatar || this.generateAvatar(userData.firstName, userData.lastName),
      createdAt: new Date().toISOString(),
      verified: false,
      status: 'active',
      lastLogin: null,
      ...userData // Include any additional fields
    };

    // Save user
    users.push(user);
    localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));

    return { ...user, password: undefined }; // Don't return password
  }

  /**
   * Authenticate user with email and password
   */
  loginUser(email, password) {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }

    if (user.status === 'banned') {
      throw new Error('This account has been banned');
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));

    // Set current user
    this.setCurrentUser(user);

    return { ...user, password: undefined };
  }

  /**
   * Get current logged-in user
   */
  getCurrentUser() {
    const stored = localStorage.getItem(this.STORAGE_KEY_CURRENT_USER);
    return stored ? JSON.parse(stored) : null;
  }

  /**
   * Set current user
   */
  setCurrentUser(user) {
    const userCopy = { ...user };
    delete userCopy.password;
    localStorage.setItem(this.STORAGE_KEY_CURRENT_USER, JSON.stringify(userCopy));
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  /**
   * Get user role object
   */
  getUserRole() {
    const user = this.getCurrentUser();
    if (!user) return null;
    return this.ROLES[user.role.toUpperCase().replace(' ', '_')] || 
           Object.values(this.ROLES).find(r => r.id === user.role) ||
           this.ROLES.CUSTOMER;
  }

  /**
   * Check if user has permission
   */
  hasPermission(permission) {
    const role = this.getUserRole();
    if (!role) return false;
    
    // Super admin has all permissions
    if (role.permissions.includes('*')) return true;
    
    return role.permissions.includes(permission);
  }

  /**
   * Check if user has role
   */
  hasRole(roleId) {
    const user = this.getCurrentUser();
    if (!user) return false;
    return user.role === roleId;
  }

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem(this.STORAGE_KEY_CURRENT_USER);
  }

  /**
   * Get all users
   */
  getAllUsers() {
    const stored = localStorage.getItem(this.STORAGE_KEY_USERS);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Get user by ID
   */
  getUserById(userId) {
    const users = this.getAllUsers();
    return users.find(u => u.id === userId);
  }

  /**
   * Get users by role
   */
  getUsersByRole(roleId) {
    const users = this.getAllUsers();
    return users.filter(u => u.role === roleId);
  }

  /**
   * Update user profile
   */
  updateUserProfile(userId, updates) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Don't allow password change through this method
    const { password, ...safeUpdates } = updates;
    
    users[userIndex] = {
      ...users[userIndex],
      ...safeUpdates,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));

    // Update current user if it's the logged-in user
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      this.setCurrentUser(users[userIndex]);
    }

    return users[userIndex];
  }

  /**
   * Ban/unban user
   */
  setUserStatus(userId, status) {
    return this.updateUserProfile(userId, { status });
  }

  /**
   * Delete user
   */
  deleteUser(userId) {
    const users = this.getAllUsers();
    const filtered = users.filter(u => u.id !== userId);
    localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(filtered));
  }

  /**
   * ========== MESSAGING ==========
   */

  /**
   * Send message
   */
  sendMessage(senderId, receiverId, content) {
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
    localStorage.setItem(this.STORAGE_KEY_MESSAGES, JSON.stringify(messages));

    return message;
  }

  /**
   * Get conversation between two users
   */
  getConversation(userId1, userId2) {
    const messages = this.getAllMessages();
    return messages.filter(m =>
      (m.senderId === userId1 && m.receiverId === userId2) ||
      (m.senderId === userId2 && m.receiverId === userId1)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  /**
   * Get all messages for user
   */
  getUserMessages(userId) {
    const messages = this.getAllMessages();
    return messages.filter(m => m.senderId === userId || m.receiverId === userId);
  }

  /**
   * Get all conversations for user
   */
  getUserConversations(userId) {
    const messages = this.getUserMessages(userId);
    const conversationMap = new Map();
    const users = this.getAllUsers();

    messages.forEach(msg => {
      const otherId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      if (!conversationMap.has(otherId)) {
        conversationMap.set(otherId, {
          otherUserId: otherId,
          otherUser: users.find(u => u.id === otherId),
          lastMessage: msg,
          unreadCount: 0
        });
      }
      const conv = conversationMap.get(otherId);
      if (msg.timestamp > conv.lastMessage.timestamp) {
        conv.lastMessage = msg;
      }
      if (msg.receiverId === userId && !msg.read) {
        conv.unreadCount++;
      }
    });

    return Array.from(conversationMap.values());
  }

  /**
   * Mark messages as read
   */
  markMessagesAsRead(userId, senderId) {
    const messages = this.getAllMessages();
    messages.forEach(m => {
      if (m.receiverId === userId && m.senderId === senderId) {
        m.read = true;
      }
    });
    localStorage.setItem(this.STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  }

  /**
   * Get all messages
   */
  getAllMessages() {
    const stored = localStorage.getItem(this.STORAGE_KEY_MESSAGES);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * ========== BOOKINGS ==========
   */

  /**
   * Create booking
   */
  createBooking(bookingData) {
    const bookings = this.getAllBookings();
    
    const booking = {
      id: this.generateId(),
      ...bookingData,
      status: bookingData.status || 'pending',
      createdAt: new Date().toISOString(),
      messages: [] // Track messages for this booking
    };

    bookings.push(booking);
    localStorage.setItem(this.STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));

    return booking;
  }

  /**
   * Get booking by ID
   */
  getBookingById(bookingId) {
    const bookings = this.getAllBookings();
    return bookings.find(b => b.id === bookingId);
  }

  /**
   * Get all bookings
   */
  getAllBookings() {
    const stored = localStorage.getItem(this.STORAGE_KEY_BOOKINGS);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Get user bookings
   */
  getUserBookings(userId, role) {
    const bookings = this.getAllBookings();
    
    if (role === 'customer') {
      return bookings.filter(b => b.customerId === userId);
    } else if (['caregiver', 'pet_care', 'garden_maintenance', 'house_cleaning'].includes(role)) {
      return bookings.filter(b => b.providerId === userId);
    }
    
    return bookings;
  }

  /**
   * Update booking
   */
  updateBooking(bookingId, updates) {
    const bookings = this.getAllBookings();
    const index = bookings.findIndex(b => b.id === bookingId);

    if (index === -1) {
      throw new Error('Booking not found');
    }

    bookings[index] = {
      ...bookings[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(this.STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    return bookings[index];
  }

  /**
   * ========== DEMO ACCOUNTS ==========
   */

  initializeDemoAccounts() {
    // Only initialize if no users exist
    if (this.getAllUsers().length > 0) {
      return;
    }

    const demoAccounts = [
      {
        email: 'superadmin@test.com',
        password: '123456',
        role: 'super_admin',
        firstName: 'Super',
        lastName: 'Admin',
        phone: '(555) 000-0001',
        verified: true
      },
      {
        email: 'platformadmin@test.com',
        password: '123456',
        role: 'platform_admin',
        firstName: 'Platform',
        lastName: 'Admin',
        phone: '(555) 000-0002',
        verified: true
      },
      {
        email: 'hradmin@test.com',
        password: '123456',
        role: 'hr_admin',
        firstName: 'HR',
        lastName: 'Admin',
        phone: '(555) 000-0003',
        verified: true
      },
      {
        email: 'operations@test.com',
        password: '123456',
        role: 'operations_admin',
        firstName: 'Operations',
        lastName: 'Admin',
        phone: '(555) 000-0004',
        verified: true
      },
      {
        email: 'caregiver@test.com',
        password: '123456',
        role: 'caregiver',
        firstName: 'John',
        lastName: 'Caregiver',
        phone: '(555) 111-0001',
        verified: true
      },
      {
        email: 'petcare@test.com',
        password: '123456',
        role: 'pet_care',
        firstName: 'Sarah',
        lastName: 'PetCare',
        phone: '(555) 111-0002',
        verified: true
      },
      {
        email: 'garden@test.com',
        password: '123456',
        role: 'garden_maintenance',
        firstName: 'Mike',
        lastName: 'Gardener',
        phone: '(555) 111-0003',
        verified: true
      },
      {
        email: 'cleaning@test.com',
        password: '123456',
        role: 'house_cleaning',
        firstName: 'Emma',
        lastName: 'Cleaner',
        phone: '(555) 111-0004',
        verified: true
      },
      {
        email: 'user@test.com',
        password: '123456',
        role: 'customer',
        firstName: 'John',
        lastName: 'Customer',
        phone: '(555) 222-0001',
        verified: true
      },
      {
        email: 'support@test.com',
        password: '123456',
        role: 'customer_support',
        firstName: 'Support',
        lastName: 'Agent',
        phone: '(555) 333-0001',
        verified: true
      },
      {
        email: 'moderator@test.com',
        password: '123456',
        role: 'moderator',
        firstName: 'Mod',
        lastName: 'Eration',
        phone: '(555) 333-0002',
        verified: true
      }
    ];

    // Register demo accounts
    demoAccounts.forEach(account => {
      try {
        this.registerUser(account);
      } catch (e) {
        // Account might already exist, that's ok
      }
    });
  }

  /**
   * ========== UTILITY FUNCTIONS ==========
   */

  /**
   * Generate unique ID
   */
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate avatar initials
   */
  generateAvatar(firstName = '', lastName = '') {
    const first = (firstName || '').charAt(0).toUpperCase();
    const last = (lastName || '').charAt(0).toUpperCase();
    return (first + last) || 'U';
  }

  /**
   * Verify role hierarchy
   */
  canManageRole(managingRole, targetRole) {
    const hierarchy = ['super_admin', 'platform_admin', 'hr_admin', 'operations_admin'];
    const managingLevel = hierarchy.indexOf(managingRole);
    const targetLevel = hierarchy.indexOf(targetRole);

    if (managingLevel === -1 || targetLevel === -1) return false;
    return managingLevel <= targetLevel;
  }

  /**
   * Get dashboard path for current user
   */
  getDashboardPath() {
    const user = this.getCurrentUser();
    if (!user) return '/pages/userLogin.html';

    const role = this.getUserRole();
    if (!role) return '/pages/dashboard.html';

    return role.dashboardPath;
  }

  /**
   * Get all role options for selection
   */
  getAllRoles() {
    return Object.values(this.ROLES);
  }

  /**
   * Get available roles for user creation (for admins)
   */
  getAvailableRolesToCreate(adminRoleId) {
    const allRoles = Object.values(this.ROLES);
    
    switch (adminRoleId) {
      case 'super_admin':
        return allRoles;
      
      case 'platform_admin':
        return allRoles.filter(r => 
          ['customer', 'customer_support'].includes(r.id)
        );
      
      case 'hr_admin':
        return allRoles.filter(r => 
          r.id.includes('provider') || r.id.includes('caregiver') || 
          ['caregiver', 'pet_care', 'garden_maintenance', 'house_cleaning'].includes(r.id)
        );
      
      case 'operations_admin':
        return allRoles.filter(r => 
          ['customer', 'caregiver', 'pet_care', 'garden_maintenance', 'house_cleaning'].includes(r.id)
        );
      
      default:
        return [allRoles.find(r => r.id === 'customer')];
    }
  }
}

// Initialize auth system globally
const auth = new AuthSystem();

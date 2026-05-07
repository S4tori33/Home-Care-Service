/**
 * Global Data Management System
 * Handles: Users, Bookings, Messages, Applications, System state
 * Uses localStorage for persistence
 */

const DEMO_USERS = [
  { email: 'superadmin@test.com', password: '123456', role: 'super_admin', name: 'Super Admin' },
  { email: 'platformadmin@test.com', password: '123456', role: 'platform_admin', name: 'Platform Admin' },
  { email: 'hradmin@test.com', password: '123456', role: 'hr_admin', name: 'HR Admin' },
  { email: 'operationsadmin@test.com', password: '123456', role: 'operations_admin', name: 'Operations Admin' },
  { email: 'caregiver@test.com', password: '123456', role: 'caregiver', name: 'John Caregiver' },
  { email: 'petcare@test.com', password: '123456', role: 'pet_care', name: 'Maria Garcia' },
  { email: 'garden@test.com', password: '123456', role: 'garden_maintenance', name: 'James Taylor' },
  { email: 'cleaning@test.com', password: '123456', role: 'house_cleaning', name: 'Sarah Johnson' },
  { email: 'user@test.com', password: '123456', role: 'regular_user', name: 'John Doe' },
  { email: 'support@test.com', password: '123456', role: 'customer_support', name: 'Support Agent' },
  { email: 'moderator@test.com', password: '123456', role: 'moderator', name: 'Moderator' }
];

const DEMO_USERS_LIST = [
  { id: 'u1', name: 'John Doe', email: 'john.doe@example.com', phone: '(555) 123-4567', location: 'New York', bookings: 12, totalSpent: '$1,440', memberSince: 'Jan 15, 2024', status: 'Active', role: 'regular_user' },
  { id: 'u2', name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '(555) 234-5678', location: 'Los Angeles', bookings: 8, totalSpent: '$960', memberSince: 'Feb 20, 2024', status: 'Active', role: 'house_cleaning' },
  { id: 'u3', name: 'Michael Brown', email: 'm.brown@example.com', phone: '(555) 345-6789', location: 'Chicago', bookings: 15, totalSpent: '$1,800', memberSince: 'Nov 10, 2023', status: 'Active', role: 'caregiver' },
  { id: 'u4', name: 'Emily Davis', email: 'emily.d@example.com', phone: '(555) 456-7890', location: 'Houston', bookings: 5, totalSpent: '$600', memberSince: 'Mar 5, 2024', status: 'Active', role: 'regular_user' },
  { id: 'u5', name: 'David Wilson', email: 'david.w@example.com', phone: '(555) 567-8901', location: 'Phoenix', bookings: 2, totalSpent: '$240', memberSince: 'Apr 12, 2024', status: 'Inactive', role: 'regular_user' },
  { id: 'u6', name: 'Lisa Anderson', email: 'lisa.a@example.com', phone: '(555) 678-9012', location: 'Philadelphia', bookings: 0, totalSpent: '$0', memberSince: 'May 1, 2024', status: 'Banned', role: 'regular_user' }
];

const DEMO_APPLICATIONS = [
  { id: 'app1', name: 'Maria Garcia', email: 'maria.g@example.com', phone: '(555) 111-2222', serviceType: 'House Cleaning', experience: '5 years', appliedDate: 'May 1, 2024', status: 'Pending', initials: 'MG' },
  { id: 'app2', name: 'James Taylor', email: 'j.taylor@example.com', phone: '(555) 222-3333', serviceType: 'Garden Maintenance', experience: '8 years', appliedDate: 'May 2, 2024', status: 'Pending', initials: 'JT' },
  { id: 'app3', name: 'Lisa Anderson', email: 'lisa.a@example.com', phone: '(555) 333-4444', serviceType: 'Elderly Care', experience: '10 years', appliedDate: 'May 2, 2024', status: 'Pending', initials: 'LA' },
  { id: 'app4', name: 'Robert Martinez', email: 'robert.m@example.com', phone: '(555) 444-5555', serviceType: 'Pet Care', experience: '3 years', appliedDate: 'Apr 28, 2024', status: 'Approved', initials: 'RM' },
  { id: 'app5', name: 'Jennifer Lee', email: 'jennifer.l@example.com', phone: '(555) 555-6666', serviceType: 'House Cleaning', experience: '2 years', appliedDate: 'Apr 25, 2024', status: 'Rejected', initials: 'JL' }
];

const DEMO_BOOKINGS = [
  { id: 'b1', customerId: 'u1', customerName: 'John Doe', providerId: 'u2', providerName: 'Maria Garcia', serviceType: 'House Cleaning', date: 'May 5, 2026', time: '10:00 AM', location: '123 Main St, New York', status: 'Active' },
  { id: 'b2', customerId: 'u2', customerName: 'Sarah Johnson', providerId: null, providerName: 'Unassigned', serviceType: 'Pet Care', date: 'May 5, 2026', time: '2:00 PM', location: '456 Oak Ave, Los Angeles', status: 'Pending' },
  { id: 'b3', customerId: 'u3', customerName: 'Michael Brown', providerId: 'u3', providerName: 'James Taylor', serviceType: 'Garden Maintenance', date: 'May 6, 2026', time: '9:00 AM', location: '789 Pine Rd, Chicago', status: 'Active' },
  { id: 'b4', customerId: 'u4', customerName: 'Emily Davis', providerId: 'u4', providerName: 'Lisa Anderson', serviceType: 'Elderly Care', date: 'May 6, 2026', time: '11:00 AM', location: '321 Elm St, Houston', status: 'Active' },
  { id: 'b5', customerId: 'u5', customerName: 'David Wilson', providerId: null, providerName: 'Unassigned', serviceType: 'House Cleaning', date: 'May 7, 2026', time: '3:00 PM', location: '654 Maple Dr, Phoenix', status: 'Pending' }
];

const DEMO_MESSAGES = [
  // John Doe <-> Maria Garcia
  { id: 'msg1', senderId: 'u1', senderName: 'John Doe', receiverId: 'u2', receiverName: 'Maria Garcia', content: 'Hi Maria! Looking forward to your visit on May 5th.', timestamp: '2 hours ago', bookingId: 'b1' },
  { id: 'msg2', senderId: 'u2', senderName: 'Maria Garcia', receiverId: 'u1', receiverName: 'John Doe', content: 'Thank you! I\'ll be there at 10 AM. See you soon!', timestamp: '1 hour ago', bookingId: 'b1' }
];

class AppData {
  constructor() {
    this.STORAGE_USERS = 'hcs_users_list';
    this.STORAGE_BOOKINGS = 'hcs_bookings';
    this.STORAGE_MESSAGES = 'hcs_messages';
    this.STORAGE_APPLICATIONS = 'hcs_applications';
    this.CURRENT_USER = 'currentUser';
    
    this.initializeStorageIfEmpty();
  }

  /**
   * Initialize localStorage with demo data if empty
   */
  initializeStorageIfEmpty() {
    if (!localStorage.getItem(this.STORAGE_USERS)) {
      localStorage.setItem(this.STORAGE_USERS, JSON.stringify(DEMO_USERS_LIST));
    }
    if (!localStorage.getItem(this.STORAGE_BOOKINGS)) {
      localStorage.setItem(this.STORAGE_BOOKINGS, JSON.stringify(DEMO_BOOKINGS));
    }
    if (!localStorage.getItem(this.STORAGE_MESSAGES)) {
      localStorage.setItem(this.STORAGE_MESSAGES, JSON.stringify(DEMO_MESSAGES));
    }
    if (!localStorage.getItem(this.STORAGE_APPLICATIONS)) {
      localStorage.setItem(this.STORAGE_APPLICATIONS, JSON.stringify(DEMO_APPLICATIONS));
    }
  }

  /**
   * LOGIN: Validate credentials against demo users
   */
  login(email, password) {
    const user = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (!user) return null;

    // Create session user (without password)
    const sessionUser = { ...user };
    delete sessionUser.password;

    const persistedUser = DEMO_USERS_LIST.find(u => u.email === email);
    if (persistedUser) {
      sessionUser.id = persistedUser.id;
      sessionUser.role = persistedUser.role || sessionUser.role;
    }
    
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(sessionUser));
    return sessionUser;
  }

  /**
   * Get current logged-in user
   */
  getCurrentUser() {
    const user = localStorage.getItem(this.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  /**
   * LOGOUT: Clear current user
   */
  logout() {
    localStorage.removeItem(this.CURRENT_USER);
  }

  /**
   * Get all users
   */
  getAllUsers() {
    return JSON.parse(localStorage.getItem(this.STORAGE_USERS) || '[]');
  }

  /**
   * Add a new user (by admin)
   */
  addUser(user) {
    const users = this.getAllUsers();
    user.id = 'u' + (users.length + 1);
    users.push(user);
    localStorage.setItem(this.STORAGE_USERS, JSON.stringify(users));
    return user;
  }

  /**
   * Update user info
   */
  updateUser(userId, updates) {
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(this.STORAGE_USERS, JSON.stringify(users));
    return users[index];
  }

  /**
   * Delete user
   */
  deleteUser(userId) {
    const users = this.getAllUsers();
    const filtered = users.filter(u => u.id !== userId);
    localStorage.setItem(this.STORAGE_USERS, JSON.stringify(filtered));
  }

  /**
   * Ban user
   */
  banUser(userId) {
    return this.updateUser(userId, { status: 'Banned' });
  }

  /**
   * Get all bookings
   */
  getAllBookings() {
    return JSON.parse(localStorage.getItem(this.STORAGE_BOOKINGS) || '[]');
  }

  /**
   * Get bookings for a specific user (customer or provider)
   */
  getUserBookings(userId) {
    const bookings = this.getAllBookings();
    return bookings.filter(b => b.customerId === userId || b.providerId === userId);
  }

  /**
   * Create a new booking
   */
  createBooking(customerId, serviceType, location, dateTime = {}, customerName = 'Customer', customerEmail = '', customerPhone = '') {
    const bookings = this.getAllBookings();
    const booking = {
      id: 'b' + (bookings.length + 1),
      customerId,
      customerName: customerName || 'Customer',
      customerEmail,
      customerPhone,
      providerId: null,
      providerName: 'Unassigned',
      serviceType,
      date: dateTime.date || '',
      time: dateTime.time || 'TBD',
      location,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    bookings.push(booking);
    localStorage.setItem(this.STORAGE_BOOKINGS, JSON.stringify(bookings));
    return booking;
  }

  /**
   * Assign a provider to a booking
   */
  assignProvider(bookingId, providerId) {
    const bookings = this.getAllBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return null;
    
    const provider = this.getAllUsers().find(u => u.id === providerId);
    if (!provider) return null;

    booking.providerId = providerId;
    booking.providerName = provider.name;
    booking.status = 'Active';
    
    localStorage.setItem(this.STORAGE_BOOKINGS, JSON.stringify(bookings));
    return booking;
  }

  /**
   * Get all messages
   */
  getAllMessages() {
    return JSON.parse(localStorage.getItem(this.STORAGE_MESSAGES) || '[]');
  }

  /**
   * Get messages between two users
   */
  getMessagesBetween(userId1, userId2) {
    const messages = this.getAllMessages();
    return messages.filter(m => 
      (m.senderId === userId1 && m.receiverId === userId2) ||
      (m.senderId === userId2 && m.receiverId === userId1)
    );
  }

  /**
   * Send a message
   */
  sendMessage(senderId, receiverId, content) {
    const messages = this.getAllMessages();
    const sender = this.getCurrentUser();
    const receiver = this.getAllUsers().find(u => u.id === receiverId);
    
    const message = {
      id: 'msg' + (messages.length + 1),
      senderId,
      senderName: sender.name,
      receiverId,
      receiverName: receiver.name,
      content,
      timestamp: 'just now'
    };
    messages.push(message);
    localStorage.setItem(this.STORAGE_MESSAGES, JSON.stringify(messages));
    return message;
  }

  /**
   * Get all applications
   */
  getAllApplications() {
    return JSON.parse(localStorage.getItem(this.STORAGE_APPLICATIONS) || '[]');
  }

  /**
   * Update application status
   */
  updateApplicationStatus(appId, status) {
    const apps = this.getAllApplications();
    const app = apps.find(a => a.id === appId);
    if (!app) return null;
    app.status = status;
    localStorage.setItem(this.STORAGE_APPLICATIONS, JSON.stringify(apps));
    return app;
  }

  /**
   * Get applications by status
   */
  getApplicationsByStatus(status) {
    const apps = this.getAllApplications();
    if (status === 'All') return apps;
    return apps.filter(a => a.status === status);
  }

  /**
   * Get pending applications count
   */
  getPendingCount() {
    return this.getApplicationsByStatus('Pending').length;
  }
}

// Create global data instance
const appData = new AppData();

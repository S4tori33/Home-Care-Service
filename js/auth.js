// Authentication and Account Management System

class AuthSystem {
    constructor() {
        this.STORAGE_KEY = 'hcs_users';
        this.CURRENT_USER_KEY = 'hcs_current_user';
        this.initializeStorage();
    }

    // Initialize storage with default admin if empty
    initializeStorage() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            const defaultUsers = [
                {
                    id: 'admin_001',
                    email: 'admin@hcs.com',
                    password: 'Admin123',
                    role: 'admin',
                    firstName: 'Admin',
                    lastName: 'User',
                    phone: '',
                    zipCode: '',
                    birthdate: ''
                }
            ];
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(defaultUsers));
        }
    }

    // Get all users
    getAllUsers() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    }

    // Find user by email
    findUserByEmail(email) {
        const users = this.getAllUsers();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    // Generate unique user ID
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Register new user
    registerUser(userData) {
        const { email, password, firstName, lastName, middleInitial, phone, zipCode, birthdate, role } = userData;

        // Validate email doesn't exist
        if (this.findUserByEmail(email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Validate password
        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        // Validate role
        if (!['customer', 'jobseeker'].includes(role)) {
            return { success: false, message: 'Invalid account type selected' };
        }

        const newUser = {
            id: this.generateUserId(),
            email,
            password, // In production, this should be hashed
            role,
            firstName,
            lastName,
            middleInitial: middleInitial || '',
            phone,
            zipCode,
            birthdate,
            createdAt: new Date().toISOString()
        };

        const users = this.getAllUsers();
        users.push(newUser);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));

        return { success: true, message: 'Account created successfully', user: newUser };
    }

    // Login user
    loginUser(email, password) {
        const user = this.findUserByEmail(email);

        if (!user) {
            return { success: false, message: 'Email not found' };
        }

        if (user.password !== password) {
            return { success: false, message: 'Incorrect password' };
        }

        // Store current user session
        const sessionUser = { ...user };
        delete sessionUser.password; // Don't store password in session
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(sessionUser));

        return { success: true, message: 'Login successful', user: sessionUser };
    }

    // Get current logged-in user
    getCurrentUser() {
        const userStr = localStorage.getItem(this.CURRENT_USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    // Check user role
    getUserRole() {
        const user = this.getCurrentUser();
        return user ? user.role : null;
    }

    // Logout user
    logout() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
    }

    // Update user profile
    updateUserProfile(userId, updates) {
        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }

        // Don't allow role changes through update
        const { role, password, id, email, ...safeUpdates } = updates;

        users[userIndex] = { ...users[userIndex], ...safeUpdates };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));

        // Update current user session if it's the logged-in user
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            const updatedUser = { ...currentUser, ...safeUpdates };
            localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(updatedUser));
        }

        return { success: true, message: 'Profile updated', user: users[userIndex] };
    }

    // Check if user has required role
    hasRole(requiredRole) {
        const userRole = this.getUserRole();
        return userRole === requiredRole;
    }

    // Get display name
    getDisplayName() {
        const user = this.getCurrentUser();
        return user ? `${user.firstName} ${user.lastName}` : 'Guest';
    }
}

// Create global auth instance
const auth = new AuthSystem();

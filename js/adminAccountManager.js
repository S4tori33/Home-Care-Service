// Enhanced Admin Dashboard with Account Management

class AdminAccountManager {
    constructor() {
        this.currentView = 'dashboard';
        this.editingUserId = null;
    }

    // Get all users with statistics
    getAllUsersWithStats() {
        const users = auth.getAllUsers();
        return {
            total: users.length - 1, // Exclude admin
            customers: users.filter(u => u.role === 'customer'),
            jobseekers: users.filter(u => u.role === 'jobseeker'),
            all: users.filter(u => u.role !== 'admin')
        };
    }

    // Get dashboard statistics
    getDashboardStats() {
        const users = this.getAllUsersWithStats();
        const now = new Date();
        
        return {
            totalUsers: users.all.length,
            customers: users.customers.length,
            jobseekers: users.jobseekers.length,
            monthlyNewUsers: users.all.filter(u => {
                const created = new Date(u.createdAt);
                return created.getMonth() === now.getMonth();
            }).length,
            activeBookings: Math.floor(Math.random() * 100 + 50),
            completedBookings: Math.floor(Math.random() * 1000 + 1000),
            monthlyRevenue: (Math.random() * 20000 + 40000).toFixed(2)
        };
    }

    // Add new account
    addUser(userData) {
        try {
            const result = auth.registerUser(userData);
            if (result.success) {
                this.showNotification('User account created successfully', 'success');
                return { success: true, user: result.user };
            } else {
                this.showNotification(result.message, 'error');
                return { success: false, message: result.message };
            }
        } catch (e) {
            this.showNotification('Error creating account: ' + e.message, 'error');
            return { success: false, message: e.message };
        }
    }

    // Update user account
    updateUser(userId, updates) {
        try {
            const result = auth.updateUserProfile(userId, updates);
            if (result.success) {
                this.showNotification('User account updated successfully', 'success');
                return { success: true, user: result.user };
            } else {
                this.showNotification(result.message, 'error');
                return { success: false, message: result.message };
            }
        } catch (e) {
            this.showNotification('Error updating account: ' + e.message, 'error');
            return { success: false, message: e.message };
        }
    }

    // Delete user account
    deleteUser(userId) {
        if (!confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
            return false;
        }

        try {
            const users = auth.getAllUsers();
            const index = users.findIndex(u => u.id === userId);

            if (index === -1) {
                this.showNotification('User not found', 'error');
                return false;
            }

            users.splice(index, 1);
            localStorage.setItem('hcs_users', JSON.stringify(users));
            this.showNotification('User account deleted successfully', 'success');
            return true;
        } catch (e) {
            this.showNotification('Error deleting account: ' + e.message, 'error');
            return false;
        }
    }

    // Get user by ID
    getUserById(userId) {
        const users = auth.getAllUsers();
        return users.find(u => u.id === userId);
    }

    // Get all customers
    getCustomers() {
        const users = auth.getAllUsers();
        return users.filter(u => u.role === 'customer');
    }

    // Get all job seekers
    getJobSeekers() {
        const users = auth.getAllUsers();
        return users.filter(u => u.role === 'jobseeker');
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Format role for display
    formatRole(role) {
        return role.charAt(0).toUpperCase() + role.slice(1);
    }

    // Export users to CSV
    exportToCSV() {
        const users = this.getAllUsersWithStats().all;
        let csv = 'ID,Name,Email,Role,Phone,Created Date\n';
        
        users.forEach(u => {
            csv += `${u.id},"${u.firstName} ${u.lastName}",${u.email},${u.role},${u.phone},"${this.formatDate(u.createdAt)}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hcs_users_' + new Date().getTime() + '.csv';
        a.click();
        window.URL.revokeObjectURL(url);

        this.showNotification('Accounts exported to CSV', 'success');
    }
}

// Initialize admin manager
const adminManager = new AdminAccountManager();

// Setup account management UI after DOM loads
document.addEventListener('DOMContentLoaded', setupAccountManagement);

function showAccountsManagementPanel() {
    const managementPanel = document.getElementById('accountsManagementPanel');
    if (managementPanel) {
        managementPanel.classList.add('active');
    }
    refreshAccountsTable();
}

function openAddUserModal() {
    const modal = document.getElementById('addUserModal');
    if (modal) {
        document.getElementById('addUserForm').reset();
        modal.classList.add('active');
    }
}

function openEditModal(userId) {
    const user = adminManager.getUserById(userId);
    if (!user) return;

    const modal = document.getElementById('editUserModal');
    if (modal) {
        document.getElementById('editUserId').value = user.id;
        document.getElementById('editFirstName').value = user.firstName;
        document.getElementById('editLastName').value = user.lastName;
        document.getElementById('editEmail').value = user.email;
        document.getElementById('editPhone').value = user.phone;
        document.getElementById('editZipCode').value = user.zipCode;
        document.getElementById('editRole').value = user.role;

        modal.classList.add('active');
    }
}

function handleAddUser(e) {
    e.preventDefault();

    const userData = {
        firstName: document.getElementById('addFirstName').value,
        lastName: document.getElementById('addLastName').value,
        email: document.getElementById('addEmail').value,
        phone: document.getElementById('addPhone').value,
        zipCode: document.getElementById('addZipCode').value,
        password: document.getElementById('addPassword').value,
        birthdate: document.getElementById('addBirthdate').value,
        role: document.getElementById('addRole').value
    };

    const result = adminManager.addUser(userData);
    if (result.success) {
        document.getElementById('addUserModal').classList.remove('active');
        refreshAccountsTable();
    }
}

function handleEditUser(e) {
    e.preventDefault();

    const userId = document.getElementById('editUserId').value;
    const updates = {
        firstName: document.getElementById('editFirstName').value,
        lastName: document.getElementById('editLastName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        zipCode: document.getElementById('editZipCode').value,
        role: document.getElementById('editRole').value
    };

    const result = adminManager.updateUser(userId, updates);
    if (result.success) {
        document.getElementById('editUserModal').classList.remove('active');
        refreshAccountsTable();
    }
}

function deleteUser(userId) {
    if (adminManager.deleteUser(userId)) {
        refreshAccountsTable();
    }
}

function refreshAccountsTable() {
    const tableBody = document.getElementById('accountsTableBody');
    if (!tableBody) return;

    const users = adminManager.getAllUsersWithStats().all;
    tableBody.innerHTML = '';

    if (users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No accounts found</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td><span class="role-badge role-${user.role}">${adminManager.formatRole(user.role)}</span></td>
            <td>${user.phone}</td>
            <td>${adminManager.formatDate(user.createdAt)}</td>
            <td class="action-buttons">
                <button class="btn-icon" onclick="openEditModal('${user.id}')" title="Edit">✏️</button>
                <button class="btn-icon" onclick="deleteUser('${user.id}')" title="Delete">🗑️</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    updateAccountStats();
}

function updateAccountStats() {
    const stats = adminManager.getAllUsersWithStats();
    
    const customerCount = document.getElementById('customerCount');
    const jobseekerCount = document.getElementById('jobseekerCount');
    const totalCount = document.getElementById('totalCount');

    if (customerCount) customerCount.textContent = stats.customers.length;
    if (jobseekerCount) jobseekerCount.textContent = stats.jobseekers.length;
    if (totalCount) totalCount.textContent = stats.all.length;
}

function filterAccounts(role) {
    const tableBody = document.getElementById('accountsTableBody');
    if (!tableBody) return;

    let users;
    if (role === 'customer') {
        users = adminManager.getCustomers();
    } else if (role === 'jobseeker') {
        users = adminManager.getJobSeekers();
    } else {
        users = adminManager.getAllUsersWithStats().all;
    }

    tableBody.innerHTML = '';

    if (users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No accounts found</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td><span class="role-badge role-${user.role}">${adminManager.formatRole(user.role)}</span></td>
            <td>${user.phone}</td>
            <td>${adminManager.formatDate(user.createdAt)}</td>
            <td class="action-buttons">
                <button class="btn-icon" onclick="openEditModal('${user.id}')" title="Edit">✏️</button>
                <button class="btn-icon" onclick="deleteUser('${user.id}')" title="Delete">🗑️</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

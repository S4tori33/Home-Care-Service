/**
 * RESPONSIVE BOOTSTRAP TEMPLATE
 * Copy this template into your dashboard HTML files
 * 
 * STEP-BY-STEP INTEGRATION:
 * 
 * 1. ADD CSS IN <head> (before closing </head>):
 *    - Link to responsive.css
 *    - Link to dashboard-responsive.css  
 *    - Link to page-specific CSS
 * 
 * 2. ADD HTML STRUCTURE:
 *    - Use .dashboard-layout wrapper
 *    - Use .dashboard-sidebar for nav
 *    - Use .dashboard-overlay for mobile backdrop
 *    - Use .dashboard-main for content
 * 
 * 3. ADD HAMBURGER BUTTON:
 *    - Add button with class .sidebar-toggle or data-sidebar-toggle
 *    - Place in navbar/header
 * 
 * 4. ADD SCRIPTS IN <body> (at bottom, in this order):
 *    - storage.js (foundation)
 *    - sync.js (event system)
 *    - mobileResponsive.js (mobile utilities)
 *    - dashboardInit.js (dashboard helper)
 *    - YOUR dashboard-specific script last
 */

/**
 * MINIMAL DASHBOARD SETUP EXAMPLE
 */

// 1. INITIALIZE DASHBOARD IN YOUR JS FILE
document.addEventListener('DOMContentLoaded', () => {
  // Setup dashboard - replace 'my-dashboard' and roles as needed
  DashboardInit.setup('my-dashboard', ['super_admin', 'op_admin']);

  // Subscribe to user updates
  const unsubscribeUsers = DashboardInit.subscribeToUpdates('users', (updatedUsers) => {
    updateUsersTable(updatedUsers);
  });

  // Subscribe to service updates  
  const unsubscribeServices = DashboardInit.subscribeToUpdates('services', (updatedServices) => {
    updateServicesTable(updatedServices);
  });

  // Load initial data
  loadDashboardData();
});

// 2. EXAMPLE: Update users table when data changes
function updateUsersTable(users) {
  const tbody = document.querySelector('table#users-table tbody');
  if (!tbody) return;

  tbody.innerHTML = users.map(user => `
    <tr>
      <td data-label="Name">${user.name}</td>
      <td data-label="Email">${user.email}</td>
      <td data-label="Role">${user.role}</td>
      <td data-label="Status">
        <span class="badge ${user.active ? 'status-approved' : 'status-pending'}">
          ${user.active ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td data-label="Actions">
        <button onclick="editUser(${user.id})" class="btn-small">Edit</button>
        <button onclick="deleteUser(${user.id})" class="btn-small btn-danger">Delete</button>
      </td>
    </tr>
  `).join('');
}

// 3. EXAMPLE: Add new user to storage
function addNewUser(userData) {
  DashboardInit.addData('users', userData);
  DashboardInit.showNotification('User added successfully', 'success');
  DashboardInit.logAction('user_added', { userId: userData.id });
}

// 4. EXAMPLE: Update existing user
function updateUser(userId, updates) {
  const result = DashboardInit.updateData('users', userId, updates);
  if (result) {
    DashboardInit.showNotification('User updated', 'success');
    DashboardInit.logAction('user_updated', { userId, updates });
  }
}

// 5. EXAMPLE: Delete user
function deleteUser(userId) {
  if (confirm('Are you sure?')) {
    DashboardInit.removeData('users', userId);
    DashboardInit.showNotification('User deleted', 'success');
    DashboardInit.logAction('user_deleted', { userId });
  }
}

// 6. EXAMPLE: Load initial dashboard
function loadDashboardData() {
  const users = DashboardInit.getData('users');
  updateUsersTable(users);
}

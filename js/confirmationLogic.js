/**
 * Confirmation Page Logic
 * Displays login success and redirects based on role
 */

document.addEventListener('DOMContentLoaded', () => {
  const user = appData.getCurrentUser();

  if (!user) {
    // No user logged in - redirect back to login
    window.location.href = '../index.html';
    return;
  }

  // Display user info
  const confirmAvatar = document.getElementById('confirmAvatar');
  const confirmName = document.getElementById('confirmName');
  const confirmRole = document.getElementById('confirmRole');

  // Set avatar initials
  const initials = user.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().substr(0, 2);
  confirmAvatar.textContent = initials;

  // Set name and role
  confirmName.textContent = user.name;
  confirmRole.textContent = user.role.replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Auto-redirect after 3 seconds or when Next is clicked
  setTimeout(() => {
    redirectToDashboard();
  }, 3000);
});

function redirectToDashboard() {
  const user = appData.getCurrentUser();

  if (!user) {
    window.location.href = '../index.html';
    return;
  }

  const dashboardMap = {
    'super_admin': 'superadminDashboard.html',
    'platform_admin': 'platformAdminDashboard.html',
    'hr_admin': 'hrAdminDashboard.html',
    'operations_admin': 'operationsAdminDashboard.html',
    'caregiver': 'caregiverDashboard.html',
    'pet_care': 'petCareDashboard.html',
    'garden_maintenance': 'gardenDashboard.html',
    'house_cleaning': 'cleaningDashboard.html',
    'regular_user': 'customerDashboard.html',
    'customer_support': 'supportDashboard.html',
    'moderator': 'moderatorDashboard.html'
  };

  const dashboard = dashboardMap[user.role] || 'customerDashboard.html';

  // Show loading state
  const nextBtn = document.getElementById('nextBtn');
  const loading = document.getElementById('loading');
  if (nextBtn) nextBtn.style.display = 'none';
  if (loading) loading.style.display = 'block';

  // Redirect with redirect message
  setTimeout(() => {
    window.location.href = dashboard;
  }, 500);
}

function goBackToLogin() {
  appData.logout();
  window.location.href = '../index.html';
}

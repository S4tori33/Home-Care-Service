// Dashboard Role-Based Display System

document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});

function initializeDashboard() {
    // Check if user is logged in
    if (!auth.isLoggedIn()) {
        window.location.href = 'userLogin.html';
        return;
    }

    const user = auth.getCurrentUser();
    const role = user.role;

    // Display user information
    updateUserProfile(user);

    // Display role-specific content
    displayRoleContent(role, user);

    // Setup logout
    setupLogout();
}

function updateUserProfile(user) {
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');
    const avatarEl = document.getElementById('avatarEl');

    if (userName) userName.textContent = `${user.firstName} ${user.lastName}`;
    if (userRole) userRole.textContent = formatRole(user.role);
    if (avatarEl) {
        const initials = (user.firstName[0] + user.lastName[0]).toUpperCase();
        avatarEl.textContent = initials;
    }
}

function formatRole(role) {
    return role === 'customer' ? 'Customer' : role === 'jobseeker' ? 'Job Seeker' : 'User';
}

function displayRoleContent(role, user) {
    // Hide/show content based on role
    const customerOnlyElements = document.querySelectorAll('[data-role="customer-only"]');
    const jobseekerOnlyElements = document.querySelectorAll('[data-role="jobseeker-only"]');

    if (role === 'customer') {
        // Show customer content
        customerOnlyElements.forEach(el => el.style.display = '');
        jobseekerOnlyElements.forEach(el => el.style.display = 'none');
        setupCustomerDashboard(user);
    } else if (role === 'jobseeker') {
        // Show jobseeker content
        customerOnlyElements.forEach(el => el.style.display = 'none');
        jobseekerOnlyElements.forEach(el => el.style.display = '');
        setupJobseekerDashboard(user);
    } else {
        // Guest/default
        customerOnlyElements.forEach(el => el.style.display = '');
        jobseekerOnlyElements.forEach(el => el.style.display = 'none');
    }
}

function setupCustomerDashboard(user) {
    // Customer-specific dashboard setup
    console.log('Loading customer dashboard for:', user.firstName);
    
    // Add customer-specific navigation items
    const sidebar = document.querySelector('.sidebar-nav');
    if (sidebar && !document.getElementById('customer-nav-items')) {
        const customerNav = document.createElement('div');
        customerNav.id = 'customer-nav-items';
        // Customer nav items are already in HTML, so we just need to show them
    }
}

function setupJobseekerDashboard(user) {
    // Jobseeker-specific dashboard setup
    console.log('Loading jobseeker dashboard for:', user.firstName);
    
    // Add jobseeker-specific navigation items
    const sidebar = document.querySelector('.sidebar-nav');
    if (sidebar && !document.getElementById('jobseeker-nav-items')) {
        const jobseekerNav = document.createElement('div');
        jobseekerNav.id = 'jobseeker-nav-items';
        // Add jobseeker-specific items
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            auth.logout();
            window.location.href = 'userLogin.html';
        });
    }
}

// Sidebar toggle functionality (existing code should remain)
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (sidebarOverlay) sidebarOverlay.classList.toggle('open');
    });

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('open');
        });
    }
}

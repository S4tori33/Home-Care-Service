// Admin Dashboard Initialization and Auth Check
document.addEventListener('DOMContentLoaded', () => {
    initializeAdminDashboard();
    updateDashboardMetrics();
});

function initializeAdminDashboard() {
    // Check if user is logged in and is admin
    if (!auth.isLoggedIn()) {
        window.location.href = 'userLogin.html';
        return;
    }

    const user = auth.getCurrentUser();
    
    if (user.role !== 'admin' && user.role !== 'super_admin') {
        alert('Access denied. Admin privileges required.');
        window.location.href = 'dashboard.html';
        return;
    }

    // Display admin user information
    updateAdminProfile(user);
    
    // Setup logout
    setupLogout();

    // Setup sidebar toggle
    setupSidebarToggle();
}

function updateAdminProfile(user) {
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');
    const avatarEl = document.getElementById('avatarEl');

    if (userName) userName.textContent = user.firstName + ' ' + user.lastName;
    if (userRole) userRole.textContent = 'Administrator';
    if (avatarEl) avatarEl.textContent = 'A';
}

function setupLogout() {
    // Setup navbar logout button
    const logoutLink = document.querySelector('a[href="userLogin.html"].active');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            auth.logout();
            window.location.href = 'userLogin.html';
        });
    }

    // Setup sidebar logout button if it exists
    const sidebarLogout = document.querySelector('.sidebar-item.logout');
    if (sidebarLogout) {
        sidebarLogout.addEventListener('click', (e) => {
            e.preventDefault();
            auth.logout();
            window.location.href = 'userLogin.html';
        });
    }
}

function setupSidebarToggle() {
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
}

function updateDashboardMetrics() {
    // Update metric display if adminManager is available
    if (typeof adminManager !== 'undefined') {
        const stats = adminManager.getDashboardStats();
        
        const metricCards = document.querySelectorAll('.metric-card');
        if (metricCards.length >= 4) {
            metricCards[0].querySelector('.metric-value').textContent = stats.totalUsers;
            metricCards[1].querySelector('.metric-value').textContent = stats.jobseekers;
            metricCards[2].querySelector('.metric-value').textContent = stats.activeBookings;
            metricCards[3].querySelector('.metric-value').textContent = '$' + parseFloat(stats.monthlyRevenue).toLocaleString();
        }
    }
}

// Admin Dashboard Charts (only when all canvases exist on this page)
(function initAdminCharts() {
    const trendEl = document.getElementById('trendChart');
    const distributionEl = document.getElementById('distributionChart');
    const performanceEl = document.getElementById('performanceChart');
    if (!trendEl || !distributionEl || !performanceEl) return;

    const trendCtx = trendEl.getContext('2d');
    new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [
                {
                    label: 'Bookings',
                    data: [45, 60, 75, 85, 75, 95, 105],
                    borderColor: '#3b5bdb',
                    backgroundColor: 'rgba(59, 91, 219, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#3b5bdb',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Revenue ($)',
                    data: [5000, 7000, 10500, 11500, 10500, 13500, 14000],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#22c55e',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Bookings',
                        color: '#3b5bdb'
                    },
                    ticks: { color: '#666' },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Revenue ($)',
                        color: '#22c55e'
                    },
                    ticks: { color: '#666' },
                    grid: { drawOnChartArea: false }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#1a1a1a',
                        font: { size: 12, weight: '600' },
                        usePointStyle: true,
                        padding: 15
                    }
                }
            }
        }
    });

    const distributionCtx = distributionEl.getContext('2d');
    new Chart(distributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['House Cleaning', 'Maintenance', 'Elderly Care', 'Pet Care', 'Handyman'],
            datasets: [{
                data: [30, 20, 21, 16, 13],
                backgroundColor: ['#3b5bdb', '#f97316', '#ef4444', '#8b5cf6', '#06b6d4'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#1a1a1a',
                        font: { size: 12, weight: '600' },
                        padding: 15,
                        usePointStyle: true
                    }
                }
            }
        }
    });

    const performanceCtx = performanceEl.getContext('2d');
    new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [{
                label: 'Total Bookings',
                data: [45, 60, 65, 75, 70, 100, 90],
                backgroundColor: '#3b5bdb',
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 120,
                    ticks: { color: '#666', stepSize: 30 },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                },
                x: {
                    ticks: { color: '#666' },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#1a1a1a',
                        font: { size: 12, weight: '600' },
                        usePointStyle: true,
                        padding: 15
                    }
                }
            }
        }
    });
})();

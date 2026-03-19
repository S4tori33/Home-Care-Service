// Admin login page logic

// Basic form handling. Replace with real authentication as needed.
const adminForm = document.getElementById('adminForm');

adminForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value.trim();

    // Simple placeholder authentication.
    // Replace this with real validation / API call.
    if (email.toLowerCase() === 'admin@hcs.com' && password === 'Admin123') {
        window.location.href = 'adminDashboard.html';
    } else {
        alert('Invalid admin credentials. Try email: admin@hcs.com / password: Admin123');
    }
});

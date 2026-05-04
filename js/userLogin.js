// Tab switching functionality
const formTabs = document.getElementById('formTabs');
const tabBtns = formTabs.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.form');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetForm = btn.getAttribute('data-form');

        // Update tab states
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update form tabs container
        formTabs.classList.remove('login', 'signup');
        formTabs.classList.add(targetForm);

        // Show target form
        forms.forEach(form => {
            form.classList.remove('active');
            if (form.id === targetForm + 'Form') {
                form.classList.add('active');
            }
        });
    });
});

// Admin credentials
const ADMIN_USERS = [
    { email: 'admin@hcs.com', password: 'Admin123' }
];

// Check if user is admin
function isAdminUser(email, password) {
    return ADMIN_USERS.some(admin => 
        admin.email.toLowerCase() === email.toLowerCase() && 
        admin.password === password
    );
}

// Form submission handlers
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    // Check if it's an admin user
    if (isAdminUser(email, password)) {
        window.location.href = 'adminDashboard.html';
    } else if (email && password) {
        // Regular user login - temporary redirect to home
        window.location.href = '../home.html';
    } else {
        alert('Please enter your email and password.');
    }
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    
    // Validate password strength (basic check)
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }
    
    // All validations passed - collect form data
    const formData = {
        lastName: document.getElementById('signupLastName').value,
        firstName: document.getElementById('signupFirstName').value,
        middleInitial: document.getElementById('signupMiddleInitial').value,
        email: document.getElementById('signupEmail').value,
        phone: document.getElementById('signupPhone').value,
        zipCode: document.getElementById('signupZipCode').value,
        birthdate: document.getElementById('signupBirthdate').value
    };
    
    // Display success message (in production, this would send to server)
    alert('Sign up successful! You can now log in with your email and password.');
    console.log('Sign up data:', formData);
    
    // Reset form
    document.getElementById('signupForm').reset();
    
    // Switch back to login tab
    document.querySelector('[data-form="login"]').click();
});
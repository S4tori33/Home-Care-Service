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

// Login form submission handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    if (!email || !password) {
        alert('Please enter your email and password.');
        return;
    }

    // Use auth system to login
    const result = auth.loginUser(email, password);
    
    if (result.success) {
        const user = result.user;
        
        // Redirect based on role
        if (user.role === 'admin') {
            window.location.href = 'adminDashboard.html';
        } else if (user.role === 'customer') {
            window.location.href = 'dashboard.html?role=customer';
        } else if (user.role === 'jobseeker') {
            window.location.href = 'dashboard.html?role=jobseeker';
        }
    } else {
        alert('Login failed: ' + result.message);
    }
});

// Signup form submission handler
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const role = document.getElementById('signupRole').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    
    // Validate password strength
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Validate role selection
    if (!role) {
        alert('Please select an account type.');
        return;
    }
    
    // Collect form data
    const formData = {
        lastName: document.getElementById('signupLastName').value,
        firstName: document.getElementById('signupFirstName').value,
        middleInitial: document.getElementById('signupMiddleInitial').value,
        email: document.getElementById('signupEmail').value,
        phone: document.getElementById('signupPhone').value,
        zipCode: document.getElementById('signupZipCode').value,
        password: password,
        birthdate: document.getElementById('signupBirthdate').value,
        role: role
    };
    
    // Register user through auth system
    const result = auth.registerUser(formData);
    
    if (result.success) {
        alert('Sign up successful! You can now log in with your email and password.');
        console.log('New user created:', result.user);
        
        // Reset form
        document.getElementById('signupForm').reset();
        
        // Switch back to login tab
        document.querySelector('[data-form="login"]').click();
    } else {
        alert('Sign up failed: ' + result.message);
    }
});
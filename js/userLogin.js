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

    console.log(`[LoginForm] Attempting login for: ${email}`);
    
    // Use auth system to login
    const result = auth.loginUser(email, password);
    
    console.log(`[LoginForm] Login result:`, result);
    
    if (result.success) {
        console.log(`[LoginForm] ✓ Login successful, redirecting to confirmation...`);
        // Redirect to confirmation page (which will handle role-based dashboard routing)
        window.location.href = 'authConfirmation.html';
    } else {
        console.log(`[LoginForm] ❌ Login failed: ${result.message}`);
        alert(result.message);
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
    const registerResult = auth.registerUser(formData);
    
    console.log(`[SignupForm] Register result:`, registerResult);
    
    if (registerResult && registerResult.success !== false) {
        // Auto-login the newly registered user
        const loginResult = auth.loginUser(formData.email, formData.password);
        console.log(`[SignupForm] Auto-login result:`, loginResult);
        
        if (loginResult.success) {
            console.log(`[SignupForm] ✓ Auto-login successful, redirecting...`);
            // Redirect to confirmation page
            window.location.href = 'authConfirmation.html';
        } else {
            alert('Account created! Please log in with your email and password.');
            // Reset form and switch to login
            document.getElementById('signupForm').reset();
            document.querySelector('[data-form="login"]').click();
        }
    } else {
        const errorMsg = registerResult?.message || 'An error occurred during sign up';
        console.log(`[SignupForm] ❌ Registration failed: ${errorMsg}`);
        alert('Sign up failed: ' + errorMsg);
    }
});
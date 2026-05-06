// Tab switching
const formTabs = document.getElementById('formTabs');
const tabBtns = formTabs.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.form');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetForm = btn.getAttribute('data-form');
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        formTabs.classList.remove('login', 'signup');
        formTabs.classList.add(targetForm);
        forms.forEach(form => {
            form.classList.remove('active');
            if (form.id === targetForm + 'Form') {
                form.classList.add('active');
            }
        });
    });
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        alert('Please enter your email and password.');
        return;
    }

    const result = auth.loginUser(email, password);

    if (result.success) {
        const user = auth.getCurrentUser();
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'confirmation.html';
    } else {
        alert(result.message || 'Invalid email or password');
    }
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const role = document.getElementById('signupRole').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    if (!role) {
        alert('Please select an account type.');
        return;
    }

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

    const registerResult = auth.registerUser(formData);

    if (registerResult && registerResult.success !== false) {
        const loginResult = auth.loginUser(formData.email, formData.password);
        if (loginResult.success) {
            const user = auth.getCurrentUser();
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'confirmation.html';
        } else {
            alert('Account created! Please log in with your email and password.');
            document.getElementById('signupForm').reset();
            document.querySelector('[data-form="login"]').click();
        }
    } else {
        alert('Sign up failed: ' + (registerResult?.message || 'Unknown error'));
    }
});

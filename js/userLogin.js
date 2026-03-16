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

// Form submission handlers (placeholder)
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // temporary redirect to home
    window.location.href = '../home.html';
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle signup logic here
    alert('Sign up functionality would be implemented here');
});
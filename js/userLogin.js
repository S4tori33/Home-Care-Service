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
    const role = document.querySelector('input[name="loginRole"]:checked').value;
    if (role === 'user') {
        window.location.href = '../home.html';
    } else if (role === 'jobseeker') {
        window.location.href = 'dashboard.html'; // Assuming job seekers go to dashboard
    }
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const role = document.querySelector('input[name="signupRole"]:checked').value;
    // Handle signup logic here
    alert(`Sign up as ${role} functionality would be implemented here`);
});
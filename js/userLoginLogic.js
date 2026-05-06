/**
 * Simple Demo Login Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');

  // Form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showError('Please enter email and password');
      return;
    }

    // Attempt login
    const user = appData.login(email, password);

    if (!user) {
      showError('Invalid email or password');
      return;
    }

    // Login successful - redirect to confirmation page
    window.location.href = 'authConfirmation.html';
  });

  function showError(message) {
    loginError.textContent = message;
    loginError.style.display = 'block';
    setTimeout(() => {
      loginError.style.display = 'none';
    }, 5000);
  }

  // Pre-fill with first demo account for testing
  emailInput.value = 'superadmin@test.com';
  passwordInput.value = '123456';
});

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

function toggleMenu() {
    const nav = document.querySelector("nav ul");
    nav.classList.toggle("show");
}

/*function showAlert() {
    alert("Thank you for choosing HCS! Please email us at contactspeared@gmail.com.");
}
*/

// Sidebar toggle — works on ALL screen sizes
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
const toggle  = document.getElementById('sidebarToggle');

function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    toggle.classList.add('open');
}
function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    toggle.classList.remove('open');
}
toggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});
overlay.addEventListener('click', closeSidebar);

// Active sidebar item + close on click
document.querySelectorAll('.sidebar-item[data-page]').forEach(item => {
    item.addEventListener('click', function(e) {
        if (!this.getAttribute('href') || this.getAttribute('href') === '#') e.preventDefault();
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        closeSidebar();
    });
});

// Navbar scroll highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 90) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        if (!current && link.getAttribute('href') === '#') link.classList.add('active');
    });
});

function showAlert() {
    alert('📞 Thank you for reaching out! HCS will contact you shortly.');
}

// ── PROFILE PAGE FUNCTIONALITY ───────────────────────────────────────

// Tab switching functionality
function initializeProfileTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab
            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Avatar upload functionality
function initializeAvatarUpload() {
    const avatarInput = document.getElementById('avatarUpload');
    const profileAvatar = document.getElementById('profileAvatar');
    const editBtn = document.querySelector('.avatar-edit-btn');

    if (!avatarInput || !profileAvatar || !editBtn) return;

    editBtn.addEventListener('click', () => {
        avatarInput.click();
    });

    avatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileAvatar.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Toggle switches functionality
function initializeToggles() {
    const toggles = document.querySelectorAll('.toggle-switch');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
        });
    });
}

// Form validation and saving
function initializeFormHandling() {
    const forms = document.querySelectorAll('.profile-form');

    forms.forEach(form => {
        const saveBtn = form.querySelector('.btn-success');
        const cancelBtn = form.querySelector('.btn-secondary');

        if (saveBtn) {
            saveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (validateForm(form)) {
                    showSuccessMessage('Profile updated successfully!');
                }
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', (e) => {
                e.preventDefault();
                resetForm(form);
                showInfoMessage('Changes cancelled.');
            });
        }
    });
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });

    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });

    // Phone validation
    const phoneFields = form.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        if (field.value && !isValidPhone(field.value)) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        }
    });

    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Field error handling
function showFieldError(field, message) {
    clearFieldError(field);
    field.style.borderColor = '#e74c3c';
    field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.2)';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '4px';

    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Reset form to original values
function resetForm(form) {
    form.reset();
    // Clear any error states
    form.querySelectorAll('input, select, textarea').forEach(field => {
        clearFieldError(field);
    });
}

// Message display functions
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showInfoMessage(message) {
    showMessage(message, 'info');
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMsg = document.querySelector('.profile-message');
    if (existingMsg) existingMsg.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = `profile-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-family: 'DM Sans', sans-serif;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' ? 'background: linear-gradient(135deg, #27ae60, #2ecc71);' : 'background: rgba(255,255,255,0.9); color: #333;'}
    `;

    document.body.appendChild(messageDiv);

    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Add message animations to CSS if not already present
if (!document.querySelector('#profile-message-styles')) {
    const style = document.createElement('style');
    style.id = 'profile-message-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all profile functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProfileTabs();
    initializeAvatarUpload();
    initializeToggles();
    initializeFormHandling();
});
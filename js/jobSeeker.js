// Job Seeker Application Form Handler

// Form submission
document.getElementById('jobApplicationForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'about'];
    let isValid = true;

    requiredFields.forEach(field => {
        if (!data[field] || !data[field].trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });

    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    if (data.phone && !isValidPhone(data.phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Process availability checkboxes
    const availability = formData.getAll('availability');
    data.availability = availability;

    // Show success message
    showSuccessMessage();

    // Provide browser alert confirmation
    alert('Your application has been submitted successfully!');

    // Reset form
    e.target.reset();

    // Clear any remaining errors
    clearAllErrors();
});

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
function showFieldError(fieldId, message) {
    clearFieldError(fieldId);
    const field = document.getElementById(fieldId);
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

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = '';
    field.style.boxShadow = '';

    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearAllErrors() {
    document.querySelectorAll('.field-error').forEach(error => error.remove());
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    });
}

// Success message
function showSuccessMessage() {
    // Remove existing messages
    const existingMsg = document.querySelector('.success-message');
    if (existingMsg) existingMsg.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = `
        <div style="text-align: center; padding: 20px; background: rgba(39, 174, 96, 0.1); border: 1px solid rgba(39, 174, 96, 0.3); border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #27ae60; margin-bottom: 10px;">Application Submitted Successfully!</h3>
            <p style="color: #ffffff; margin: 0;">Thank you for your interest in joining Home Care Service. We have received your application and will review it shortly. You should hear back from us within 3-5 business days.</p>
        </div>
    `;

    // Insert at the top of the application container
    const container = document.querySelector('.application-container');
    container.insertBefore(messageDiv, container.firstChild);

    // Scroll to top
    messageDiv.scrollIntoView({ behavior: 'smooth' });

    // Auto remove after 10 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 10000);
}

// Sidebar toggle functionality
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
const toggle = document.getElementById('sidebarToggle');

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
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

function toggleMenu() {
    const nav = document.querySelector("nav ul");
    nav.classList.toggle("show");
}

function recordSidebarToggle(action) {
    if (!['open', 'close'].includes(action)) return;
    const key = 'sidebarToggleUsage';

    try {
        const stored = localStorage.getItem(key);
        const data = stored ? JSON.parse(stored) : {
            openCount: 0,
            closeCount: 0,
            lastAction: '',
            lastTimestamp: ''
        };

        if (action === 'open') data.openCount += 1;
        if (action === 'close') data.closeCount += 1;
        data.lastAction = action;
        data.lastTimestamp = new Date().toISOString();

        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.debug('Sidebar toggle tracking unavailable:', error);
    }
}

/*function showAlert() {
    alert("Thank you for choosing HCS! Please email us at contactspeared@gmail.com.");
}
*/

// Sidebar toggle — works on ALL screen sizes
function initializeSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const toggle  = document.getElementById('sidebarToggle');

    if (!sidebar || !overlay || !toggle) return;

    // Ensure toggle button does not submit a form if markup changes.
    if (toggle.tagName.toLowerCase() === 'button') {
        toggle.type = 'button';
    }

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('show');
        toggle.classList.add('open');
        recordSidebarToggle('open');
    }
    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        toggle.classList.remove('open');
        recordSidebarToggle('close');
    }

    toggle.addEventListener('click', (event) => {
        event.preventDefault();
        console.debug('Sidebar toggle clicked:', sidebar.classList.contains('open') ? 'closing' : 'opening');
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    overlay.addEventListener('click', closeSidebar);

    document.querySelectorAll('.sidebar-item[data-page]').forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.getAttribute('href') || this.getAttribute('href') === '#') e.preventDefault();
            document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            closeSidebar();
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSidebarToggle);
} else {
    initializeSidebarToggle();
}


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

const serviceOptions = document.querySelectorAll('.service-option');
        const nextButton = document.getElementById('nextStep');
        let selectedService = null;

        if (serviceOptions.length && nextButton) {
            serviceOptions.forEach(option => {
                option.addEventListener('click', () => {
                    serviceOptions.forEach(o => o.classList.remove('selected'));
                    option.classList.add('selected');
                    selectedService = option.querySelector('.service-title')?.textContent.trim();
                    nextButton.disabled = false;
                });
            });

            nextButton.addEventListener('click', () => {
                if (!selectedService) return;
                alert(`Selected service: ${selectedService}\n\nProceeding to the next step...`);
                // TODO: Add real step navigation logic here.
            });
        }

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

document.addEventListener('DOMContentLoaded', () => {
    initializeProfileTabs();
    initializeAvatarUpload();
    initializeToggles();
    initializeFormHandling();
});


/* SUPER ADMIN */

// Tab switching
    function switchTab(name, btn) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + name).classList.add('active');
 
      if (name === 'analytics') {
        setTimeout(initCharts, 50);
      }
    }
 
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../home.html';
      }
    });
 
    // Charts
    let chartsInitialized = false;
 
    function initCharts() {
      if (chartsInitialized) return;
      chartsInitialized = true;
 
      const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
 
      // User Growth Chart
      const ugCtx = document.getElementById('userGrowthChart').getContext('2d');
      drawLineChart(ugCtx, months, [
        { label: 'Users', data: [950, 1000, 1060, 1100, 1150, 1200, 1248], color: '#3b82f6' },
        { label: 'Providers', data: [310, 318, 325, 330, 336, 340, 342], color: '#f97316' },
        { label: 'Admins', data: [10, 10, 10, 11, 11, 12, 12], color: '#8b5cf6' }
      ]);
 
      // Revenue Chart
      const rvCtx = document.getElementById('revenueChart').getContext('2d');
      drawBarChart(rvCtx, months, [115000, 120000, 124000, 128000, 133000, 136000, 145000], '#10b981');
    }
 
    function drawLineChart(ctx, labels, datasets) {
      const canvas = ctx.canvas;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
 
      const pad = { top: 20, right: 20, bottom: 30, left: 55 };
      const chartW = W - pad.left - pad.right;
      const chartH = H - pad.top - pad.bottom;
 
      // Find min/max across all datasets
      let allVals = datasets.flatMap(d => d.data);
      let minVal = Math.min(...allVals) * 0.95;
      let maxVal = Math.max(...allVals) * 1.05;
 
      function xPos(i) { return pad.left + (i / (labels.length - 1)) * chartW; }
      function yPos(v) { return pad.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH; }
 
      ctx.clearRect(0, 0, W, H);
 
      // Grid lines
      ctx.strokeStyle = '#f3f4f6';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = pad.top + (i / 4) * chartH;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
        const val = Math.round(maxVal - (i / 4) * (maxVal - minVal));
        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px DM Sans';
        ctx.textAlign = 'right';
        ctx.fillText(val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val, pad.left - 6, y + 4);
      }
 
      // X labels
      ctx.fillStyle = '#9ca3af';
      ctx.font = '11px DM Sans';
      ctx.textAlign = 'center';
      labels.forEach((l, i) => {
        ctx.fillText(l, xPos(i), H - pad.bottom + 16);
      });
 
      // Draw lines
      datasets.forEach(ds => {
        ctx.strokeStyle = ds.color;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ds.data.forEach((v, i) => {
          i === 0 ? ctx.moveTo(xPos(i), yPos(v)) : ctx.lineTo(xPos(i), yPos(v));
        });
        ctx.stroke();
 
        // Dots
        ds.data.forEach((v, i) => {
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(xPos(i), yPos(v), 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = ds.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      });
    }
 
    function drawBarChart(ctx, labels, data, color) {
      const canvas = ctx.canvas;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
 
      const pad = { top: 20, right: 20, bottom: 30, left: 70 };
      const chartW = W - pad.left - pad.right;
      const chartH = H - pad.top - pad.bottom;
      const maxVal = Math.max(...data) * 1.1;
      const barW = (chartW / labels.length) * 0.6;
 
      ctx.clearRect(0, 0, W, H);
 
      // Grid
      ctx.strokeStyle = '#f3f4f6';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = pad.top + (i / 4) * chartH;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
        const val = Math.round(maxVal - (i / 4) * maxVal);
        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px DM Sans';
        ctx.textAlign = 'right';
        ctx.fillText(val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val, pad.left - 6, y + 4);
      }
 
      // X labels
      ctx.fillStyle = '#9ca3af';
      ctx.font = '11px DM Sans';
      ctx.textAlign = 'center';
 
      // Bars
      const slotW = chartW / labels.length;
      data.forEach((v, i) => {
        const barH = (v / maxVal) * chartH;
        const x = pad.left + i * slotW + (slotW - barW) / 2;
        const y = pad.top + chartH - barH;
 
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fill();
 
        ctx.fillStyle = '#9ca3af';
        ctx.fillText(labels[i], x + barW / 2, H - pad.bottom + 16);
      });
    }
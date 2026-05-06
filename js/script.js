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
    const logoutBtn = document.getElementById('logoutBtn'); if (logoutBtn) logoutBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../index.html';
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

/**
 * modals.js — Super Admin Dashboard Modal System
 * Handles: Manage Users, Admin Controls, System Settings
 */

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const MOCK_USERS = [
  { id: 1, name: 'Alice Reyes',     email: 'alice.reyes@email.com',    role: 'User',   status: 'Active' },
  { id: 2, name: 'Ben Navarro',     email: 'ben.navarro@email.com',    role: 'User',   status: 'Active' },
  { id: 3, name: 'Clara Santos',    email: 'clara.santos@email.com',   role: 'Admin',  status: 'Active' },
  { id: 4, name: 'Diego Mendoza',   email: 'diego.mendoza@email.com',  role: 'User',   status: 'Suspended' },
  { id: 5, name: 'Eva Torres',      email: 'eva.torres@email.com',     role: 'User',   status: 'Active' },
  { id: 6, name: 'Felix Cruz',      email: 'felix.cruz@email.com',     role: 'User',   status: 'Active' },
  { id: 7, name: 'Grace Lim',       email: 'grace.lim@email.com',      role: 'Admin',  status: 'Active' },
  { id: 8, name: 'Henry Tan',       email: 'henry.tan@email.com',      role: 'User',   status: 'Suspended' },
  { id: 9, name: 'Iris Dela Cruz',  email: 'iris.delacruz@email.com',  role: 'User',   status: 'Active' },
  { id: 10,'name': 'Jake Bautista', email: 'jake.bautista@email.com',  role: 'User',   status: 'Active' },
];

const MOCK_ADMINS = [
  { id: 1, name: 'Maria Santos',   email: 'maria.santos@admin.com',    role: 'Platform Admin',   perms: { users: true,  bookings: true,  reports: true,  settings: true  } },
  { id: 2, name: 'Carlos Reyes',   email: 'carlos.reyes@admin.com',    role: 'Operations Admin', perms: { users: false, bookings: true,  reports: true,  settings: false } },
  { id: 3, name: 'Ana Villanueva', email: 'ana.villanueva@admin.com',  role: 'HR Admin',         perms: { users: true,  bookings: false, reports: true,  settings: false } },
  { id: 4, name: 'Luis Garcia',    email: 'luis.garcia@admin.com',     role: 'Operations Admin', perms: { users: false, bookings: true,  reports: false, settings: false } },
];

let usersData  = JSON.parse(JSON.stringify(MOCK_USERS));
let adminsData = JSON.parse(JSON.stringify(MOCK_ADMINS));

const systemSettings = {
  platformName:     'CareConnect',
  maintenanceMode:  false,
  emailNotifs:      true,
  backupFrequency:  'daily',
};

/* ─────────────────────────────────────────────
   MODAL ENGINE
───────────────────────────────────────────── */
let currentModal = null;
let previouslyFocused = null;

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  previouslyFocused = document.activeElement;
  currentModal = modal;
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  trapFocus(modal);
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('modal-open');
  document.body.style.overflow = '';
  currentModal = null;
  if (previouslyFocused) previouslyFocused.focus();
}

function trapFocus(modal) {
  const focusable = modal.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  modal.addEventListener('keydown', function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
    if (!modal.classList.contains('modal-open')) modal.removeEventListener('keydown', handler);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && currentModal) closeModal(currentModal.id);
});

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.sa-toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = `sa-toast sa-toast-${type}`;
  t.setAttribute('role', 'alert');
  t.innerHTML = `<span>${type === 'success' ? '✓' : '⚠'}</span> ${msg}`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('sa-toast-show'));
  setTimeout(() => { t.classList.remove('sa-toast-show'); setTimeout(() => t.remove(), 350); }, 2800);
}

/* ─────────────────────────────────────────────
   MANAGE USERS MODAL
───────────────────────────────────────────── */
const USERS_PER_PAGE = 5;
let userPage    = 1;
let userFilter  = '';
let viewUserId  = null;

function getFilteredUsers() {
  return usersData.filter(u =>
    u.name.toLowerCase().includes(userFilter) ||
    u.email.toLowerCase().includes(userFilter) ||
    u.role.toLowerCase().includes(userFilter) ||
    u.status.toLowerCase().includes(userFilter)
  );
}

function renderUsersTable() {
  const filtered = getFilteredUsers();
  const total    = filtered.length;
  const pages    = Math.max(1, Math.ceil(total / USERS_PER_PAGE));
  if (userPage > pages) userPage = pages;
  const slice = filtered.slice((userPage - 1) * USERS_PER_PAGE, userPage * USERS_PER_PAGE);

  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;

  if (slice.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--gray-400);padding:32px">No users found.</td></tr>`;
  } else {
    tbody.innerHTML = slice.map(u => `
      <tr>
        <td><strong>${escHtml(u.name)}</strong></td>
        <td style="color:var(--gray-500);font-size:13px">${escHtml(u.email)}</td>
        <td>
          <select class="mu-role-select" data-id="${u.id}" aria-label="Role for ${escHtml(u.name)}">
            <option value="User"  ${u.role==='User'  ?'selected':''}>User</option>
            <option value="Admin" ${u.role==='Admin' ?'selected':''}>Admin</option>
          </select>
        </td>
        <td><span class="mu-status-badge ${u.status==='Active'?'active':'suspended'}">${u.status}</span></td>
        <td>
          <div class="mu-actions">
            <button class="mu-btn view"    data-id="${u.id}" title="View">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="mu-btn toggle ${u.status==='Active'?'suspend':'activate'}" data-id="${u.id}"
              title="${u.status==='Active'?'Suspend':'Activate'}">
              ${u.status==='Active'
                ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`
                : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
              }
            </button>
            <button class="mu-btn delete" data-id="${u.id}" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Pagination
  const info = document.getElementById('usersPagInfo');
  const prev = document.getElementById('usersPrev');
  const next = document.getElementById('usersNext');
  if (info) info.textContent = `Page ${userPage} of ${pages}  (${total} user${total!==1?'s':''})`;
  if (prev) prev.disabled = userPage <= 1;
  if (next) next.disabled = userPage >= pages;

  // Wire events
  tbody.querySelectorAll('.mu-role-select').forEach(sel => {
    sel.addEventListener('change', e => {
      const uid = +e.target.dataset.id;
      const u   = usersData.find(x => x.id === uid);
      if (u) { u.role = e.target.value; showToast(`${u.name}'s role updated to ${u.role}.`); }
    });
  });
  tbody.querySelectorAll('.mu-btn.view').forEach(btn => {
    btn.addEventListener('click', () => openUserDetail(+btn.dataset.id));
  });
  tbody.querySelectorAll('.mu-btn.toggle').forEach(btn => {
    btn.addEventListener('click', () => toggleUserStatus(+btn.dataset.id));
  });
  tbody.querySelectorAll('.mu-btn.delete').forEach(btn => {
    btn.addEventListener('click', () => confirmDeleteUser(+btn.dataset.id));
  });
}

function toggleUserStatus(id) {
  const u = usersData.find(x => x.id === id);
  if (!u) return;
  u.status = u.status === 'Active' ? 'Suspended' : 'Active';
  showToast(`${u.name} is now ${u.status}.`, u.status === 'Active' ? 'success' : 'warning');
  renderUsersTable();
}

function confirmDeleteUser(id) {
  const u = usersData.find(x => x.id === id);
  if (!u) return;
  document.getElementById('deleteUserName').textContent = u.name;
  document.getElementById('confirmDeleteUserBtn').dataset.id = id;
  openModal('deleteConfirmModal');
}

function openUserDetail(id) {
  const u = usersData.find(x => x.id === id);
  if (!u) return;
  viewUserId = id;
  document.getElementById('detailName').textContent   = u.name;
  document.getElementById('detailEmail').textContent  = u.email;
  document.getElementById('detailRole').textContent   = u.role;
  document.getElementById('detailStatus').textContent = u.status;
  document.getElementById('detailStatus').className   = `mu-status-badge ${u.status==='Active'?'active':'suspended'}`;
  openModal('userDetailModal');
}

/* ─────────────────────────────────────────────
   ADMIN CONTROLS MODAL
───────────────────────────────────────────── */
function renderAdminsTable() {
  const tbody = document.getElementById('adminsTableBody');
  if (!tbody) return;
  tbody.innerHTML = adminsData.map(a => `
    <tr>
      <td><strong>${escHtml(a.name)}</strong></td>
      <td style="color:var(--gray-500);font-size:13px">${escHtml(a.email)}</td>
      <td><span class="ac-role-badge ${roleBadgeClass(a.role)}">${a.role}</span></td>
      <td>
        <div class="ac-perms">
          ${['users','bookings','reports','settings'].map(p => `
            <label class="ac-perm-toggle" title="${capitalize(p)}">
              <input type="checkbox" ${a.perms[p]?'checked':''} data-admin="${a.id}" data-perm="${p}">
              <span>${capitalize(p)}</span>
            </label>
          `).join('')}
        </div>
      </td>
      <td>
        <button class="mu-btn delete" data-id="${a.id}" title="Remove Admin">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </td>
    </tr>
  `).join('');

  // Wire permission checkboxes
  tbody.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', e => {
      const aid  = +e.target.dataset.admin;
      const perm =  e.target.dataset.perm;
      const adm  = adminsData.find(x => x.id === aid);
      if (adm) { adm.perms[perm] = e.target.checked; showToast(`${adm.name}'s ${perm} permission ${e.target.checked?'granted':'revoked'}.`); }
    });
  });

  // Wire delete buttons
  tbody.querySelectorAll('.mu-btn.delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const aid = +btn.dataset.id;
      const adm = adminsData.find(x => x.id === aid);
      if (!adm) return;
      if (confirm(`Remove ${adm.name} as admin?`)) {
        adminsData = adminsData.filter(x => x.id !== aid);
        renderAdminsTable();
        showToast(`${adm.name} removed from admin list.`, 'warning');
      }
    });
  });
}

function roleBadgeClass(role) {
  if (role === 'HR Admin')         return 'hr';
  if (role === 'Operations Admin') return 'ops';
  if (role === 'Platform Admin')   return 'platform';
  return '';
}

/* ─────────────────────────────────────────────
   SYSTEM SETTINGS MODAL
───────────────────────────────────────────── */
function loadSystemSettings() {
  const nameInput = document.getElementById('settingPlatformName');
  const maintToggle = document.getElementById('settingMaintenance');
  const emailToggle = document.getElementById('settingEmailNotifs');
  const backupSelect = document.getElementById('settingBackupFreq');
  if (nameInput)    nameInput.value   = systemSettings.platformName;
  if (maintToggle)  maintToggle.checked = systemSettings.maintenanceMode;
  if (emailToggle)  emailToggle.checked = systemSettings.emailNotifs;
  if (backupSelect) backupSelect.value = systemSettings.backupFrequency;
}

function saveSystemSettings() {
  systemSettings.platformName    = document.getElementById('settingPlatformName').value.trim() || systemSettings.platformName;
  systemSettings.maintenanceMode = document.getElementById('settingMaintenance').checked;
  systemSettings.emailNotifs     = document.getElementById('settingEmailNotifs').checked;
  systemSettings.backupFrequency = document.getElementById('settingBackupFreq').value;

  const feedback = document.getElementById('settingsFeedback');
  feedback.textContent = '✓ Settings saved successfully!';
  feedback.className   = 'settings-feedback visible';
  setTimeout(() => feedback.classList.remove('visible'), 3000);
  showToast('System settings saved.');
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

/* ─────────────────────────────────────────────
   INIT — wire all triggers after DOM ready
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Overlay clicks close modal ── */
  document.querySelectorAll('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', e => {
      if (e.target === ov) closeModal(ov.id);
    });
  });

  /* ── Close buttons ── */
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay').id));
  });

  /* ── Action cards ── */
  const manageUsersCard   = document.getElementById('manageUsersCard');
  const adminControlsCard = document.getElementById('adminControlsCard');
  const systemSettingsCard= document.getElementById('systemSettingsCard');

  if (manageUsersCard) {
    manageUsersCard.addEventListener('click', () => {
      userFilter = ''; userPage = 1;
      document.getElementById('userSearchInput').value = '';
      renderUsersTable();
      openModal('manageUsersModal');
    });
  }

  if (adminControlsCard) {
    adminControlsCard.addEventListener('click', () => {
      renderAdminsTable();
      openModal('adminControlsModal');
    });
  }

  if (systemSettingsCard) {
    systemSettingsCard.addEventListener('click', () => {
      loadSystemSettings();
      openModal('systemSettingsModal');
    });
  }

  /* ── Users search ── */
  const searchInput = document.getElementById('userSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      userFilter = e.target.value.toLowerCase();
      userPage = 1;
      renderUsersTable();
    });
  }

  /* ── Pagination ── */
  const prevBtn = document.getElementById('usersPrev');
  const nextBtn = document.getElementById('usersNext');
  if (prevBtn) prevBtn.addEventListener('click', () => { userPage--; renderUsersTable(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { userPage++; renderUsersTable(); });

  /* ── Delete confirm ── */
  const confirmDeleteBtn = document.getElementById('confirmDeleteUserBtn');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      const id = +confirmDeleteBtn.dataset.id;
      const u  = usersData.find(x => x.id === id);
      if (u) {
        usersData = usersData.filter(x => x.id !== id);
        closeModal('deleteConfirmModal');
        renderUsersTable();
        showToast(`${u.name} deleted.`, 'warning');
      }
    });
  }
  document.getElementById('cancelDeleteBtn')?.addEventListener('click', () => closeModal('deleteConfirmModal'));

  /* ── User detail close ── */
  document.getElementById('closeDetailBtn')?.addEventListener('click', () => closeModal('userDetailModal'));

  /* ── Add Admin form ── */
  document.getElementById('addAdminForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('newAdminName').value.trim();
    const email = document.getElementById('newAdminEmail').value.trim();
    const role  = document.getElementById('newAdminRole').value;
    if (!name || !email) return;
    const newId = adminsData.length ? Math.max(...adminsData.map(a=>a.id)) + 1 : 1;
    adminsData.push({ id: newId, name, email, role, perms: { users: false, bookings: false, reports: false, settings: false } });
    renderAdminsTable();
    e.target.reset();
    document.getElementById('addAdminFormWrap').classList.add('hidden');
    showToast(`${name} added as ${role}.`);
  });

  document.getElementById('showAddAdminFormBtn')?.addEventListener('click', () => {
    document.getElementById('addAdminFormWrap').classList.toggle('hidden');
  });

  document.getElementById('cancelAddAdminBtn')?.addEventListener('click', () => {
    document.getElementById('addAdminForm').reset();
    document.getElementById('addAdminFormWrap').classList.add('hidden');
  });

  /* ── System Settings save ── */
  document.getElementById('saveSettingsBtn')?.addEventListener('click', saveSystemSettings);
});

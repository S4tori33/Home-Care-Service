// ── DATA ───────────────────────────────────────────────────────────────────────
let users = [
  { id:1, firstName:"John",    lastName:"Doe",      email:"john.doe@example.com",   phone:"(555) 123-4567", location:"New York",     role:"customer",  status:"active",   since:"Jan 15, 2024",  lastLogin:"May 6, 2026",  bookings:12, spent:1440, initials:"JD", color:"linear-gradient(135deg,#4f46e5,#7c3aed)" },
  { id:2, firstName:"Sarah",   lastName:"Johnson",  email:"sarah.j@example.com",    phone:"(555) 234-5678", location:"Los Angeles",  role:"customer",  status:"active",   since:"Feb 20, 2024",  lastLogin:"May 5, 2026",  bookings:8,  spent:960,  initials:"SJ", color:"linear-gradient(135deg,#0ea5e9,#2563eb)" },
  { id:3, firstName:"Michael", lastName:"Brown",    email:"m.brown@example.com",    phone:"(555) 345-6789", location:"Chicago",      role:"provider",  status:"active",   since:"Nov 10, 2023",  lastLogin:"May 7, 2026",  bookings:15, spent:1800, initials:"MB", color:"linear-gradient(135deg,#f97316,#ef4444)" },
  { id:4, firstName:"Emily",   lastName:"Davis",    email:"emily.d@example.com",    phone:"(555) 456-7890", location:"Houston",      role:"customer",  status:"active",   since:"Mar 5, 2024",   lastLogin:"May 4, 2026",  bookings:5,  spent:600,  initials:"ED", color:"linear-gradient(135deg,#10b981,#0d9488)" },
  { id:5, firstName:"David",   lastName:"Wilson",   email:"david.w@example.com",    phone:"(555) 567-8901", location:"Phoenix",      role:"support",   status:"inactive", since:"Apr 12, 2024",  lastLogin:"Mar 10, 2026", bookings:2,  spent:240,  initials:"DW", color:"linear-gradient(135deg,#6366f1,#8b5cf6)" },
  { id:6, firstName:"Lisa",    lastName:"Anderson", email:"lisa.a@example.com",     phone:"(555) 678-9012", location:"Philadelphia", role:"customer",  status:"banned",   since:"May 1, 2024",   lastLogin:"May 1, 2024",  bookings:0,  spent:0,    initials:"LA", color:"linear-gradient(135deg,#f43f5e,#be123c)" },
];

let hrApplicants = [
  { id:"h1", name:"Kevin Lopez",   type:"Elderly Care",   experience:"3 yrs", phone:"(555) 321-0001", status:"pending", source:"hr",  color:"linear-gradient(135deg,#f59e0b,#d97706)", initials:"KL" },
  { id:"h2", name:"Nina Patel",    type:"House Cleaning", experience:"5 yrs", phone:"(555) 321-0002", status:"pending", source:"hr",  color:"linear-gradient(135deg,#0ea5e9,#2563eb)", initials:"NP" },
];
let opsApplicants = [
  { id:"o1", name:"Gary Wheeler",  type:"Garden Work",    experience:"2 yrs", phone:"(555) 321-0003", status:"pending", source:"ops", color:"linear-gradient(135deg,#10b981,#059669)", initials:"GW" },
];
let siteUpdates = [
  { id:"u1", from:"Operations Admin", subject:"Service category pricing update", body:"Please update the House Cleaning pricing from $75/hr to $85/hr on the platform.", date:"May 6, 2026", read:false },
  { id:"u2", from:"HR Admin", subject:"New caregiver onboarding policy", body:"New policy: All caregivers must complete 4-hour orientation before first job. Update the onboarding flow.", date:"May 4, 2026", read:true },
];

let activeDropdownUser = null;
let currentEditUserId = null;
let currentBanUserId = null;
let currentDeleteUserId = null;
let currentPermUserId = null;
let currentInboxTab = 'hr';

// ── RENDER TABLE ──────────────────────────────────────────────────────────────
function getFiltered() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const st = document.getElementById('statusFilter').value;
  const ro = document.getElementById('roleFilter').value;
  return users.filter(u => {
    const fullName = (u.firstName + ' ' + u.lastName).toLowerCase();
    if (q && !fullName.includes(q) && !u.email.includes(q)) return false;
    if (st && u.status !== st) return false;
    if (ro) {
      const roleMap = { customer:'customer', provider:'provider', support:'support', admin:'admin' };
      if (ro === 'customer' && u.role !== 'customer') return false;
      if (ro === 'provider' && u.role !== 'provider') return false;
      if (ro === 'support' && u.role !== 'support') return false;
      if (ro === 'admin' && !['platform_admin','operations_admin','hr_admin'].includes(u.role)) return false;
    }
    return true;
  });
}

function renderTable() {
  const filtered = getFiltered();
  const tbody = document.getElementById('usersBody');
  const noRes = document.getElementById('noResults');
  document.getElementById('tableTitle').textContent = `All Users (${filtered.length})`;

  if (!filtered.length) { tbody.innerHTML=''; noRes.style.display='block'; return; }
  noRes.style.display='none';

  tbody.innerHTML = filtered.map(u => `
    <tr>
      <td>
        <div class="user-cell">
          <div class="u-avatar" style="background:${u.color}">${u.initials}</div>
          <div>
            <span class="u-name">${u.firstName} ${u.lastName}</span>
            <span class="u-email">${u.email}</span>
          </div>
        </div>
      </td>
      <td>
        <div class="contact-cell">
          <div class="contact-row">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            ${u.email}
          </div>
          <div class="contact-row">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12.08 19.79 19.79 0 0 1 1.61 3.47 2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
            ${u.phone}
          </div>
        </div>
      </td>
      <td>
        <div class="loc-cell">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${u.location}
        </div>
      </td>
      <td style="font-weight:600;">${u.bookings}</td>
      <td style="font-weight:600;">$${u.spent.toLocaleString()}</td>
      <td style="color:#6b7280;">${u.since}</td>
      <td>
        <span class="status-badge ${u.status}">
          <span class="status-dot"></span>
          ${u.status.charAt(0).toUpperCase()+u.status.slice(1)}
        </span>
      </td>
      <td>
        <div style="position:relative;">
          <button class="action-btn" onclick="toggleDropdown(${u.id}, event)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
          </button>
          <div class="dropdown" id="dd-${u.id}">
            <button class="dropdown-item" onclick="openViewModal(${u.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View Details
            </button>
            <button class="dropdown-item" onclick="openEditModal(${u.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit User
            </button>
            <button class="dropdown-item" onclick="openPermModal(${u.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Change Permissions
            </button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item danger" onclick="openBanModal(${u.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
              ${u.status==='banned' ? 'Unban User' : 'Ban User'}
            </button>
            <button class="dropdown-item danger" onclick="openDeleteModal(${u.id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
              Delete User
            </button>
          </div>
        </div>
      </td>
    </tr>
  `).join('');

  updateStats();
}

function applyFilters() { renderTable(); }

function updateStats() {
  document.getElementById('statTotal').textContent = users.length;
  document.getElementById('statActive').textContent = users.filter(u=>u.status==='active').length;
  document.getElementById('statNew').textContent = users.filter(u=>u.since.includes('2024')||u.since.includes('2026')).length;
  document.getElementById('statBanned').textContent = users.filter(u=>u.status==='banned').length;
}

// ── DROPDOWN ──────────────────────────────────────────────────────────────────
function toggleDropdown(id, e) {
  e.stopPropagation();
  const dd = document.getElementById(`dd-${id}`);
  const isOpen = dd.classList.contains('open');
  closeAllDropdowns();
  if (!isOpen) { dd.classList.add('open'); activeDropdownUser = id; }
}
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown').forEach(d=>d.classList.remove('open'));
  activeDropdownUser = null;
}
document.addEventListener('click', () => closeAllDropdowns());

// ── VIEW MODAL ────────────────────────────────────────────────────────────────
function openViewModal(id) {
  closeAllDropdowns();
  const u = users.find(x=>x.id===id);
  if (!u) return;
  currentEditUserId = id;
  document.getElementById('viewModalSub').textContent = `${u.firstName} ${u.lastName} · ${u.role}`;
  document.getElementById('vd-name').textContent = `${u.firstName} ${u.lastName}`;
  document.getElementById('vd-email').textContent = u.email;
  document.getElementById('vd-phone').textContent = u.phone;
  document.getElementById('vd-location').textContent = u.location;
  document.getElementById('vd-role').innerHTML = `<span class="role-badge">${u.role}</span>`;
  document.getElementById('vd-status').innerHTML = `<span class="status-badge ${u.status}"><span class="status-dot"></span>${u.status.charAt(0).toUpperCase()+u.status.slice(1)}</span>`;
  document.getElementById('vd-since').textContent = u.since;
  document.getElementById('vd-login').textContent = u.lastLogin;
  document.getElementById('vd-bookings').textContent = u.bookings;
  document.getElementById('vd-spent').textContent = `$${u.spent.toLocaleString()}`;
  openModal('viewModal');
}
function editFromView() {
  closeModal('viewModal');
  setTimeout(()=>openEditModal(currentEditUserId), 150);
}

// ── ADD/EDIT MODAL ────────────────────────────────────────────────────────────
function openAddUserModal() {
  closeAllDropdowns();
  currentEditUserId = null;
  document.getElementById('formModalTitle').textContent = 'Add New User';
  document.getElementById('formModalSub').textContent = 'Fill in the details below';
  document.getElementById('formSaveLabel').textContent = 'Create User';
  ['ff-firstName','ff-lastName','ff-email','ff-phone','ff-location','ff-notes'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('ff-role').value='customer';
  document.getElementById('ff-status').value='active';
  openModal('userFormModal');
}
function openEditModal(id) {
  closeAllDropdowns();
  const u = users.find(x=>x.id===id);
  if (!u) return;
  currentEditUserId = id;
  document.getElementById('formModalTitle').textContent = 'Edit User';
  document.getElementById('formModalSub').textContent = `Editing ${u.firstName} ${u.lastName}`;
  document.getElementById('formSaveLabel').textContent = 'Save Changes';
  document.getElementById('ff-firstName').value = u.firstName;
  document.getElementById('ff-lastName').value = u.lastName;
  document.getElementById('ff-email').value = u.email;
  document.getElementById('ff-phone').value = u.phone;
  document.getElementById('ff-location').value = u.location;
  document.getElementById('ff-role').value = u.role;
  document.getElementById('ff-status').value = u.status;
  document.getElementById('ff-notes').value = '';
  openModal('userFormModal');
}
function saveUser() {
  const firstName = document.getElementById('ff-firstName').value.trim();
  const lastName = document.getElementById('ff-lastName').value.trim();
  const email = document.getElementById('ff-email').value.trim();
  if (!firstName||!lastName||!email) { showToast('error','Missing fields','Please fill in all required fields.'); return; }

  if (currentEditUserId) {
    const u = users.find(x=>x.id===currentEditUserId);
    u.firstName=firstName; u.lastName=lastName; u.email=email;
    u.phone=document.getElementById('ff-phone').value;
    u.location=document.getElementById('ff-location').value;
    u.role=document.getElementById('ff-role').value;
    u.status=document.getElementById('ff-status').value;
    u.initials = (firstName[0]+(lastName[0]||'')).toUpperCase();
    showToast('success','User Updated',`${firstName} ${lastName}'s profile has been saved.`);
  } else {
    const colors = ['linear-gradient(135deg,#4f46e5,#7c3aed)','linear-gradient(135deg,#0ea5e9,#2563eb)','linear-gradient(135deg,#10b981,#0d9488)','linear-gradient(135deg,#f97316,#ef4444)'];
    users.push({
      id: Date.now(), firstName, lastName,
      email, phone:document.getElementById('ff-phone').value,
      location:document.getElementById('ff-location').value,
      role:document.getElementById('ff-role').value,
      status:document.getElementById('ff-status').value,
      since: new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
      lastLogin:'Never', bookings:0, spent:0,
      initials:(firstName[0]+(lastName[0]||'')).toUpperCase(),
      color:colors[Math.floor(Math.random()*colors.length)]
    });
    showToast('success','User Created',`${firstName} ${lastName} has been added to the platform.`);
  }
  closeModal('userFormModal');
  renderTable();
}

// ── PERMISSIONS MODAL ─────────────────────────────────────────────────────────
const allPerms = [
  { key:'book',    label:'Book Services',       desc:'Can create and manage bookings' },
  { key:'review',  label:'Write Reviews',        desc:'Can submit service reviews' },
  { key:'reports', label:'View Reports',         desc:'Access to analytics & reports' },
  { key:'users',   label:'Manage Users',         desc:'Can create, edit, delete users' },
  { key:'content', label:'Edit Site Content',    desc:'Can update platform content' },
  { key:'billing', label:'Access Billing',       desc:'Can view billing information' },
];
let userPerms = {};

function openPermModal(id) {
  closeAllDropdowns();
  const u = users.find(x=>x.id===id);
  if (!u) return;
  currentPermUserId = id;
  document.getElementById('permModalSub').textContent = `${u.firstName} ${u.lastName} — ${u.role}`;
  // Default perms based on role
  const defaults = { customer:['book','review'], provider:['book','review'], support:['book','reports','users'], platform_admin:['book','review','reports','users','content','billing'], operations_admin:['reports','users'], hr_admin:['users'] };
  userPerms[id] = userPerms[id] || (defaults[u.role] || ['book']);
  const enabled = userPerms[id];
  document.getElementById('permList').innerHTML = allPerms.map(p=>`
    <div class="perm-item">
      <div class="perm-item-info">
        <strong>${p.label}</strong>
        <small>${p.desc}</small>
      </div>
      <button class="toggle ${enabled.includes(p.key)?'on':''}" id="perm-${p.key}" onclick="this.classList.toggle('on')"></button>
    </div>
  `).join('');
  openModal('permModal');
}
function savePermissions() {
  const enabled = allPerms.filter(p=>document.getElementById(`perm-${p.key}`)?.classList.contains('on')).map(p=>p.key);
  userPerms[currentPermUserId] = enabled;
  closeModal('permModal');
  showToast('success','Permissions Saved','User permissions have been updated.');
}

// ── BAN MODAL ─────────────────────────────────────────────────────────────────
function openBanModal(id) {
  closeAllDropdowns();
  const u = users.find(x=>x.id===id);
  if (!u) return;
  currentBanUserId = id;
  const isBanned = u.status==='banned';
  document.getElementById('banTitle').textContent = isBanned ? 'Unban User' : 'Ban User';
  document.getElementById('banDesc').textContent = isBanned
    ? `This will restore ${u.firstName} ${u.lastName}'s access to the platform.`
    : `This will suspend ${u.firstName} ${u.lastName}'s access to the platform.`;
  document.getElementById('banConfirmBtn').textContent = isBanned ? 'Unban' : 'Ban User';
  document.getElementById('banConfirmBtn').style.background = isBanned ? '#16a34a' : '#dc2626';
  openModal('banModal');
}
function confirmBanAction() {
  const u = users.find(x=>x.id===currentBanUserId);
  if (!u) return;
  const wasBanned = u.status==='banned';
  u.status = wasBanned ? 'active' : 'banned';
  closeModal('banModal');
  renderTable();
  showToast(wasBanned?'success':'error', wasBanned?'User Unbanned':'User Banned', `${u.firstName} ${u.lastName} has been ${wasBanned?'restored':'suspended'}.`);
}

// ── DELETE MODAL ──────────────────────────────────────────────────────────────
function openDeleteModal(id) {
  closeAllDropdowns();
  const u = users.find(x=>x.id===id);
  if (!u) return;
  currentDeleteUserId = id;
  document.getElementById('deleteDesc').textContent = `Are you sure you want to permanently delete ${u.firstName} ${u.lastName}? This cannot be undone.`;
  openModal('deleteModal');
}
function confirmDelete() {
  const u = users.find(x=>x.id===currentDeleteUserId);
  if (!u) return;
  const name = `${u.firstName} ${u.lastName}`;
  users = users.filter(x=>x.id!==currentDeleteUserId);
  closeModal('deleteModal');
  renderTable();
  showToast('error','User Deleted',`${name} has been permanently removed.`);
}

// ── INBOX MODAL ───────────────────────────────────────────────────────────────
function openInboxModal() {
  renderInbox();
  openModal('inboxModal');
}
function switchInboxTab(tab) {
  currentInboxTab = tab;
  ['hr','ops','updates'].forEach(t=>{
    document.getElementById(`tab-${t}`).classList.toggle('active',t===tab);
    document.getElementById(`inbox-${t}`).style.display = t===tab?'block':'none';
  });
}
function renderInbox() {
  // HR tab
  document.getElementById('inbox-hr').innerHTML = hrApplicants.length
    ? hrApplicants.map(a=>`
      <div class="applicant-card">
        <div class="applicant-top">
          <div class="app-avatar" style="background:${a.color}">${a.initials}</div>
          <div class="app-info">
            <div class="app-name">${a.name}</div>
            <div class="app-meta">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              ${a.type} · ${a.experience} exp. ·
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07"/><path d="M1 1l22 22"/></svg>
              ${a.phone}
            </div>
          </div>
          <span class="app-tag hr">From HR Admin</span>
        </div>
        <div class="app-actions">
          <button class="app-btn approve" onclick="approveApplicant('${a.id}','hr')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Approve &amp; Add to Platform
          </button>
          <button class="app-btn view" onclick="showToast('info','Profile','Opening applicant profile...')">View Profile</button>
          <button class="app-btn reject" onclick="rejectApplicant('${a.id}','hr')">Decline</button>
        </div>
      </div>
    `).join('')
    : '<p style="color:#9ca3af;font-size:13px;padding:20px 0;">No pending HR applicants.</p>';

  // Ops tab
  document.getElementById('inbox-ops').innerHTML = opsApplicants.length
    ? opsApplicants.map(a=>`
      <div class="applicant-card">
        <div class="applicant-top">
          <div class="app-avatar" style="background:${a.color}">${a.initials}</div>
          <div class="app-info">
            <div class="app-name">${a.name}</div>
            <div class="app-meta">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              ${a.type} · ${a.experience} exp.
            </div>
          </div>
          <span class="app-tag ops">From Operations</span>
        </div>
        <div class="app-actions">
          <button class="app-btn approve" onclick="approveApplicant('${a.id}','ops')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Approve &amp; Add to Platform
          </button>
          <button class="app-btn reject" onclick="rejectApplicant('${a.id}','ops')">Decline</button>
        </div>
      </div>
    `).join('')
    : '<p style="color:#9ca3af;font-size:13px;padding:20px 0;">No pending operations applicants.</p>';

  // Site updates tab
  document.getElementById('inbox-updates').innerHTML = siteUpdates.length
    ? siteUpdates.map(u=>`
      <div class="applicant-card" style="${u.read?'opacity:.75':''}">
        <div class="applicant-top">
          <div class="app-avatar" style="background:linear-gradient(135deg,#4f46e5,#7c3aed)">${u.from.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
          <div class="app-info">
            <div class="app-name">${u.subject} ${u.read?'':'<span class="notif-dot" style="width:8px;height:8px;display:inline-block;"></span>'}</div>
            <div class="app-meta">${u.from} · ${u.date}</div>
          </div>
        </div>
        <p style="font-size:13px;color:#374151;margin-bottom:12px;line-height:1.5;">${u.body}</p>
        <div class="app-actions">
          <button class="app-btn approve" onclick="markSiteUpdateDone('${u.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Mark as Implemented
          </button>
          <button class="app-btn reject" onclick="dismissUpdate('${u.id}')">Dismiss</button>
        </div>
      </div>
    `).join('')
    : '<p style="color:#9ca3af;font-size:13px;padding:20px 0;">No pending site updates.</p>';
}

function approveApplicant(id, source) {
  if (source === 'hr') {
    const a = hrApplicants.find(x=>x.id===id);
    if (!a) return;
    const name = a.name.split(' ');
    const colors = ['linear-gradient(135deg,#4f46e5,#7c3aed)','linear-gradient(135deg,#f59e0b,#d97706)','linear-gradient(135deg,#10b981,#059669)'];
    users.push({
      id:Date.now(), firstName:name[0], lastName:name.slice(1).join(' '),
      email:`${name[0].toLowerCase()}.${(name[1]||'user').toLowerCase()}@hcs.com`,
      phone:a.phone, location:'TBD', role:'provider', status:'active',
      since:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
      lastLogin:'Never', bookings:0, spent:0,
      initials:a.initials, color:a.color
    });
    hrApplicants = hrApplicants.filter(x=>x.id!==id);
    showToast('success','Applicant Approved',`${a.name} has been added to the platform as a provider.`);
  } else {
    const a = opsApplicants.find(x=>x.id===id);
    if (!a) return;
    opsApplicants = opsApplicants.filter(x=>x.id!==id);
    showToast('success','Applicant Approved',`${a.name} has been approved and added.`);
  }
  updateInboxBadge();
  renderInbox();
  renderTable();
}
function rejectApplicant(id, source) {
  if (source==='hr') { hrApplicants=hrApplicants.filter(x=>x.id!==id); }
  else { opsApplicants=opsApplicants.filter(x=>x.id!==id); }
  updateInboxBadge();
  renderInbox();
  showToast('error','Applicant Declined','The applicant has been declined.');
}
function markSiteUpdateDone(id) {
  const u = siteUpdates.find(x=>x.id===id);
  if (u) u.read=true;
  renderInbox();
  showToast('success','Update Implemented','Site update has been marked as implemented.');
}
function dismissUpdate(id) {
  siteUpdates = siteUpdates.filter(x=>x.id!==id);
  renderInbox();
}
function updateInboxBadge() {
  const count = hrApplicants.length + opsApplicants.length;
  const badge = document.getElementById('inboxBadge');
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline-flex' : 'none';
}

// ── EXPORT ────────────────────────────────────────────────────────────────────
function exportUsers() {
  const headers = ['Name','Email','Phone','Location','Role','Status','Bookings','Total Spent','Member Since'];
  const rows = users.map(u=>[`${u.firstName} ${u.lastName}`,u.email,u.phone,u.location,u.role,u.status,u.bookings,`$${u.spent}`,u.since]);
  const csv = [headers,...rows].map(r=>r.join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,'+encodeURIComponent(csv);
  a.download = 'users_export.csv';
  a.click();
  showToast('success','Export Complete','User data exported as CSV.');
}

// ── MODAL HELPERS ─────────────────────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function closeOnOverlay(e, id) { if (e.target===document.getElementById(id)) closeModal(id); }
document.addEventListener('keydown', e=>{ if(e.key==='Escape') document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open')); });

// ── TOAST ─────────────────────────────────────────────────────────────────────
function showToast(type, title, sub) {
  const icons = {
    success:`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info:`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
  };
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type==='success'?'success':type==='error'?'danger':''}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type]||icons.info}</span><div><div class="toast-title">${title}</div><div class="toast-sub">${sub}</div></div>`;
  container.appendChild(toast);
  setTimeout(()=>{toast.style.transition='opacity .4s,transform .4s';toast.style.opacity='0';toast.style.transform='translateX(20px)';setTimeout(()=>toast.remove(),400);},3200);
}

function handleLogout(e) {
  e.preventDefault();
  showToast('info','Logging out','Redirecting to login...');
  setTimeout(()=>{ window.location.href='../index.html'; }, 1500);
}

// ── INIT ──────────────────────────────────────────────────────────────────────
renderTable();
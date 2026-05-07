// ── Data ─────────────────────────────────────────────────────────────────────

const services = [
  { cls:"elderly", icon:`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5046e4" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`, name:"Elderly Care",       active:5, pending:3 },
  { cls:"pet",     icon:`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e91e8c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg>`, name:"Pet Care",           active:4, pending:2 },
  { cls:"garden",  icon:`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12m0 0C12 6 7 4 2 6c0 6 4 10 10 10zm0 0c0-6 5-8 10-6-1 6-5 10-10 10"/></svg>`, name:"Garden Work",        active:3, pending:1 },
  { cls:"cleaning",icon:`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`, name:"House Cleaning",     active:6, pending:4 },
];

const staff = [
  { initials:"SJ", color:"linear-gradient(135deg,#5046e4,#7c3aed)", name:"Sarah Johnson",    sub:"Elderly Care - Margaret T.", status:"on-job",   statusLabel:"On Job"   },
  { initials:"MC", color:"linear-gradient(135deg,#0ea5e9,#2563eb)", name:"Michael Chen",     sub:"",                           status:"available", statusLabel:"Available"},
  { initials:"ER", color:"linear-gradient(135deg,#f97316,#ef4444)", name:"Emily Rodriguez",  sub:"House Cleaning - Lisa D.",   status:"on-job",   statusLabel:"On Job"   },
  { initials:"DK", color:"linear-gradient(135deg,#10b981,#0d9488)", name:"David Martinez",   sub:"Garden Work - Robert W.",    status:"on-job",   statusLabel:"On Job"   },
  { initials:"JM", color:"linear-gradient(135deg,#8b5cf6,#6d28d9)", name:"Jessica Martinez", sub:"Elderly Care - George P.",   status:"on-job",   statusLabel:"On Job"   },
  { initials:"RT", color:"linear-gradient(135deg,#f43f5e,#be123c)", name:"Robert Taylor",    sub:"",                           status:"off-duty",  statusLabel:"Off Duty" },
  { initials:"AM", color:"linear-gradient(135deg,#f59e0b,#d97706)", name:"Amanda White",     sub:"",                           status:"available", statusLabel:"Available"},
];

let jobs = [];
const providerRoles = ['caregiver', 'pet_care', 'garden_maintenance', 'house_cleaning'];

function serviceClassFromType(type) {
  return {
    'Elderly Care': 'elderly',
    'Pet Care': 'pet',
    'Garden Maintenance': 'garden',
    'House Cleaning': 'cleaning'
  }[type] || 'cleaning';
}

function capitalizeStatus(status) {
  if (!status) return '';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function getJobsFromBookings() {
  const bookings = typeof appData !== 'undefined' ? appData.getAllBookings() : [];
  return bookings.map(b => ({
    id: b.id,
    bookingId: b.id,
    client: b.customerName || 'Customer',
    phone: b.customerPhone || b.customerEmail || 'N/A',
    service: b.serviceType || 'Service',
    svcCls: serviceClassFromType(b.serviceType || ''),
    staff: b.providerName || 'Unassigned',
    location: b.location || 'To be determined',
    time: b.date ? `${b.date}${b.time && b.time !== 'TBD' ? ' · ' + b.time : ''}` : (b.time || 'TBD'),
    status: b.status === 'Active' ? 'In Progress' : b.status === 'Pending' ? 'Scheduled' : capitalizeStatus(b.status),
    originalStatus: b.status,
    booking: b
  }));
}

function persistBookingChanges(bookingId, updates) {
  if (typeof appData === 'undefined') return;
  const bookings = appData.getAllBookings();
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return;
  Object.assign(booking, updates);
  localStorage.setItem(appData.STORAGE_BOOKINGS, JSON.stringify(bookings));
}

function refreshJobData() {
  jobs = getJobsFromBookings();
}

// ── Page state ──────────────────────────────────────────────────────────────
let currentPage = 1;
const PAGE_SIZE = 8;

// ── Service Cards ───────────────────────────────────────────────────────────
function renderServiceCards() {
  const grid = document.getElementById("serviceGrid");
  grid.innerHTML = services.map(s => `
    <div class="service-card card-${s.cls}">
      ${s.pending ? `<span class="pending-badge">${s.pending} pending</span>` : ""}
      <div class="svc-icon">${s.icon}</div>
      <div class="svc-name">${s.name}</div>
      <div class="svc-jobs"><strong>${s.active}</strong> active jobs</div>
    </div>
  `).join("");
}

// ── Staff List ──────────────────────────────────────────────────────────────
function renderStaff() {
  const list = document.getElementById("staffList");
  list.innerHTML = staff.map(s => `
    <div class="staff-item">
      <div class="s-avatar" style="background:${s.color}">${s.initials}</div>
      <div class="s-info">
        <strong>${s.name}</strong>
        <small>${s.sub || "&nbsp;"}</small>
      </div>
      <span class="s-status ${s.status}">${s.statusLabel}</span>
    </div>
  `).join("");

  document.getElementById("avail-count").textContent = staff.filter(s=>s.status==="available").length;
  document.getElementById("onjob-count").textContent  = staff.filter(s=>s.status==="on-job").length;
  document.getElementById("off-count").textContent    = staff.filter(s=>s.status==="off-duty").length;
}

// ── Badge helpers ───────────────────────────────────────────────────────────
function statusClass(s) {
  return {
    "In Progress":"in-progress",
    "Scheduled":"scheduled",
    "Completed":"completed",
    "Urgent":"urgent"
  }[s] || "scheduled";
}

function statusDot(s) {
  const dots = {
    "In Progress":`<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#3b82f6"/></svg>`,
    "Scheduled":`<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#7c3aed"/></svg>`,
    "Completed":`<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#16a34a"/></svg>`,
    "Urgent":`<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#dc2626"/></svg>`
  };
  return dots[s] || "";
}

// ── Jobs Table ──────────────────────────────────────────────────────────────
function getFiltered() {
  const q = document.getElementById("jobSearch").value.toLowerCase();
  const st = document.getElementById("statusFilter").value;
  const sv = document.getElementById("svcFilter").value;
  return jobs.filter(j =>
    (!q || j.client.toLowerCase().includes(q) || j.staff.toLowerCase().includes(q) || j.location.toLowerCase().includes(q)) &&
    (!st || j.status === st) &&
    (!sv || j.service === sv)
  );
}

function renderJobs() {
  refreshJobData();
  const filtered = getFiltered();
  const tbody = document.getElementById("jobsBody");
  const noRes = document.getElementById("noResults");
  const pageInfo = document.getElementById("pageInfo");

  const total = filtered.length;
  const start = (currentPage - 1) * PAGE_SIZE;
  const slice = filtered.slice(start, start + PAGE_SIZE);

  if (total === 0) {
    tbody.innerHTML = "";
    noRes.style.display = "block";
    pageInfo.textContent = "No jobs found";
  } else {
    noRes.style.display = "none";
    pageInfo.textContent = `Showing ${Math.min(start + PAGE_SIZE, total)} of ${total} jobs today`;
    tbody.innerHTML = slice.map((j, i) => {
      const realIndex = jobs.indexOf(j);
      return `
      <tr>
        <td>
          <div class="client-cell">
            <div class="c-avatar" style="background:${j.cColor}">${j.cInitials}</div>
            <div class="c-info">
              <strong>${j.client}</strong>
              <small><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:3px"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12.08 19.79 19.79 0 0 1 1.61 3.47 2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg> ${j.phone}</small>
            </div>
          </div>
        </td>
        <td><span class="svc-badge ${j.svcCls}">${j.service}</span></td>
        <td style="font-weight:600;font-size:13px;">${j.staff}</td>
        <td class="loc-cell"><span class="loc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>${j.location}</td>
        <td class="time-cell"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${j.time}</td>
        <td><span class="status-badge ${statusClass(j.status)}">${j.status}</span></td>
        <td>
          <div class="act-btns">
            <button class="act-btn complete" onclick="changeJobStatus(${realIndex},'Completed')" title="Complete"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></button>
            <button class="act-btn urgent"   onclick="changeJobStatus(${realIndex},'Urgent')"    title="Mark Urgent"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></button>
            <button class="act-btn"          onclick="viewJob(${realIndex})" title="More">⋯</button>
          </div>
        </td>
      </tr>`;
    }).join("");
  }

  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = start + PAGE_SIZE >= total;
  document.getElementById("prevBtn").style.opacity = currentPage === 1 ? "0.4" : "1";
  document.getElementById("nextBtn").style.opacity = (start + PAGE_SIZE >= total) ? "0.4" : "1";

  // Update scheduled metric
  document.getElementById("scheduledCount").textContent = jobs.length;
  const comp = jobs.filter(j=>j.status==="Completed").length;
  const pend = jobs.length - comp;
  document.getElementById("scheduledSub").textContent = `${comp} completed, ${pend} pending`;
}

function changeJobStatus(index, newStatus) {
  const job = jobs[index];
  if (!job) return;
  job.status = newStatus;
  const mappedStatus = newStatus === 'In Progress' ? 'Active' : newStatus === 'Scheduled' ? 'Pending' : newStatus;
  persistBookingChanges(job.bookingId, { status: mappedStatus });
  renderJobs();
}

function viewJob(index) {
  refreshJobData();
  openOpsModal(index);
}

// ── Modal state ──────────────────────────────────────────────────────────────
let opsModalJobIndex = -1;
let opsSelectedProvider = null;

// HR-approved applicants from HR admin (simulated inbox)
const hrApprovedApplicants = [
  { initials:"KL", color:"linear-gradient(135deg,#f59e0b,#d97706)", name:"Kevin Lopez",    type:"Elderly Care",   experience:"3 yrs", phone:"(555) 321-0001", status:"new" },
  { initials:"NP", color:"linear-gradient(135deg,#0ea5e9,#2563eb)", name:"Nina Patel",      type:"House Cleaning", experience:"5 yrs", phone:"(555) 321-0002", status:"new" },
  { initials:"GW", color:"linear-gradient(135deg,#10b981,#059669)", name:"Gary Wheeler",    type:"Garden Work",    experience:"2 yrs", phone:"(555) 321-0003", status:"new" },
];

// Simulated recently deployed
const deployedProviders = [
  { initials:"SJ", color:"linear-gradient(135deg,#5046e4,#7c3aed)", name:"Sarah Johnson",  job:"Margaret Thompson · Elderly Care",  date:"Today 09:00 AM" },
  { initials:"ER", color:"linear-gradient(135deg,#f97316,#ef4444)", name:"Emily Rodriguez", job:"Lisa Davis · House Cleaning",        date:"Today 01:00 PM" },
];

const svcIcons = {
  "Elderly Care":`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  "Pet Care":`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg>`,
  "Garden Work":`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12m0 0C12 6 7 4 2 6c0 6 4 10 10 10zm0 0c0-6 5-8 10-6-1 6-5 10-10 10"/></svg>`,
  "House Cleaning":`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
};

function openOpsModal(index) {
  opsModalJobIndex = index;
  opsSelectedProvider = null;
  const j = jobs[index];

  // Header
  document.getElementById("opsModalIcon").innerHTML = svcIcons[j.service] || `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`;
  document.getElementById("opsModalTitle").textContent = j.client;
  document.getElementById("opsModalSubtitle").textContent = `Booking #${1000 + index} · ${j.service}`;
  document.getElementById("opsModalSvc").textContent = j.service;

  const statusEl = document.getElementById("opsModalStatus");
  statusEl.textContent = j.status;
  statusEl.className = "ops-modal-status-pill " + statusClass(j.status);

  // Footer
  document.getElementById("footer-id").textContent = `#${1000 + index}`;
  document.getElementById("footer-status").textContent = j.status;

  // Details tab
  document.getElementById("d-client").textContent   = j.client;
  document.getElementById("d-phone").textContent    = j.phone;
  document.getElementById("d-service").textContent  = j.service;
  document.getElementById("d-time").textContent     = j.time;
  document.getElementById("d-location").textContent = j.location;
  document.getElementById("d-provider").textContent = j.staff || "Unassigned";
  document.getElementById("d-status").textContent   = j.status;
  document.getElementById("d-notes").innerHTML    = j.status === "Urgent"
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#be123c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> High priority — requires immediate provider dispatch.`
    : "No special notes recorded.";

  // Provider assign tab
  renderOpsProviders(j);

  // HR inbox tab
  renderHrInbox();

  // Reset to details tab
  switchOpsTab("details");
  document.getElementById("opsAssignBtn").disabled = true;

  document.getElementById("opsModal").classList.add("open");
}

function renderOpsProviders(job) {
  // Active roster providers (filter out the already assigned one to show all options)
  const roster = staff.map((s, i) => ({ ...s, rosterIndex: i }));

  document.getElementById("opsProviderList").innerHTML = roster.map((s, i) => `
    <div class="ops-provider-card${job.staff === s.name ? ' assigned' : ''}" 
         id="pcard-${i}" onclick="selectProvider('${s.name}', ${i})">
      <div class="ops-prov-avatar" style="background:${s.color}">${s.initials}</div>
      <div class="ops-prov-info">
        <div class="ops-prov-name">${s.name}</div>
        <div class="ops-prov-meta">
          ${s.sub ? `<span><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${s.sub}</span>` : `<span>No active job</span>`}
        </div>
      </div>
      <span class="ops-prov-badge ${s.status === 'on-job' ? 'on-job' : s.status === 'off-duty' ? '' : 'available'}">
        ${s.statusLabel}
      </span>
      <div class="ops-select-radio" id="radio-${i}"></div>
    </div>
  `).join("");

  // HR-approved new hires
  document.getElementById("opsHRApprovedList").innerHTML = hrApprovedApplicants.map((a, i) => `
    <div class="ops-provider-card" id="hpcard-${i}" onclick="selectProvider('${a.name}', 'hr-${i}')">
      <div class="ops-prov-avatar" style="background:${a.color}">${a.initials}</div>
      <div class="ops-prov-info">
        <div class="ops-prov-name">${a.name}</div>
        <div class="ops-prov-meta">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> ${a.type}</span>
          <span>· ${a.experience} exp.</span>
          <span><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12.08 19.79 19.79 0 0 1 1.61 3.47 2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg> ${a.phone}</span>
        </div>
      </div>
      <span class="ops-prov-badge hr-approved">HR Approved</span>
      <div class="ops-select-radio" id="hr-radio-${i}"></div>
    </div>
  `).join("");
}

function selectProvider(name, cardId) {
  // Clear all selections
  document.querySelectorAll(".ops-provider-card:not(.assigned)").forEach(c => c.classList.remove("selected"));
  opsSelectedProvider = name;
  // Apply selection
  const numericId = typeof cardId === 'string' && cardId.startsWith('hr-') ? null : cardId;
  if (numericId !== null) {
    document.getElementById(`pcard-${cardId}`)?.classList.add("selected");
  } else {
    const hrIdx = cardId.toString().replace("hr-","");
    document.getElementById(`hpcard-${hrIdx}`)?.classList.add("selected");
  }
  document.getElementById("opsAssignBtn").disabled = false;
}

function confirmAssignment() {
  if (!opsSelectedProvider || opsModalJobIndex < 0) return;
  const j = jobs[opsModalJobIndex];
  const providerName = opsSelectedProvider;
  j.staff = providerName;
  j.status = 'In Progress';
  persistBookingChanges(j.bookingId, { providerName, status: 'Active' });
  renderJobs();
  document.getElementById("d-provider").textContent = providerName;
  showOpsToast(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`, "Provider Assigned", `${providerName} has been assigned to ${j.client}.`, "t-green");
  closeOpsModal();
}

function renderHrInbox() {
  document.getElementById("opsHrInbox").innerHTML = hrApprovedApplicants.map((a, i) => `
    <div class="ops-hr-card new-applicant">
      <div class="ops-hr-card-top">
        <div class="ops-hr-avatar" style="background:${a.color}">${a.initials}</div>
        <div class="ops-hr-info">
          <div class="ops-hr-name">${a.name}</div>
          <div class="ops-hr-sub"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> ${a.type} · ${a.experience} exp. · <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12.08 19.79 19.79 0 0 1 1.61 3.47 2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg> ${a.phone}</div>
        </div>
        <span class="ops-hr-tag from-hr">From HR</span>
      </div>
      <div class="ops-hr-actions">
        <button class="ops-hr-btn accept" onclick="acceptFromHR(${i})">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Accept &amp; Add to Roster
        </button>
        <button class="ops-hr-btn view" onclick="viewApplicantProfile('${a.name}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          View Profile
        </button>
        <button class="ops-hr-btn decline" onclick="declineFromHR(${i})">Decline</button>
      </div>
    </div>
  `).join("");

  document.getElementById("opsHrDeployed").innerHTML = deployedProviders.map(d => `
    <div class="ops-hr-card assigned-out">
      <div class="ops-hr-card-top">
        <div class="ops-hr-avatar" style="background:${d.color}">${d.initials}</div>
        <div class="ops-hr-info">
          <div class="ops-hr-name">${d.name}</div>
          <div class="ops-hr-sub"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg> ${d.job} · <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${d.date}</div>
        </div>
        <span class="ops-hr-tag deployed">Deployed</span>
      </div>
    </div>
  `).join("");
}

function acceptFromHR(index) {
  const a = hrApprovedApplicants[index];
  // Add to staff roster
  staff.push({
    initials: a.initials,
    color: a.color,
    name: a.name,
    sub: "",
    status: "available",
    statusLabel: "Available"
  });
  deployedProviders.unshift({ initials: a.initials, color: a.color, name: a.name, job: `Accepted from HR · ${a.type}`, date: "Just now" });
  hrApprovedApplicants.splice(index, 1);
  renderHrInbox();
  renderStaff();
  if (opsModalJobIndex >= 0) renderOpsProviders(jobs[opsModalJobIndex]);
  showOpsToast(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`, "Provider Accepted", `${a.name} added to the ops roster.`, "t-green");
}

function declineFromHR(index) {
  const a = hrApprovedApplicants[index];
  hrApprovedApplicants.splice(index, 1);
  renderHrInbox();
  showOpsToast(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`, "Applicant Declined", `${a.name} has been declined.`, "t-red");
}

function viewApplicantProfile(name) {
  showOpsToast(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`, "View Profile", `Opening profile for ${name} in HR dashboard...`, "");
}

function switchOpsTab(tab) {
  ["details","assign","hr"].forEach(t => {
    document.getElementById(`ops-tab-${t}`).style.display = t === tab ? "block" : "none";
    document.getElementById(`tab-${t}`).classList.toggle("active", t === tab);
  });
  // Show assign footer only on assign tab
  document.getElementById("opsAssignBtn").style.display = tab === "assign" ? "flex" : "none";
}

function closeOpsModal() {
  document.getElementById("opsModal").classList.remove("open");
  opsModalJobIndex = -1;
  opsSelectedProvider = null;
}

function opsCloseOutside(e) {
  if (e.target === document.getElementById("opsModal")) closeOpsModal();
}

document.addEventListener("keydown", e => { if (e.key === "Escape") closeOpsModal(); });

function showOpsToast(icon, title, sub, colorClass) {
  const container = document.getElementById("opsToastContainer");
  const toast = document.createElement("div");
  toast.className = `ops-toast ${colorClass}`;
  toast.innerHTML = `
    <span class="ops-toast-icon">${icon}</span>
    <div>
      <div class="ops-toast-title">${title}</div>
      <div class="ops-toast-sub">${sub}</div>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "opacity 0.4s, transform 0.4s";
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function changePage(dir) {
  const filtered = getFiltered();
  const maxPage = Math.ceil(filtered.length / PAGE_SIZE);
  currentPage = Math.max(1, Math.min(currentPage + dir, maxPage));
  renderJobs();
}

document.getElementById("jobSearch").addEventListener("input", () => { currentPage = 1; renderJobs(); });
document.getElementById("statusFilter").addEventListener("change", () => { currentPage = 1; renderJobs(); });
document.getElementById("svcFilter").addEventListener("change", () => { currentPage = 1; renderJobs(); });

// ── Weekly Chart ────────────────────────────────────────────────────────────
function renderChart() {
  const ctx = document.getElementById("weeklyChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      datasets: [
        { label:"Elderly Care",   backgroundColor:"#5046e4", data:[12,15,10,14,13,8,6]  },
        { label:"Pet Care",       backgroundColor:"#e91e8c", data:[8,10,12,9,11,15,14]  },
        { label:"Garden Work",    backgroundColor:"#16a34a", data:[5,7,6,8,9,12,4]       },
        { label:"House Cleaning", backgroundColor:"#f59e0b", data:[15,12,14,16,13,18,10] },
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:"bottom", labels:{ boxWidth:10, font:{ size:11, family:"DM Sans" }, padding:12 } } },
      scales:{
        x:{ grid:{ display:false }, ticks:{ font:{ size:11 } } },
        y:{ grid:{ color:"#f0f0f0" }, ticks:{ font:{ size:11 } }, beginAtZero:true }
      },
      barPercentage:0.7, categoryPercentage:0.8,
    }
  });
}

// ── Init ─────────────────────────────────────────────────────────────────────
renderServiceCards();
renderStaff();
renderJobs();
renderChart();
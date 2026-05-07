  // ─── Data ────────────────────────────────────────────────────────────────────
  const providers = [
    { initials: "SJ", color: "linear-gradient(135deg,#5046e4,#7c3aed)",
      name: "Sarah Johnson",    phone: "(555) 123-4567", email: "sarah.johnson@email.com",
      type: "Caregiver",           experience: "4 years",  status: "Under Review", date: "2026-05-01",
      credentials: [
        { name: "Government-Issued ID",         file: "sarah_gov_id.pdf",         status: "verified",  size: "1.2 MB" },
        { name: "CPR & First Aid Certificate",  file: "sarah_cpr_cert.pdf",       status: "verified",  size: "845 KB" },
        { name: "Caregiver Training Diploma",   file: "sarah_training.pdf",       status: "verified",  size: "2.1 MB" },
        { name: "Background Check Clearance",   file: "sarah_bgcheck.pdf",        status: "pending",   size: "980 KB" },
        { name: "Medical Fitness Certificate",  file: "sarah_medical.pdf",        status: "pending",   size: "1.5 MB" },
      ]},
    { initials: "MC", color: "linear-gradient(135deg,#0ea5e9,#2563eb)",
      name: "Michael Chen",     phone: "(555) 234-5678", email: "michael.chen@email.com",
      type: "Personal Care",       experience: "6 years",  status: "Approved",     date: "2026-04-28",
      credentials: [
        { name: "Government-Issued ID",         file: "michael_gov_id.pdf",       status: "verified",  size: "1.1 MB" },
        { name: "Personal Care Certification",  file: "michael_cert.pdf",         status: "verified",  size: "1.8 MB" },
        { name: "Background Check Clearance",   file: "michael_bgcheck.pdf",      status: "verified",  size: "760 KB" },
        { name: "Reference Letters (×2)",       file: "michael_references.pdf",   status: "verified",  size: "3.2 MB" },
      ]},
    { initials: "ER", color: "linear-gradient(135deg,#f97316,#ef4444)",
      name: "Emily Rodriguez",  phone: "(555) 345-6789", email: "emily.r@email.com",
      type: "Garden Maintenance",  experience: "3 years",  status: "Pending",      date: "2026-05-05",
      credentials: [
        { name: "Government-Issued ID",         file: "emily_gov_id.pdf",         status: "verified",  size: "1.3 MB" },
        { name: "Horticulture Certificate",     file: "emily_horticulture.pdf",   status: "verified",  size: "2.4 MB" },
        { name: "Background Check Clearance",   file: "emily_bgcheck.pdf",        status: "missing",   size: "—"      },
        { name: "Proof of Insurance",           file: "emily_insurance.pdf",      status: "missing",   size: "—"      },
      ]},
    { initials: "DK", color: "linear-gradient(135deg,#10b981,#0d9488)",
      name: "David Kim",        phone: "(555) 456-7890", email: "david.kim@email.com",
      type: "House Cleaning",      experience: "7 years",  status: "Approved",     date: "2026-04-25",
      credentials: [
        { name: "Government-Issued ID",         file: "david_gov_id.pdf",         status: "verified",  size: "1.0 MB" },
        { name: "House Cleaning Certification", file: "david_cleaning_cert.pdf",  status: "verified",  size: "1.6 MB" },
        { name: "Background Check Clearance",   file: "david_bgcheck.pdf",        status: "verified",  size: "890 KB" },
        { name: "Reference Letters (×3)",       file: "david_references.pdf",     status: "verified",  size: "4.1 MB" },
        { name: "Proof of Insurance",           file: "david_insurance.pdf",      status: "verified",  size: "1.2 MB" },
      ]},
    { initials: "JM", color: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
      name: "Jessica Martinez", phone: "(555) 567-8901", email: "j.martinez@email.com",
      type: "Caregiver",           experience: "5 years",  status: "Under Review", date: "2026-05-03",
      credentials: [
        { name: "Government-Issued ID",         file: "jessica_gov_id.pdf",       status: "verified",  size: "1.4 MB" },
        { name: "CPR & First Aid Certificate",  file: "jessica_cpr.pdf",          status: "verified",  size: "910 KB" },
        { name: "Elderly Care Diploma",         file: "jessica_diploma.pdf",      status: "pending",   size: "2.8 MB" },
        { name: "Background Check Clearance",   file: "jessica_bgcheck.pdf",      status: "pending",   size: "1.1 MB" },
        { name: "Medical Fitness Certificate",  file: "jessica_medical.pdf",      status: "missing",   size: "—"      },
      ]},
    { initials: "RT", color: "linear-gradient(135deg,#f43f5e,#be123c)",
      name: "Robert Taylor",    phone: "(555) 678-9012", email: "robert.t@email.com",
      type: "Personal Care",       experience: "2 years",  status: "Rejected",     date: "2026-04-20",
      credentials: [
        { name: "Government-Issued ID",         file: "robert_gov_id.pdf",        status: "verified",  size: "1.1 MB" },
        { name: "Personal Care Certification",  file: "robert_cert.pdf",          status: "missing",   size: "—"      },
        { name: "Background Check Clearance",   file: "robert_bgcheck.pdf",       status: "missing",   size: "—"      },
        { name: "Reference Letters",            file: "robert_references.pdf",    status: "missing",   size: "—"      },
      ]},
    { initials: "AM", color: "linear-gradient(135deg,#f59e0b,#d97706)",
      name: "Anna Mitchell",    phone: "(555) 789-0123", email: "anna.m@email.com",
      type: "Garden Maintenance",  experience: "8 years",  status: "Approved",     date: "2026-04-18",
      credentials: [
        { name: "Government-Issued ID",         file: "anna_gov_id.pdf",          status: "verified",  size: "1.2 MB" },
        { name: "Horticulture Certificate",     file: "anna_horticulture.pdf",    status: "verified",  size: "3.0 MB" },
        { name: "Background Check Clearance",   file: "anna_bgcheck.pdf",         status: "verified",  size: "870 KB" },
        { name: "Proof of Insurance",           file: "anna_insurance.pdf",       status: "verified",  size: "1.4 MB" },
        { name: "Reference Letters (×2)",       file: "anna_references.pdf",      status: "verified",  size: "2.6 MB" },
      ]},
    { initials: "LW", color: "linear-gradient(135deg,#06b6d4,#0284c7)",
      name: "Liam Wilson",      phone: "(555) 890-1234", email: "liam.w@email.com",
      type: "House Cleaning",      experience: "1 year",   status: "Pending",      date: "2026-05-04",
      credentials: [
        { name: "Government-Issued ID",         file: "liam_gov_id.pdf",          status: "verified",  size: "1.0 MB" },
        { name: "House Cleaning Certification", file: "liam_cleaning_cert.pdf",   status: "pending",   size: "1.7 MB" },
        { name: "Background Check Clearance",   file: "liam_bgcheck.pdf",         status: "missing",   size: "—"      },
        { name: "Reference Letters",            file: "liam_references.pdf",      status: "missing",   size: "—"      },
      ]},
  ];

  let activeTab = "all";
  let openModalIndex = -1;

  // ─── Badge helper ─────────────────────────────────────────────────────────────
  function badgeHTML(status) {
    const map = {
      "Under Review": ["badge-review", "Under Review"],
      "Approved":     ["badge-approved", "Approved"],
      "Pending":      ["badge-pending", "Pending"],
      "Rejected":     ["badge-rejected", "Rejected"],
    };
    const [cls, label] = map[status] || ["badge-pending", status];
    return `<span class="badge ${cls}"><span class="badge-dot"></span>${label}</span>`;
  }

  // ─── Render table ─────────────────────────────────────────────────────────────
  function getFiltered() {
    if (activeTab === "all") return providers;
    if (activeTab === "Pending") return providers.filter(p => p.status === "Pending" || p.status === "Under Review");
    return providers.filter(p => p.status === activeTab);
  }

  function renderTable() {
    const data = getFiltered();
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    const noResults = document.getElementById("noResults");
    noResults.style.display = data.length === 0 ? "block" : "none";

    data.forEach((p, localIdx) => {
      const globalIdx = providers.indexOf(p);
      const isPending = p.status === "Pending" || p.status === "Under Review";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <div class="applicant-cell">
            <div class="avatar" style="background:${p.color}">${p.initials}</div>
            <span class="applicant-name">${p.name}</span>
          </div>
        </td>
        <td>
          <div class="contact-cell">
            <span class="contact-email"><svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>${p.email}</span>
            <span class="contact-phone"><svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${p.phone}</span>
          </div>
        </td>
        <td><span class="type-pill">${p.type}</span></td>
        <td class="exp-cell">${p.experience}</td>
        <td class="date-cell">${p.date}</td>
        <td>${badgeHTML(p.status)}</td>
        <td>
          <div class="actions">
            <button class="btn-review" title="View details" onclick="openModal(${globalIdx})"><svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Review</button>
            ${isPending ? `
              <button class="btn-approve" title="Approve" onclick="changeStatus(${globalIdx},'Approved')"><svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Approve</button>
              <button class="btn-reject"  title="Reject"  onclick="changeStatus(${globalIdx},'Rejected')"><svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Reject</button>
            ` : ''}
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    updateCounts();
  }

  // ─── Update counts ────────────────────────────────────────────────────────────
  function updateCounts() {
    const pending  = providers.filter(p => p.status === "Pending" || p.status === "Under Review").length;
    const approved = providers.filter(p => p.status === "Approved").length;
    const rejected = providers.filter(p => p.status === "Rejected").length;
    const total    = providers.length;

    document.getElementById("count-pending").textContent  = pending;
    document.getElementById("count-approved").textContent = approved;
    document.getElementById("count-rejected").textContent = rejected;
    document.getElementById("count-total").textContent    = total;
    document.getElementById("count-total-sub").textContent = `+${approved} this month`;

    document.getElementById("tab-all-count").textContent     = total;
    document.getElementById("tab-pending-count").textContent = pending;
    document.getElementById("tab-approved-count").textContent = approved;
    document.getElementById("tab-rejected-count").textContent = rejected;

    const filtered = getFiltered();
    document.getElementById("toolbar-count").textContent = `(${filtered.length})`;
  }

  // ─── Tabs ─────────────────────────────────────────────────────────────────────
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeTab = btn.dataset.tab;
      renderTable();
    });
  });

  // ─── Change Status ────────────────────────────────────────────────────────────
  function changeStatus(index, newStatus) {
    providers[index].status = newStatus;
    renderTable();
    // if modal is open for this provider, refresh it
    if (openModalIndex === index) {
      populateModal(index);
    }
  }

  // ─── Modal ────────────────────────────────────────────────────────────────────
  function openModal(index) {
    openModalIndex = index;
    populateModal(index);
    document.getElementById("reviewModal").classList.add("open");
  }

  function populateModal(index) {
    const p = providers[index];
    const isPending = p.status === "Pending" || p.status === "Under Review";

    document.getElementById("modal-avatar").style.background = p.color;
    document.getElementById("modal-avatar").textContent = p.initials;
    document.getElementById("modal-name").textContent = p.name;
    document.getElementById("modal-type").textContent = p.type;
    document.getElementById("modal-email").textContent = p.email;
    document.getElementById("modal-phone").textContent = p.phone;
    document.getElementById("modal-service").textContent = p.type;
    document.getElementById("modal-experience").textContent = p.experience;
    document.getElementById("modal-date").textContent = p.date;

    // rebuild badge
    const badgeEl = document.getElementById("modal-status-badge");
    const statusMap = {
      "Under Review": "badge-review",
      "Approved":     "badge-approved",
      "Pending":      "badge-pending",
      "Rejected":     "badge-rejected",
    };
    badgeEl.className = `badge ${statusMap[p.status] || "badge-pending"}`;
    badgeEl.innerHTML = `<span class="badge-dot"></span>${p.status}`;

    // ── Credentials ──────────────────────────────────────────────────────────
    const credList    = document.getElementById("modal-cred-list");
    const credSummary = document.getElementById("modal-cred-summary");
    const creds = p.credentials || [];

    const counts = { verified: 0, pending: 0, missing: 0 };
    creds.forEach(c => counts[c.status] = (counts[c.status] || 0) + 1);

    const checkSVG  = `<svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    const clockSVG  = `<svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    const xSVG      = `<svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

    credSummary.innerHTML = [
      counts.verified ? `<span class="cred-pill verified">${checkSVG} ${counts.verified} Verified</span>` : "",
      counts.pending  ? `<span class="cred-pill pending">${clockSVG} ${counts.pending} Pending</span>`   : "",
      counts.missing  ? `<span class="cred-pill missing">${xSVG} ${counts.missing} Missing</span>`        : "",
    ].join("");

    const fileSVG    = `<svg class="icon-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`;
    const pendSVG    = `<svg class="icon-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    const missSVG    = `<svg class="icon-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    const eyeSVG     = `<svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    const iconMap    = { verified: fileSVG, pending: pendSVG, missing: missSVG };
    const labelMap  = { verified: "Verified", pending: "Under Review", missing: "Not Uploaded" };

    credList.innerHTML = creds.map(c => `
      <div class="cred-item ${c.status}">
        <div class="cred-file-icon">${iconMap[c.status]}</div>
        <div class="cred-info">
          <div class="cred-name">${c.name}</div>
          <div class="cred-meta">
            <span class="cred-filename">${c.status === "missing" ? "No file uploaded" : c.file}</span>
            ${c.size !== "—" ? `<span class="cred-size">· ${c.size}</span>` : ""}
          </div>
        </div>
        <span class="cred-status-badge ${c.status}">${labelMap[c.status]}</span>
        <button class="cred-action-btn" title="${c.status !== "missing" ? "View document" : "Not available"}">${eyeSVG}</button>
      </div>
    `).join("");

    // Decision section
    const decisionEl = document.getElementById("modal-decision");

    if (isPending) {
      decisionEl.innerHTML = `
        <div class="modal-decision-label">HR Admin Actions</div>
        <div class="modal-decision-btns">
          <button class="modal-btn-interview" onclick="hrAction(${index},'interview')">
            <span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg></span>
            <span class="btn-text">
              <span class="btn-title">Approve for Scheduled Interview</span>
              <span class="btn-sub">Mark applicant as approved — schedule an interview</span>
            </span>
          </button>
          <button class="modal-btn-superadmin" onclick="hrAction(${index},'superadmin')">
            <span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg></span>
            <span class="btn-text">
              <span class="btn-title">Approve &amp; Forward to Super Admin</span>
              <span class="btn-sub">Confirm approval and escalate to Super Admin review</span>
            </span>
          </button>
          <button class="modal-btn-reject-full" onclick="hrAction(${index},'reject')">
            <span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg></span>
            <span class="btn-text">
              <span class="btn-title">Reject Applicant</span>
              <span class="btn-sub">Applicant does not meet the requirements</span>
            </span>
          </button>
        </div>
        <div class="modal-footer-row">
          <button class="modal-btn-close" onclick="closeModal()">Close</button>
        </div>
      `;
    } else {
      const isApproved = p.status === "Approved";
      const msgClass   = isApproved ? "approved" : "rejected";
      const msgIconSVG = isApproved
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`;
      const msgText    = isApproved
        ? "This applicant has been approved."
        : "This applicant has been rejected.";
      decisionEl.innerHTML = `
        <div class="modal-decided-msg ${msgClass}">
          ${msgIconSVG}
          <span>${msgText}</span>
        </div>
        <div class="modal-footer-row">
          <button class="modal-btn-close" onclick="closeModal()">Close</button>
        </div>
      `;
    }
  }

  function hrAction(index, action) {
    const calSVG  = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>`;
    const fwdSVG  = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>`;
    const rejSVG  = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`;
    if (action === 'interview') {
      changeStatus(index, "Approved");
      showToast(calSVG, "Approved for Interview", `${providers[index].name} has been scheduled for an interview.`, "t-blue");
    } else if (action === 'superadmin') {
      changeStatus(index, "Approved");
      showToast(fwdSVG, "Forwarded to Super Admin", `${providers[index].name}'s approval has been sent for final review.`, "t-purple");
    } else if (action === 'reject') {
      changeStatus(index, "Rejected");
      showToast(rejSVG, "Applicant Rejected", `${providers[index].name} has been rejected.`, "t-red");
    }
    closeModal();
  }

  function closeModal() {
    document.getElementById("reviewModal").classList.remove("open");
    openModalIndex = -1;
  }

  function closeModalOutside(e) {
    if (e.target === document.getElementById("reviewModal")) closeModal();
  }

  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // ─── Toast system ─────────────────────────────────────────────────────────────
  function showToast(icon, title, sub, colorClass) {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${colorClass}`;
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <div>
        <div>${title}</div>
        <div class="toast-sub">${sub}</div>
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

  // ─── Export CSV ───────────────────────────────────────────────────────────────
  function exportCSV() {
    const data = getFiltered();
    const headers = ["Name", "Phone", "Email", "Type", "Experience", "Status", "Applied Date"];
    const rows = data.map(p => [p.name, p.phone, p.email, p.type, p.experience, p.status, p.date]);
    const csvContent = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "hr_providers.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  // ─── Initial render ───────────────────────────────────────────────────────────
  renderTable();
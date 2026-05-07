const jobs = [
  {
    id: 1,
    name: 'Emily Davis',
    address: '321 Elm Street, Houston',
    booking: 'Caregiver Assistance',
    schedule: 'Tuesday, May 5 • 11:00 AM - 3:00 PM',
    pay: 220,
    status: 'assigned'
  },
  {
    id: 2,
    name: 'Robert Johnson',
    address: '789 Oak Avenue, Dallas',
    booking: 'Senior Care Visit',
    schedule: 'Wednesday, May 6 • 9:00 AM - 1:00 PM',
    pay: 180,
    status: 'assigned'
  }
];

let currentJobId = null;
let activeTab = 'assigned';

function getProviderBookings() {
  if (typeof appData === 'undefined') {
    return jobs;
  }

  const currentUser = appData.getCurrentUser();
  const bookings = appData.getAllBookings();

  if (!currentUser) {
    return bookings.filter(b => b.providerName && b.providerName !== 'Unassigned');
  }

  return bookings.filter(b => b.providerId === currentUser.id || b.applicantId === currentUser.id);
}

function getEstimatedPay(serviceType) {
  const priceMap = {
    'House Cleaning': 220,
    'Pet Care': 180,
    'Elderly Care': 250,
    'Garden Maintenance': 200
  };
  return priceMap[serviceType] || 150;
}

function mapBookingToJob(booking) {
  return {
    id: booking.id,
    name: booking.customerName || 'Customer',
    address: booking.location || 'Unknown Address',
    booking: booking.serviceType || 'Service',
    schedule: `${booking.date || 'TBD'} • ${booking.time || 'TBD'}`,
    pay: booking.estimatedPay || getEstimatedPay(booking.serviceType),
    status: booking.status === 'Active' ? 'assigned' : booking.status === 'Completed' ? 'completed' : 'assigned',
    bookingData: booking
  };
}

function getRenderedJobs() {
  const bookings = getProviderBookings();
  return bookings.map(mapBookingToJob);
}

function getBrowseJobs(){
  const bookings = getProviderBookings();
  return bookings.filter(b => b.status === 'Pending' && !b.providerId).map(mapBookingToJob);
}

function applyForJob(jobId){
  const bookings = getProviderBookings();
  const job = bookings.find(b => b.id === jobId);
  if (job && job.status === 'Pending' && !job.providerId) {
    job.status = 'pending_approval';
    job.applicantId = currentUser.id;
    saveBookings(bookings);
    alert('Application submitted! Waiting for approval.');
    renderJobs();
  }
}

function renderJobs(){
  const container = document.getElementById('jobsContainer');
  const allJobs = getRenderedJobs();
  const assigned = allJobs.filter(j => j.status === 'assigned' || j.status === 'pending_approval');
  const completed = allJobs.filter(j => j.status === 'completed');
  const browse = getBrowseJobs();

  document.getElementById('assignedCount').innerText = assigned.length;
  document.getElementById('completedCount').innerText = completed.length;

  const earnings = completed.reduce((sum, j) => sum + j.pay, 0);
  document.getElementById('earnings').innerText = '$' + earnings;
  renderProviderStatus();

  let list;
  if (activeTab === 'completed') {
    list = completed;
  } else if (activeTab === 'browse') {
    list = browse;
  } else {
    list = assigned;
  }

  if (!list.length) {
    const emptyMsg = activeTab === 'completed' ? 'No completed jobs yet' : activeTab === 'browse' ? 'No available jobs to browse' : 'No active assignments';
    const subMsg = activeTab === 'completed' ? 'Complete more shifts to see your earnings grow.' : activeTab === 'browse' ? 'Check back later for new job opportunities.' : 'You can accept new jobs from operations to start working.';
    container.innerHTML = `<div class="job-card empty-card">
        <div class="job-info">
          <h2>${emptyMsg}</h2>
          <p>${subMsg}</p>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = list.map(job => `
    <div class="job-card">
      <div class="job-meta">
        <div class="job-card-top">
          <div class="avatar">${job.name.split(' ').map(part => part[0]).join('')}</div>
          <div class="job-info">
            <h2>${job.name}</h2>
            <p>${job.address}</p>
            <div class="job-info-small">
              <span>👜 ${job.booking}</span>
              <span>📅 ${job.schedule}</span>
            </div>
          </div>
        </div>
        <div class="job-price">$${job.pay}</div>
      </div>

      <div class="job-actions">
        ${activeTab === 'browse' ? `
          <button class="btn dark" onclick="applyForJob('${job.id}')">Apply for Job</button>
          <button class="btn light" onclick="viewClientDetails('${job.id}')">Details</button>
        ` : activeTab === 'assigned' ? `
          ${job.status === 'pending_approval' ? `
            <button class="btn light" disabled>Pending Approval</button>
          ` : `
            <button class="btn dark" onclick="openAcceptModal('${job.id}')">Accept Job</button>
            <button class="btn red" onclick="openDeclineModal('${job.id}')">Decline</button>
            <button class="btn blue" onclick="openMessageModal('${job.id}')">Message</button>
          `}
          <button class="btn light" onclick="viewClientDetails('${job.id}')">Details</button>
        ` : `
          <button class="btn blue" onclick="viewClientDetails('${job.id}')">View Notes</button>
        `}
      </div>
    </div>
  `).join('');
}

function getCurrentProviderStatus() {
  if (typeof appData === 'undefined') return 'Available';
  const currentUser = appData.getCurrentUser();
  if (!currentUser) return 'Available';

  const bookings = getProviderBookings();
  const isOnJob = bookings.some(b => b.status === 'Active' || b.status === 'assigned');
  if (isOnJob) return 'On Job';

  return currentUser.status && currentUser.status.toLowerCase() !== 'active'
    ? currentUser.status
    : 'Available';
}

function renderProviderStatus() {
  const pill = document.getElementById('workerStatusPill');
  if (!pill) return;
  pill.textContent = getCurrentProviderStatus();
}

function setActiveTab(tab){
  activeTab = tab;
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.toggle('active', button.dataset.tab === tab);
  });
  renderJobs();
}

function attachTabListeners(){
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => setActiveTab(button.dataset.tab));
  });
}

function openAcceptModal(id){
  currentJobId = id;
  document.getElementById('acceptModal').style.display = 'flex';
}

function confirmAccept(){
  const job = getRenderedJobs().find(j => j.id === currentJobId);
  if (!job) {
    closeModal('acceptModal');
    return;
  }

  if (typeof appData !== 'undefined') {
    const bookings = appData.getAllBookings();
    const booking = bookings.find(b => b.id === job.id);
    if (booking) {
      booking.status = 'Active';
      const currentUser = appData.getCurrentUser();
      if (currentUser) {
        booking.providerId = currentUser.id;
        booking.providerName = currentUser.name;
      }
      localStorage.setItem(appData.STORAGE_BOOKINGS, JSON.stringify(bookings));
    }
  }

  alert('Job accepted successfully.');
  renderJobs();
  closeModal('acceptModal');
}

function openDeclineModal(id){
  currentJobId = id;
  document.getElementById('declineModal').style.display = 'flex';
}

function confirmDecline(){
  const job = getRenderedJobs().find(j => j.id === currentJobId);
  if (job && typeof appData !== 'undefined') {
    const bookings = appData.getAllBookings();
    const booking = bookings.find(b => b.id === job.id);
    if (booking) {
      booking.status = 'Pending';
      booking.providerId = null;
      booking.providerName = 'Unassigned';
      localStorage.setItem(appData.STORAGE_BOOKINGS, JSON.stringify(bookings));
    }
  }

  renderJobs();
  closeModal('declineModal');
}

function openMessageModal(){
  document.getElementById('messageModal').style.display = 'flex';
}

function viewClientDetails(id){
  const job = getRenderedJobs().find(j => j.id === id);
  if (!job) return;

  document.getElementById('clientDetails').innerHTML = `
    <p><strong>Name:</strong> ${job.name}</p><br>
    <p><strong>Address:</strong> ${job.address}</p><br>
    <p><strong>Booking Type:</strong> ${job.booking}</p><br>
    <p><strong>Schedule:</strong> ${job.schedule}</p><br>
    <p><strong>Provider:</strong> ${job.bookingData.providerName || 'Unassigned'}</p><br>
    <p><strong>Status:</strong> ${job.bookingData.status}</p>
  `;

  document.getElementById('detailsModal').style.display = 'flex';
}

function openInboxModal(){
  document.getElementById('inboxModal').style.display = 'flex';
}

function closeModal(id){
  document.getElementById(id).style.display = 'none';
}

window.onclick = function(e){
  document.querySelectorAll('.modal-overlay').forEach(modal=>{
    if(e.target === modal){
      modal.style.display = 'none';
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  attachTabListeners();
  setActiveTab(activeTab);

  // Sidebar toggle functionality
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('active');
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }
});

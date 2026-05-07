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

function renderJobs(){
  const container = document.getElementById('jobsContainer');
  const assigned = jobs.filter(j => j.status === 'assigned');
  const completed = jobs.filter(j => j.status === 'completed');

  document.getElementById('assignedCount').innerText = assigned.length;
  document.getElementById('completedCount').innerText = completed.length;

  const earnings = completed.reduce((sum, j) => sum + j.pay, 0);
  document.getElementById('earnings').innerText = '$' + earnings;

  const list = activeTab === 'completed' ? completed : assigned;

  if (!list.length) {
    container.innerHTML = `<div class="job-card empty-card">
        <div class="job-info">
          <h2>${activeTab === 'completed' ? 'No completed jobs yet' : 'No active assignments'}</h2>
          <p>${activeTab === 'completed' ? 'Complete more shifts to see your earnings grow.' : 'You can accept new jobs from operations to start working.'}</p>
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
        ${activeTab === 'assigned' ? `
          <button class="btn dark" onclick="openAcceptModal(${job.id})">Accept Job</button>
          <button class="btn red" onclick="openDeclineModal(${job.id})">Decline</button>
          <button class="btn blue" onclick="openMessageModal(${job.id})">Message</button>
          <button class="btn light" onclick="viewClientDetails(${job.id})">Details</button>
        ` : `
          <button class="btn blue" onclick="viewClientDetails(${job.id})">View Notes</button>
        `}
      </div>
    </div>
  `).join('');
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
  alert('Job accepted successfully.');
  closeModal('acceptModal');
}

function openDeclineModal(id){
  currentJobId = id;
  document.getElementById('declineModal').style.display = 'flex';
}

function confirmDecline(){

  const index = jobs.findIndex(j => j.id === currentJobId);

  if(index !== -1){
    jobs.splice(index,1);
  }

  renderJobs();

  closeModal('declineModal');
}

function openMessageModal(){
  document.getElementById('messageModal').style.display = 'flex';
}

function viewClientDetails(id){

  const job = jobs.find(j => j.id === id);

  document.getElementById('clientDetails').innerHTML = `
    <p><strong>Name:</strong> ${job.name}</p><br>
    <p><strong>Address:</strong> ${job.address}</p><br>
    <p><strong>Booking Type:</strong> ${job.booking}</p><br>
    <p><strong>Emergency Contact:</strong> Sarah Johnson</p><br>
    <p><strong>Medical Notes:</strong> Requires mobility assistance.</p><br>
    <p><strong>Schedule:</strong> Tuesday - 11AM</p>
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
});

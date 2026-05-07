const formState = {
  step: 1,
  dirty: false,
  personal: {
    firstName: '', lastName: '', email: '', phone: '', street: '', city: '', barangay: '', zip: ''
  },
  service: { serviceTypes: [], availability: '' },
  experience: {
    yearsExperience: '', skills: '', certifications: '', languages: [], additionalNotes: '', resume: null, license: null
  },
  agreed: false
};
const totalSteps = 4;
const maxFileSize = 5 * 1024 * 1024;
const acceptedTypes = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/jpeg','image/png'];

const stepPanels = Array.from(document.querySelectorAll('.step-panel'));
const stepPills = Array.from(document.querySelectorAll('.step-pill'));
const progressFill = document.querySelector('.progress-fill');
const stepCounter = document.querySelector('.step-counter');
const progressStatus = document.querySelector('.progress-status');
const backButton = document.getElementById('backButton');
const nextButton = document.getElementById('nextButton');
const confirmModal = document.getElementById('confirmModal');
const successModal = document.getElementById('successModal');
const confirmSubmitButton = document.getElementById('confirmSubmitButton');

function setDirty() { formState.dirty = true; }
function initPage() {
  loadFormState();
  updateStepUI();
  attachOptionHandlers();
  attachFieldListeners();
  window.addEventListener('beforeunload', beforeUnloadHandler);
}

function attachFieldListeners() {
  document.querySelectorAll('#providerApplicationForm input, #providerApplicationForm textarea, #providerApplicationForm select').forEach(el => el.addEventListener('input', () => {
    setDirty(); saveFormState();
  }));
  document.getElementById('city').addEventListener('change', handleCityChange);
}

function attachOptionHandlers() {
  document.querySelectorAll('#serviceOptions .card-option').forEach(card => {
    card.addEventListener('click', () => toggleServiceType(card.dataset.value));
  });
  document.querySelectorAll('#availabilityOptions .chip').forEach(chip => {
    chip.addEventListener('click', () => selectAvailability(chip.dataset.value));
  });
}

function toggleServiceType(value) {
  const index = formState.service.serviceTypes.indexOf(value);
  if (index === -1) {
    formState.service.serviceTypes.push(value);
  } else {
    formState.service.serviceTypes.splice(index, 1);
  }
  setDirty(); saveFormState(); renderServiceSelection();
}

function selectAvailability(value) {
  formState.service.availability = value;
  setDirty(); saveFormState(); renderAvailabilitySelection();
}

function renderServiceSelection() {
  document.querySelectorAll('#serviceOptions .card-option').forEach(card => {
    card.classList.toggle('selected', formState.service.serviceTypes.includes(card.dataset.value));
  });
}

function renderAvailabilitySelection() {
  document.querySelectorAll('#availabilityOptions .chip').forEach(chip => {
    chip.classList.toggle('selected', chip.dataset.value === formState.service.availability);
  });
}

function populateBarangayOptions() {
  const barangaySelect = document.getElementById('barangay');
  const city = document.getElementById('city').value;
  const barangays = [
    'Arena Blanco','Ayala','Baliwasan','Baluno','Barangay Zone','Barangay Zone II','Barangay Zone III','Barangay Zone IV','Boalan','Bolong','Buenavista','Bunguiao','Busay','Cabaluay','Cabatangan','Cacao','Calabasa','Calarian','Camino Nuevo','Campo Islam','Canelar','Capisan','Cawit','Culianan','Curuan','Dita','Divisoria','Dulian (Upper Bunguiao)','Dulian (Upper Pasonanca)','Guisao','Guiwan','Kasanyangan','La Paz','Labuan','Lamisahan','Landang Gua','Landang Laum','Lanzones','Lapakan','Latuan','Licomo','Limaong','Limpapa','Lubigan','Lumayang','Lumbangan','Lunzura','Maasin','Malagutay','Mampang','Manalipa','Mangusu','Manicahan','Mariki','Mercedes','Muti','Pamucut','Pangapuyan','Panubiga','Pasilmant','Pasobolon','Pasonanca','Patalon','Putik','Quiniput','Recodo','Rio Hondo','Salaan','San Jose Cawa-cawa','San Jose Gusu','San Roque','Sangali','Santa Barbara','Santa Catalina','Santa Maria','Santo Niño','Sibulao','Sinubung','Sinunoc','Tagasilay','Taguiti','Talabaan','Talisayan','Talon-talon','Taluksangay','Tetuan','Tictapul','Tigbalabag','Tigtabon','Tolosa','Tugbungan','Tulungatung','Tumaga','Tumalutab','Tumitus','Victoria','Vitali','Zambowood'
  ];
  barangaySelect.innerHTML = '';
  if (city === 'Zamboanga City') {
    barangaySelect.disabled = false;
    barangaySelect.appendChild(new Option('Select a barangay', ''));
    barangays.forEach(name => barangaySelect.appendChild(new Option(name, name)));
    barangaySelect.value = formState.personal.barangay || '';
  } else {
    barangaySelect.disabled = true;
    barangaySelect.appendChild(new Option('Choose Zamboanga City first', ''));
    formState.personal.barangay = '';
  }
}

function handleCityChange() {
  formState.personal.city = document.getElementById('city').value;
  setDirty(); saveFormState();
  populateBarangayOptions();
}

function loadFormState() {
  const saved = sessionStorage.getItem('providerApplicationState');
  if (saved) {
    Object.assign(formState, JSON.parse(saved));
  }
  Object.entries(formState.personal).forEach(([key, value]) => {
    const input = document.getElementById(key);
    if (input) input.value = value;
  });
  populateBarangayOptions();
  document.getElementById('yearsExperience').value = formState.experience.yearsExperience;
  document.getElementById('skills').value = formState.experience.skills;
  document.getElementById('certifications').value = formState.experience.certifications;
  const languageValues = Array.isArray(formState.experience.languages)
    ? formState.experience.languages
    : formState.experience.languages ? [formState.experience.languages] : [];
  document.querySelectorAll('input[name="languages"]').forEach(checkbox => {
    checkbox.checked = languageValues.includes(checkbox.value);
  });
  formState.experience.languages = languageValues;
  document.getElementById('additionalNotes').value = formState.experience.additionalNotes;
  document.getElementById('agreeTerms').checked = formState.agreed;
  if (formState.experience.resume) {
    document.getElementById('resumeLabel').textContent = formState.experience.resume.name;
  }
  if (formState.experience.license) {
    document.getElementById('licenseLabel').textContent = formState.experience.license.name;
  }
  renderServiceSelection();
  renderAvailabilitySelection();
}

function saveFormState() {
  formState.personal.firstName = document.getElementById('firstName').value.trim();
  formState.personal.lastName = document.getElementById('lastName').value.trim();
  formState.personal.email = document.getElementById('email').value.trim();
  formState.personal.phone = document.getElementById('phone').value.trim();
  formState.personal.street = document.getElementById('street').value.trim();
  formState.personal.city = document.getElementById('city').value.trim();
  formState.personal.barangay = document.getElementById('barangay').value.trim();
  formState.personal.zip = document.getElementById('zip').value.trim();
  formState.experience.yearsExperience = document.getElementById('yearsExperience').value.trim();
  formState.experience.skills = document.getElementById('skills').value.trim();
  formState.experience.certifications = document.getElementById('certifications').value.trim();
  formState.experience.languages = Array.from(document.querySelectorAll('input[name="languages"]:checked')).map(option => option.value);
  formState.experience.additionalNotes = document.getElementById('additionalNotes').value.trim();
  formState.agreed = document.getElementById('agreeTerms').checked;
  sessionStorage.setItem('providerApplicationState', JSON.stringify(formState));
}

function updateStepUI() {
  stepPanels.forEach(panel => {
    panel.style.display = Number(panel.dataset.step) === formState.step ? 'block' : 'none';
  });
  stepPills.forEach(pill => {
    const stepNum = Number(pill.dataset.step);
    pill.classList.toggle('active', stepNum === formState.step);
    pill.classList.toggle('completed', stepNum < formState.step);
  });
  const progress = ((formState.step - 1) / (totalSteps - 1)) * 100;
  progressFill.style.width = `${progress}%`;
  stepCounter.textContent = `Step ${formState.step} of ${totalSteps}`;
  progressStatus.textContent = stepPills.find(p => Number(p.dataset.step) === formState.step).textContent;
  backButton.style.display = formState.step > 1 ? 'inline-flex' : 'none';
  nextButton.textContent = formState.step === totalSteps ? 'Submit Application' : 'Next';
  updateSubmitState();
  if (formState.step === 4) {
    populateReview();
  }
}

function validateStep() {
  clearValidation();
  if (formState.step === 1) return validateStepOne();
  if (formState.step === 2) return validateStepTwo();
  if (formState.step === 3) return validateStepThree();
  return true;
}

function clearValidation() {
  document.querySelectorAll('.field-error').forEach(el => { el.textContent = ''; });
  document.querySelectorAll('.field-invalid').forEach(group => group.classList.remove('field-invalid'));
  document.getElementById('confirmError').style.display='none';
}

function validateStepOne() {
  let valid = true;
  const required = ['firstName','lastName','email','phone','street','city','zip'];
  required.forEach(field => {
    const value = document.getElementById(field).value.trim();
    if (!value) {
      valid = false;
      const group = document.getElementById(`group-${field}`);
      if (group) group.classList.add('field-invalid');
      document.getElementById(`error-${field}`).textContent = 'This field is required.';
    }
  });
  if (document.getElementById('city').value === 'Zamboanga City') {
    const barangayValue = document.getElementById('barangay').value.trim();
    if (!barangayValue) {
      valid = false;
      document.getElementById('group-barangay').classList.add('field-invalid');
      document.getElementById('error-barangay').textContent = 'Please select a barangay.';
    }
  }
  const emailValue = document.getElementById('email').value.trim();
  if (emailValue && !/^\S+@\S+\.\S+$/.test(emailValue)) {
    valid = false; document.getElementById('group-email').classList.add('field-invalid');
    document.getElementById('error-email').textContent = 'Enter a valid email address.';
  }
  return valid;
}

function validateStepTwo() {
  let valid = true;
  if (!formState.service.serviceTypes.length) {
    valid = false;
    document.getElementById('error-serviceType').textContent = 'Please select at least one service type.';
  }
  if (!formState.service.availability) {
    valid = false;
    document.getElementById('error-availability').textContent = 'Please select availability.';
  }
  return valid;
}

function validateStepThree() {
  let valid = true;
  const years = document.getElementById('yearsExperience').value.trim();
  const skills = document.getElementById('skills').value.trim();
  if (!years) {
    valid = false; document.getElementById('group-yearsExperience').classList.add('field-invalid');
    document.getElementById('error-yearsExperience').textContent = 'Enter years of experience.';
  }
  if (!skills) {
    valid = false; document.getElementById('group-skills').classList.add('field-invalid');
    document.getElementById('error-skills').textContent = 'Describe your skills.';
  }
  return valid;
}

function nextStep() {
  if (formState.step === totalSteps) {
    if (!document.getElementById('agreeTerms').checked) {
      document.getElementById('error-terms').textContent = 'You must agree to the terms before submitting.';
      return;
    }
    openConfirmModal();
    return;
  }
  saveFormState();
  if (!validateStep()) return;
  formState.step += 1;
  saveFormState();
  updateStepUI();
}

function prevStep() {
  if (formState.step > 1) {
    formState.step -= 1;
    saveFormState();
    updateStepUI();
  }
}

function populateReview() {
  document.getElementById('reviewName').textContent = `${formState.personal.firstName} ${formState.personal.lastName}`;
  document.getElementById('reviewEmail').textContent = formState.personal.email;
  document.getElementById('reviewPhone').textContent = formState.personal.phone;
  document.getElementById('reviewAddress').textContent = `${formState.personal.street}${formState.personal.barangay ? ', ' + formState.personal.barangay : ''}, ${formState.personal.city}, ${formState.personal.zip}`;
  document.getElementById('reviewServiceType').textContent = formState.service.serviceTypes.join(', ');
  document.getElementById('reviewAvailability').textContent = formState.service.availability;
  document.getElementById('reviewYears').textContent = formState.experience.yearsExperience;
  document.getElementById('reviewSkills').textContent = formState.experience.skills;
  document.getElementById('reviewCertifications').textContent = formState.experience.certifications || 'None provided';
  document.getElementById('reviewLanguages').textContent = Array.isArray(formState.experience.languages) && formState.experience.languages.length
    ? formState.experience.languages.join(', ')
    : 'None provided';
  document.getElementById('reviewNotes').textContent = formState.experience.additionalNotes || 'None provided';
  document.getElementById('reviewResume').textContent = formState.experience.resume ? formState.experience.resume.name : 'No file uploaded';
  document.getElementById('reviewLicense').textContent = formState.experience.license ? formState.experience.license.name : 'No file uploaded';
}

function handleFileUpload(event, key) {
  const file = event.target.files[0];
  if (!file) return;
  if (!acceptedTypes.includes(file.type)) {
    document.getElementById('error-fileUpload').textContent = 'Unsupported file type. Use PDF, DOC, DOCX, JPG, or PNG.';
    event.target.value = '';
    return;
  }
  if (file.size > maxFileSize) {
    document.getElementById('error-fileUpload').textContent = 'File must be 5MB or smaller.';
    event.target.value = '';
    return;
  }
  formState.experience[key] = { name: file.name, size: file.size, type: file.type };
  setDirty(); saveFormState();
  document.getElementById(`${key}Label`).textContent = file.name;
  document.getElementById('error-fileUpload').textContent = '';
}

function updateSubmitState() {
  const submitEnabled = document.getElementById('agreeTerms')?.checked;
  confirmSubmitButton.disabled = !submitEnabled;
}

function openConfirmModal() {
  confirmModal.classList.add('active');
  confirmModal.setAttribute('aria-hidden','false');
}

function closeConfirmModal() {
  confirmModal.classList.remove('active');
  confirmModal.setAttribute('aria-hidden','true');
}

function closeSuccessModal() {
  successModal.classList.remove('active');
  successModal.setAttribute('aria-hidden','true');
}

function submitApplication() {
  confirmSubmitButton.disabled = true;
  confirmSubmitButton.textContent = 'Submitting...';
  const payload = {
    personal: formState.personal,
    service: formState.service,
    experience: formState.experience,
    agreed: document.getElementById('agreeTerms').checked
  };
  fetch('/applications/provider', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(async response => {
    confirmSubmitButton.disabled = false;
    confirmSubmitButton.textContent = 'Confirm & Submit';
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      const message = data?.message || 'Submission failed. Please try again.';
      document.getElementById('confirmError').textContent = message;
      document.getElementById('confirmError').style.display='block';
      return;
    }
    clearFormState();
    closeConfirmModal();
    successModal.classList.add('active');
    successModal.setAttribute('aria-hidden','false');
  })
  .catch(() => {
    confirmSubmitButton.disabled = false;
    confirmSubmitButton.textContent = 'Confirm & Submit';
    document.getElementById('confirmError').textContent = 'Network error. Please try again.';
    document.getElementById('confirmError').style.display='block';
  });
}

function clearFormState() {
  sessionStorage.removeItem('providerApplicationState');
  formState.step = 1;
  formState.dirty = false;
  formState.personal = { firstName:'', lastName:'', email:'', phone:'', street:'', city:'', zip:'' };
  formState.service = { serviceTypes: [], availability:'' };
  formState.experience = { yearsExperience:'', skills:'', certifications:'', languages: [], additionalNotes:'', resume:null, license:null };
  formState.agreed = false;
  document.getElementById('providerApplicationForm').reset();
  document.getElementById('resumeLabel').textContent='No file chosen';
  document.getElementById('licenseLabel').textContent='No file chosen';
  renderServiceSelection();
  renderAvailabilitySelection();
  updateStepUI();
}

function beforeUnloadHandler(event) {
  if (!formState.dirty) return;
  event.preventDefault();
  event.returnValue = '';
}

function handleLeaveHome() {
  if (formState.dirty && !confirm('You have unsaved changes. Leave the page and discard progress?')) {
    return;
  }
  window.location.href = 'home.html';
}

function returnHome() {
  formState.dirty = false;
  window.location.href = 'home.html';
}

initPage();
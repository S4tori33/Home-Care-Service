 // Global state
        let isEditMode = false;
        const pageContainer = document.querySelector('body');

        // Initialize page in view mode
        function initializePage() {
            setViewMode();
        }

        // Switch to Edit Mode
        function switchToEditMode() {
            isEditMode = true;
            updatePageMode();
            
            // Show input fields and hide text displays
            document.querySelectorAll('.contact-item input').forEach(input => {
                input.classList.add('edit-mode');
            });
            document.querySelectorAll('.contact-item p').forEach(p => {
                p.classList.add('edit-mode');
            });

            // Enable toggle switches
            document.querySelectorAll('.toggle-switch').forEach(toggle => {
                toggle.style.cursor = 'pointer';
            });
        }

        // Switch to View Mode
        function switchToViewMode() {
            // Ask for confirmation if there are unsaved changes
            if (!confirm('Discard all unsaved changes?')) {
                return;
            }
            
            isEditMode = false;
            updatePageMode();
            
            // Hide input fields and show text displays
            document.querySelectorAll('.contact-item input').forEach(input => {
                input.classList.remove('edit-mode');
            });
            document.querySelectorAll('.contact-item p').forEach(p => {
                p.classList.remove('edit-mode');
            });

            // Disable toggle switches visual feedback
            document.querySelectorAll('.toggle-switch').forEach(toggle => {
                toggle.style.cursor = 'default';
            });
        }

        // Update page mode
        function updatePageMode() {
            const viewModeElements = document.querySelectorAll('.view-mode');
            const editModeElements = document.querySelectorAll('.edit-mode');
            const viewOnlyElements = document.querySelectorAll('.view-only');
            const editOnlyElements = document.querySelectorAll('.edit-only');

            if (isEditMode) {
                viewModeElements.forEach(el => el.style.display = 'none');
                editModeElements.forEach(el => el.style.display = 'flex');
                editOnlyElements.forEach(el => el.style.display = 'block');
            } else {
                viewModeElements.forEach(el => el.style.display = 'flex');
                editModeElements.forEach(el => el.style.display = 'none');
                editOnlyElements.forEach(el => el.style.display = 'none');
            }
        }

        // Set View Mode (initial)
        function setViewMode() {
            isEditMode = false;
            updatePageMode();
        }

        // Toggle availability
        function toggleAvailability(button) {
            if (!isEditMode) return; // Only in edit mode
            button.classList.toggle('active');
        }

        // Add Skill
        function addSkill() {
            const skillName = prompt('Enter skill name:');
            if (skillName) {
                const proficiency = prompt('Enter proficiency level (Expert/Advanced/Intermediate):', 'Intermediate');
                const emoji = prompt('Enter emoji (optional):', '⭐');
                
                const skillCard = document.createElement('div');
                skillCard.className = 'skill-card';
                skillCard.innerHTML = `
                    <div class="skill-icon">${emoji}</div>
                    <h3>${skillName}</h3>
                    <span class="proficiency">${proficiency}</span>
                `;
                
                document.getElementById('skillsContainer').appendChild(skillCard);
            }
        }

        // Add Experience
        function addExperience() {
            const jobTitle = prompt('Enter job title:');
            if (jobTitle) {
                const company = prompt('Enter company name:');
                const dateRange = prompt('Enter date range (e.g., 2022 - 2024):');
                const description = prompt('Enter job description:');
                
                const entry = document.createElement('div');
                entry.className = 'timeline-entry';
                entry.innerHTML = `
                    <h3>${jobTitle}</h3>
                    <p class="company">${company}</p>
                    <p class="date">${dateRange}</p>
                    <p>${description}</p>
                `;
                
                document.getElementById('experienceContainer').appendChild(entry);
            }
        }

        // Add Certification
        function addCertification() {
            const certName = prompt('Enter certification name:');
            if (certName) {
                const organization = prompt('Enter issuing organization:');
                const year = prompt('Enter year:', new Date().getFullYear());
                
                const cert = document.createElement('div');
                cert.className = 'cert-card';
                cert.innerHTML = `
                    <div class="cert-icon">📜</div>
                    <div class="cert-info">
                        <h3>${certName}</h3>
                        <p>${organization}</p>
                    </div>
                    <div class="cert-year">${year}</div>
                `;
                
                document.getElementById('certificationsContainer').appendChild(cert);
            }
        }

        // Upload Document
        function uploadDocument() {
            const fileName = prompt('Enter document name:');
            if (fileName) {
                alert(`Document "${fileName}" uploaded successfully!`);
            }
        }

        // Download Document
        function downloadDocument(docName) {
            alert(`Downloading ${docName}...`);
        }

        // Save Changes
        function saveChanges() {
            // Collect form data
            const profileData = {
                email: document.getElementById('emailInput').value,
                phone: document.getElementById('phoneInput').value,
                location: document.getElementById('locationInput').value,
                availability: Array.from(document.querySelectorAll('.toggle-switch')).map(t => t.classList.contains('active'))
            };

            // TODO: Send to API
            console.log('Saving profile:', profileData);
            alert('Changes saved successfully!');
            
            // Switch back to view mode
            switchToViewMode();
        }

        // Navigation
        function goBack() {
            window.history.back();
        }

        function navigateTo(page) {
            const pages = {
                'browseJobs': 'jobSeekerApplication.html',
                'analytics': 'workerDashboard.html',
                'settings': '../index.html'
            };
            
            if (pages[page]) {
                window.location.href = pages[page];
            }
        }

        // Initialize on page load
        window.addEventListener('DOMContentLoaded', initializePage);
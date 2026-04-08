// ── BOOKING PAGE MODAL FUNCTIONALITY ─────────────────────────────────────

// Service selection state
let selectedServices = {
    mainService: '',
    subServices: []
};

// Open service modal
function openServiceModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    }
}

// Close service modal
function closeServiceModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }
}

// Handle service selection and continue
function selectService(modalId, mainServiceName) {
    const modal = document.getElementById(modalId);
    const checkboxes = modal.querySelectorAll('input[type="checkbox"]:checked');

    // Store selected services (can be empty)
    selectedServices.mainService = mainServiceName;
    selectedServices.subServices = Array.from(checkboxes).map(cb => ({
        value: cb.value,
        label: cb.parentElement.textContent.trim()
    }));

    // Update UI to show selected service
    updateSelectedService(mainServiceName);

    // Close modal
    closeServiceModal(modalId);

    console.log('Selected services:', selectedServices);
}

// Update the selected service display
function updateSelectedService(serviceName) {
    // Remove selected class from all service options
    document.querySelectorAll('.service-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Add selected class to the chosen service
    const selectedOption = Array.from(document.querySelectorAll('.service-option')).find(option =>
        option.querySelector('.service-title').textContent.trim() === serviceName
    );
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
}

// Initialize booking functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to service options
    document.querySelectorAll('.service-option').forEach((option) => {
        option.addEventListener('click', () => {
            const serviceType = option.getAttribute('data-service');
            const modalIds = {
                'houseCleaning': 'houseCleaningModal',
                'gardenMaintenance': 'gardenMaintenanceModal',
                'petCare': 'petCareModal',
                'elderlyCare': 'elderlyCareModal'
            };

            if (modalIds[serviceType]) {
                openServiceModal(modalIds[serviceType]);
            }
        });
    });

    // Add close handlers to modal close buttons
    document.querySelectorAll('.service-modal-close').forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.target.closest('.service-modal-backdrop');
            if (modal) {
                closeServiceModal(modal.id);
            }
        });
    });

    // Add backdrop click handlers
    document.querySelectorAll('.service-modal-backdrop').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeServiceModal(modal.id);
            }
        });
    });

    // Next button will work as a regular link to the next page
    // No additional validation or logic needed
});

// Handle escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.service-modal-backdrop.open').forEach(modal => {
            closeServiceModal(modal.id);
        });
    }
});
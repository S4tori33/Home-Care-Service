// ── SCHEDULE PAGE FUNCTIONALITY ─────────────────────────────────────

// Schedule form state
let scheduleData = {
    scheduleType: '',
    details: {}
};

// Modal elements
let bookingModal, bookingModalClose, editBookingBtn, finalizeBookingBtn;

// Initialize schedule functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const scheduleTypeRadios = document.querySelectorAll('input[name="scheduleType"]');
    const conditionalFields = {
        hourly: document.getElementById('hourlyFields'),
        daily: document.getElementById('dailyFields'),
        biweekly: document.getElementById('biweeklyFields'),
        monthly: document.getElementById('monthlyFields')
    };

    // Get modal elements
    bookingModal = document.getElementById('bookingModal');
    bookingModalClose = document.getElementById('bookingModalClose');
    editBookingBtn = document.getElementById('editBooking');
    finalizeBookingBtn = document.getElementById('finalizeBooking');

    // Add event listeners to schedule type radios
    scheduleTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const selectedType = this.value;

            // Hide all conditional fields
            Object.values(conditionalFields).forEach(field => {
                field.classList.add('hidden');
            });

            // Show the selected conditional field
            if (conditionalFields[selectedType]) {
                conditionalFields[selectedType].classList.remove('hidden');
            }

            // Store the selected schedule type
            scheduleData.scheduleType = selectedType;
        });
    });

    // Handle confirm button click
    const confirmButton = document.getElementById('confirmButton');
    if (confirmButton) {
        confirmButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Validate form
            if (!validateScheduleForm()) {
                return;
            }

            // Collect form data
            collectScheduleData();

            // Navigate to location page
            window.location.href = './location.html';
        });
    }

    // Set minimum date for start date (today)
    const startDateInput = document.getElementById('startDate');
    if (startDateInput) {
        const today = new Date().toISOString().split('T')[0];
        startDateInput.setAttribute('min', today);
    }
});

// Validate the schedule form
function validateScheduleForm() {
    const scheduleType = document.querySelector('input[name="scheduleType"]:checked');
    const startDate = document.getElementById('startDate').value;

    if (!scheduleType) {
        alert('Please select a schedule type.');
        return false;
    }

    if (!startDate) {
        alert('Please select a starting date.');
        return false;
    }

    // Validate schedule-specific fields
    const selectedType = scheduleType.value;

    switch (selectedType) {
        case 'hourly':
            const hourlyHours = document.querySelector('input[name="hourlyHours"]').value;
            if (!hourlyHours || hourlyHours < 1) {
                alert('Please enter the number of hours needed.');
                return false;
            }
            break;

        case 'daily':
            const dailyHours = document.querySelector('input[name="dailyHours"]').value;
            if (!dailyHours || dailyHours < 1) {
                alert('Please enter the number of hours per day.');
                return false;
            }
            break;

        case 'biweekly':
            const selectedDays = document.querySelectorAll('input[name="biweeklyDays"]:checked');
            const biweeklyHours = document.querySelector('input[name="biweeklyHours"]').value;

            if (selectedDays.length === 0) {
                alert('Please select at least one day of the week.');
                return false;
            }

            if (!biweeklyHours || biweeklyHours < 1) {
                alert('Please enter the number of hours per day.');
                return false;
            }
            break;

        case 'monthly':
            const monthlyFrequency = document.querySelector('input[name="monthlyFrequency"]:checked');
            const monthlyHours = document.querySelector('input[name="monthlyHours"]').value;

            if (!monthlyFrequency) {
                alert('Please select the monthly frequency.');
                return false;
            }

            if (!monthlyHours || monthlyHours < 1) {
                alert('Please enter the number of hours per visit.');
                return false;
            }
            break;
    }

    return true;
}

// Collect all schedule data from the form
function collectScheduleData() {
    const formData = new FormData(document.getElementById('scheduleForm'));

    scheduleData.details = {
        startDate: formData.get('startDate')
    };

    switch (scheduleData.scheduleType) {
        case 'hourly':
            scheduleData.details.hourlyHours = parseInt(formData.get('hourlyHours'));
            break;

        case 'daily':
            scheduleData.details.dailyHours = parseInt(formData.get('dailyHours'));
            break;

        case 'biweekly':
            const selectedDays = Array.from(formData.getAll('biweeklyDays'));
            scheduleData.details.biweeklyDays = selectedDays;
            scheduleData.details.biweeklyHours = parseInt(formData.get('biweeklyHours'));
            break;

        case 'monthly':
            scheduleData.details.monthlyFrequency = formData.get('monthlyFrequency');
            scheduleData.details.monthlyHours = parseInt(formData.get('monthlyHours'));
            break;
    }

    // Store in localStorage for the booking flow
    localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
}
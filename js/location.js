// Location form validation and navigation
document.addEventListener('DOMContentLoaded', function() {
    const locationForm = document.getElementById('locationForm');
    const confirmButton = document.getElementById('confirmButton');

    // Modal elements
    const bookingModal = document.getElementById('bookingModal');
    const bookingModalClose = document.getElementById('bookingModalClose');
    const editBookingBtn = document.getElementById('editBooking');
    const finalizeBookingBtn = document.getElementById('finalizeBooking');

    // Form validation
    function validateForm() {
        const requiredFields = ['houseNumber', 'barangay', 'cityMunicipality', 'zipCode', 'country'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                alert(`Please fill in the ${field.previousElementSibling.textContent.replace(' *', '')} field.`);
                isValid = false;
                return false;
            }
        });

        // Zip code validation (4 digits for Philippines)
        const zipCode = document.getElementById('zipCode').value.trim();
        if (zipCode && !/^[0-9]{4}$/.test(zipCode)) {
            alert('Please enter a valid 4-digit zip code.');
            return false;
        }

        return isValid;
    }

    // Handle confirm button click
    if (confirmButton) {
        confirmButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Validate form
            if (!validateForm()) {
                return;
            }

            // Collect form data
            collectLocationData();

            // Show booking confirmation modal
            showBookingModal();
        });
    }

    // Modal event listeners
    if (bookingModalClose) {
        bookingModalClose.addEventListener('click', hideBookingModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                hideBookingModal();
            }
        });
    }

    if (editBookingBtn) {
        editBookingBtn.addEventListener('click', hideBookingModal);
    }

    if (finalizeBookingBtn) {
        finalizeBookingBtn.addEventListener('click', finalizeBooking);
    }

    // Load existing location info if available
    const savedLocationInfo = localStorage.getItem('locationInfo');
    if (savedLocationInfo) {
        const locationData = JSON.parse(savedLocationInfo);
        document.getElementById('houseNumber').value = locationData.houseNumber || '';
        document.getElementById('blockNumber').value = locationData.blockNumber || '';
        document.getElementById('lotNumber').value = locationData.lotNumber || '';
        document.getElementById('barangay').value = locationData.barangay || '';
        document.getElementById('cityMunicipality').value = locationData.cityMunicipality || '';
        document.getElementById('zipCode').value = locationData.zipCode || '';
        document.getElementById('country').value = locationData.country || 'Philippines';
    }
});

// Collect location data from the form
function collectLocationData() {
    const locationData = {
        houseNumber: document.getElementById('houseNumber').value.trim(),
        blockNumber: document.getElementById('blockNumber').value.trim(),
        lotNumber: document.getElementById('lotNumber').value.trim(),
        barangay: document.getElementById('barangay').value.trim(),
        cityMunicipality: document.getElementById('cityMunicipality').value.trim(),
        zipCode: document.getElementById('zipCode').value.trim(),
        country: document.getElementById('country').value
    };

    // Store in localStorage for the booking flow
    localStorage.setItem('locationInfo', JSON.stringify(locationData));
}

// Show booking confirmation modal
function showBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    if (!bookingModal) return;

    // Collect all booking data
    const serviceData = JSON.parse(localStorage.getItem('serviceData') || '{}');
    const contactData = JSON.parse(localStorage.getItem('contactInfo') || '{}');
    const locationData = JSON.parse(localStorage.getItem('locationInfo') || '{}');
    const scheduleData = JSON.parse(localStorage.getItem('scheduleData') || '{}');

    // Generate booking details HTML
    const detailsHTML = generateBookingDetailsHTML(serviceData, contactData, locationData, scheduleData);

    // Populate modal
    document.getElementById('bookingDetails').innerHTML = detailsHTML;

    // Show modal
    bookingModal.classList.add('open');
}

// Hide booking confirmation modal
function hideBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    if (!bookingModal) return;
    bookingModal.classList.remove('open');
}

// Finalize booking
function finalizeBooking() {
    // Here you would typically send the booking data to a server
    // For now, we'll just show a success message and redirect

    alert('🎉 Booking confirmed! Thank you for choosing Home Care Service. You will receive a confirmation email shortly.');

    // Clear booking data from localStorage
    localStorage.removeItem('serviceData');
    localStorage.removeItem('contactInfo');
    localStorage.removeItem('locationInfo');

    // Redirect to home page or dashboard
    window.location.href = '../../home.html';
}

// Generate HTML for booking details
function generateBookingDetailsHTML(service, contact, location, schedule) {
    let html = '';

    // Service Details
    if (service && Object.keys(service).length > 0) {
        html += `
            <div class="detail-section">
                <h3>🛠️ Service Information</h3>
                <p><strong>Service Type:</strong> ${service.serviceName || 'Not selected'}</p>
                <p><strong>Description:</strong> ${service.description || 'Not available'}</p>
                <p><strong>Base Pricing:</strong> ${service.pricing || 'Contact for pricing'}</p>
            </div>
        `;
    }

    // Schedule Details
    if (schedule && Object.keys(schedule).length > 0) {
        html += `
            <div class="detail-section">
                <h3>📅 Schedule Details</h3>
                <p><strong>Schedule Type:</strong> ${formatScheduleType(schedule.scheduleType)}</p>
                <p><strong>Starting Date:</strong> ${formatDate(schedule.details?.startDate)}</p>
                ${generateScheduleSpecificDetails(schedule)}
            </div>
        `;
    }

    // Contact Details
    if (contact && Object.keys(contact).length > 0) {
        html += `
            <div class="detail-section">
                <h3>📞 Contact Information</h3>
                <p><strong>Email:</strong> ${contact.email || 'Not provided'}</p>
                <p><strong>Mobile Phone:</strong> ${contact.contactNumber || 'Not provided'}</p>
                ${contact.telephoneNumber ? `<p><strong>Telephone:</strong> ${contact.telephoneNumber}</p>` : ''}
            </div>
        `;
    }

    // Location Details
    if (location && Object.keys(location).length > 0) {
        html += `
            <div class="detail-section">
                <h3>📍 Service Location</h3>
                <p><strong>Address:</strong> ${location.houseNumber || ''} ${location.barangay || ''}, ${location.cityMunicipality || ''}</p>
                ${location.blockNumber ? `<p><strong>Block:</strong> ${location.blockNumber}</p>` : ''}
                ${location.lotNumber ? `<p><strong>Lot:</strong> ${location.lotNumber}</p>` : ''}
                <p><strong>Zip Code:</strong> ${location.zipCode || 'Not provided'}</p>
                <p><strong>Country:</strong> ${location.country || 'Not provided'}</p>
            </div>
        `;
    }

    // Payment Summary
    const paymentSummary = calculatePaymentSummary(service, schedule);
    html += `
        <div class="detail-section payment-summary">
            <h3>💰 Payment Summary</h3>
            <div class="payment-breakdown">
                <p><strong>Service Base Rate:</strong> ${paymentSummary.baseRate}</p>
                ${paymentSummary.scheduleMultiplier > 1 ? `<p><strong>Schedule Multiplier:</strong> ${paymentSummary.scheduleMultiplier}x</p>` : ''}
                <p><strong>Estimated Hours:</strong> ${paymentSummary.estimatedHours} hour(s)</p>
                <div class="total-amount">
                    <p><strong>Total Estimated Cost:</strong> ${paymentSummary.totalCost}</p>
                </div>
                <p class="payment-note"><em>* Final pricing may vary based on actual service duration and requirements</em></p>
            </div>
        </div>
    `;

    return html;
}

// Helper function to format schedule type
function formatScheduleType(scheduleType) {
    const typeMap = {
        'hourly': 'Hourly Service',
        'daily': 'Daily Service',
        'biweekly': 'Bi-weekly Service',
        'monthly': 'Monthly Service'
    };
    return typeMap[scheduleType] || scheduleType;
}

// Helper function to format date
function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (e) {
        return dateString;
    }
}

// Helper function to generate schedule-specific details
function generateScheduleSpecificDetails(schedule) {
    if (!schedule || !schedule.details) return '';

    let details = '';

    switch (schedule.scheduleType) {
        case 'hourly':
            if (schedule.details.hourlyHours) {
                details += `<p><strong>Duration:</strong> ${schedule.details.hourlyHours} hours</p>`;
            }
            break;

        case 'daily':
            if (schedule.details.dailyHours) {
                details += `<p><strong>Hours per day:</strong> ${schedule.details.dailyHours} hours</p>`;
            }
            break;

        case 'biweekly':
            if (schedule.details.biweeklyDays && schedule.details.biweeklyDays.length > 0) {
                details += `<p><strong>Days:</strong> ${schedule.details.biweeklyDays.join(', ')}</p>`;
            }
            if (schedule.details.biweeklyHours) {
                details += `<p><strong>Hours per day:</strong> ${schedule.details.biweeklyHours} hours</p>`;
            }
            break;

        case 'monthly':
            if (schedule.details.monthlyFrequency) {
                const freqMap = {
                    'once': 'Once per month',
                    'twice': 'Twice per month'
                };
                details += `<p><strong>Frequency:</strong> ${freqMap[schedule.details.monthlyFrequency] || schedule.details.monthlyFrequency}</p>`;
            }
            if (schedule.details.monthlyHours) {
                details += `<p><strong>Hours per visit:</strong> ${schedule.details.monthlyHours} hours</p>`;
            }
            break;
    }

    return details;
}

// Helper function to calculate payment summary
function calculatePaymentSummary(service, schedule) {
    // Default pricing structure (can be customized based on service data)
    const basePricing = {
        'House Cleaning': 500,
        'Laundry Service': 300,
        'Cooking Assistance': 400,
        'Elderly Care': 600,
        'Child Care': 450,
        'Pet Care': 350,
        'Gardening': 550,
        'Maintenance': 700
    };

    // Get base rate from service or use default
    let baseRate = 0;
    if (service && service.serviceName) {
        baseRate = basePricing[service.serviceName] || 500; // Default to 500 if not found
    }

    // Calculate schedule multiplier and hours
    let scheduleMultiplier = 1;
    let estimatedHours = 1;

    if (schedule && schedule.details) {
        switch (schedule.scheduleType) {
            case 'hourly':
                estimatedHours = parseFloat(schedule.details.hourlyHours) || 1;
                break;
            case 'daily':
                estimatedHours = parseFloat(schedule.details.dailyHours) || 4;
                break;
            case 'biweekly':
                // Bi-weekly service - assume 2 visits per week
                scheduleMultiplier = 0.9; // 10% discount for bi-weekly
                estimatedHours = parseFloat(schedule.details.biweeklyHours) || 3;
                break;
            case 'monthly':
                // Monthly service - assume 4 visits per month
                scheduleMultiplier = 0.85; // 15% discount for monthly
                estimatedHours = parseFloat(schedule.details.monthlyHours) || 6;
                if (schedule.details.monthlyFrequency === 'twice') {
                    estimatedHours *= 2; // Double for twice per month
                }
                break;
        }
    }

    const totalCost = Math.round(baseRate * scheduleMultiplier * estimatedHours);

    return {
        baseRate: `₱${baseRate}`,
        scheduleMultiplier: scheduleMultiplier,
        estimatedHours: estimatedHours,
        totalCost: `₱${totalCost}`
    };
}
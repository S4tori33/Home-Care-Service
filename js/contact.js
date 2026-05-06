// Contact form validation and navigation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nextButton = document.getElementById('nextStep');

    // Form validation
    function validateForm() {
        const email = document.getElementById('email').value.trim();
        const contactNumber = document.getElementById('contactNumber').value.trim();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // Contact number validation (exactly 11 digits, with optional +63 prefix)
        const phoneRegex = /^(\+63\s?)?[0-9]{11}$/;
        const cleanPhoneNumber = contactNumber.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhoneNumber)) {
            alert('Please enter a valid 11-digit contact number (e.g., 09123456789 or +63 9123456789).');
            return false;
        }

        return true;
    }

    // Handle next button click
    nextButton.addEventListener('click', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // Store contact information (you can use localStorage or send to server)
            const contactData = {
                email: document.getElementById('email').value.trim(),
                contactNumber: document.getElementById('contactNumber').value.trim(),
                telephoneNumber: document.getElementById('telephoneNumber').value.trim()
            };

            // Store in localStorage for the booking flow
            localStorage.setItem('contactInfo', JSON.stringify(contactData));

            // Navigate to next step
            window.location.href = './schedule.html';
        }
    });

    // Load existing contact info if available
    const savedContactInfo = localStorage.getItem('contactInfo');
    if (savedContactInfo) {
        const contactData = JSON.parse(savedContactInfo);
        document.getElementById('email').value = contactData.email || '';
        document.getElementById('contactNumber').value = contactData.contactNumber || '';
        document.getElementById('telephoneNumber').value = contactData.telephoneNumber || '';
    }
});
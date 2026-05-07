// ── FAQ ACCORDION FUNCTIONALITY ────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('open');
        });
    });
});

// ── FORM SUBMISSION ────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    const supportForm = document.getElementById('supportForm');

    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;

            // Store in localStorage (you can integrate with backend later)
            const supportMessages = JSON.parse(localStorage.getItem('supportMessages')) || [];
            supportMessages.push({
                name,
                email,
                subject,
                message,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('supportMessages', JSON.stringify(supportMessages));

            // Show success message
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.textContent = 'Message Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #15a34a, #4ade80)';

            // Reset form
            this.reset();

            // Restore button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #1d69ff, #5ca5ff)';
            }, 3000);
        });
    }
});

// ── SERVICE MODAL FUNCTIONALITY ───────────────────────────────────────

function initializeServiceModal() {
    const backdrop = document.getElementById('serviceModalBackdrop');
    const closeBtn = document.getElementById('serviceModalClose');
    const titleEl = document.getElementById('serviceModalTitle');
    const subtitleEl = document.getElementById('serviceModalSubtitle');
    const pricingEl = document.getElementById('serviceModalPricing');
    const includesEl = document.getElementById('serviceModalIncludes');
    const descriptionEl = document.getElementById('serviceModalDescription');

    if (!backdrop || !closeBtn || !titleEl || !subtitleEl || !pricingEl || !includesEl || !descriptionEl) return;

    const openModal = (card) => {
        const title = card.querySelector('summary h3')?.textContent.trim() || '';
        const subtitle = card.querySelector('summary p')?.textContent.trim() || '';
        const pricing = card.querySelector('.service-details h4:nth-of-type(1) + p')?.textContent.trim() || '';
        const descriptionHeading = Array.from(card.querySelectorAll('.service-details h4'))
            .find(h => h.textContent.trim().toLowerCase().includes('service details'));
        const description = descriptionHeading?.nextElementSibling?.textContent.trim() || '';
        const includesHeading = Array.from(card.querySelectorAll('.service-details h4'))
            .find(h => h.textContent.trim().toLowerCase().includes("what's included") || h.textContent.trim().toLowerCase().includes('what’s included'));
        const includesList = includesHeading?.nextElementSibling;

        titleEl.textContent = title;
        subtitleEl.textContent = subtitle;
        pricingEl.textContent = pricing;
        descriptionEl.textContent = description;
        includesEl.innerHTML = '';

        if (includesList && includesList.tagName === 'UL') {
            includesList.querySelectorAll('li').forEach(li => {
                const item = document.createElement('li');
                item.textContent = li.textContent;
                includesEl.appendChild(item);
            });
        }

        backdrop.classList.add('open');
        backdrop.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
        backdrop.classList.remove('open');
        backdrop.setAttribute('aria-hidden', 'true');
    };

    document.querySelectorAll('.service-card summary').forEach(summary => {
        summary.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            const card = summary.closest('.service-card');
            if (card) {
                openModal(card);
            }
        });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', event => {
        if (event.target === backdrop) closeModal();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeServiceModal();
});
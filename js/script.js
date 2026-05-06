function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

function toggleMenu() {
    const nav = document.querySelector("nav ul");
    nav.classList.toggle("show");
}

<<<<<<< Updated upstream
=======
function recordSidebarToggle(action) {
    if (!['open', 'close'].includes(action)) return;
    const key = 'sidebarToggleUsage';

    try {
        const stored = localStorage.getItem(key);
        const data = stored ? JSON.parse(stored) : {
            openCount: 0,
            closeCount: 0,
            lastAction: '',
            lastTimestamp: ''
        };

        if (action === 'open') data.openCount += 1;
        if (action === 'close') data.closeCount += 1;
        data.lastAction = action;
        data.lastTimestamp = new Date().toISOString();

        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.debug('Sidebar toggle tracking unavailable:', error);
    }
}

/*function showAlert() {
    alert("Thank you for choosing HCS! Please email us at contactspeared@gmail.com.");
}
*/

// Sidebar toggle — works on ALL screen sizes
function initializeSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const toggle  = document.getElementById('sidebarToggle');

    if (!sidebar || !overlay || !toggle) return;

    // Ensure toggle button does not submit a form if markup changes.
    if (toggle.tagName.toLowerCase() === 'button') {
        toggle.type = 'button';
    }

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('show');
        toggle.classList.add('open');
        recordSidebarToggle('open');
    }
    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        toggle.classList.remove('open');
        recordSidebarToggle('close');
    }

    toggle.addEventListener('click', (event) => {
        event.preventDefault();
        console.debug('Sidebar toggle clicked:', sidebar.classList.contains('open') ? 'closing' : 'opening');
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    overlay.addEventListener('click', closeSidebar);

    document.querySelectorAll('.sidebar-item[data-page]').forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.getAttribute('href') || this.getAttribute('href') === '#') e.preventDefault();
            document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            closeSidebar();
        });
    });
}

function initializeServiceModal() {
    const backdrop = document.getElementById('serviceModalBackdrop');
    const closeBtn = document.getElementById('serviceModalClose');
    const titleEl = document.getElementById('serviceModalTitle');
    const subtitleEl = document.getElementById('serviceModalSubtitle');
    const pricingEl = document.getElementById('serviceModalPricing');
    const includesEl = document.getElementById('serviceModalIncludes');
    const descriptionEl = document.getElementById('serviceModalDescription');

    if (!backdrop || !closeBtn || !titleEl || !subtitleEl || !pricingEl || !includesEl || !descriptionEl) return;

    const closeModal = () => {
        backdrop.classList.remove('open');
        backdrop.setAttribute('aria-hidden', 'true');
    };

    const openModal = (card) => {
        const title = card.querySelector('h3')?.textContent.trim() || '';
        const subtitle = card.querySelector('p')?.textContent.trim() || '';
        const details = card.querySelector('.service-details');
        const pricing = details?.querySelector('h4:nth-of-type(1) + p')?.textContent.trim() || '';
        const includesList = details?.querySelector('h4:nth-of-type(2) + ul');
        const description = details?.querySelector('h4:nth-of-type(3) + p')?.textContent.trim() || '';

        titleEl.textContent = title;
        subtitleEl.textContent = subtitle;
        pricingEl.textContent = pricing;
        descriptionEl.textContent = description;
        includesEl.innerHTML = '';

        if (includesList) {
            includesList.querySelectorAll('li').forEach(li => {
                const item = document.createElement('li');
                item.textContent = li.textContent;
                includesEl.appendChild(item);
            });
        }

        backdrop.classList.add('open');
        backdrop.setAttribute('aria-hidden', 'false');
    };

    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            openModal(card);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', event => {
        if (event.target === backdrop) closeModal();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && backdrop.classList.contains('open')) {
            closeModal();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeSidebarToggle();
        initializeServiceModal();
    });
} else {
    initializeSidebarToggle();
    initializeServiceModal();
}


// Navbar scroll highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 90) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        if (!current && link.getAttribute('href') === '#') link.classList.add('active');
    });
});

>>>>>>> Stashed changes
function showAlert() {
    alert("Thank you for choosing HCS! Please email us at contactspeared@gmail.com.");
}
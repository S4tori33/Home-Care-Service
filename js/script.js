function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

function toggleMenu() {
    const nav = document.querySelector("nav ul");
    nav.classList.toggle("show");
}

/*function showAlert() {
    alert("Thank you for choosing HCS! Please email us at contactspeared@gmail.com.");
}
*/

// Sidebar toggle — works on ALL screen sizes
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
const toggle  = document.getElementById('sidebarToggle');

function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    toggle.classList.add('open');
}
function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    toggle.classList.remove('open');
}
toggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});
overlay.addEventListener('click', closeSidebar);

// Active sidebar item + close on click
document.querySelectorAll('.sidebar-item[data-page]').forEach(item => {
    item.addEventListener('click', function(e) {
        if (!this.getAttribute('href') || this.getAttribute('href') === '#') e.preventDefault();
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        closeSidebar();
    });
});

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

function showAlert() {
    alert('📞 Thank you for reaching out! HCS will contact you shortly.');
}
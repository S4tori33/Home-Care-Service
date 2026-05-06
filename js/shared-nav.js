function renderSharedNav(containerId, pageLabel) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
        <header class="topbar">
            <div class="brand">
                <div class="brand-logo">HCS</div>
                <div class="brand-copy">
                    <h1>Home Care Service</h1>
                    <p>${pageLabel}</p>
                </div>
            </div>
            <div class="topbar-actions">
                <button type="button" class="icon-btn" aria-label="Logout" onclick="logout()">→</button>
            </div>
        </header>
    `;
}

function openNewBooking() {
    window.location.href = 'booking.html';
}

function logout() {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('userLogin.html');
}

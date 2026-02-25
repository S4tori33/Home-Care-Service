function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

function toggleMenu() {
    const nav = document.querySelector("nav ul");
    nav.classList.toggle("show");
}

function showAlert() {
    alert("Thank you for choosing HCS! Please email us at contactspeared@gmail.com.");
}
// Mobile menu
const hamburgerMenu = document.querySelector(".hamburger-icon");
const mobileMenu = document.querySelector(".mobile-menu");

hamburgerMenu.addEventListener("click", function() {
    // Change color of hamburger icon
    hamburgerMenu.classList.toggle('color-hamburguer');
    // Toggle mobile menu on or of
    var currentStyle = mobileMenu.style.display;
    if (currentStyle === "none" || currentStyle === "") {
        mobileMenu.style.display = "flex";
    } else {
        mobileMenu.style.display = "none";
    }
});

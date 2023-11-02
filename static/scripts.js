

function toggleMobileMenu() {
    var test = document.querySelector("p");
    
    const hamburgerMenu = document.querySelector(".hamburger-icon");
    hamburgerMenu.classList.toggle('color-hamburguer')
    var mobileMenu = document.querySelector(".mobile-menu");
    var currentStyle = mobileMenu.style.display;
    
    if (currentStyle === "none" || currentStyle === "") {
        mobileMenu.style.display = "flex";
    } else {
        mobileMenu.style.display = "none";
    }
}
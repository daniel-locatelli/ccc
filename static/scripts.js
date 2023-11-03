// Mobile menu
const hamburgerMenu = document.querySelector(".hamburger-icon");
const mobileMenu = document.querySelector(".mobile-menu");
hamburgerMenu.addEventListener("click", function() {
    // Change color of hamburger icon
    hamburgerMenu.classList.toggle("color-hamburguer");
    // Toggle mobile menu on or of
    var currentStyle = mobileMenu.style.display;
    if (currentStyle === "none" || currentStyle === "") {
        mobileMenu.style.display = "flex";
    } else {
        mobileMenu.style.display = "none";
    }
});


// Flip select arrow
const svgArrow = document.querySelector(".select-arrow");
const componentSelector = document.querySelector("#select-component")
componentSelector.addEventListener("click", function() {
    // Rotate arrow 180 degrees
    svgArrow.classList.toggle("rotate180");
});


// Assembly menu and layers
var assemblyTabs = document.querySelectorAll('.assembly-tab');
var assemblyLayers = document.querySelectorAll('.layer-tab');
// Add event listeners to tabs
assemblyTabs.forEach(function(tab, index) {
    tab.addEventListener('click', function() {
        // Remove active-tab class from all tabs
        assemblyTabs.forEach(function(tab) {
            tab.classList.remove("active-tab");
        });
        // Add active-tab class to the clicked tab
        tab.classList.add("active-tab");
        // Hide all content divs
        assemblyLayers.forEach(function(assemblyLayers) {
            assemblyLayers.style.display = 'none';
        });
        // Show the selected content div
        assemblyLayers[index].style.display = 'block';
    });
});


// Get select value
var selectComponent = document.getElementById("select-component");
var statsTemp = document.querySelector(".stats");
var selComponent = "";

function popupMaterial (data) {
    // Add background
    const background = document.createElement("div");
    background.classList.add("popup-background");
    const container = document.querySelector(".container");
    container.append(background);
    // Create window, add it to container
    const window = document.createElement("div");
    window.classList.add("popup-material");
    container.append(window);
    // Create selector, add it to window
    const matSelector = document.createElement("select")
    matSelector.id = "select-material";
    matSelector.name = "select-material"
    window.append(matSelector);
    // Get all the material names
    let matNames = data.map(function(d) { return d["name"]; });
    console.log(matNames);
    // Add all the material names as options
    matNames.forEach(element => {
        const option = document.createElement("option");
        option.value = element;
        option.textContent = element;
        matSelector.append(option);
    });
}


const addLayerButton = document.querySelector(".add-layer");

addLayerButton.addEventListener("click", function () {

    fetch("/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({}),
    })
        .then(response => response.json())
        .then(data => {
            // Add tabs
            
            popupMaterial(data);

        })
        .catch(error => {
            console.error("Error:", error);
        });
});
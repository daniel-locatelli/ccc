// Get select value
var selectComponent = document.getElementById("select-component");
var statsTemp = document.querySelector(".stats");
var selComponent = "";

selectComponent.addEventListener("change", function () {
    var selComponent = selectComponent.value;

    fetch("/api/component", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ data: selComponent }),
    })
        .then(response => response.json())
        .then(data => {
            // Add tabs
            updateSuper(data);
            updateMain(data);
            updateSub(data);
            // Add reactions
            tabReactions();
            // Add component properties to stats
            addComponentProperties(data)
        })
        .catch(error => {
            console.error("Error:", error);
        });
});
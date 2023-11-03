// Get select value
var selectComponent = document.getElementById("select-component");
var statsTemp = document.querySelector(".stats");
var selComponent = "";

var viewport = document.querySelector(".viewport");
viewport.textContent = "JS Works";

selectComponent.addEventListener("change", function () {
    var selComponent = selectComponent.value;

    fetch("/api/component", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ data: selComponent }),
    })
        .then(response => response.json())
        .then(data => {
            statsTemp.textContent = data.message;
        })
        .catch(error => {
            console.error("Error:", error);
        });
});
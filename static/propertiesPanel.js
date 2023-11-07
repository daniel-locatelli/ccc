function addLayerPropertiesKeyValues(layer, layerProperties) {
    let propertyKeys = [
        "category",
        "description",
        "level",
        "material_id",
        "option",
        "spread",
        "thickness",
        "width"
    ];
    propertyKeys.forEach(key => {
        // Create a row
        const keyLayerRow = document.createElement("tr");
        // Add keys
        const th = document.createElement("th")
        th.innerText = key;
        keyLayerRow.append(th)
        // Add values
        if (layer.hasOwnProperty(key)) {
            const value = layer[key];
            const td = document.createElement("td")
             td.innerText = value;
             keyLayerRow.append(td)
        }
        // Append property row to table
        layerProperties.append(keyLayerRow);
    });
}

function addLayers(layers, keyLayerTitle, ul) {
    layers.forEach(layer => {
        // Inside list item we need a title and the options, with option A visible
        /// 1 /// Title ///
        var layerTitle = layer[keyLayerTitle];
        const titleListItem = document.createElement("h4");
        titleListItem.innerHTML = layerTitle;
        titleListItem.classList.add("tab", "layer-tab");

        /// 2 /// Option as wrapper ///
        const option = "option-" + layer["option"].toLowerCase(); // Option as a class
        const optionWrapper = document.createElement("div");
        optionWrapper.classList.add(option);
        
        /// 3 /// Properties table
        const layerProperties = document.createElement("table");
        layerProperties.style.display = "none";
        // Add keys and values
        addLayerPropertiesKeyValues(layer, layerProperties);

        /// 4 /// List Item ///// Display only option A
        var level = layer["level"];
        level = level.replace(/\./g, "-");
        let newListItem;
        if (document.getElementsByClassName(level).length > 0){
            newListItem = document.getElementsByClassName(level)[0];
        } else {
            newListItem = document.createElement("li");
            newListItem.classList.add(level);
            // Append list item to the DOM
            ul.append(newListItem);
        }
        // Add classes to list item

        /// 5 /// Append - Create hierachy ///
        // Append options to wrapper
        optionWrapper.append(titleListItem, layerProperties)
        // Append wrapper to list item
        newListItem.append(optionWrapper);

         // Display only option A
        if (option != "option-a"){
            optionWrapper.style.display = "none";
        }

        // Need a way to toggle between options A, B, C, etc. //
    });
}


function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


function updateLayers(assSelector, data, KeyAss, keyLayerTitle) {
    const ul = document.querySelector(assSelector);
    removeAllChildren(ul);
    var layers = data[KeyAss]["layers"];
    addLayers(layers, keyLayerTitle, ul);
}


function updateSuper(data) {
    
    // JSON keys
    const keyAss = "super_assembly";
    const keyId = "id";
    const keyCategory = "category";
    const keyThickness = "thickness";
    const keyLayerTitle = "description";
    
    // Update settings
    var idSuper = data[keyAss][keyId];
    var categorySuper = data[keyAss][keyCategory];
    var thicknessSuper = data[keyAss][keyThickness];

    var propSuperId = document.querySelector(".prop-super-id");
    propSuperId.textContent = idSuper;
    var propSuperCategory = document.querySelector(".prop-super-category");
    propSuperCategory.textContent = categorySuper;
    var propSuperThickness = document.querySelector(".prop-super-thickness");
    propSuperThickness.textContent = thicknessSuper;

    // Update layer tabs
    const assSelector = ".layers-super";

    updateLayers(assSelector, data, keyAss, keyLayerTitle);
}


function updateMain(data) {

    // JSON keys
    const keyAss = "main_assembly";
    const keyId = "id";
    const keyCategory = "category";
    const keyThickness = "thickness";
    const keyLayerTitle = "description";

    // Update settings
    var idMain = data[keyAss][keyId];
    var categoryMain = data[keyAss][keyCategory];
    var thicknessMain = data[keyAss][keyThickness];

    var propMainId = document.querySelector(".prop-main-id");
    propMainId.textContent = idMain;
    var propMainCategory = document.querySelector(".prop-main-category");
    propMainCategory.textContent = categoryMain;
    var propMainThickness = document.querySelector(".prop-main-thickness");
    propMainThickness.textContent = thicknessMain;

     // Update layer tabs
     const assSelector = ".layers-main";

     updateLayers(assSelector, data, keyAss, keyLayerTitle);
}


function updateSub(data) {

    // JSON keys
    const keyAss = "sub_assembly";
    const keyId = "id";
    const keyCategory = "category";
    const keyThickness = "thickness";
    const keyLayerTitle = "description";

    var idSub = data[keyAss][keyId];
    var categorySub = data[keyAss][keyCategory];
    var thicknessSub = data[keyAss][keyThickness];

    var propSubId = document.querySelector(".prop-sub-id");
    propSubId.textContent = idSub;
    var propSubCategory = document.querySelector(".prop-sub-category");
    propSubCategory.textContent = categorySub;
    var propSubThickness = document.querySelector(".prop-sub-thickness");
    propSubThickness.textContent = thicknessSub;

    // Update layer tabs
    const assSelector = ".layers-sub";

    updateLayers(assSelector, data, keyAss, keyLayerTitle);
}

function addComponentProperties(data) {
    const compProperties = document.querySelector(".component-properties");
    removeAllChildren(compProperties);
    // JSON keys
    propertyKeys = [
        "building_class",
        "c",
        "c50_5000",
        "ci50_2500",
        "ctr50_5000",
        "description",
        "fire_rating",
        "gwp_a1toa3",
        "gwp_c3",
        "gwp_c4",
        "gwp_d1",
        "id",
        "installation_layer",
        "lnw",
        "local",
        "u_value"
    ];
    propertyKeys.forEach(key => {
        let keyValueRow = document.createElement("tr");
        // Add keys
        let th = document.createElement("th")
        th.textContent = key;
        keyValueRow.append(th)
        // Add values
        if (data.hasOwnProperty(key)) {
            var value = data[key];
            if (value === "") {
                value = "-";  
            } 
            let td = document.createElement("td")
            td.textContent = value;
             keyValueRow.append(td)
        }
        keyValueRow.classList.add("key-value-comp");
        compProperties.append(keyValueRow);
    });
}


function tabReactions() {
    /// Actions ///
    // Assembly menu and layers
    var layerTabs = document.querySelectorAll('.layer-tab');
    let layerProp = [];
    layerTabs.forEach(function(tab) {
        layerProp.push(tab.nextElementSibling);
    });
    // Add event listeners to tabs
    layerTabs.forEach(function(tab, index) {
        tab.addEventListener('click', function() {
            openTab = layerProp[index].style.display != "none";
            // Add active-tab class to the clicked tab
            tab.classList.toggle("active-tab");
            // Show the selected content div
            if (!openTab) {
                layerProp[index].style.display = 'table';
            } else {
                layerProp[index].style.display = 'none';
            }
        });
    });
}


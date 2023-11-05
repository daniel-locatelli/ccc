function addLayerPropertiesKeyValues(layer, keysLayer, valLayer) {
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
        // Add keys
        let p = document.createElement("p")
        p.innerText = key;
        keysLayer.append(p)
        // Add values
        if (layer.hasOwnProperty(key)) {
            const value = layer[key];
            let p = document.createElement("p")
             p.innerText = value;
             valLayer.append(p)
        }
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
        
        /// 3 /// Properties wrapper
        const layerProperties = document.createElement("div");
        layerProperties.classList.add("properties-table");
        layerProperties.style.display = "none";

        /// 3.1 /// Option wrapper as columns ///
        // Create left column for property keys
        const keysLayer = document.createElement("div");
        // Create right column for property values
        const valLayer = document.createElement("div");
        // Add keys and values
        addLayerPropertiesKeyValues(layer, keysLayer, valLayer);

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
        // Append property columns to wrapper
        layerProperties.append(keysLayer, valLayer);
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
    // ".properties-component-keys"
    // ".properties-component-values"

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
        let keyValueDiv = document.createElement("div");
        // Add keys
        let p = document.createElement("p")
        p.textContent = key;
        keyValueDiv.append(p)
        // Add values
        if (data.hasOwnProperty(key)) {
            var value = data[key];
            if (value === "") {
                value = "-";  
            } 
            let p = document.createElement("p")
             p.textContent = value;
             keyValueDiv.append(p)
        }
        keyValueDiv.classList.add("key-value-comp");
        compProperties.append(keyValueDiv);
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
                layerProp[index].style.display = 'grid';
            } else {
                layerProp[index].style.display = 'none';
            }
        });
    });
}


//interactive input script

//set variable for userSettings
var Settings;
var selectedElements;

//get userSettings
chrome.storage.local.get("userSettings", function({ userSettings }) {
    Settings = userSettings;
    editMenu();
});

//function for editing dropdown menu and creating custom buttons
function editMenu(){
    //show menu
    var menu = document.getElementsByClassName("dropdown-menu");
    menu[0].className = "dropdown-menu show";


    //create custom element with "save" and "cancel" buttons
    var container = document.createElement("div");
    container.id = "interactive-container";

    //save button
    var saveButtonContainer = document.createElement("div");
    saveButtonContainer.id = "interactive-save";
    var saveButtonText = document.createElement("span");
    var saveButtonIcon = document.createElement("span");
    saveButtonText.innerHTML = "save";
    saveButtonText.style.pointerEvents = "none";
    saveButtonIcon.style.pointerEvents = "none";

    saveButtonContainer.appendChild(saveButtonText);
    saveButtonContainer.appendChild(saveButtonIcon);

    //cancel button
    var cancelButtonContainer = document.createElement("div");
    cancelButtonContainer.id = "interactive-cancel";
    var cancelButtonText = document.createElement("span");
    var cancelButtonIcon = document.createElement("span");
    cancelButtonText.innerHTML = "cancel";
    cancelButtonText.style.pointerEvents = "none";
    cancelButtonIcon.style.pointerEvents = "none";

    cancelButtonContainer.appendChild(cancelButtonText);
    cancelButtonContainer.appendChild(cancelButtonIcon);

    //append buttons to main container
    container.appendChild(cancelButtonContainer);
    container.appendChild(saveButtonContainer);

    menu[0].appendChild(container);

    //add listeners
    cancelButtonContainer.addEventListener("click", cancelFunction);
    saveButtonContainer.addEventListener("click", saveFunction);

    //call function for editing elements
    editElements();
}

function editElements(){
    //add listeners for every item, show hidden elements and change their color to red
    selectedElements = Settings["classes"];
    var contentElements = document.getElementsByClassName("dropdown-item");
    for (i = 0; i < contentElements.length - 9; i++){
        contentElements[i+1].removeAttribute("href");
        contentElements[i+1].addEventListener("click", function(){
            addToArray(this);
        });
        if (selectedElements.includes(contentElements[i+1].innerHTML) === true){
            contentElements[i+1].style.display = "block";
            contentElements[i+1].style.backgroundColor = "red";
        }
    }

    //function to add every item to array and change its color
    function addToArray(item){
        if (selectedElements.includes(item.innerHTML) === true){
            item.style.backgroundColor = "transparent";
            var index = selectedElements.indexOf(item.innerHTML);
            selectedElements.splice(index, 1);
        }else{
            item.style.backgroundColor = "red";
            selectedElements.push(item.innerHTML);
        }
    }
}

//cancel button function
function cancelFunction(){
    location.reload();
    return false;
}

//save button function
function saveFunction(){
    var newValues = {active: Settings["active"], url: Settings["url"], classes: selectedElements};
    chrome.storage.local.set({"userSettings": newValues})
    location.reload();
    return false;
}
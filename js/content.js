// content script

console.log("Hide eClasses is running.");

//set array for hidden elements to show them later if "active" is false
var hiddenElements = [];

//start by reading storage
storageGet();

//get classes to hide from userSettings
function storageGet(){
    chrome.storage.local.get("userSettings", function({ userSettings }) {
        hideElements(userSettings["classes"]);
    });
}

//function to hide elements on page
function hideElements(classes){
    var contentElements = document.getElementsByClassName("dropdown-item");
    for (i = 0; i < contentElements.length - 1; i++){
        if (classes.includes(contentElements[i].innerHTML) == true){
            contentElements[i].style.display = "none";
            hiddenElements.push(contentElements[i]);
        }
    }
}

//add listener for changes in userSettings
chrome.storage.onChanged.addListener(function(changes){
    if ("userSettings" in changes){
        if (changes.userSettings.newValue.active === false){
            showElements(hiddenElements);
        }else{
            storageGet();
        }
    }
});

//function to show previously hidden elements
function showElements(classes){
    console.log("showing elements");
    for (i = 0; i < classes.length; i++){
        classes[i].style.display = "block";
        hiddenElements = [];
    }
}
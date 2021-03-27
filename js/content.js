// content script

console.log("Hide eClasses is running.");

//get classes to hide from userSettings
chrome.storage.local.get("userSettings", function({ userSettings }) {
    hideElements(userSettings["classes"]);
});

//function to hide elements on page
function hideElements(classes){
    var contentElements = document.getElementsByClassName("dropdown-item");
    for (i = 0; i < contentElements.length - 1; i++){
        if (classes.includes(contentElements[i].innerHTML) == true){
            contentElements[i].style.display = "none";
        }
    }
}
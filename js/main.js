// main popup script

//load settings on content load
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get("userSettings", function({ userSettings }) {
        var urlField = document.getElementById("platform-url");
        var activeSlider = document.getElementById("active-slider");

        urlField.value = userSettings["url"];
        activeSlider.checked = userSettings["active"];

        newUser(userSettings["url"]);
    });
});

//function to show new-user page if the user is new
function newUser(urlValue){
    if (urlValue == ""){
        var newUserPage = document.getElementsByClassName("new-user")[0];
        var mainContentPage = document.getElementsByClassName("main-content")[0];

        mainContentPage.style.display = "none";
        newUserPage.style.display = "block";
    }
}

//save data on changed for slider and url field
document.getElementById("platform-url").addEventListener("input", saveUrl);
document.getElementById("active-slider").addEventListener("change", saveActive);

function saveUrl() {
    var urlField = document.getElementById("platform-url");
    chrome.storage.local.get("userSettings", function({ userSettings }) {
        var newValues = {active: userSettings["active"], url: urlField.value, classes: userSettings["classes"]};
        chrome.storage.local.set({"userSettings": newValues});
    });
}

function saveActive() {
    var sliderValue = document.getElementById("active-slider");
    chrome.storage.local.get("userSettings", function({ userSettings }) {
        var newValues = {active: sliderValue.checked, url: userSettings["url"], classes: userSettings["classes"]};
        chrome.storage.local.set({"userSettings": newValues})
    });
}
// background script

//set object storage on installation
chrome.runtime.onInstalled.addListener(() => {
    var userSettings = {active: false, url: "", classes: []};
    chrome.storage.local.set({"userSettings": userSettings});
});
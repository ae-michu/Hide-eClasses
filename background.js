// background script

//set object storage on installation
chrome.runtime.onInstalled.addListener(() => {
    var userSettings = {active: false, url: "", classes: []};
    chrome.storage.local.set({"userSettings": userSettings});
});

//add listeners for switching tabs and loading a new page
//switching tabs
chrome.tabs.onActivated.addListener( function() {
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
        checkInject(tabs[0].url);
    });
});
//loading new url
chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
    if (changeInfo.status == "complete"){
        checkInject(tab.url);
    }
});

//function to check if url matches stored url, if it does then inject code
function checkInject(url) {
    chrome.storage.local.get("userSettings", function({ userSettings }) {
        if (url.includes(userSettings["url"]) == true){
            /*
            console.log("url match");
            TODO
            */
        }
    });
}
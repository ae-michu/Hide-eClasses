// background script

//set variables
var storedUrlActive = false;

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
            storedUrlActive = true;
            /*
            TODO - automatic code injection
            */
        }else{
            storedUrlActive = false;
        }
    });
}

//add listener for receiving messages from content script about button presses
chrome.runtime.onMessage.addListener( function(request) {
    if (request.button === "manual") {
       injectScript("/js/manual_input.js");
    }else if (request.button === "select") {
        if (storedUrlActive === true){
            /*
            TODO - inject code for interactive editing
            */
        }else{
            injectFunction(function() {
                alert("Hide eClasses: to select classes please visit your eLearning platform.");
            });
        }
    }
});

//function to inject functions into current tab
function injectFunction(passedFunction){
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: passedFunction
        });
    });
}

//function to inject scripts into current tab
function injectScript(script){
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: [script]
        });
    });
}
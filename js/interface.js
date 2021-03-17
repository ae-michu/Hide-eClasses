// Interface functions for navigating menu options and animations

//listeners
document.getElementById("settings-button").addEventListener("click", openSettings);
document.getElementById("about-button").addEventListener("click", openAbout);
document.getElementById("back-button").addEventListener("click", openMain);


//openSettings function
function openSettings(){
    pageTransition(checkVisible(), "settings");
}

//function to open about page in new tab
function openAbout(){
    var aboutPage = "https://github.com/ae-michu/Hide-eClasses";
    chrome.tabs.create({ url: aboutPage });
}

//funtion to close settings and open main menu
function openMain(){
    var urlField = document.getElementById("platform-url");
    if (urlField.value == ""){
        var i = 0;
        var flash = setInterval(flashBorder, 100);
    }else{
        pageTransition("settings", "main-content");
    }
    function flashBorder() {
        if (i == 6){
            clearInterval(flash);
            urlField.style.removeProperty("border");
        }else{
            i++;
            if (i%2 == 0){
                urlField.style.border = "2px solid rgb(204, 204, 204)";
            }else{
                urlField.style.border = "2px solid rgb(255, 0, 0)";
            }
        }
    }
}

//page transition animation
function pageTransition(currentPageClass, desiredPageClass){
    var oldPage = document.getElementsByClassName(currentPageClass)[0];
    var newPage = document.getElementsByClassName(desiredPageClass)[0];

    oldHeight = getComputedStyle(oldPage).height.replace("px", "");
    newHeight = getComputedStyle(newPage).height.replace("px", "");
    var oldHeightSave = oldHeight + "px";

    if (currentPageClass == desiredPageClass){
        return
    }

    var start = setInterval(closeOld, 7);
    function closeOld(){
        if (oldHeight == 0){
            oldPage.style.display = "none";
            oldPage.style.height = oldHeightSave;
            clearInterval(start);
            next();
        }else{
            oldHeight--;
            oldPage.style.height = String(oldHeight+"px");
        }
    }
    
    function next(){
        var i = 0;
        newPage.style.display = "block";
        newPage.style.height = "0px";
        start = setInterval(openNew, 7);
        function openNew(){
            if (i == newHeight){
                clearInterval(start);
            }else{
                i++;
                newPage.style.height = String(i+"px");
            }
        }
    }
}

//function to check for current visable page
function checkVisible() {
    var mainContentDisplay = getComputedStyle(document.getElementsByClassName("main-content")[0]).display;
    var noPlatformDisplay = getComputedStyle(document.getElementsByClassName("no-platform")[0]).display;
    var newUserDisplay = getComputedStyle(document.getElementsByClassName("new-user")[0]).display;
    var settingsDisplay = getComputedStyle(document.getElementsByClassName("settings")[0]).display;

    if (mainContentDisplay == "block") {
        return "main-content";
    }else if (noPlatformDisplay == "block") {
        return "no-platform";
    }else if (newUserDisplay == "block") {
        return "new-user";
    }else if (settingsDisplay == "block") {
        return "settings";
    }else{
        console.error("no page is visible");
    }
}
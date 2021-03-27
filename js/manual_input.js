//manual input script

//set variable to store userSettings
var userSettingsTemp;

//get stored classes from userSettings
chrome.storage.local.get("userSettings", function({ userSettings }) {
    userSettingsTemp = userSettings;
    var storedClasses = "";
    if (userSettings["classes"].length != 0){
        for (i = 0; i < userSettings["classes"].length - 1; i++){
            storedClasses += userSettings["classes"][i] + ";";
        }
        storedClasses += userSettings["classes"][userSettings["classes"].length - 1];
    }

    if (storedClasses == null || storedClasses == ""){
        manualPromptEmpty();
    }else{
        manualPrompt(storedClasses);
    }
});

//function to show a prompt with classes from userSettings
function manualPrompt(stringClasses){
    var input = prompt("Please enter titles of classes to hide:", stringClasses);
    if (input != null && input != stringClasses) {
        saveInput(input);
    }
}

//function to show a prompt with an example of classes
function manualPromptEmpty() {
    var input = prompt("Please enter titles of classes to hide:", "class 1;class 2;class 3");
    if (input != null && input != "" && input != "class 1;class 2;class 3") {
        saveInput(input);
    }
}

//function to save classes to userSettings and show prompt which classes were saved
function saveInput(inputClasses){
    var classesArray = [];
    var tempClass = inputClasses;

    for (i = 0; i < inputClasses.split(";").length - 1; i++){
        var singleClass = tempClass.substring(0, tempClass.indexOf(";"));
        tempClass = tempClass.substring(tempClass.indexOf(";") + 1, tempClass.length);
        classesArray[i] = singleClass;
    }
    classesArray[inputClasses.split(";").length - 1] = tempClass;

    //save to userSettings
    var newValues = {active: userSettingsTemp["active"], url: userSettingsTemp["url"], classes: classesArray};
    chrome.storage.local.set({"userSettings": newValues})

    var promptMessage = "Saved classes to hide: \n";
    for (i = 0; i < classesArray.length - 1; i++){
        promptMessage += classesArray[i] + "\n";
    }
    promptMessage += classesArray[classesArray.length - 1];
    alert(promptMessage);
}
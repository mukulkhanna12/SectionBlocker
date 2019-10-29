var today = new Date();
var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
time = date + ' ' + time;

var textColor = "#FFFFFF";
var backgroundColor = "#CCCC99";
var sliderSpeed = 2000;

var info = {
    'time': 0,
    'quorts': 'show',
    'last_time': time,
    'timeUpReload': false,
    'textColor': textColor,
    'backgroundColor': backgroundColor,
    'sliderSpeed': sliderSpeed
};
var defaultSetting = {
    'textColor': textColor,
    'backgroundColor': backgroundColor,
    'sliderSpeed': sliderSpeed
};

chrome.storage.local.set({
    'data': info,
    'defaultDetails': defaultSetting
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        if (tab.url.indexOf("youtube.com/watch?v") != -1) {
            chrome.tabs.insertCSS(tab.id, {
                file: "css/bootstrap.min.css",
                allFrames: true
            }, function () {
                chrome.tabs.insertCSS(tab.id, {
                    file: "css/style.css",
                    allFrames: true
                }, function () {
                    chrome.tabs.executeScript(tabId, {
                        file: "js/jquery.min.js"
                    }, function () {
                        chrome.tabs.executeScript(tabId, {
                            file: "js/content.js"
                        });
                    });
                });
            });
        }
    }
});

// chrome.runtime.setUninstallURL("http://www.mukulkhanna.xyz/sectionblocker/index.php")
var today = new Date();
var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
time = date + ' ' + time;
var info = {
    'time': 0,
    'quorts': 'show',
    'last_time': time,
    'timeUpReload': false
};

chrome.storage.local.set({
    'data': info
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        if (tab.url.indexOf("youtube.com/watch?v") != -1) {
            chrome.tabs.insertCSS(tab.id, {
                file: "css/bootstrap.min.css",
                allFrames: true
            }, function () {
                chrome.tabs.insertCSS(tab.id, {
                    file: "css/styles.css",
                    allFrames: true
                }, function () {
                    // <link href="https://fonts.googleapis.com/css?family=Arvo" rel="stylesheet"></link>
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
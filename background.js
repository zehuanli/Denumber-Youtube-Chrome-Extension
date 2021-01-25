chrome.runtime.onMessage.addListener((msg, sender) => {
    // if a message is received (meaning the video player was found) and the sender is an iframe,
    // notify its parent page
    if (msg && sender.frameId) {
        chrome.tabs.sendMessage(sender.tab.id, msg, {frameId: 0});
    }
});

chrome.webNavigation["onHistoryStateUpdated"].addListener(function(data) {
    if (!data.url.startsWith("chrome://")) {
        chrome.tabs.executeScript(data.tabId, {code: "var historyStateUpdated = 1"}, function() {
            chrome.tabs.executeScript(data.tabId, {file: "content.js"});
        });
    }
});
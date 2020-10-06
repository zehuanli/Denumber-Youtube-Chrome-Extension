if (window === top) {
    // main page
    chrome.runtime.onMessage.addListener(msg => {
        windowAddListener();
    });
}

window.onload = function() {
    // if the page contains a video player, add a keydown event listener to the window,
    // and send a message to the background which will try to notify its parent page, if it's an iframe
    var eles = document.getElementsByClassName("html5-video-container");
    if (eles.length > 0) {
        windowAddListener();
        // The message content itself doesn't really matter
        chrome.runtime.sendMessage(1);
    }
}

function windowAddListener() {
    blacklistKeyCodes = new Set([
        12, 33, 34, 35, 36, 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105
    ]);
    window.addEventListener(
        "keydown",
        function(e) {
            if (blacklistKeyCodes.has(e.which)) {
                e.stopPropagation();
            }
        },
        true
    );
}
var nid = 'main';
var ctd = false;
var extID = 'ppibnbapebejhnmplokgfhijhfdchhhc'; // catcher links extension
var appID = 'apdfdogachdbobbikkjaghgcahcmcdkl'; // this app

var notice = function(title, message) {
    if ('string' == typeof title && 'string' == typeof message) {
        if (!ctd) {
            chrome.notifications.create(
                nid,
                {
                    title: title,
                    iconUrl: 'assets/trello-mark-blue-32.png',
                    type: 'basic',
                    message: message
                },

                function() {
                    ctd = true;
                }
            );
        } else {
            chrome.notifications.update(nid, {
                title: title,
                type: 'basic',
                iconUrl: 'assets/trello-mark-blue-32.png',
                message: message
            });
        }
    }
};

var app = function() {
    chrome.app.window.create(
        'index.html',
        {
            id: 'mainWindow',
            innerBounds: { width: 960, height: 600 },
            frame: { type: 'none' },
            resizable: true
        },

        function(e) {
            
        }
    );
}

chrome.app.runtime.onLaunched.addListener(function() {
    app();
});

chrome.app.runtime.onRestarted.addListener(function() {
    app();
});

// send cached links to webview
chrome.runtime.onMessageExternal.addListener(function(request, sender) {
    if (sender.id == extID) {
        chrome.runtime.sendMessage(appID, request);
    }
});
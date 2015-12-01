var nid = 'main';
var ctd = false;
var extID = 'ppibnbapebejhnmplokgfhijhfdchhhc'; // catcher links extension
var appID = 'gkcknpgdmiigoagkcoglklgaagnpojed'; // this app
var frame = 'none';

// frame options
chrome.storage.sync.get(function(items) {
    if (items.showFrame !== undefined) {
        frame = items.showFrame;
    }
});

var app = function() {
    chrome.app.window.create(
        'index.html',
        {
            id: 'mainWindow',
            innerBounds: { width: 960, height: 600 },
            frame: { type: frame },
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
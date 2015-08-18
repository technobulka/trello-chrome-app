var webview = document.getElementById('main');
var extID = 'ppibnbapebejhnmplokgfhijhfdchhhc'; // catcher links extension
var appID = 'gkcknpgdmiigoagkcoglklgaagnpojed'; // this app

// set some css on trello.com
webview.addEventListener('loadcommit', function(e) {
    if (e.isTopLevel) {
        webview.insertCSS({
            code: '.header-btn.header-boards, .promo-nav { margin-left: 38px !important; }',
            runAt: 'document_start'
        });
    }
});

// send new-window-links to bronser
webview.addEventListener('newwindow', function(e) {
    e.stopImmediatePropagation();
    window.open(e.targetUrl);
});

// hotkeys
window.addEventListener('keydown', function(e) {
    // Ctrl+R or F5
    if (e.ctrlKey && e.keyCode == 82 || e.keyCode == 115) {
        webview.reload();
    }

    // F11
    if (e.keyCode == 122) {
        if (chrome.app.window.current().isFullscreen()) {
            chrome.app.window.current().restore();
        } else {
            chrome.app.window.current().fullscreen();
        }
    }
});

// fix webview lose focus
window.addEventListener('focus', function(e) {
    webview.focus();
});

// open cached links
chrome.runtime.onMessage.addListener(function(request, sender) {
    if (sender.id == appID) {
        webview.src = request;
    }
});
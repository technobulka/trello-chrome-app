var webview = document.getElementById('main');
var extID = 'ppibnbapebejhnmplokgfhijhfdchhhc'; // catcher links extension
var appID = 'gkcknpgdmiigoagkcoglklgaagnpojed'; // this app

// set some css on trello.com
webview.addEventListener('loadcommit', function(e) {
    if (e.isTopLevel) {
        webview.insertCSS({
            code: '.header-btn.header-boards,.promo-nav{margin-left:38px!important}.window-overlay::-webkit-scrollbar{height:33px;width:33px}.window-overlay::-webkit-scrollbar-thumb{min-height:50px;background:rgba(255,255,255,1);border-radius:17px;border:10px solid transparent;background-clip:padding-box}.window-overlay::-webkit-scrollbar-track-piece{background:rgba(0,0,0,.5);border:10px solid transparent;background-clip:padding-box}.window-overlay::-webkit-scrollbar-track-piece:vertical:start{border-radius:17px 17px 0 0}.window-overlay::-webkit-scrollbar-track-piece:vertical:end{border-radius:0 0 17px 17px}',
            runAt: 'document_start'
        });
    }
});

// send new-window-links to bronser
webview.addEventListener('newwindow', function(e) {
    if (/accounts\.google\.com.+drive\.readonly/.test(e.targetUrl)) {
        // open in this page
    } else {
        e.stopImmediatePropagation();
    }

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

// allow download
webview.addEventListener('permissionrequest', function(e) {
    if (e.permission === 'download') {
        e.request.allow();
    }
});

// open cached links
chrome.runtime.onMessage.addListener(function(request, sender) {
    if (sender.id == appID) {
        webview.src = request;
    }
});
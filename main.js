var webview = document.getElementById('main');

webview.addEventListener('loadcommit', function(e) {
    if (e.isTopLevel) {
        webview.insertCSS({
            code: '.header-btn.header-boards { margin-left: 38px !important; }',
            runAt: 'document_start'
        });
    }
});

webview.addEventListener('newwindow', function(e) {
    e.stopImmediatePropagation();
    window.open(e.targetUrl);
});

window.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.keyCode == 82 || e.keyCode == 115) {
        webview.reload();
    }
});
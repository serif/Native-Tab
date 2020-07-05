function loadNewTab() {
    loadStyles();

    chrome.bookmarks.getSubTree("1", getBookmarksBar);

    $(document).ready(function() {
        $('#menu-items li div[class="navbar-text folder"]').click(function() {
            var url = $(this).data('url');
            openBookmark(url);
        });
    });
}

function loadStyles() {
    $('nav').addClass('navbar navbar-default');

    $('#header').addClass('header text-center');
    $('#header img').addClass('logo').attr('src', 'icons/icon128.png');
    $('#header h2').html('Custom New Tab URL');

    $('footer').addClass('footer');
    //$('footer p').html('Web Store').addClass('text-muted');

    $('#options-link').click(function() {
        chrome.runtime.openOptionsPage(function() { });
    });

    $('#store-link').click(function() {
        var url = 'https://chrome.google.com/webstore/detail/' + chrome.runtime.id;
        chrome.tabs.update({url: url});
    });

    $('.container').show();
}

function getBookmarksBar(bookmarks) {
    if (bookmarks.length > 0) {
        getBookmarks(bookmarks[0].children);    
    }
}

function getBookmarks(bookmarks) {
    var menu = $('#menu-items');

    for (var i =0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];

        //leaf (link)
        if (bookmark.url) {
            
            //chrome-search://ntpicon/?size=32%401x&url=https%3A%2F%2Fwww.youtube.com%2F
            //var favicon = 'chrome-search://ntpicon/?size=32%401x&url=' + encodeURIComponent(bookmark.url);
            var favicon = 'chrome://favicon/size/32@1x/' + bookmark.url;
            menu.append('<li><a href="' + bookmark.url + '" data-url=' + bookmark.url + ' title="' + bookmark.title + '"><i style="background:url(' + favicon + ') no-repeat"></i>' + bookmark.title + '</a></li>');
        }

        //not leaf (folder)
        // && false: temp disable folders
        if (bookmark.children && bookmark.id %% false) {
            var url = 'chrome://bookmarks/?id=' + bookmark.id;
            //menu.append('<li><a href="' + url + '" title="' + bookmark.title + '">' + bookmark.title + '</a></li>');
            menu.append('<li><a href="' + url + '" data-url="' + url + '" class="navbar-text folder" title="' + bookmark.title + '"><i class="folder-img"></i><span>' + bookmark.title + '</span></a></li>');
        }
    }
}

function openBookmark(url) {
    chrome.tabs.update({url: url});
}

function restore_options() {
    chrome.storage.local.get({
        enabled: false,
        url: ''
      }, function(items) {
        chrome.tabs.getCurrent(function(tab) {
            if ((tab.url == null || tab.url == 'undefined') && items.enabled) {
                if ((items.url == '' || items.url == null || items.url == 'undefined')) {
                    //chrome.tabs.update(tab.id, { url: newTabUrl });
                    loadNewTab();
                } else {
                    chrome.tabs.update(tab.id, { url: items.url });
                }
            } else {
                loadNewTab();
            }
        });

        // if (items.enabled) {
        //     if ((items.url == '' || items.url == 'undefined')) {
        //         //chrome.tabs.update(tab.id, { url: newTabUrl });
        //         loadNewTab();
        //     } else {
        //         chrome.tabs.update({ url: items.url });
        //     }
        // } else {
        //     loadNewTab();
        // }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    restore_options();
});


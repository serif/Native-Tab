chrome.tabs.onCreated.addListener(function(tab) {
	restore_options(tab);
});

function restore_options(tab) {
	//'C:\\Users\\desenv028\\Documents\\Extensions\\new-tab\\src\\options.html'
	chrome.storage.local.get({
		enabled: false,
        url: ''
	}, function(items) {
		if (tab.url == 'chrome://newtab/' && items.enabled) {
	    	if ((items.url == '' || items.url == 'undefined')) {
	    		chrome.tabs.update(tab.id, { url: 'chrome://newtab/' });
	    	} else {
	    		chrome.tabs.update(tab.id, { url: items.url });
	    	}
	    }
	});
}
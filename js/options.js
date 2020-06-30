// Saves options to chrome.storage
function save_options() {
  var enabled = document.getElementById('enabled-parameter').checked;
  var url = document.getElementById('url-parameter').value;
  
  chrome.storage.local.set({
    enabled: enabled,
    url: url
  }, function() {

    //chrome.runtime.reload();

    // Update status to let user know options were saved.
    console.log("options saved");
    var status = document.getElementById('status');
    //status.textContent = 'Options saved!';
    status.style.display = 'inline';
    setTimeout(function() {
      //status.textContent = '';
      status.style.display = 'none';
    }, 1500);
  });
}
/*
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get({
    enabled: false,
    url: ''
  }, function(items) {
    document.getElementById('enabled-parameter').checked = items.enabled;
    document.getElementById('url-parameter').value = items.url;

    var status = document.getElementById('status');
    status.style.display = 'none';

    change_enabled(null);
  });
}

function change_enabled(event) {
  var divUrl = $('#div-url');

  var enabled = document.getElementById('enabled-parameter').checked;

  if (enabled){
    divUrl.slideDown();
  } else {
    divUrl.slideUp();
  }

  if (event != null) {
    save_options();
  }
}

function set_url_chrome_apps() {
  set_url_chrome('chrome://apps/');
}

function set_url_chrome_blank() {
  set_url_chrome('about:blank');
}

function set_url_chrome_bookmarks() {
  set_url_chrome('chrome://bookmarks/');
}

function set_url_chrome_downloads() {
  set_url_chrome('chrome://downloads/');
}

function set_url_chrome_extensions() {
  set_url_chrome('chrome://extensions/');
}

function set_url_chrome_history() {
  set_url_chrome('chrome://history/');
}

function set_url_chrome_memory() {
  set_url_chrome('chrome://memory-redirect/');
}

function set_url_chrome_version() {
  set_url_chrome('chrome://version/');
}
*/
function set_url_chrome(url) {
  var urlfield = document.getElementById('url-parameter');

  urlfield.value = url;
  save_options();
}

document.addEventListener('DOMContentLoaded', function() {
  restore_options();

  document.getElementById('save-button').addEventListener('click', save_options);
  document.getElementById('cancel-button').addEventListener('click', function() { window.close(); });
  document.getElementById('enabled-parameter').addEventListener('change', change_enabled);

  document.getElementById('chrome-pages-apps').addEventListener('click', set_url_chrome_apps);
  document.getElementById('chrome-pages-blank').addEventListener('click', set_url_chrome_blank);
  document.getElementById('chrome-pages-bookmarks').addEventListener('click', set_url_chrome_bookmarks);
  document.getElementById('chrome-pages-downloads').addEventListener('click', set_url_chrome_downloads);
  document.getElementById('chrome-pages-extensions').addEventListener('click', set_url_chrome_extensions);
  document.getElementById('chrome-pages-history').addEventListener('click', set_url_chrome_history);
  document.getElementById('chrome-pages-memory').addEventListener('click', set_url_chrome_memory);
  document.getElementById('chrome-pages-version').addEventListener('click', set_url_chrome_version);
});

// Jake Ledoux, 2019
// dev@jakeledoux.com
// fight me on github

'use strict';

function ImgReplace(details) {
  if (details.url.includes("last.fm")) {
    let window = browser.windows.get(details.windowId);
    browser.browserAction.enable();
    browser.tabs.executeScript(details.tabid, { file: "imgreplace.js", runAt: 'document_idle' });
  }
  else {
    browser.browserAction.disable();
  }
}

// Triggered when user clicks extension icon
browser.browserAction.onClicked.addListener(function (details) {
  browser.tabs.executeScript(null, { file: "imgreplace.js" });
});

browser.webNavigation.onHistoryStateUpdated.addListener(ImgReplace);
browser.webNavigation.onCommitted.addListener(ImgReplace);
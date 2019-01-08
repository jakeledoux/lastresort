// Jake Ledoux, 2019
// dev@jakeledoux.com
// fight me on github

'use strict';

// Triggered when user clicks extension icon
chrome.browserAction.onClicked.addListener(function (details) {
  chrome.tabs.executeScript(null, { file: "imgreplace.js" });
});

chrome.webNavigation.onCommitted.addListener(function (details) {
  if (details.url.includes("last.fm")) {
    chrome.tabs.executeScript(details.tabid, { file: "imgreplace.js" });
  }
});
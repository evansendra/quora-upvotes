// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        // sort_answers is defined in upvotes.js
        code: 'sort_answers();'
    });
});

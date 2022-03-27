let color = '#3aa757';
chrome.action.setBadgeText({text: 'ON'});
chrome.action.setBadgeBackgroundColor({color: '#4688F1'});

chrome.runtime.onInstalled.addListener(() => {
    console.log('AAA')
    chrome.storage.sync.set({color});
    console.log('Default background color set to %cgreen', `color: ${color}`);
});



chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting === "hello")
            sendResponse({farewell: "goodbye"});
    }
);

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//         console.log('OPAAAA COMPLETE StatUS', changeInfo.status)
//
//         if (changeInfo.status == 'complete' && tab.active) {
//             chrome.runtime.sendMessage({data: {message: 'activeTabIsUpdated'}}, null);
//         }
//     }
// )
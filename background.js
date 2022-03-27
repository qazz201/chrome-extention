// let color = '#3aa757';
chrome.action.setBadgeText({text: 'ON'});
chrome.action.setBadgeBackgroundColor({color: '#4688F1'});

// chrome.runtime.onInstalled.addListener(() => {
//     console.log('AAA')
//     chrome.storage.sync.set({color});
//     console.log('Default background color set to %cgreen', `color: ${color}`);
// });


// var ports = [];
// chrome.runtime.onConnect.addListener(function (port) {
//
//     console.log('PORTTT__', port)
//     if (port.name !== "devtools") return;
//     ports.push(port);
//     // // // Remove port when destroyed (eg when devtools instance is closed)
//     // // port.onDisconnect.addListener(function() {
//     // //     var i = ports.indexOf(port);
//     // //     if (i !== -1) ports.splice(i, 1);
//     // // });
//
//     port.onMessage.addListener(function (msg) {
//         // Received message from devtools. Do something:
//         console.log('Received message from devtools page', msg);
//     });
// });

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
//         console.log('OPAAAA COMPLETE StatUS', tab, changeInfo)
//
//         if (tab.status == 'loading' && tab.active) {
//             notifyDevtools();
//             // chrome.runtime.sendMessage({data: {message: 'activeTabIsUpdated'}}, null);
//         }
//     }
// )
//
// // Function to send a message to all devtools.html views:
// function notifyDevtools(msg) {
//     ports.forEach(function (port) {
//         port.postMessage(msg);
//     });
// }
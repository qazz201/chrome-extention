import {message} from "../utility/message.js";

const {DEVTOOLS_REQUEST_FINISHED} = message;

chrome.devtools.panels.create('MY devtools', null, '../panel/index.html', function (panel) {
    chrome.devtools.network.onRequestFinished.addListener(
        function (request) {
            chrome.runtime.sendMessage({message: DEVTOOLS_REQUEST_FINISHED, payload: request}, null);
        }
    );


    // const port = chrome.runtime.connect({name: 'devtools'});
    // port.onMessage.addListener(function (msg) {
    //     console.log('Received message _ON_ devtools page', msg);
    // });

    /*
        // chrome.devtools.inspectedWindow.eval(
        //     'console.log(unescape("' +
        //     escape(JSON.stringify(request)) + '")); console.log(chrome.runtime)');

        // chrome.devtools.network.getHAR(function (response) {
        //         chrome.runtime.sendMessage({response}, function (response) {
        //             console.log(request)
        //         });
        //
        //         // chrome.devtools.inspectedWindow.eval(
        //         //     'console.log(unescape("' +
        //         //     escape(JSON.stringify(response)) + '")); console.log(chrome.runtime)');
        //
        //     }
        // );
    */

    // chrome.devtools.panels.create('MY devtools', null, 'panel.html', function (panel) {
    //     chrome.devtools.network.onRequestFinished.addListener(
    //         function (request) {
    //
    //             // chrome.runtime.sendMessage({request: request.request.url}, function (response) {
    //             //     console.log(request)
    //             // });
    //             //
    //             //
    //             // chrome.devtools.inspectedWindow.eval(
    //             //     'console.log("Large image: " + unescape("' +
    //             //     escape(JSON.stringify(request)) + '")); console.log(chrome.runtime)');
    //
    //
    //             chrome.devtools.network.getHAR(function (response) {
    //                     // chrome.runtime.sendMessage({response}, function (response) {
    //                     //     console.log(response)
    //                     // });
    //
    //                     chrome.devtools.inspectedWindow.eval(
    //                         'console.log("Large image: " + unescape("' +
    //                         escape(JSON.stringify(response)) + '")); console.log(chrome.runtime)');
    //
    //                 }
    //             );
    //
    //         }
    //     );


    // chrome.devtools.network.getHAR(function (response) {
    //         // chrome.runtime.sendMessage({response}, function (response) {
    //         //     console.log(response)
    //         // });
    //
    //         chrome.devtools.inspectedWindow.eval(
    //             'console.log("Large image: " + unescape("' +
    //             escape(JSON.stringify(response)) + '")); console.log(chrome.runtime)');
    //
    //         // chrome.devtools.inspectedWindow.eval(
    //         //     'console.log("Large image: " + unescape("' +
    //         //     escape(request.request.url) + '")); console.log(chrome.runtime)');
    //     }
    // );
});

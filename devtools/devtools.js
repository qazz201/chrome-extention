import {message} from "../utility/message.js";

const {DEVTOOLS_REQUEST_FINISHED} = message;

chrome.devtools.panels.create('CT4 Eng', null, '../panel/index.html', function (panel) {
    chrome.devtools.network.onRequestFinished.addListener(
        function (request) {
            chrome.runtime.sendMessage({message: DEVTOOLS_REQUEST_FINISHED, payload: request}, null);
        }
    );
});

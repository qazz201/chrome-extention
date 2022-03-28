import {message} from "../utility/message.js";

const {DEVTOOLS_REQUEST_FINISHED} = message;

document.addEventListener("DOMContentLoaded", function (event) {
    document.querySelector('.table-container__clear-button').addEventListener('click', handleClearTable);
});

chrome.runtime.onMessage.addListener(
    function (msg, sender, sendResponse) {
        const {message, payload} = msg;

        if (message == DEVTOOLS_REQUEST_FINISHED) {
            fillTable(
                document.querySelector('.table-container__requests'),
                payload
            );
        }
    }
);

function fillTable(tableRef, request) {
    const {_resourceType} = request;
    if (_resourceType == 'xhr' || _resourceType == 'fetch') {

        const {
            time,
            _resourceType: resourceType,
            response: {status, content: {size}},
            timings: {blocked},
            request: {method, bodySize}
        } = request;

        let text = request['request']?.postData?.text;
        let apexClassAndMethodName = '';

        if (text && method === 'POST') {
            apexClassAndMethodName = extractApexClassAndMethodName(text);
        }

        createTableRow(
            tableRef,
            [
                convertMilliseconds(time),
                convertBites(bodySize),
                convertBites(size),
                method,
                apexClassAndMethodName,
                resourceType,
                status,
            ]);
    }
}

function convertMilliseconds(time) {
    if (time < 1000) {
        return `${time.toFixed(1)} ms`;
    }

    if (time > 1000 && time < 60000) {
        return `${(time / 1000).toFixed(1)} sec`;
    }
    if (time >= 60000) {
        return `${Math.round(time / 60000)}min ${((time - 60000) / 1000).toFixed(1)}sec`
    }

    return `${time.toFixed(1)} ms`;
}

function convertBites(bites) {
    if (bites < 1000) return `${bites} b`;

    if (bites >= 1000) return `${(bites / 1000).toFixed(1)} kB`;

    return `${bites} b`;
}

function extractApexClassAndMethodName(encodedUriString) {
    const decodedRequestString = decodeURIComponent(decodeURI(encodedUriString));
    const classMethodResult = decodedRequestString.match(/"classname":".+?"."method":".+?"/g);

    return classMethodResult && classMethodResult.length ? classMethodResult.join('\n') : '';
}

function createTableRow(tableRef, cellsToInsert = []) {
    const newRow = tableRef.insertRow(-1);

    cellsToInsert.forEach((cellData, index) => {
        newRow.insertCell(index)
            .appendChild(document.createTextNode(cellData));
    })
}

function handleClearTable() {
    const table = document.querySelector('.table-container__requests');
    const firstRow = table?.querySelector('tr');

    table?.querySelector('tbody')?.remove();
    table.innerHTML = firstRow.innerHTML;
}

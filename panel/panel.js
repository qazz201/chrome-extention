document.addEventListener("DOMContentLoaded", function (event) {
    document.querySelector('.clearRequestTable').addEventListener('click', handleClearTable);
});

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {

        // chrome.devtools.inspectedWindow.eval(
        //     'console.log("RESSS___"+unescape("' +
        //     escape(JSON.stringify(message)) + '")); console.log(chrome.runtime)');

        fillTable(
            document.querySelector('.table-container__requests'),
            message.request
        );
    }
);

function fillTable(tableRef, request) {
    if (request['_resourceType'] == 'xhr' || request['_resourceType'] == 'fetch') {

        let {
            time,
            _resourceType: resourceType,
            response: {status, content: {size}},
            timings: {blocked},
            request: {method,}
        } = request;

        let text = request['request']?.postData?.text;


        let apexClassAndMethodName = '';
        time = convertMillisToSecOrMin(time);

        if (text && method === 'POST') {
            apexClassAndMethodName = extractApexClassAndMethodName(text);
        }

        createTableRow(tableRef, [time, apexClassAndMethodName, resourceType, status, method, size, blocked]);
    }
}

function convertMillisToSecOrMin(time) {
    if (time < 1000) {
        return `${time.toFixed(1)} ms`;
    }

    if (time > 1000 && time < 60000) {
        return `${(time / 1000).toFixed(1)} sec`;
    }
    if (time >= 60000) {
        return `${Math.round(time / 60000)}min ${((time - 60000) / 1000).toFixed(1)}sec`
    }
    return time;
}

function extractApexClassAndMethodName(encodedUriString) {
    const decodedRequestString = decodeURIComponent(decodeURI(encodedUriString));
    const classMethodResult = decodedRequestString.match(/"classname":".+?"."method":".+?"/g);

    // chrome.devtools.inspectedWindow.eval(
    //     'console.log("RESSS___"+unescape("' +
    //     escape(decodedRequestString) + '")); console.log(chrome.runtime)');

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
    document.querySelector('.table-container__requests')?.querySelector('tbody')?.remove()
}

// chrome.runtime.onMessage.addListener(
//     function (message, sender, sendResponse) {
//
//         const hi = document.querySelector('.hi');
//         const {entries} = message.response;
//         const tableRef = document.getElementById('TableA');
//
//         let newIndex = 0;
//         const elIndex = entries.length - 1;
//
//         entries.forEach((element, index) => {
//             if (element['_resourceType'] == 'xhr' || element['_resourceType'] == 'fetch') {
//
//                 const {
//                     time,
//                     _resourceType: resourceType,
//                     response: {status, content: {size}},
//                     timings: {blocked},
//                     request: {method, postData: {text}}
//                 } = element;
//
//                 let apexClassName = '';
//
//                 if (text) {
//                     apexClassName = extractApexClassAndMethodName(text);
//                 }
//
//                 createTableRow(tableRef, newIndex, [time, apexClassName, resourceType, status, size, blocked, method]);
//
//                 if (elIndex == index) {
//                     const newRow1 = tableRef.insertRow(newIndex);
//
//                     const newCell4 = newRow1.insertCell(0);
//                     const newText4 = document.createTextNode('--------------------------------------------------');
//                     newCell4.appendChild(newText4);
//                 }
//
//                 ++newIndex;
//
//             }
//
//         });
//     }
// );
//
// function extractApexClassAndMethodName(encodedUriString) {
//     const decodedRequestString = decodeURIComponent(decodeURI(encodedUriString));
//     const classMethodResult = decodedRequestString.match(/"classname":".+?"."method":".+?"/g);
//
//     chrome.devtools.inspectedWindow.eval(
//         'console.log("RESSS___"+unescape("' +
//         escape(decodedRequestString) + '")); console.log(chrome.runtime)');
//
//     return classMethodResult && classMethodResult.length ? classMethodResult.join('\n') : '';
// }
//
// function createTableRow(tableRef, tableRowIndex = 0, cellsToInsert = []) {
//     const newRow = tableRef.insertRow(tableRowIndex);
//
//     cellsToInsert.forEach((cellData, index) => {
//         newRow.insertCell(index)
//             .appendChild(document.createTextNode(cellData));
//     })
// }
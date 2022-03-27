chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {

        const hi = document.querySelector('.hi');
        const {entries} = message.response;
        const tableRef = document.getElementById('TableA');

        let newIndex = 0;
        const elIndex = entries.length - 1;

        entries.forEach((element, index) => {
            if (element['_resourceType'] == 'xhr') {

                const {
                    time,
                    _resourceType: resourceType,
                    response: {status, content: {size}},
                    timings: {blocked},
                    request: {method, postData: {text}}
                } = element;

                let apexClassName = '';

                if (text) {
                    apexClassName = extractApexClassAndMethodName(text);
                }

                createTableRow(tableRef, newIndex, [time, apexClassName, resourceType, status, size, blocked, method]);

                if (elIndex == index) {
                    const newRow1 = tableRef.insertRow(newIndex);

                    const newCell4 = newRow1.insertCell(0);
                    const newText4 = document.createTextNode('--------------------------------------------------');
                    newCell4.appendChild(newText4);
                }

                ++newIndex;

            }

        });
    }
);

function extractApexClassAndMethodName(encodedUriString) {
    const decodedRequestString = decodeURIComponent(decodeURI(encodedUriString));
    const classMethodResult = decodedRequestString.match(/"classname":".+?"."method":".+?"/g);

    chrome.devtools.inspectedWindow.eval(
        'console.log("RESSS___"+unescape("' +
        escape(decodedRequestString) + '")); console.log(chrome.runtime)');

    return classMethodResult && classMethodResult.length ? classMethodResult.join('\n') : '';
}

function createTableRow(tableRef, tableRowIndex = 0, cellsToInsert = []) {
    const newRow = tableRef.insertRow(tableRowIndex);

    cellsToInsert.forEach((cellData, index) => {
        newRow.insertCell(index)
            .appendChild(document.createTextNode(cellData));
    })
}
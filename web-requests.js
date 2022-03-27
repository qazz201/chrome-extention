console.log(chrome, "pppopopop")

chrome.runtime.sendMessage({greeting: "hello"}, function (response) {
    console.log(typeof response,response)

});


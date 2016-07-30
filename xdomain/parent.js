(window.addEventListener && window.addEventListener("message", OnMessage, false) // FF,SA,CH,OP,IE9 
    || window.attachEvent && window.attachEvent("onmessage", OnMessage)); // IE8 

function getRemoteValues() {
    var frame = document.getElementById("remoteFrame1"); // send the 'remoteFrame1' message 
    var message = "getRemoteValues"; //  to the frame window 
    if (frame.contentWindow.postMessage)
        frame.contentWindow.postMessage(message, "*");
    else alert("Your browser does not support the postMessage method!");
}

function OnMessage(evt) {
    var message = evt.data,
        arr = message.split(","),
        outEl = document.getElementById("contentsReceived"),
        s = arr[4].substring(0, 20).replace(/</g, '&lt;'); // Sanitize the input
    br = '<br>', br2 = br + br;

    outEl.innerHTML = '<span style="font-family:monospace;white-space:pre;line-height:10px">' + 'Returned message:  ' + arr + br2 + 'Sender:            ' + evt.origin + br + 'Caller:            ' + arr[0] + br + 'Checkbox state:    ' + (arr[1] == "true" ? "checked" : "not checked") + br + 'Selected item:     ' + Number(arr[2]) + br + 'Item text:         ' + arr[3] + br + 'Item value:        ' + arr[4] + br + 'Inputbox:          ' + arr[5] + br + '</span>';
}
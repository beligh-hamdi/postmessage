function OnMessage(evt) {
    if (evt.origin !== 'http://www.javascriptmonastery.com' // Check caller' url
        && evt.origin !== 'http://javascriptmonastery.com') return;

    displayMessage(evt);

    if (evt.data == 'getRemoteValues') {
        var select = document.getElementById('Droplist'),
            checkBox = document.getElementById('Checkbox'),
            Inputbox = document.getElementById('Inputbox'),
            s = Inputbox.value.substring(0, 20).replace(/</g, '&lt;'); // Sanitize the input

        var message = evt.origin + ',' + checkBox.checked + ',' + select.selectedIndex + ',' + select.options[select.selectedIndex].text + ',' + select.value + ',' + s;
        evt.source.postMessage(message, evt.origin); // send back a response
    }
}

function displayMessage(evt) {
    var s = 'Message received from: ',
        br = '<br>';

    document.getElementById('waiting').innerHTML = 'I just received this message:';

    if ('domain' in evt) s += 'domain: ' + evt.domain; // Opera pre-v10
    if ('uri' in evt) s += 'url: ' + evt.uri; // Opera pre-v10
    if ('origin' in evt) s += evt.origin; // FF,SA,CH, IE8+,OP10+

    s += br + 'Message Contents: ' + evt.data;
    if ('lastEventId' in evt) s += br + 'lastEventId: ' + evt.lastEventId; // FF,SA,CH

    document.getElementById('msgDisplay').innerHTML = s;
}

(window.addEventListener && window.addEventListener('message', OnMessage, false) // FF,SA,CH,OP,IE9+
    || window.attachEvent && window.attachEvent('onmessage', OnMessage)); // IE8
window.addEventListener('load', async function () {
    const uName = localStorage.getItem('nameUser');

    var socket = io();

    var messages = document.getElementById('messages');
    var form = document.getElementById('form');
    var input = document.getElementById('input');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (input.value) {
            socket.emit('chat message', uName, input.value);
            input.value = '';
        }
    });

    socket.on('chat message', function (uNmae, msg) {
        
        var item = document.createElement('li');
        var textContainer = document.createElement('div');
        var timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
        textContainer.classList.add('text-container');
        
        if (uName === uNmae) {
            if (uNmae == null) {
                uNmae = "Noname";
            }
            item.classList.add('right');
            textContainer.textContent = msg + ' :' + uNmae + ' (' + timestamp + ')';
        } else {
            if (uNmae == null) {
                uNmae = "Noname";
            }
            textContainer.textContent = '(' + timestamp + ') ' + uNmae + ': ' + msg;
        }
    
        item.appendChild(textContainer);
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });
});
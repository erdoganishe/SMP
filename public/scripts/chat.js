window.addEventListener('load', async function () {
    const uName = localStorage.getItem('nameUser');

    var socket = io();

    var messages = document.getElementById('messages');
    var form = document.getElementById('form');
    var input = document.getElementById('input');

    const gcRes = await fetch(`/api/chat`);
    const gcData = await gcRes.json();
    console.log(gcData);
    gcData.forEach(el => {
        
        var item = document.createElement('li');
        var textContainer = document.createElement('div');
    
        textContainer.classList.add('text-container');
        
        if (uName === el.user) {
            item.classList.add('right');
            textContainer.textContent = el.msg + ' (' + el.time + ')';
        } else {
            textContainer.textContent = '(' + el.time + ') ' + el.user + ': ' + el.msg;
        }
    
        item.appendChild(textContainer);
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    })


    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (input.value) {
            socket.emit('chat message', uName, input.value);

            var timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const chatAddRes = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({user: uName?? 'Anonymous', time: timestamp, msg: input.value}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const chatAddData = await chatAddRes.json();
            console.log(chatAddData);
            if(chatAddData.isEnough){
                deleteHighestElement();
            }
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
                uNmae = "Anonymous";
            }
            item.classList.add('right');
            textContainer.textContent = msg + ' (' + timestamp + ')';
        } else {
            deleteHighestElement();
            if (uNmae == null) {
                uNmae = "Anonymous";
            }
            textContainer.textContent = '(' + timestamp + ') ' + uNmae + ': ' + msg;
        }
    
        item.appendChild(textContainer);
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    function deleteHighestElement() {
        console.log('>>>');
        var messages = document.getElementById('messages'); // Replace 'your-messages-id' with the actual ID of your <ul> element
        var highestElement = messages.firstElementChild;
        
        if (highestElement) {
          messages.removeChild(highestElement);
        }
      }
});
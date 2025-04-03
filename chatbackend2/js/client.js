const socket = io('http://localhost:8000');

const form = document.getElementById('send-Container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('message-notification-190034.mp3');

const append = (message, position) => {

    // here we are done added the text in the chat and appenf to left position and right
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message', position);
    messageContainer.append(messageElement);

    if (position === 'left') {
        audio.play();
    }
};

// Get user name and send to server
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// Send message when form is submitted
form.addEventListener('submit', (e) => {
    e.preventDefault();//no buffer
    const message = messageInput.value;//putting message value
    append(`You: ${message}`, "right");//message set to right
    socket.emit('send', message);
    messageInput.value = "";
});

// Listen for events from the server
socket.on('user-joined', name => {
    append(`${name} joined the chat`, "right");
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, "left");
});

socket.on('left', name => {
    append(`${name} left the chat`, "left");
});

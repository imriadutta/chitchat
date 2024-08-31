const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

let username = prompt("Enter your username:");

msgerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = msgerInput.value;
    if (!message) return;

    // Send the message to the server
    $.post('/send_message', {
        username: username,
        message: message,
    }, function (data) {
        console.log(data.status);
    });

    msgerInput.value = "";
});

function appendMessage(username, message, created_at) {
    const html = `
        <div class="msg left-msg">
        <div class="msg-img">
            <i class="bi bi-person"></i>
        </div>

        <div class="msg-bubble">
            <div class="msg-info">
                <div class="msg-info-name">${username}</div>
                <div class="msg-info-time">${created_at}</div>
            </div>

            <div class="msg-text">${message}</div>
        </div>
        </div>
    `;

    msgerChat.insertAdjacentHTML("beforeend", html);
    msgerChat.scrollTop += 500;
}

function get(selector, root = document) {
    return root.querySelector(selector);
}

// Function to load messages
function loadMessages() {
    $.get('/get_messages/general', function (data) {
        msgerChat.innerHTML = '';

        data.forEach(function (msg) {
            appendMessage(msg.username, msg.message, msg.created_at);
        });
    });
}

// Poll the server every 2 seconds for new messages
setInterval(loadMessages, 2000);

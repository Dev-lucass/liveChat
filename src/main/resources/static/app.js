let stompClient = null;

function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container');
    if (!alertContainer) return;
    // Criando a estrutura do alerta compatível com Bootstrap
    alertContainer.innerHTML = `<div class="alert alert-${type} fade show" role="alert">${message}</div>`;

    // Limpa o alerta após 3 segundos
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 3000);
}

function addMessage(username, message, isOwnMessage = false) {
    const messagesContainer = document.getElementById('messages');
    if (!messagesContainer) return;

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message-item', isOwnMessage ? 'message-out' : 'message-in');

    msgDiv.innerHTML = `
        <div class="message-username">${username}</div>
        <div>${message}</div>
    `;

    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function connect() {
    const username = document.getElementById('username').value.trim().toLowerCase();
    const room = document.getElementById('room').value.trim().toLowerCase();

    if (!username || !room) {
        showAlert('Digite seu nome e a sala!', 'warning');
        return;
    }

    // AVISO IMEDIATO (Fora do objeto, no lugar correto)
    showAlert("Conectando...", "info");

    if (stompClient !== null) {
        stompClient.deactivate();
    }

    const socket = new SockJS(window.location.origin + '/ws');

    stompClient = new StompJs.Client({
        webSocketFactory: () => socket,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        reconnectDelay: 5000,
        onConnect: (frame) => {
            // Quando a conexão de fato ocorre:
            showAlert(`Conectado à sala: ${room}`, 'success');
            document.getElementById('messages').innerHTML = '';

            stompClient.subscribe(`/topic/${room}`, (msg) => {
                const response = JSON.parse(msg.body);
                const fullContent = response.content;

                if (fullContent && fullContent.includes(":")) {
                    const partes = fullContent.split(":");
                    const senderName = partes[0].trim().toLowerCase();
                    const messageText = partes.slice(1).join(":").trim();
                    const isOwn = senderName === username;
                    addMessage(isOwn ? "Você" : senderName, messageText, isOwn);
                }
            });
        },
        onStompError: (frame) => {
            showAlert('Erro na conexão!', 'danger');
        }
    });

    stompClient.activate();
}

function sendMessage() {
    const username = document.getElementById('username').value.trim().toLowerCase();
    const room = document.getElementById('room').value.trim().toLowerCase();
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();

    if (stompClient && stompClient.connected && message) {
        stompClient.publish({
            destination: `/app/chat/${room}`,
            body: JSON.stringify({ username: username, message: message })
        });
        messageInput.value = '';
    }
}

// Configuração dos Botões
document.getElementById('connectBtn').onclick = connect;
document.getElementById('sendBtn').onclick = sendMessage;
document.getElementById('message').onkeydown = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
};
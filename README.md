# LiveChat

Um projeto de **chat em tempo real** utilizando **Spring Boot**, **WebSocket** e **STOMP** para comunicação bidirecional entre cliente e servidor.  

O frontend utiliza **STOMP.js** para se conectar ao backend via WebSocket, permitindo envio e recebimento instantâneo de mensagens.

O projeto está **deployado e funcionando** [aqui](https://livechat-ggks.onrender.com/).

---

## Funcionalidades

- Comunicação em tempo real entre múltiplos usuários.
- Suporte ao protocolo STOMP para mensagens estruturadas.
- Backend em Spring Boot com endpoints WebSocket configurados.
- Conexão cliente-servidor via STOMP.js.
- Suporte a múltiplas salas de chat (pode ser estendido facilmente).

---

## Tecnologias

- **Java 21** e **Spring Boot 3**
- **WebSocket** com suporte STOMP
- **STOMP.js** no frontend
- **Maven** como gerenciador de dependências
- **Docker**


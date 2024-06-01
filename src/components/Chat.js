import React, { useState, useEffect } from "react";
import "../styles/Chat.css";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

function Chat({ userName, category }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8095/ws/messages");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe("/topic/messages", (msg) => {
        const newMessage = JSON.parse(msg.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });

    setStompClient(client);

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [userName]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "" && stompClient) {
      const newMessage = {
        sender: userName,
        receiver: category,
        content: message,
        timestamp: Date.now(),
      };
      stompClient.send("/app/sendMessage", {}, JSON.stringify(newMessage));
      setMessage("");
    }
  };

  return (
    <div className="chat">
      <div className="chatBox">
        <div className="top">
          <div className="user">
            <img
              src="https://i.pinimg.com/564x/a0/2a/28/a02a28c20e7b91d1f5e75b8a789d1456.jpg"
              alt=""
            />
            {userName}
          </div>
          <div className="property">
            Propiedad <strong>{category}</strong>
          </div>
        </div>
        <div className="center">
          <div className="chat_default">
            <p>Estas chateando con {category}</p>
          </div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chatMessage ${msg.sender === userName ? "own" : ""}`}
            >
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="bottom">
          <textarea
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={handleMessageChange}
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

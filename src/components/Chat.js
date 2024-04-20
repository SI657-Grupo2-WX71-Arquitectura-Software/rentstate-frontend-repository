import React, { useState } from "react";
import "../styles/Chat.css";

function Chat({ userName, category }) {
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje del textarea
  const [messages, setMessages] = useState([]); // Estado para almacenar todos los mensajes del chat

  const handleMessageChange = (e) => {
    setMessage(e.target.value); // Actualiza el estado del mensaje con el contenido del textarea
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        text: message,
        own: true, // Indica que este mensaje es propio (enviado por el usuario)
      };
      setMessages([...messages, newMessage]); // Agrega el nuevo mensaje al arreglo de mensajes
      setMessage(""); // Limpia el textarea después de enviar el mensaje
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
            {userName} UserName
          </div>
          <div className="property">
            Propiedad <strong>{category}</strong>
          </div>
        </div>
        <div className="center">
          <div className="chat_default">
            <p>Estas chateando con UserName</p>
          </div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chatMessage ${msg.own ? "own" : ""}`}
            >
              <p>{msg.text}</p>
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

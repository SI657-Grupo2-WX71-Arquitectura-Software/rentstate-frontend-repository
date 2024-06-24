import React, { useState, useEffect, useRef } from "react";
import "../styles/Chat.css";
import userService from '../hooks/useUserService';
import useMessageService from '../hooks/useMessageService';

function Chat() {
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [userName, setUserName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const messagesEndRef = useRef(null);

  const { messages, loading: loadingMessages, sendMessage } = useMessageService(userName, receiver);

  useEffect(() => {
    const fetchUserName = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (userId && token) {
        try {
          const userData = await userService.getUser(userId, token);
          console.log("User data fetched:", userData);
          setUserName(userData.username);
          let contactsData = await fetchContacts(userId, token);
          console.log("Contacts data fetched:", contactsData);
          contactsData = Array.from(new Set(contactsData));
          setContacts(contactsData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoadingUser(false);
        }
      } else {
        setLoadingUser(false);
      }
    };

    fetchUserName();
  }, []);

  const fetchContacts = async (userId, token) => {
    try {
      const response = await fetch(`http://api-rentstate.antarticdonkeys.com:8080/api/v1/users/${userId}/contacts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleReceiverChange = (contact) => {
    setReceiver(contact);
  };

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  };

  if (loadingUser || loadingMessages) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="chat">
      <div className="contactList">
        <h3>Contactos</h3>
        {contacts.map((contact) => (
          <div 
            key={contact} 
            className={`contact ${receiver === contact ? "active" : ""}`}
            onClick={() => handleReceiverChange(contact)}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt="contact" />
            {contact}
          </div>
        ))}
      </div>
      <div className="chatBox">
        <div className="top">
          <div className="user">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt="user" />
            <span>{userName}</span>
          </div>
          <div className="property">
            {receiver ? `Chateando con ${receiver}` : "Selecciona un contacto"}
          </div>
        </div>
        <div className="center">
          {receiver ? (
            messages.map((msg) => (
              <div key={msg.timestamp} className={`chatMessage ${msg.sender === userName ? "own" : ""}`}>
                <p>{msg.content}</p>
              </div>
            ))
          ) : (
            <div className="chat_default">Selecciona un contacto para empezar a chatear</div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="bottom">
          <textarea 
            placeholder="Escribe tu mensaje..." 
            value={message} 
            onChange={handleMessageChange} 
            disabled={!receiver}
          />
          <button 
            onClick={handleSendMessage} 
            disabled={!message.trim() || !receiver}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
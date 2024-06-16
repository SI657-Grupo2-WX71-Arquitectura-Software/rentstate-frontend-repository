import React, { useState, useEffect, useRef } from "react";
import "../styles/Chat.css";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import userService from '../hooks/userService';

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchUserName = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token"); 
      if (userId && token) {
        try {
          const userData = await userService.getUser(userId, token);
          setUserName(userData.username);
          setLoading(false);
          
          const contactsData = await fetchContacts(userId, token);
          setContacts(contactsData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();
  }, []);

  const fetchContacts = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:8091/api/v1/users/${userId}/contacts`, {
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
    const fetchInitialMessages = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`http://localhost:8095/api/v1/message/conversation/${userName}/${receiver}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          const uniqueMessages = removeDuplicates(data, 'id');
          setMessages(uniqueMessages);
        } catch (error) {
          console.error("Error fetching initial messages:", error);
        }
      }
    };
    
    if (!loading && userName && receiver) {
      fetchInitialMessages();
  
      const socket = new SockJS("http://localhost:8095/ws/messages");
      const client = Stomp.over(socket);
  
      client.connect({}, () => {
        client.subscribe(`/topic/messages/${userName}`, (msg) => {
          const newMessage = JSON.parse(msg.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
        setStompClient(client);
      }, (error) => {
        console.log('WebSocket connection error: ', error);
      });
  
      return () => {
        if (client) {
          client.disconnect();
        }
      };
    }
  }, [loading, userName, receiver]);

  useEffect(() => {
    setMessages([]);
  }, [receiver]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleReceiverChange = (contact) => {
    setReceiver(contact);
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "" && stompClient) {
      const newMessage = {
        sender: userName,
        receiver: receiver,
        content: message,
        timestamp: Date.now(),
      };
      stompClient.send("/app/sendMessage", {}, JSON.stringify(newMessage));
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  };
  

  if (loading) {
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
            {contact}
          </div>
        ))}
      </div>
      <div className="chatBox">
        <div className="top">
          <div className="user">
            <img src="https://i.pinimg.com/564x/a0/2a/28/a02a28c20e7b91d1f5e75b8a789d1456.jpg" alt="" />
            <span>{userName}</span>
          </div>
          <div className="property">
            {receiver ? `Chateando con ${receiver}` : "Selecciona un contacto"}
          </div>
        </div>
        <div className="center">
          <div className="chat_default">
            {receiver ? `Estas chateando con ${receiver}` : "Selecciona un contacto para empezar a chatear"}
          </div>
          {messages.map((msg) => (
            <div key={msg.id} className={`chatMessage ${msg.sender === userName ? "own" : ""}`}>
              <p>{msg.content}</p>
            </div>
          ))}
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
            disabled={!stompClient || message.trim() === "" || !receiver}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

const removeDuplicates = (arr, key) => {
  return arr.reduce((acc, current) => {
    const x = acc.find(item => item[key] === current[key]);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
};

export default Chat;

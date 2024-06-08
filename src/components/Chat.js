import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchUserName = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token"); 
      if (userId && token) {
        try {
          const userData = await userService.getUser(userId, token);
          console.log("User data fetched:", userData);
          setUserName(userData.username);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();
  }, []);
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
          console.log("Initial messages:", data); 

          
          const uniqueMessages = removeDuplicates(data, 'id');
          setMessages(uniqueMessages);
        } catch (error) {
          console.error("Error fetching initial messages:", error);
        }
      }
    };
    
    if (!loading && userName && receiver) {
      fetchInitialMessages();
  
      console.log("Setting up WebSocket connection...");
      const socket = new SockJS("http://localhost:8095/ws/messages");
      const client = Stomp.over(socket);
  
      client.connect({}, () => {
        console.log('WebSocket connection established');
        client.subscribe(`/topic/messages/${userName}`, (msg) => {
          console.log("Received new message:", msg);
          const newMessage = JSON.parse(msg.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
        setStompClient(client);
        console.log("stompClient set:", client);
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
  

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleReceiverChange = (e) => {
    setReceiver(e.target.value);
  };

  const handleSendMessage = () => {
    console.log("handleSendMessage called");
    console.log("stompClient: ", stompClient);
    console.log("message: ", message);
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
      console.log("Message sent:", newMessage);
    } else {
      console.error("Cannot send message: stompClient is not connected or message is empty.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="chat">
      <div className="chatBox">
        <div className="top">
          <div className="user">
            <input type="text" placeholder="Enter receiver's username" value={receiver} onChange={handleReceiverChange} />
            <img src="https://i.pinimg.com/564x/a0/2a/28/a02a28c20e7b91d1f5e75b8a789d1456.jpg" alt="" />
            {userName}
          </div>
          <div className="property">
            Propiedad <strong>{receiver}</strong>
          </div>
        </div>
        <div className="center">
          <div className="chat_default">
            <p>Estas chateando con {receiver}</p>
          </div>
          {messages.map((msg, index) => (
            <div key={msg.id} className={`chatMessage ${msg.sender === userName ? "own" : ""}`}>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="bottom">
          <textarea placeholder="Escribe tu mensaje..." value={message} onChange={handleMessageChange} />
          <button onClick={handleSendMessage} disabled={!stompClient || message.trim() === ""}>
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

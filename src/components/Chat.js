import React, { useState, useEffect, useRef } from "react";
import "../styles/Chat.css";
import {getUser} from '../hooks/useUserService';
import useMessageService from '../hooks/useMessageService';

function Chat() {
    const [message, setMessage] = useState("");
    const [receiver, setReceiver] = useState(null);
    const [userName, setUserName] = useState("");
    const [contacts, setContacts] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingContacts, setLoadingContacts] = useState(false);
    const messagesEndRef = useRef(null);

    const { messages, loading: loadingMessages, sendMessage } = useMessageService(userName, receiver);

    useEffect(() => {
        const fetchUserNameAndContacts = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token"); 
        if (userId && token) {
            try {
            const userData = await getUser(userId, token);
            console.log("User data fetched:", userData);
            setUserName(userData.username);

            const contactsUsernames = await fetchContacts(userId, token); 
            await fetchContactDetails(contactsUsernames, token); 
            } catch (error) {
            console.error("Error fetching user data:", error);
            } finally {
            setLoadingUser(false);
            }
        } else {
            setLoadingUser(false);
        }
        };

        fetchUserNameAndContacts();
    }, []);

    const fetchContacts = async (userId, token) => {
        try {
        const response = await fetch(`http://rentstate.antarticdonkeys.com:8080/api/v1/users/${userId}/contacts`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log('Fetched contacts:', data);
        return data;  
        } catch (error) {
        console.error("Error fetching contacts:", error);
        return [];
        }
    };

    const fetchContactDetails = async (usernames, token) => {
        setLoadingContacts(true);
        try {
        const contactDetails = await Promise.all(usernames.map(async (username) => {
            const response = await fetch(`http://rentstate.antarticdonkeys.com:8080/api/v1/users/username/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            });
            return await response.json();
        }));
        setContacts(contactDetails);
        console.log("Contact details fetched:", contactDetails); 
        } catch (error) {
        console.error("Error fetching contact details:", error);
        } finally {
        setLoadingContacts(false);
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

    if (loadingUser || loadingMessages || loadingContacts) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="chat">
            <div className="contactList">
                <h3>Contactos</h3>
                {contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <div 
                            key={contact.username}
                            className={`contact ${receiver?.username === contact.username ? "active" : ""}`}
                            onClick={() => handleReceiverChange(contact)}
                        >
                        <img 
                            src={contact.photoUrl ? contact.photoUrl : "https://via.placeholder.com/40"} 
                            alt={contact.username} 
                            className="contactImg" 
                        />
                        <span>{contact.username}</span>
                    </div>
                    ))
                    ) : (
                    <div>No tienes contactos disponibles</div>
                )}
            </div>
            <div className="chatBox">
                <div className="top">
                    {receiver ? (
                        <div className="receiver-info">
                            <img 
                                src={receiver.photoUrl ? receiver.photoUrl : "https://via.placeholder.com/40"} 
                                alt={receiver.username} 
                                className="receiverImg" 
                            />
                            <span>{receiver.username}</span>
                        </div>
                    ) : (
                        <div className="select-contact">Selecciona un contacto</div>
                    )}
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
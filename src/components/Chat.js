import React, { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { getUser, getContacts, getContactDetails } from '../hooks/useUserService';
import useMessageService from '../hooks/useMessageService';
import { chatStyles } from '../styles/useStyles';
import { SearchBar } from '../components/RentState Components/components'
import { sendMessageIcon } from "../assets";

function Chat() {
    const classes = chatStyles();
    const [message, setMessage] = useState("");
    const [receiver, setReceiver] = useState(null);
    const [userName, setUserName] = useState("");
    const [ownerPhoto, setOwnerPhoto] = useState("");
    const [contacts, setContacts] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingContacts, setLoadingContacts] = useState(false);
    const messagesEndRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { messages, loading: loadingMessages, sendMessage } = useMessageService(userName, receiver);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const fetchUserNameAndContacts = async () => {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token"); 
            if (userId && token) {
                try {
                    const userData = await getUser(userId, token);
                    console.log("User data fetched:", userData);
                    setUserName(userData.username);
                    setOwnerPhoto(userData.photoUrl);

                    const contactsUsernames = await getContacts(userId, token); 
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

    const fetchContactDetails = async (usernames, token) => {
        setLoadingContacts(true);
        try {
            const contactDetails = await getContactDetails(usernames, token);
            setContacts(contactDetails);
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

    const filteredContacts = contacts.filter(contact =>
        contact.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loadingUser || loadingMessages || loadingContacts) {
        return <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <CircularProgress />
        </div>;
    }

    return (
        <div className={classes.chat}>
           <div className={classes.contactListContainer}>               
                <div className={classes.searchBarContainer}> 
                    <SearchBar
                        placeholder="Buscar Contacto"  
                        height="3rem" 
                        width="100%" 
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                {contacts.length > 0 ? (
                    <div style={{backgroundColor: '#FFFFFF', borderRadius:'1rem'}}>
                        {filteredContacts.map((contact) => (
                            <div 
                                key={contact.username}
                                className={`${classes.contact} ${receiver?.username === contact.username ? classes.active : ""}`}
                                onClick={() => handleReceiverChange(contact)}
                            >
                                <img 
                                    src={contact.photoUrl ? contact.photoUrl : "https://via.placeholder.com/40"} 
                                    alt={contact.username} 
                                    className={classes.contactImg} 
                                />
                                <div style={{display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'left', textAlign:'left'}}>
                                    <span className={classes.contactFullname}> {contact.name} {contact.lastName}</span>
                                    <span className={classes.contactUser}>{contact.username}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No tienes contactos disponibles</div>
                )}
            </div>

            <div className={classes.chatBox}>
                <div className={classes.top}>
                    {receiver ? (
                        <div className={classes.receiverInfo}>
                            <img 
                                src={receiver.photoUrl ? receiver.photoUrl : "https://via.placeholder.com/40"} 
                                alt={receiver.username} 
                                className={classes.receiverInfoImg} 
                            />
                            <div style={{textAlign:'left'}}>
                                <div className={classes.contactFullnameChat}>{receiver.name} {receiver.lastName}</div>
                                <div className={classes.contactUsernameChat}>{receiver.username}</div>
                            </div>                          
                        </div>
                    ) : (
                        <div className={classes.topText}>Bienvenido a Chats de <strong>RentState</strong></div>
                    )}
                </div>
                <div className={classes.center}>
                    {receiver ? (
                        messages.length > 0 ? (
                            messages.map((msg) => {
                                const isOwn = msg.sender === userName;
                                return (
                                    <div 
                                        key={msg.timestamp} 
                                        className={isOwn ? classes.messageContainerOwn : classes.messageContainerNotOwn}
                                    >
                                        <img 
                                            src={isOwn ? ownerPhoto : receiver.photoUrl} 
                                            alt={isOwn ? userName : receiver.username} 
                                            className={classes.profileImageChat} 
                                        />
                                        <div 
                                            className={`${classes.chatMessage} ${isOwn ? 'own' : 'notOwn'}`}
                                        >
                                            <div style={{ margin: '12px 0' }}>{msg.content}</div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={classes.chatDefaultText}>
                                <img 
                                    src="assets/LogoHeadLetters.png" 
                                    alt="RentState"
                                    style={{ width: '15rem' }}                         
                                />
                                No hay mensajes, ¡Inicia el chat!
                            </div>
                        )
                    ) : (
                        <div className={classes.chatDefaultText}>
                            <img 
                                src="assets/LogoHeadLetters.png" 
                                alt="RentState"
                                style={{ width: '15rem' }}                         
                            />
                            Selecciona un contacto para empezar a chatear
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className={classes.bottom}>
                    {receiver && (
                        <div className={classes.messageInputContainer}>
                            <input 
                                type="text"
                                placeholder="Enviar Mensaje..." 
                                value={message} 
                                onChange={handleMessageChange} 
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && message.trim() && receiver) {
                                        handleSendMessage();
                                    }
                                }}
                                disabled={!receiver}
                                className={classes.messageInput}
                            />
                            <button 
                                onClick={handleSendMessage} 
                                disabled={!message.trim() || !receiver}
                                className={classes.sendButton}
                            >
                                <img src={sendMessageIcon} alt="Enviar" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chat;
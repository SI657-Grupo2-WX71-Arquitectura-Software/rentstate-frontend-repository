import React, { useState, useEffect } from "react";
import { renAssistantStyles } from "../styles/useStyles";
import { renAssistantIcon } from '../../src/assets';
import RenAssistantChat from "./RenAssistantChat";

const RenAssistant = () => {
    const classes = renAssistantStyles();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    return (
        <>
            <div className={`${classes.renAssistant} ${isChatOpen ? classes.hidden : ''}`} onClick={toggleChat}>
                <img src={renAssistantIcon} alt="Rent Icon" className={classes.icon} />
            </div>
            {isChatOpen && (
                <RenAssistantChat 
                    messages={messages} 
                    setMessages={setMessages} 
                    onClose={toggleChat}
                />
            )}
        </>
    );
};

export default RenAssistant;
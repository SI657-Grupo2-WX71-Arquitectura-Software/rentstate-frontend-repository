import React, { useState, useEffect, useRef } from "react";
import { renAssistantStyles } from "../styles/useStyles";
import { renAssistantIcon } from '../assets';
import { CircularProgress } from "@mui/material";
import MinimizeIcon from '@mui/icons-material/Minimize';

const RenAssistantChat = ({ messages, setMessages, onClose }) => {
    const classes = renAssistantStyles();
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatBodyRef = useRef(null);

    const assistant_id = "asst_xREhNxsvgz6tpCuB8UZE7bwX";
    const thread_id = "thread_N0oAl37gazglcRrmPcSfmiT3";
    const apikey = process.env.REACT_APP_KEY_IA;
    const token = process.env.REACT_APP_TOKEN;

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        setMessages(prev => [...prev, { text: inputText, sender: "user" }]);
        setInputText("");
        setIsLoading(true);

        try {
            const response = await fetch("https://documentgptapi.laraigo.com/assistants/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: `${inputText}\n\nLimítate a responder solo a temas relacionados con bienes inmuebles en Perú y el uso de RentState. No respondas a preguntas fuera de estos temas y no proporciones respuestas irrelevantes o innecesarias.`,
                    assistant_id,
                    thread_id,
                    sources: true,
                    apikey
                })
            });

            const responseData = await response.json();
            const assistantMessage = responseData.data.response;

            setMessages(prev => [...prev, { text: assistantMessage, sender: "assistant" }]);
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            setMessages(prev => [...prev, { text: "Hubo un error al obtener la respuesta. Intenta de nuevo.", sender: "error" }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={classes.chatContainer}>
            <div className={classes.header}>
                <img src={renAssistantIcon} alt="Ren Assistant" className={classes.headerIcon} />
                <div className={classes.headerText}>
                    <span className={classes.assistantName}>Ren</span>
                    <span className={classes.assistantSubtitle}>Asistente de RentState</span>
                </div>
                <MinimizeIcon className={classes.minimizeIcon} onClick={onClose} />
            </div>
            <div className={classes.chatBody} ref={chatBodyRef}>
                {messages.length === 0 ? (
                    <div className={classes.chatDefaultText}>
                        <img 
                            src="assets/LogoHeadLetters.png" 
                            alt="RentState"
                            style={{ width: '15rem' }}                         
                        />
                        Obtén recomendaciones personalizadas de inmuebles y resuelve tus inquietudes con nuestro Asistente Virtual.
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={msg.sender === "user" ? classes.userMessage : classes.assistantMessage}>
                            {msg.text.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className={classes.loadingContainer}>
                        <CircularProgress size={20} />
                        <span>Generando respuesta...</span>
                    </div>
                )}
            </div>
            <div className={classes.inputContainer}>
                <input
                    type="text"
                    className={classes.input}
                    placeholder="Enviar Mensaje..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <div className={classes.sendButton} onClick={handleSendMessage}>
                    ➤
                </div>
            </div>
        </div>
    );
};

export default RenAssistantChat;
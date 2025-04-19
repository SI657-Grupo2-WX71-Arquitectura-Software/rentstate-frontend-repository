import React, { useState, useEffect, useRef } from "react"
import { renAssistantStyles } from "../styles/useStyles"
import { renAssistantIcon } from '../assets'
import { CircularProgress } from "@mui/material"
import MinimizeIcon from '@mui/icons-material/Minimize'
import ReactMarkdown from 'react-markdown'
import { getUser } from "../hooks/useUserService"
import { getAllProperties } from "../hooks/usePropertyService"

const RenAssistantChat = ({ messages, setMessages, onClose }) => {
    const classes = renAssistantStyles()
    const [inputText, setInputText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const chatBodyRef = useRef(null)
    const [userData, setUserData] = useState(null)
    const [properties, setProperties] = useState([])

    const assistant_id = "asst_xREhNxsvgz6tpCuB8UZE7bwX"
    const thread_id = "thread_YpeMdSCl213F40eXJnFvm4eM"
    const apikey = process.env.REACT_APP_KEY_IA;
    const token = process.env.REACT_APP_TOKEN;  
    
    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userId')
            try {
                const data = await getUser(userId)
                setUserData(data)
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error)
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const allProperties = await getAllProperties()
                const filteredProperties = allProperties.map(property => ({
                    id: property.id,
                    category: property.category,
                    district: property.district,
                    location: property.location,
                    latitude: property.latitude,
                    longitude: property.longitude,
                    price: property.price,
                    userId: property.userId,
                    propertyFeatures: property.propertyFeatures,
                    link: `https://rentstate.dmtsg.com/property/${property.id}`,
                }))
                setProperties(filteredProperties)
                console.log("Filtered Properties:", filteredProperties)
            } catch (error) {
                console.error("Error al obtener las propiedades:", error)
            }
        }
        fetchProperties()
    }, [])    

    const handleSendMessage = async () => {
        if (!inputText.trim()) return
    
        setMessages(prev => [...prev, { text: inputText, sender: "user" }])
        setInputText("")
        setIsLoading(true)
    
        try {
            const filteredUserData = userData
                ? (({ name, longitude, latitude, district, userNeeds, address }) => 
                    ({ name, longitude, latitude, district, userNeeds, address }))(userData)
                : null
    
            if (!filteredUserData) {
                throw new Error("No se pudo obtener la información del usuario")
            }
    
            const textWithContext = `Consulta del usuario:\n\n${inputText}\n\nContexto del usuario:\n\n${JSON.stringify(filteredUserData, null, 2)}\n\nPropiedades disponibles:\n\n${JSON.stringify(properties, null, 2)}`
    
            const response = await fetch("https://documentgptapi.laraigo.com/assistants/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: textWithContext,
                    assistant_id,
                    thread_id,
                    sources: true,
                    apikey
                })
            })
    
            const responseData = await response.json()
            let assistantMessage = responseData.data.response
            setMessages(prev => [...prev, { text: assistantMessage, sender: "assistant" }])
        } catch (error) {
            console.error("Error al enviar el mensaje:", error)
            setMessages(prev => [...prev, { text: "Hubo un error al obtener la respuesta. Intenta de nuevo.", sender: "error" }])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
        }
    }, [messages])

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
                        <div 
                            key={index} 
                            className={msg.sender === "user" ? classes.userMessage : classes.assistantMessage}
                        >
                         {msg.sender === "assistant" ? (
                            <div>
                                <ReactMarkdown>
                                    {msg.text
                                        .replace(/\[imagen:.*?\]/g, '')
                                        .replace(/【[^】]*】/g, '') 
                                        .replace(/^\s*[-*]\s*$/gm, '') 
                                        .trim()
                                    }
                                </ReactMarkdown>
                            </div>
                        ) : (
                            msg.text
                        )}
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
    )
}

export default RenAssistantChat
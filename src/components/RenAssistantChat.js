import React, { useState, useEffect, useRef } from "react"
import { renAssistantStyles } from "../styles/useStyles"
import { renAssistantIcon } from '../assets'
import { CircularProgress } from "@mui/material"
import MinimizeIcon from '@mui/icons-material/Minimize'
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
                formatUserNeeds(data)
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
                    link: `https://rentstate.antarticdonkeys.com/property/${property.id}`
                }))
                setProperties(filteredProperties)
                console.log("Filtered Properties:", filteredProperties)
            } catch (error) {
                console.error("Error al obtener las propiedades:", error)
            }
        }
        fetchProperties()
    }, [])

    const formatUserNeeds = (data) => {
        if (!data || !data.userNeeds) return

        const { name } = data
        const { general, amenidades, costos, sobreElEdificio } = data.userNeeds
        const generalInfo = `El nombre de este usuario es ${name}, y está buscando un ${general.tipo}, con un área total aproximada de ${general.areaTotal}m², 
                                precio aproximado de ${costos.alquiler} soles, mantenimiento aproximado de ${costos.mantenimiento} soles, 
                                ${general.dormitorios} dormitorios, un aproximado de ${general.antiguedad} ${general.antiguedadUnidad} de antigüedad, 
                                ${general.banos} baños, ${general.pisos} pisos, ${general.estacionamiento} estacionamientos, un ruido ${general.ruido}, 
                                ${general.iluminacion} iluminación, y vista ${general.vista}.`
        const amenities = []
        Object.entries({ ...general, ...amenidades, ...costos, ...sobreElEdificio }).forEach(([key, value]) => {
            if (typeof value === "boolean" && value) {
                amenities.push(formatLabel(key))
            }
        })

        const amenitiesText = amenities.length > 0
            ? ` El usuario desea que cuente con ${amenities.join(", ")}.`
            : ""

        const finalText = generalInfo + amenitiesText
        console.log(finalText)
    }

    const formatLabel = (label) => {
        return label
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .trim()
    }

    const handleSendMessage = async () => {
        if (!inputText.trim()) return

        setMessages(prev => [...prev, { text: inputText, sender: "user" }])
        setInputText("")
        setIsLoading(true)

        try {
            const context = {
                user: userData ? (({ name, longitude, latitude, district, userNeeds, address }) => 
                    ({ name, longitude, latitude, district, userNeeds, address }))(userData) : null,
                properties: properties
            }

            const response = await fetch("https://documentgptapi.laraigo.com/assistants/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: `${inputText}`,
                    assistant_id,
                    thread_id,
                    sources: true,
                    apikey,
                    context
                })
            })

            const responseData = await response.json()
            let assistantMessage = responseData.data.response
            assistantMessage = assistantMessage.replace(/【[^】]*】/g, "").trim()
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
    )
}

export default RenAssistantChat
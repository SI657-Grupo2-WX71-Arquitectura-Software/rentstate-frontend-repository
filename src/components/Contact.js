import React, { useEffect, useState } from "react";
import "../styles/Contact.css";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import OutboundIcon from '@mui/icons-material/Outbound';

const Contact = () => { 
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);
    const [isReadyToSend, setIsReadyToSend] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        setEmail(inputEmail);
        const isValid = validateEmail(inputEmail);
        setValidEmail(isValid);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateInputs = () => {
        if (email && validEmail && nombre && apellido) {
            setIsReadyToSend(true);
        } else {
            setIsReadyToSend(false);
        }
    };

    useEffect(() => {
        validateInputs();// eslint-disable-next-line 
    }, [email, validEmail, nombre, apellido]);

    return (       
        <div id="contact">            
            <div className="contact-container">

                <div className="contact-cards" >
                    <div 
                        className={"card-styles"}
                        onClick={() => {
                            window.open("https://wa.me/51986689120?text=Hola%20Lambders!", "_blank");
                        }}
                    >
                        <div className="contact-card" style={{textDecoration: 'none', color:'#575757'}} >
                            <div className="card-text">WhatsApp</div>
                            <div className="card-text">+51 986 689 120</div>
                            <img  style={{height: '1.2em', marginTop: '1rem'}} src="/assets/whatsapp.png" alt="WhatsApp" />
                        </div>
                    </div>
                    <p></p>
                    <div 
                        className={"card-styles"}
                        onClick={() => {
                            window.open("mailto:nirvagarciav@gmail.com", "_blank");
                        }}
                    >
                        <div className="contact-card" style={{textDecoration: 'none', color:'#575757'}} >
                            <div className="card-text">Correo</div>
                            <div className="card-text">rentstate@lambders.com</div>
                            <img  style={{height: '1.2em', marginTop: '1rem'}} src="/assets/email.png" alt="WhatsApp" />
                        </div>
                    </div>
                    <p></p>
                    <div 
                        className={"card-styles"}
                        onClick={() => {
                            window.open("https://github.com/SI657-Grupo2-WX71-Arquitectura-Software", "_blank");
                        }}
                    >
                        <div className="contact-card" style={{textDecoration: 'none', color:'#575757'}} >
                            <div className="card-text">Github</div>
                            <div className="card-text">Lambders from UPC</div>
                            <img  style={{height: '1.2em', marginTop: '1rem'}} src="/assets/github.png" alt="WhatsApp" />
                        </div>
                    </div>

                </div>

                <div className="contact-text-inputs">
                    <div className="contact-title">Únete a la Comunidad RentState</div>
                        
                        <div className="contact-right" style={{width:"40vw", textAlign: 'left'}}>

                            <div className="contact-desc"> 
                                Contactanos y entérate de nuestras novedades
                            </div>
                        
                            <div className="contact-email" > 
                                <input
                                    type="text"
                                    placeholder="Ingrese su e-mail"
                                    style={{
                                        backgroundColor: "#efefef",
                                    
                                        color: "black",
                                        border: "1px solid " + (validEmail ? "#efefef" : "red"),
                                        borderRadius: "2rem",
                                        padding: "1.2rem 1rem",
                                        width: "95%"
                                    }}
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                                {!validEmail && <div style={{ color: '#286b8c', margin: "0.5rem 0 0 0.5rem", fontSize:'1rem' }}>E-mail no válido</div>}

                                <div style={{display:'flex', gap:'1rem', width:'100%'}}>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    style={{
                                        backgroundColor: "#efefef",
                                        margin: '1rem 0 0 0',
                                        color: "black",
                                        border: "1px solid #efefef",
                                        borderRadius: "2rem",
                                        padding: "1.2rem 1rem",
                                        width: "100%"
                                    }}
                                />

                                <input
                                    type="text"
                                    placeholder="Apellido"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    style={{
                                        backgroundColor: "#efefef",
                                        margin: '1rem 0 0 0',
                                        color: "black",
                                        border: "1px solid #efefef",
                                        borderRadius: "2rem",
                                        padding: "1.2rem 1rem",
                                        width: "100%"
                                    }}
                                />
                                </div>


                               

                                {showNotification && (
                                <Dialog open={showNotification} onClose={() => setShowNotification(false)} autoHideDuration={6000}>
                                        <DialogTitle></DialogTitle>
                                        <DialogContent>
                                        Su correo se ha enviado satisfactoriamente
                                        </DialogContent>
                                        <DialogActions>
                                            <div onClick={() => setShowNotification(false)} style={{ color: '#225E7C', textTransform: 'none', fontSize: '0.9rem', paddingTop: 0, cursor: 'pointer', marginRight:'0.5rem', marginBottom: '0.3rem' }}>
                                                Cerrar
                                            </div>
                                        </DialogActions>
                                    </Dialog>
                            
                                )}



                            </div>
                            {isReadyToSend && (
                                    <div 
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.1rem',
                                            margin: '1.5rem 0.5rem',
                                            fontSize: '1.2rem',                                 
                                            fontWeight: '500',
                                            border: 'none',
                                            background: 'none',
                                            cursor: 'pointer',
                                            color: '#286b8c'
                                        }}
                                        onClick={() => {
                                            setShowNotification(true);
                                            setEmail('');
                                            setNombre('');
                                            setApellido('');
                                        }}
                                    >                              
                                        <OutboundIcon 
                                        
                                            style={{
                                                height:'1.5rem',                                
                                                marginTop:'0.2rem',
                                                marginRight: '0.3rem'
                                            }}
                                        />
                                        Enviar
                                    </div>
                                )}

                        </div>
                </div>
                
             
            </div>
        </div>      
    );
};

export default Contact;
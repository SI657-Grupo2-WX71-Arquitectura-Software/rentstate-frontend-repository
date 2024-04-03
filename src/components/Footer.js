import React, { useState } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import "../styles/Footer.css";
import { DialogTitle } from "@mui/material";

const Footer = () => {
    
    const [openDialog, setOpenDialog] = useState(null);

    const handleCloseDialog = () => {
        setOpenDialog(null);
    };

    const handleOpenDialog = (dialog) => {
        setOpenDialog(dialog);
    };

    const redirectToInstagram = () => {
        window.open("https://www.instagram.com/upcedu/", "_blank");
    };

    const redirectToFacebook = () => {
        window.open("https://www.facebook.com/upcedu", "_blank");
    };

    const redirectToGitHub = () => {
        window.open("https://github.com/SI657-Grupo2-WX71-Arquitectura-Software", "_blank");
    };

    return (
        <div id="footer">
            <div className="footer-container">

                 <div className="footer_high">
                    <div className="footer-tittle">
                        <img 
                            src="assets/LogoHeadLetters.png" 
                            alt="RentState"                            
                        />
                    </div>
                    <div className="footer-links">

                        <div className="footer-column">
                            <h3>Soporte</h3>
                            <ul>
                                <li><a href="#Soporte" onClick={() => handleOpenDialog("Soporte")}>Centro de Ayuda</a></li>
                                <li><a href="#Soporte" onClick={() => handleOpenDialog("Soporte")}>Soporte Técnico</a></li>
                                <li><a href="#Soporte" onClick={() => handleOpenDialog("Soporte")}>Reclamaciones</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                        <h3>Q&As</h3>
                        <ul>
                            <li><a href="https://www.d-addicts.com/forums/index.php" target="_blank" rel="noopener noreferrer">Inquilinos Society</a></li>
                            <li><a href="https://www.d-addicts.com/forums/index.php" target="_blank" rel="noopener noreferrer">Propietarios</a></li>
                            <li><a href="https://www.d-addicts.com/forums/index.php" target="_blank" rel="noopener noreferrer">Comunidad Lambders</a></li>

                        </ul>
                    </div>

                        <div className="footer-column">
                            <h3>Descarga</h3>
                            <ul>
                                <li><a href="https://renstate-aedf7.web.app/home" target="_blank" rel="noopener noreferrer">RentState Web</a></li>
                                <li><a href="https://apps.apple.com/be/app/RentState/id6458584519" target="_blank" rel="noopener noreferrer">RentState iOS</a></li>
                                <li><a href="https://play.google.com/store/apps/details?id=com.alaeat.customer.android.RentState&hl=en&gl=US" target="_blank" rel="noopener noreferrer">RentState Android</a></li>
                            </ul>
                        </div>

                    </div>
                    <div className="footer-social-icons">
                        <button className="icon-button" onClick={redirectToInstagram}>
                            <InstagramIcon className="icon" />
                        </button>
                        <button className="icon-button" onClick={redirectToFacebook}>
                            <FacebookIcon className="icon" />
                        </button>
                        <button className="icon-button" onClick={redirectToGitHub}>
                            <GitHubIcon className="icon" />
                        </button>
                    </div>
                </div>

                <hr className="divider" />
                <div className="footer_low">
                    <div className="footer-tittle">
                        © 2024 • Coded by Lambders
                    </div>
                    <div className="footer-terms">
                        <button className="icon-button" onClick={() => handleOpenDialog("Términos")}>
                            Términos
                        </button>
                        <button className="icon-button" onClick={() => handleOpenDialog("Privacidad")} style={{marginLeft: 8}}>
                            Privacidad
                        </button>
                        <button className="icon-button" onClick={() => handleOpenDialog("Seguridad")} style={{marginLeft: 7}}>
                            Seguridad
                        </button>
                    </div>
                </div>
            </div>

            <Dialog open={!!openDialog} onClose={handleCloseDialog} >
                <div style={{padding: "1rem 0.5rem 0.4rem 0.5rem"}}>    
                    <DialogTitle>{openDialog}</DialogTitle>              
                    <DialogContent >
                        {openDialog === "Términos" && (
                            <div>
                                <p>
                                    Bienvenido a RentState, tu destino para el mejor merchandising de Kpop, anime y manga en Perú.
                                    Al utilizar nuestro sitio web, aceptas cumplir con los siguientes términos y condiciones:
                                </p>
                                <ul>
                                    <li>Los productos ofrecidos en nuestro sitio web están destinados únicamente para uso personal.</li>
                                    <li>No nos hacemos responsables de los daños causados por un uso indebido de los productos.</li>
                                    <li>El uso de nuestra plataforma implica la aceptación de nuestra política de privacidad y seguridad.</li>
                                    <li>Reservamos el derecho de cambiar los términos y condiciones en cualquier momento sin previo aviso.</li>
                                </ul>
                                <p>
                                    Gracias por elegir RentState para satisfacer tus necesidades de merchandising asiático. ¡Disfruta de tu experiencia de compra!
                                </p>
                            </div>
                        )}
                        {openDialog === "Privacidad" && (
                            <div>
                                <p>
                                    En Lambders, nos comprometemos a proteger tu privacidad y seguridad mientras navegas por nuestro sitio web.
                                    Aquí te explicamos cómo recopilamos, almacenamos y utilizamos tu información personal:
                                </p>
                                <ul>
                                    <li>Recopilamos información personal como tu nombre, dirección y correo electrónico para procesar tus pedidos.</li>
                                    <li>No compartimos tu información personal con terceros sin tu consentimiento previo.</li>
                                    <li>Utilizamos cookies para mejorar tu experiencia de navegación en nuestro sitio web.</li>
                                    <li>Tu información personal está protegida mediante medidas de seguridad físicas, electrónicas y administrativas.</li>
                                </ul>
                                <p>
                                    Esperamos que esta política de privacidad te brinde la tranquilidad de que tus datos están en buenas manos mientras compras en RentState.
                                </p>
                            </div>
                        )}
                        {openDialog === "Seguridad" && (
                            <div>
                                <p>
                                    La seguridad de nuestros clientes es una prioridad en RentState. Aquí te explicamos las medidas que tomamos para proteger tu información:
                                </p>
                                <ul>
                                    <li>Utilizamos cifrado SSL para proteger tus datos mientras navegas y realizas transacciones en nuestro sitio web.</li>
                                    <li>Contamos con sistemas de detección y prevención de fraudes para garantizar la seguridad de las transacciones.</li>
                                    <li>Nuestros servidores están protegidos por firewalls y otras medidas de seguridad para prevenir accesos no autorizados.</li>
                                    <li>Realizamos auditorías de seguridad regulares para mantenernos actualizados sobre las últimas amenazas cibernéticas.</li>
                                </ul>
                                <p>
                                    Nos tomamos muy en serio la seguridad de nuestros clientes. Puedes confiar en nosotros para proteger tus datos mientras disfrutas de tus compras.
                                </p>
                            </div>
                        )}
                        {openDialog === "Soporte" && (
                            <div>
                                <p>
                                    Estamos aquí para ayudarte en todo lo que necesites. Si deseas contactar con nuestro centro de ayuda, por favor, no dudes en llamarnos al +51 948 415 456 o escribirnos un correo electrónico a soporte@lambders.com. Estaremos encantados de atenderte.
                                </p>
                                <p>
                                    Para asistencia técnica relacionada con nuestra aplicación, puedes comunicarte con nuestro equipo especializado marcando el siguiente número: (01) 641 48 58.
                                </p>
                                <p>
                                    Además, si necesitas acceder al libro de reclamaciones, te invitamos a hacer clic en el siguiente enlace: <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" rel="noopener noreferrer">Libro de Reclamaciones</a>.
                                </p>
                            </div>
                        )}


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} style={{ color: '#225E7C', textTransform: 'none', fontSize: '0.9rem', paddingTop: 0 }}>
                            Cerrar
                        </Button>
                    </DialogActions>
                </div>               
            </Dialog>
        </div>
    );
};

export default Footer;
import React from "react";
import "../styles/Navbar.css";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';  // Importar ícono de cerrar sesión
import { useLocation, Link, useNavigate } from "react-router-dom";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem('token');

    const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleHomeClick = () => {
        isAuthenticated ? navigate('/home') : navigate('/login');
    };

    return (
        <div className="navbar">
            <div className="navbar-container">
                <div style={{ display: "flex", gap: "0.5rem" }}>
                        {/* Ícono de casa que verifica autenticación antes de redirigir */}
                        <IconButton aria-label="home" style={{ padding: '0rem' }} onClick={handleHomeClick}>
                            <img style={{ height: '2rem', margin: '0' }} src="/assets/LogoWhiteHouse.png" alt="Home" />
                        </IconButton>
                </div>

                {!isAuthRoute && isAuthenticated && (
                    <div className="nav-options">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Link to="/publicar">
                                <IconButton aria-label="publicar" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer", marginRight: '0.3rem' }}>
                                    <AddBoxIcon />
                                </IconButton>
                            </Link>

                            <Link to="/mensajes">
                                <IconButton aria-label="mensajes" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer" }}>
                                    <MarkUnreadChatAltIcon />
                                </IconButton>
                            </Link>                     

                            <Link to="/perfil">
                                <IconButton aria-label="perfil" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer" }}>
                                    <AccountCircleIcon 
                                        style={{ color: '#e0e0e0', fontSize: '1.8rem', cursor: 'pointer' }}                     
                                    />
                                </IconButton>                           
                            </Link>
                            
                            <IconButton aria-label="logout" onClick={handleLogout} style={{ color: '#e0e0e0', fontSize: '1rem', marginLeft: '1rem' }}>
                                <LogoutIcon />
                            </IconButton>
                        </div>
                    </div>
                )}
            </div>    
        </div>
    );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useLocation, Link } from "react-router-dom";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

const Navbar = () => {
    const [anchorElSeButtons, setAnchorElSeButtons] = useState(null);
    const location = useLocation();
    const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (anchorElSeButtons && !anchorElSeButtons.contains(event.target)) {
                //
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, [anchorElSeButtons]);

    return (
        <div className="navbar">
            <div className="navbar-container">
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <a href="/" className="home-icon">                
                        <IconButton aria-label="home" style={{ padding: '0rem' }}>
                            <img style={{ height: '2rem', margin: '0' }} src="/assets/LogoWhiteHouse.png" alt="WhatsApp" />
                        </IconButton>
                    </a>
                </div>

                {!isAuthRoute && (
                    <div className="nav-options">
                        <div style={{ display: "flex", alignItems: "center" }}>                          
                        
                            <Link to="/publicar">
                                <IconButton aria-label="messages" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer", marginRight: '0.3rem' }}>
                                    <AddBoxIcon />
                                </IconButton>
                            </Link>

                            <Link to="/mensajes">
                                <IconButton aria-label="messages" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer" }}>
                                    <MarkUnreadChatAltIcon />
                                </IconButton>
                            </Link>                     

                            <Link to="/perfil" >
                                <IconButton aria-label="messages" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer" }}>
                                    <AccountCircleIcon 
                                        style={{ color: '#e0e0e0', fontSize: '1.8rem', cursor: 'pointer' }}                     
                                    />
                                </IconButton>                           
                            </Link>
                        </div>
                    </div>
                )}
            </div>    
        </div>
    );
};

export default Navbar;

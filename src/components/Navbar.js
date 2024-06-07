import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { IconButton, ListItemIcon, MenuItem, Paper, Popper, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LogoutIcon from "@mui/icons-material/Logout";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import EmailIcon from "@mui/icons-material/Email"; 
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from "react-router-dom";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

const Navbar = () => {
    const [anchorElSeButtons, setAnchorElSeButtons] = useState(null);
    const [openSeButtons, setOpenSeButtons] = useState(false);

    const handleClickSeButtons = (event) => {
        setAnchorElSeButtons(event.currentTarget);
        setOpenSeButtons((prevOpen) => !prevOpen);
       
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (anchorElSeButtons && !anchorElSeButtons.contains(event.target)) {
                // setOpenSeButtons(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {document.removeEventListener("mousedown", handleClickOutside);};
    }, [anchorElSeButtons]);

    return (
        <div className="navbar">
            <div className="navbar-container">
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <a href="/" className="home-icon">                
                        <IconButton aria-label="home" style={{padding:'0rem'}}>
                            <img style={{height: '2rem', margin:'0'}} src="/assets/LogoWhiteHouse.png" alt="WhatsApp" />
                        </IconButton>
                    </a>
                </div>

                <div className="nav-options">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Link to="/posts">
                            <IconButton aria-label="messages" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer", marginRight:'0.3rem' }}>
                                <FormatListBulletedIcon /> 
                            </IconButton>
                        </Link>
                       
                        <Link to="/publicar">
                            <IconButton aria-label="messages" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer", marginRight:'0.3rem' }}>
                                <AddBoxIcon />
                            </IconButton>
                        </Link>

                        <Link to="/mensajes">
                            <IconButton aria-label="messages" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer"}}>
                                <MarkUnreadChatAltIcon />
                            </IconButton>
                        </Link>                     

                        <Link to="/perfil" >
                            <IconButton aria-label="messages" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer" }}>
                            <AccountCircleIcon 
                               
                                style={{  color: '#e0e0e0', fontSize: '1.8rem', cursor:'pointer' }}                     
                            />
                            </IconButton>                           
                        </Link>
                    </div>
                </div>
            </div>    
        </div>
    );
};

export default Navbar;

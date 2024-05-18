import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { IconButton, ListItemIcon, MenuItem, Paper, Popper, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import EmailIcon from "@mui/icons-material/Email"; 
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from "react-router-dom";

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
                        <Link to="/nueva-propiedad">
                            <IconButton aria-label="messages" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer" }}>
                                <AddBoxIcon />
                            </IconButton>
                        </Link>

                        <Link to="/mensajes">
                            <IconButton aria-label="messages" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer" }}>
                                <EmailIcon />
                            </IconButton>
                        </Link>

                        <AccountCircleIcon 
                            onClick={handleClickSeButtons}
                            style={{  color: '#e0e0e0', fontSize: '2rem', cursor:'pointer' }}                     
                        />
                    </div>
                </div>
            </div>

            <Popper
                open={openSeButtons}
                anchorEl={anchorElSeButtons}
                placement="bottom-end"
                style={{ zIndex: 1100 }}
            >
                {() => (
                    <Paper elevation={4}>
                         <Link to="/perfil" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <MenuItem style={{padding:'0.7rem 1rem', fontSize:'0.96rem'}}>
                                    <ListItemIcon>
                                        <DirectionsWalkIcon fontSize="small" style={{ fill: 'grey', height:'23px' }}/>
                                    </ListItemIcon>
                                    <Typography variant="inherit">Mi Cuenta</Typography>
                                </MenuItem>
                            </Link>

                        <MenuItem style={{ padding: "0.7rem 1rem", fontSize: "0.96rem" }}>
                            <ListItemIcon>
                                <LogoutIcon
                                    fontSize="small"
                                    style={{ fill: "grey", height: "25px" }}
                                />
                            </ListItemIcon>
                            <Typography variant="inherit">Cerrar Sesión</Typography>
                        </MenuItem>
                    </Paper>
                )}
            </Popper>
        </div>
    );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import {
    IconButton,
    ListItemIcon,
    MenuItem,
    Paper,
    Popper,
    Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import EmailIcon from "@mui/icons-material/Email"; // Importa el ícono de mensajería
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
                setOpenSeButtons(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [anchorElSeButtons]);

    return (
        <div className="navbar">
            <div className="navbar-container">
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <a href="/" className="home-icon">
                        <IconButton aria-label="home" style={{ padding: "0rem" }}>
                            <img
                                style={{ height: "2rem", margin: "0" }}
                                src="/assets/LogoWhiteHouse.png"
                                alt="WhatsApp"
                            />
                        </IconButton>
                    </a>
                </div>
                <div className="nav-options">
                    {/* Contenedor para alinear verticalmente los iconos */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* Icono de mensajería */}
                        <Link to="/chat">
                            <IconButton
                                aria-label="messages"
                                style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer" }}
                            >
                                <EmailIcon />
                            </IconButton>
                        </Link>

                        {/* Icono de usuario con menú desplegable */}
                        <AccountCircleIcon
                            onClick={handleClickSeButtons}
                            style={{
                                color: "#e0e0e0",
                                fontSize: "2rem",
                                cursor: "pointer",
                                marginLeft: "0.5rem", // Espacio entre iconos
                            }}
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
                        <Link
                            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                        >
                            <MenuItem
                                style={{ padding: "0.7rem 1rem", fontSize: "0.96rem" }}
                                onClick={() => {
                                    console.log("Clic en Mi Cuenta");
                                    setOpenSeButtons(false);
                                }}
                            >
                                <ListItemIcon>
                                    <DirectionsWalkIcon fontSize="small" style={{ fill: "grey", height: "23px" }} />
                                </ListItemIcon>
                                <Link to="/MiCuenta">
                                    <Typography variant="inherit">Mi Cuenta</Typography>
                                </Link>

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

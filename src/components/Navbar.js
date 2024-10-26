import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useLocation, Link, useNavigate } from "react-router-dom";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { navbarStyles } from "../styles/useStyles";
import { getUser } from "../hooks/useUserService";

const Navbar = () => {
    const classes = navbarStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');
    const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (isAuthenticated) {
                const userId = localStorage.getItem('userId');
                try {
                    const userData = await getUser(userId);
                    setUser(userData);
                } catch (error) {
                    console.error("Error al obtener los datos del usuario:", error);
                }
            }
        };

        fetchUser();
    }, [isAuthenticated]);

    const handleHomeClick = () => {
        isAuthenticated ? navigate('/home') : navigate('/login');
    };

    return (
        <div className={classes.navbar}>
            <div className={classes.navbarContainer}>
                <div className={classes.iconButtonContainer}>
                    <IconButton aria-label="home" className={classes.logoButton} onClick={handleHomeClick}>
                        <img src="/assets/LogoWhiteHouse.png" alt="Home" className={classes.logoImage} />
                    </IconButton>
                </div>

                {!isAuthRoute && isAuthenticated && (
                    <div className={classes.iconLinkContainer}>
                        <Link to="/publicar">
                            <IconButton aria-label="publicar" className={classes.iconButton}>
                                <AddBoxIcon style={{ color: '#E0E0E0' }} />
                            </IconButton>
                        </Link>

                        <Link to="/mensajes">
                            <IconButton aria-label="mensajes" className={classes.iconButton}>
                                <MarkUnreadChatAltIcon style={{ color: '#E0E0E0' }} />
                            </IconButton>
                        </Link>                     

                        <Link to="/perfil">
                            <IconButton aria-label="perfil" className={classes.iconButton}>
                                {user && user.photoUrl ? (
                                    <img src={user.photoUrl} alt="Perfil" className={classes.profileImage} />
                                ) : (
                                    <AccountCircleIcon style={{ color: '#E0E0E0' }} />
                                )}
                            </IconButton>                           
                        </Link>                            
                    </div>
                )}
            </div>    
        </div>
    );
};

export default Navbar;
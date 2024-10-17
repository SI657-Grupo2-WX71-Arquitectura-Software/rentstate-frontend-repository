import React, { useState } from "react";
import { useStylesMyAccount } from '../../../styles/useStyles';
import SwitchRentstate from '../../RentState Components/SwitchRentstate ';
import { useNavigate } from "react-router-dom";
import {  warningIcon, googleMapsLogo, completedIcon, needsIcon } from '../../../assets';
import { deleteUser } from '../../../hooks/useUserService';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material';

const MyConfiguration = () => {
    const classes = useStylesMyAccount();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
      
    const handleClose = () => {
        setOpenDialog(false);
    };
      
    const handleDelete = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        try {
            await deleteUser(userId, token);
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            window.location.href = '/login';
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <>
            <div className={classes.configOption}>
                <div>
                    <div className={classes.title} style={{alignItems:'bottom', alignContent:'bottom', justifyContent:'bottom', alignmentBaseline:'baseline'}}>
                        Zona de Interés (Z.I)
                        <img src={warningIcon} alt="Email" className={classes.icon} style={{height: '20px', marginLeft:'10px'}}/>
                    </div>
                    <div className={classes.subtitle}>
                        Selecciona la zona en la que te interesaria conseguir un inmueble, 
                        para que recibas notificaciones de nuevos inmuebles
                    </div>
                </div>
                <img src={googleMapsLogo} alt="Email" className={classes.icon} style={{height: '70px'}}/>                           
            </div>
            <div className={classes.configOption}>
                <div>
                    <div className={classes.title} style={{alignItems:'bottom', alignContent:'bottom', justifyContent:'bottom', alignmentBaseline:'baseline'}}>
                        ¡Necesidades Precisas!
                        <img src={completedIcon} alt="Email" className={classes.icon} style={{height: '15px', marginLeft:'10px'}}/>
                    </div>
                    <div className={classes.subtitle}>
                        Ingresa el detalle de tus caracterisitcas y necesidades 
                        que buscas en tu inmueble ideal (Requerido para uso de Asistente Virtual Ren)
                    </div>
                </div>
                <img src={needsIcon} alt="Email" className={classes.icon} style={{height: '70px'}}/>                           
            </div>

            <div className={classes.switchOptionContainer}>
                <div>
                    <div className={classes.title}> Notificaciones de Mensajes en Chat Rentstate </div>
                    <div className={classes.subtitle}> Reciba e-mails notificando nuevos mensajes en su chat </div>
                </div>
                <SwitchRentstate />                                                   
            </div>
            <div className={classes.switchOptionContainer}>
                <div>
                    <div className={classes.title}> Notificaciones de Nueva Propiedad en Z.I </div>
                    <div className={classes.subtitle}> Reciba e-mails notificando un nuevo inmueble en tu zona de interés</div>
                </div>
                <SwitchRentstate />                                                   
            </div>

            <div className={classes.buttonsContainer}>
                <div className={classes.button} onClick={handleLogout} style={{backgroundColor: '#00283E'}}> Cerrar Sesión </div>
                <div className={classes.button}  onClick={handleClickOpen} style={{backgroundColor: '#CC3434'}}> Eliminar Cuenta </div>
            </div>

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"> {"Eliminar Cuenta"} </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"> ¿Está seguro de que desea eliminar su cuenta de manera permanente? Todos sus datos, chats, y propiedades se perderán. </DialogContentText>
                </DialogContent>
                <DialogActions>                      
                    <Button onClick={handleDelete} style={{ color: "#225E7C", padding: "0.5rem 1rem" }} sx={{ textTransform: 'none' }}>
                        Aceptar
                    </Button>
                    <Button onClick={handleClose} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}   sx={{ textTransform: 'none' }}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MyConfiguration;
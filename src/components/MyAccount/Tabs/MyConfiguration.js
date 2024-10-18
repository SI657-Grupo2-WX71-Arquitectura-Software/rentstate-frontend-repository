import React, { useState } from "react";
import { useStylesMyAccount } from '../../../styles/useStyles';
import SwitchRentstate from '../../RentState Components/SwitchRentstate ';
import { useNavigate } from "react-router-dom";
import { warningIcon, googleMapsLogo, completedIcon, needsIcon } from '../../../assets';
import { deleteUser } from '../../../hooks/useUserService';
import { DeleteAccountModal } from "../Modals/DeleteAccountModal";
import { InterestedZonesModal } from "../Modals/InterestedZonesModal";
import { PreciseNeedsModal } from "../Modals/PreciseNeedsModal";

const MyConfiguration = () => {
    const classes = useStylesMyAccount();
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openInterestedZonesModal, setOpenInterestedZonesModal] = useState(false);
    const [openPreciseNeedsModal, setOpenPreciseNeedsModal] = useState(false);

    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleOpenInterestedZonesModal = () => setOpenInterestedZonesModal(true);
    const handleCloseInterestedZonesModal = () => setOpenInterestedZonesModal(false);

    const handleOpenPreciseNeedsModal = () => setOpenPreciseNeedsModal(true);
    const handleClosePreciseNeedsModal = () => setOpenPreciseNeedsModal(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
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
            <div className={classes.configOption} onClick={handleOpenInterestedZonesModal}>
                <div>
                    <div className={classes.title} style={{alignItems:'bottom', alignContent:'bottom', justifyContent:'bottom', alignmentBaseline:'baseline'}} >
                        Zona de Interés (Z.I)
                        <img src={warningIcon} alt="Email" className={classes.icon} style={{height: '20px', marginLeft:'10px'}}/>
                    </div>
                    <div className={classes.subtitle}>
                        Selecciona la zona en la que te interesaria conseguir un inmueble, 
                        para que recibas notificaciones de nuevos inmuebles
                    </div>
                </div>
                <img src={googleMapsLogo} alt="googleMapsLogo" className={classes.icon} style={{height: '70px'}}/>                           
            </div>
            <div className={classes.configOption} onClick={handleOpenPreciseNeedsModal}>
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
                <div className={classes.button} onClick={handleLogout} style={{backgroundColor: '#00283E'}}> 
                    Cerrar Sesión 
                </div>
                <div className={classes.button}  onClick={handleOpenDeleteModal} style={{backgroundColor: '#CC3434'}}> 
                    Eliminar Cuenta 
                </div>
            </div>

            <DeleteAccountModal open={openDeleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete} />
            <InterestedZonesModal open={openInterestedZonesModal} handleClose={handleCloseInterestedZonesModal} handleDelete={handleDelete} />
            <PreciseNeedsModal open={openPreciseNeedsModal} handleClose={handleClosePreciseNeedsModal} handleDelete={handleDelete} />
        
        </>
    );
};

export default MyConfiguration;
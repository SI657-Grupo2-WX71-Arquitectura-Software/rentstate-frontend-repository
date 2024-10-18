import React from 'react';
import { interestedZonesModalStyles } from '../../../styles/useStyles';
import { googleMapsLogo } from '../../../assets';
import GoogleMapsZoneCoverage from '../../RentState Components/GoogleMapsZoneCoverage';

export const InterestedZonesModal = ({ open, handleClose, handleDelete }) => {
    const classes = interestedZonesModalStyles(); 
    if (!open) return null;

    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.textTopContainer}>
                    <div>
                        <img src={googleMapsLogo} alt="googleMapsLogo" className={classes.icon} style={{height: '70px'}}/>
                    </div>
                    <div>
                        <div className={classes.title}>Zona de Interés (Z.I)</div>
                        <p style={{ color: '#434343', margin:'10px 0 0 0' }}>Selecciona la zona en la que te interesaria conseguir un inmueble, de esta manera, recibirás notificaciones de nuevos inmuebles en tu zona de interés seleccionada en este apartado.</p>
                    </div>
                </div>

                <div style={{margin:'10px 0'}}>
                    <GoogleMapsZoneCoverage/>
                </div>

                <div className={classes.buttonsContainer}>                  
                    <div className={classes.button} onClick={handleClose} style={{ backgroundColor: '#7E7E7E' }}>
                        Cancelar
                    </div>
                    <div className={classes.button} style={{ backgroundColor: '#00283E' }}>
                        Guardar Zonas
                    </div>
                </div>
            </div>
        </div>
    );
};
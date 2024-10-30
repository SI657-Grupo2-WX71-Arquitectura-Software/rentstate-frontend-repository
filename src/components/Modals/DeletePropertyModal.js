import React from 'react';
import { deleteAccountModalStyles } from '../../styles/useStyles';
import { closeIcon } from '../../assets';

export const DeletePropertyModal = ({ open, handleClose, handleDelete, district, location }) => {
    const classes = deleteAccountModalStyles();   
    if (!open) return null;

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    const handleCloseClick = (event) => {
        event.stopPropagation();
        handleClose();
    };

    return (
        <div className={classes.overlay} onClick={handleModalClick} style={{ cursor: 'default' }}>
            <div className={classes.modal} onClick={handleModalClick} style={{ cursor: 'default' }}>
                <div className={classes.closeIcon}>
                    <img
                        src={closeIcon}
                        alt="Cerrar"
                        onClick={handleCloseClick}
                        style={{ width: '1rem', cursor: 'pointer' }}
                    />
                </div>
                <div className={classes.title}>Eliminar Propiedad</div>
                <p style={{ color: '#434343' }}>
                    ¿Está seguro que desea eliminar la propiedad en <strong>{district}</strong>, con la dirección <strong>{location}</strong> de forma permanente? 
                    Esta acción será definitiva, perdiendo su historial de inquilinos, interesados, y detalles de propiedad.
                </p>           
                <div className={classes.buttonsContainer}>                   
                    <div className={classes.button} onClick={handleDelete} style={{ backgroundColor: '#CC3434', cursor: 'pointer' }}>
                        Eliminar Propiedad
                    </div>                    
                </div>
            </div>
        </div>
    );
};
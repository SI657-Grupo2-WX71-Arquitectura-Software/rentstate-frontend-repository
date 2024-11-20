import React from 'react';
import { closeIcon } from '../../assets';
import { filterPropertiesModalStyles } from '../../styles/useStyles';

const SecurityCredentialsModal = ({ open, handleReject, handleContinue }) => {
    const classes = filterPropertiesModalStyles();

    if (!open) return null;

    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.closeIcon}>
                    <img
                        src={closeIcon}
                        alt="Cerrar"
                        onClick={handleReject}
                        style={{ width: '1rem' }}
                    />
                </div>
                <div className={classes.title}>Credenciales de RentState Security</div>
                <p style={{ color: '#434343' }}>Sus credenciales fueron enviadas a su correo electrónico.</p>

                <div className={classes.buttonsContainer}>                   
                    <div className={classes.button} onClick={handleContinue} style={{ backgroundColor: '#00283E' }}>
                        Continuar
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityCredentialsModal;
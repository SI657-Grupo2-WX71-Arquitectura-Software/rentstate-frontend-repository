
import React, { useState } from 'react';
import { FieldEditPassword } from '../RentState Components/components';
import { deleteAccountModalStyles } from '../../styles/useStyles';
import { closeIcon } from '../../assets';

export const DeleteAccountModal = ({ open, handleClose, handleDelete }) => {
    const classes = deleteAccountModalStyles();
    const [password, setPassword] = useState('');
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    if (!open) return null;

    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.closeIcon}>
                    <img
                        src={closeIcon}
                        alt="Cerrar"
                        onClick={() => handleClose()}
                        style={{ width: '1rem' }}
                    />
                </div>
                <div className={classes.title}>Eliminar Cuenta</div>
                <p style={{ color: '#434343' }}>¿Está seguro que desea eliminar su cuenta de forma permanente? Todos sus chats e información será eliminada.</p>
                <div style={{margin:'1rem 0'}}>
              
                </div>
                <div className={classes.buttonsContainer}>                   
                    <div className={classes.button} onClick={handleDelete} style={{ backgroundColor: '#CC3434' }}>
                        Eliminar Cuenta
                    </div>
                </div>
            </div>
        </div>
    );
};
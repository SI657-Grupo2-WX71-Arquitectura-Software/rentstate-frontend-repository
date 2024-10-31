import React, { useState, useEffect } from 'react';
import { deleteAccountModalStyles } from '../../styles/useStyles';
import { closeIcon } from '../../assets';
import { getProperty, addInterestToProperty, getPropertyById } from '../../hooks/usePropertyService';
import ToastManager from '../RentState Components/ToastManager';

export const SendInterestModal = ({ open, handleClose, owner, property }) => {
    const classes = deleteAccountModalStyles();
    const [hasSentInterest, setHasSentInterest] = useState(false);

    useEffect(() => {
        const checkIfInterestSent = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const response = await getPropertyById(property.id);
                    setHasSentInterest(response.interestedUserIds.includes(parseInt(userId)));
                }
            } catch (error) {
                console.error('Error al verificar la solicitud de interés:', error);
            }
        };

        if (open) {
            checkIfInterestSent();
        }
    }, [open, property.id]);

    const handleSendInterest = async () => {
        if (hasSentInterest) {
            console.log('Ya has enviado una solicitud de interés para esta propiedad.');
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            if (userId && token) {
                const interestData = { userId: parseInt(userId) };
                await addInterestToProperty(property.id, interestData, token);
                ToastManager.success('Solicitud de interés enviada exitosamente.');

                setHasSentInterest(true);
            } else {
                console.log('No se pudo obtener el ID del usuario o el token. Por favor, inicia sesión.');
            }
            handleClose();
        } catch (error) {
            console.error('Error al enviar la solicitud de interés:', error);
            ToastManager.error('Error al enviar la solicitud de interés');
            handleClose();
        } finally {
            handleClose();
        }
    };

    if (!open) return null;

    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.closeIcon}>
                    <img
                        src={closeIcon}
                        alt="Cerrar"
                        onClick={handleClose}
                        style={{ width: '1rem' }}
                    />
                </div>
                <div className={classes.title}>Enviar Solicitud de Interés</div>
                <p style={{ color: '#434343' }}>
                    Al enviar esta solicitud, estarás en la lista de espera de posibles inquilinos del usuario <strong>{owner.name} {owner.lastName} </strong>
                    para el inmueble en <strong>{property.location}</strong>. ¿Estás seguro que deseas enviar esta solicitud?
                </p>
                <div className={classes.buttonsContainer}>
                    {hasSentInterest ? (
                        <p>Usted ya ha enviado una solicitud al propietario, espere su contacto.</p>
                    ) : (
                        <div className={classes.button} onClick={handleSendInterest} style={{ backgroundColor: '#00283E' }}>
                            Enviar Solicitud
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
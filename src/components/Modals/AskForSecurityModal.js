import React, { useState } from 'react'
import { closeIcon } from '../../assets'
import { filterPropertiesModalStyles } from '../../styles/useStyles'
import { CircularProgress } from '@mui/material'
import arduino from '../../assets/arduino.png'

const AskForSecurityModal = ({ open, handleReject, handleAccept }) => {
    const classes = filterPropertiesModalStyles()
    const [isLoading, setIsLoading] = useState(false)

    if (!open) return null

    const handleAcceptWithLoading = async () => {
        setIsLoading(true)
        try {
            await handleAccept()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.closeIcon}>
                    <img
                        src={closeIcon}
                        alt="Cerrar"
                        onClick={handleReject}
                        style={{ width: '1rem', cursor: 'pointer' }}
                    />
                </div>
                <div className={classes.title}>RentState Security</div>
                <p style={{ color: '#434343' }}>¿Desea adquirir RentState Security para este inmueble?</p>
                <p style={{ color: '#434343' }}>
                    Este es un dispositivo que controla y registra movimientos dentro de su propiedad.
                </p>
                <div style={{display:'flex', width:'100%', justifyContent: 'center'}}>
                    <img src={arduino} alt="Arduino" style={{ width: '10rem', margin: '1rem', display: 'flex', justifyContent: 'center', }} />

                </div>
                {isLoading ? (
                    <div className={classes.loadingContainer}>
                        <CircularProgress />
                        <p>Cargando, por favor espere...</p>
                    </div>
                ) : (
                    <div className={classes.buttonsContainer}>
                        <div className={classes.cleanButton} onClick={handleReject}>
                            No Gracias
                        </div>
                        <div
                            className={classes.button}
                            onClick={handleAcceptWithLoading}
                            style={{ backgroundColor: '#00283E' }}
                        >
                            Aceptar
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AskForSecurityModal
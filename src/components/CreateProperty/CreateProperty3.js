import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import '../../styles/Booking.css'
import { createPropertyStyles } from '../../styles/useStyles'
import { Button } from '../RentState Components/components'
import arduino from '../../assets/arduino.png'
import { EmailIOTCredentials } from '../EmailManagement/EmailIOTCredentials'
import { CircularProgress } from '@mui/material'

const CreateProperty3 = ({ onNext }) => {
    const classes = createPropertyStyles()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleAccept = async () => {
        setIsLoading(true)
        setError(null)
        try {
            await EmailIOTCredentials()
            setTimeout(() => {
                onNext()
            }, 1000)
        } catch (error) {
            console.error('Error en handleAccept:', error)
            setError('Hubo un problema al procesar tu solicitud. Inténtalo nuevamente.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleReject = () => {
        onNext()
    }

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <form className={classes.formContainer}>
                <h3 className={classes.step}>Paso 3/6</h3>
                <h3 className={classes.title}>RentState Security</h3>
                <h3 className={classes.subtitle}>
                    ¿Te gustaría acceder a Renstate Security? Podrás monitorear en tiempo real los movimientos en tu inmueble, con un registro de entradas y salidas visible en la app. También recibirás alertas automáticas ante actividades sospechosas, asegurando la protección de tu propiedad (S/. 50.00 al mes x inmueble)
                </h3>

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                    <img src={arduino} alt="Arduino" style={{ width: '10rem' }} />
                </div>

                {isLoading ? (
                    <div className={classes.loadingContainer}>
                        <CircularProgress />
                        <p>Cargando, por favor espere...</p>
                    </div>
                ) : (
                    <div className={classes.buttonsContainer}>
                        <Button onClick={handleReject} width="20rem" style={{ backgroundColor: '#7E7E7E' }}>
                            No, gracias
                        </Button>
                        <Button onClick={handleAccept} width="20rem" style={{ backgroundColor: '#00283E' }}>
                            Aceptar
                        </Button>
                    </div>
                )}

                {error && (
                    <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
                        {error}
                    </div>
                )}
            </form>
        </div>
    )
}

export default CreateProperty3
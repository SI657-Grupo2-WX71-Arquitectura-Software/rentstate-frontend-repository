import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { createPropertyStyles } from '../../styles/useStyles'
import { Button } from '../RentState Components/components'

const CreateProperty5 = ({ onNext, onBack, propertyData }) => {
    const classes = createPropertyStyles()

    const handleNextStep = () => {
        console.log('Datos finales para crear la propiedad:', propertyData)
        onNext()
    }

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <form className={classes.formContainer} style={{ maxWidth: '90vw' }}>
                <h3 className={classes.step}>Paso 5/6</h3>
                <h3 className={classes.title}>Confirmar y Validar Datos</h3>
                <h3 className={classes.subtitle}>
                    Revise los datos finales antes de crear la propiedad.
                </h3>

                <div className="dataPreview" style={{ marginBottom: '2rem' }}>
                    <pre
                        style={{
                            backgroundColor: '#f5f5f5',
                            padding: '10px',
                            borderRadius: '5px',
                            maxHeight: '300px',
                            overflow: 'auto',
                        }}
                    >
                        {JSON.stringify(propertyData, null, 2)}
                    </pre>
                </div>

                <div
                    className="formActions"
                    style={{
                        gap: '1rem',
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '2rem',
                    }}
                >
                    <Button onClick={onBack} width="20rem">
                        Atrás
                    </Button>
                    <Button onClick={handleNextStep} width="20rem">
                        Continuar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CreateProperty5
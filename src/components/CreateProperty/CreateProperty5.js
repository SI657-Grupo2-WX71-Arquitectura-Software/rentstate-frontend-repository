import React from 'react';
import { Button } from '@mui/material';
import { createPropertyStyles } from '../../styles/useStyles';

const CreateProperty5 = ({ onNext, onBack, propertyData }) => {
    const classes = createPropertyStyles()

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

                <div className="formActions" style={{ gap: '1rem', display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <Button onClick={onBack} sx={{ textTransform: 'none' }} style={{ color: "grey", padding: "0.5rem 1rem", backgroundColor: "#EEEE" }}>
                    Anterior
                </Button>
                <Button variant="contained" color="secondary" onClick={onNext} sx={{ textTransform: 'none' }} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}>
                    Continuar
                </Button>
            </div>
            </form>
        </div>
      
    );
};
export default CreateProperty5;
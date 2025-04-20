import React from 'react';
import { Button } from '@mui/material';
import { createPropertyStyles } from '../../styles/useStyles';

const CreateProperty5 = ({ onNext, onBack, propertyData }) => {
    const classes = createPropertyStyles();

    // Función para renderizar las características principales
    const renderPropertyData = () => {
        return (
            <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '10px' }}>
                <h4>Datos Generales</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><strong>Categoría:</strong> {propertyData.category || 'N/A'}</li>
                    <li><strong>Distrito:</strong> {propertyData.district || 'N/A'}</li>
                    <li><strong>Ubicación:</strong> {propertyData.location || 'N/A'}</li>
                    <li><strong>Latitud:</strong> {propertyData.latitude || 'N/A'}</li>
                    <li><strong>Longitud:</strong> {propertyData.longitude || 'N/A'}</li>
                    <li><strong>Precio:</strong> S/ {propertyData.price || 'N/A'}</li>
                </ul>
                <h4>Características de la Propiedad</h4>
                {propertyData.propertyFeatures?.general ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><strong>Tipo:</strong> {propertyData.propertyFeatures.general.tipo || 'N/A'}</li>
                        <li><strong>Área Total:</strong> {propertyData.propertyFeatures.general.areaTotal || 'N/A'} m²</li>
                        <li><strong>Dormitorios:</strong> {propertyData.propertyFeatures.general.dormitorios || 'N/A'}</li>
                        <li><strong>Baños:</strong> {propertyData.propertyFeatures.general.baños || 'N/A'}</li>
                        <li><strong>Antigüedad:</strong> {propertyData.propertyFeatures.general.antiguedadUnidad || 'N/A'}</li>
                        <li><strong>Balcón:</strong> {propertyData.propertyFeatures.general.balcon ? 'Sí' : 'No'}</li>
                        <li><strong>Terraza:</strong> {propertyData.propertyFeatures.general.terraza ? 'Sí' : 'No'}</li>
                    </ul>
                ) : (
                    <p>No se especificaron características.</p>
                )}
            </div>
        );
    };

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <form className={classes.formContainer} style={{ maxWidth: '90vw' }}>
                <h3 className={classes.step}>Paso 4/5</h3>
                <h3 className={classes.title}>Confirmar y Validar Datos</h3>
                <h3 className={classes.subtitle}>
                    Revise los datos finales antes de crear la propiedad.
                </h3>

                <div className="dataPreview" style={{ marginBottom: '2rem' }}>
                    {renderPropertyData()}
                </div>

                <div className="formActions" style={{ gap: '1rem', display: 'flex', justifyContent: 'center', margin: '2rem' }}>                   
                    <Button variant="contained" color="secondary" onClick={onNext} sx={{ textTransform: 'none' }} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}>
                        Continuar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateProperty5;

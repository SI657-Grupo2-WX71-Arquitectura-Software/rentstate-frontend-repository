import React, { useState } from 'react';
import CreateProperty1 from './CreateProperty1';
import CreateProperty2 from './CreateProperty2';
import CreateProperty3 from './CreateProperty3';
import CreateProperty4 from './CreateProperty4';
import CreateProperty5 from './CreateProperty5';
import ToastManager from '../RentState Components/ToastManager';
import { createProperty } from '../../hooks/usePropertyService';

const CreateProperty = () => {
    const [activeStep, setActiveStep] = useState(0);

    const [propertyData, setPropertyData] = useState({
        category: '',
        district: '',
        location: '',
        latitude: '',
        longitude: '',
        description: '',
        characteristics: '',
        price: '',
        cardimage: [],
        propertyFeatures: {
            general: {},
            amenidades: {},
            costos: {},
            sobreElEdificio: {}
        }
    });

    const handleNext = () => {
        if (activeStep === 4) {
            handleCreateProperty();
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
    };

    const updatePropertyData = (newData) => {
        setPropertyData((prevData) => ({
            ...prevData,
            propertyFeatures: {
                ...prevData.propertyFeatures,
                ...newData.propertyFeatures,
            },
            ...newData,
        }));
    };

    const handleCreateProperty = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
    
        console.log('Datos antes de crear la propiedad:', propertyData);
    
        if (
            !propertyData.propertyFeatures ||
            Object.keys(propertyData.propertyFeatures).length === 0
        ) {
            ToastManager.error('Error: Datos incompletos para la creación de la propiedad.');
            return;
        }
    
        try {
            const createdProperty = await createProperty(propertyData, userId, token);
            ToastManager.success('¡Propiedad creada exitosamente!');
            console.log('Propiedad creada:', createdProperty);
            window.location.href = '/subirFotos';
        } catch (error) {
            ToastManager.error('Hubo un error al crear la propiedad.');
            console.error('Error en la creación de la propiedad:', error);
        }
    };
    

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <CreateProperty1
                        onNext={handleNext}
                        updateData={updatePropertyData}
                    />
                );
            case 1:
                return (
                    <CreateProperty2
                        onNext={handleNext}
                        onBack={handleBack}
                        updateData={updatePropertyData}
                    />
                );
            case 2:
                return (
                    <CreateProperty3
                        onNext={handleNext}
                        onBack={handleBack}
                        updateData={updatePropertyData}
                    />
                );
            case 3:
                return (
                    <CreateProperty4
                        onNext={handleNext}
                        onBack={handleBack}
                        updateData={updatePropertyData}
                    />
                );
            case 4:
                return (
                    <CreateProperty5
                        onNext={handleCreateProperty}
                        onBack={handleBack}
                        propertyData={propertyData}
                    />
                );
            default:
                return <div>Error: Paso desconocido</div>;
        }
    };

    return <div>{renderStepContent(activeStep)}</div>;
};

export default CreateProperty;
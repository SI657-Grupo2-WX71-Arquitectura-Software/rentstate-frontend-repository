import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Booking.css';
import { createPropertyStyles } from '../../styles/useStyles';
import { Button } from '../RentState Components/components';
import GoogleMapRentState from '../RentState Components/GoogleMapRentState';

const CreateProperty2 = ({ onNext, updateData }) => {
    const classes = createPropertyStyles();

    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const isFormValid = location.trim() && latitude.trim() && longitude.trim();

    const handleLocationSelected = (data) => {
        console.log('Datos seleccionados desde el mapa:', data);
        setLocation(data.address);
        setLatitude(data.latitude.toString());
        setLongitude(data.longitude.toString());
    };

    const nextStep = () => {
        if (isFormValid) {
            updateData({ location, latitude, longitude });
            onNext();
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <form className={classes.formContainer}>
                <h3 className={classes.step}>Paso 2/5</h3>
                <h3 className={classes.title}>Dirección del Inmueble</h3>
                <h3 className={classes.subtitle}>Ubica tu propiedad en el mapa</h3>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className={classes.fieleditscontainer}>
                        <GoogleMapRentState
                            mapType="finder"
                            height="500px"
                            width="70vw"
                            onLocationSelected={handleLocationSelected}
                        />
                    </div>
                </div>

                <div className="formActions" style={{ gap: '1rem', display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button disabled={!isFormValid} onClick={nextStep} width="20rem">
                        Siguiente
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateProperty2;
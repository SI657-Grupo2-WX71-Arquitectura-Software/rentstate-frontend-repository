import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../RentState Components/components";
import { useStylesRegister } from "../../styles/useStyles";
import backArrow from '../../assets/backArrow.svg';
import { createUser } from "../../hooks/useUserService";
import GoogleMapRentState from "../RentState Components/GoogleMapRentState";

const RegisterStep4 = ({ nextStep, prevStep, userData, updateUserData }) => {
    const classes = useStylesRegister();

    const handleRegister = async (e) => {
        e.preventDefault();
        const finalUserData = {
            ...userData,
            photoUrl: "https://www.laanet.com/Lnt/wp-content/uploads/2020/02/iss_0893_01914-1048x675.jpg"
        };
        try {
            const result = await createUser(finalUserData);
            console.log("Usuario registrado con éxito:", result);
            nextStep();
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
        }
    };

    const handleLocationChange = (location) => {
        console.log("Location selected:", location);
        updateUserData({
            ...userData,
            latitude: location.lat,
            longitude: location.lng,
            address: location.formatted_address
        });
    };

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <button onClick={prevStep} className={classes.returnButton}>
                <img src={backArrow} alt="Regresar" style={{ width: '100%', height: '100%' }} />
            </button>
            <form onSubmit={handleRegister} className={classes.formContainer}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 8rem' }}>
                    <h3 className={classes.title}>Crea tu cuenta</h3>
                    <h3 className={classes.subtitle}>Paso 4/5</h3>

                    <GoogleMapRentState 
                        mapType="finder" 
                        height="500px" 
                        width="70vw" 
                        onLocationSelected={handleLocationChange}
                    />
                    
                    <Button
                        type="submit"
                        width="20rem"
                    >
                        Siguiente
                    </Button>
                    <Link 
                        to="/login" 
                        style={{ color: '#FFF', marginTop: '15px' }}
                    >
                        ¿Ya tienes cuenta? Inicia Sesión
                    </Link>
                </div>        
            </form>
        </div>
    );
};

export default RegisterStep4;
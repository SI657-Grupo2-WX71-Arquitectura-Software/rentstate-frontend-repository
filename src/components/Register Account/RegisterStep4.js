import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../RentState Components/components";
import GoogleMapsFinder from "../RentState Components/GoogleMapsFinder";
import { useStylesRegister } from "../../styles/useStyles";
import backArrow from '../../assets/backArrow.svg';
import useUserService from "../../hooks/useUserService";

const RegisterStep4 = ({ nextStep, prevStep, userData, updateUserData }) => {
    const classes = useStylesRegister();

    const handleRegister = async (e) => {
        e.preventDefault();
        const finalUserData = {
            ...userData,
            photoUrl: "https://www.laanet.com/Lnt/wp-content/uploads/2020/02/iss_0893_01914-1048x675.jpg"
        };
    
        try {
            const result = await useUserService.createUser(finalUserData);
            console.log("Usuario registrado con éxito:", result);
            nextStep();
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
        }
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
                <GoogleMapsFinder updateUserData={updateUserData} />

                <Button
                    type="submit"
                    //disabled={!isFormValid}
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
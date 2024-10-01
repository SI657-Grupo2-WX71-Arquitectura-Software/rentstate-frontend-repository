import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../RentState Components/components";
import { useStylesRegister } from "../../styles/useStyles";
import backArrow from '../../assets/backArrow.svg';
import tenantIcon from '../../assets/tentantIcon.svg';
import ownerIcon from '../../assets/ownerIcon.svg';

const RegisterStep3 = ({ nextStep, prevStep, updateUserData }) => {
    const classes = useStylesRegister();
    const [userType, setUserType] = useState("");
    const isFormValid = userType.length > 0;

    const handleSelectUserType = (type) => {
        setUserType(type);
        updateUserData({ role: type });
    };

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <button onClick={prevStep} className={classes.returnButton}>
                <img src={backArrow} alt="Regresar" style={{ width: '100%', height: '100%' }} />
            </button>
            <form onSubmit={(e) => { e.preventDefault(); if (isFormValid) nextStep(); }} className={classes.formContainer}>
                <h3 className={classes.title}>Crea tu cuenta</h3>
                <h3 className={classes.subtitle}>Paso 3/5</h3>              
                <h3 className={classes.subtitle} style={{marginTop:50}}>Tipo de Usuario</h3>
                <div style={{display:'flex', gap:'2rem', color:'white', fontSize:'1.5rem', fontWeight:'lighter', marginBottom:50}}>                    
                    <div>
                        <div onClick={() => handleSelectUserType('owner')} style={{backgroundColor:'#00283E', borderRadius:'15px', cursor:'pointer', width:'10rem', height:'10rem', alignContent:'center'}}>
                            <img src={ownerIcon} alt="Propietario" style={{ height: '90px', margin: 0 }}/>
                        </div>
                        <h3 className={classes.subtitle} style={{fontSize:'1.1rem'}}>Propietario</h3>
                    </div>
                    <div>
                        <div onClick={() => handleSelectUserType('tenant')} style={{backgroundColor:'#00283E', borderRadius:'15px', cursor:'pointer', width:'10rem', height:'10rem', alignContent:'center'}}>
                            <img src={tenantIcon} alt="Inquilino" style={{ height: '90px', margin: 0 }}/>
                        </div>
                        <h3 className={classes.subtitle} style={{fontSize:'1.1rem'}}>Inquilino</h3>
                    </div>
                </div>
                <Button
                    disabled={!isFormValid}
                    onClick={nextStep}
                >
                    Siguiente
                </Button>
                <Link 
                    to="/login" 
                    style={{ color: '#FFF', marginTop: '15px' }}
                >
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>
            </form>
        </div>
    );
};

export default RegisterStep3;
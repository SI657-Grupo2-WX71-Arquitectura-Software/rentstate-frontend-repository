import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FieldEdit, Button, FieldSelect} from "../RentState Components/components";
import { useStylesRegister } from "../../styles/useStyles";

const RegisterStep1 = ({ nextStep, prevStep }) => {
    const classes = useStylesRegister();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [emailError, setEmailError] = useState("");
    const isFormValid = !emailError && email.trim() && name.trim() && lastName.trim() && birthDate && gender;

    const genderOptions = [
        { value: "male", label: "Masculino" },
        { value: "female", label: "Femenino" },
        { value: "non-binary", label: "No Binario" },
        { value: "undisclosed", label: "Prefiero no decir" }
    ];

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (!validateEmail(newEmail)) {
            setEmailError("Por favor, ingrese un correo electrónico válido.");
        } else {
            setEmailError("");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            nextStep();
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <form onSubmit={handleRegister} className={classes.formContainer}>
                <h3 className={classes.title}>Crea tu cuenta</h3>
                <h3 className={classes.subtitle}>Paso 1/5</h3>
                <div className={classes.fieleditscontainer}>
                    <FieldEdit 
                        id="name" 
                        label="Nombres" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <FieldEdit 
                        id="lastName" 
                        label="Apellidos" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                    <FieldEdit 
                        id="email" 
                        label="Correo electrónico" 
                        value={email} 
                        onChange={handleEmailChange} 
                    />
                    <FieldEdit                 
                        id="birthDate" 
                        label="Fecha de Nacimiento" 
                        value={birthDate} 
                        onChange={(e) => setBirthDate(e.target.value)} 
                    />
                    <FieldSelect 
                        id="gender" 
                        label="Género" 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)} 
                        options={genderOptions}
                    />
                </div>    
                {emailError && <p style={{ color: 'white', marginTop: '1rem', marginBottom: 0 }}>{emailError}</p>}           
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

export default RegisterStep1;
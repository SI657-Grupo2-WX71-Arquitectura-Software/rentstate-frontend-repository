import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FieldEdit, Button, FieldSelect, FieldDatePicker } from "../RentState Components/components";
import { useStylesRegister } from "../../styles/useStyles";
import dayjs from 'dayjs';

const RegisterStep1 = ({ nextStep, updateUserData }) => {
    const classes = useStylesRegister();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [emailError, setEmailError] = useState("");
    const [birthdayError, setBirthdayError] = useState('');
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const isFormValid = !emailError && email.trim() && name.trim() && lastName.trim() && gender;

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

    const validateAge = (date) => {
        const today = new Date();
        const birthDate = new Date(date);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18;
    };

    const handleDateChange = (date) => {
        if (validateAge(date)) {
            setSelectedDate(date);
            updateUserData({ birthDate: date });
            setBirthdayError('');
        } else {
            setBirthdayError('Usted es menor de edad.');
        }
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        updateUserData({ email: newEmail });
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
                        onChange={(e) => {
                            setName(e.target.value);
                            updateUserData({ name: e.target.value });
                        }}
                    />
                    <FieldEdit 
                        id="lastName" 
                        label="Apellidos" 
                        value={lastName} 
                        onChange={(e) => {
                            setLastName(e.target.value);
                            updateUserData({ lastName: e.target.value });
                        }}
                    />
                    <FieldEdit 
                        id="email" 
                        label="Correo electrónico" 
                        value={email} 
                        onChange={handleEmailChange} 
                    />                  
                     <FieldDatePicker 
                        id="birthdate" 
                        label="Fecha de Nacimiento"
                        selectedDate={selectedDate} 
                        setSelectedDate={handleDateChange}
                    />
                    <FieldSelect 
                        id="gender" 
                        label="Género" 
                        value={gender} 
                        onChange={(e) => {
                            setGender(e.target.value);
                            updateUserData({ gender: e.target.value });
                        }}
                        options={genderOptions}
                    />
                </div>    
                {emailError && <p style={{ color: 'white', marginTop: '1rem', marginBottom: 0 }}>{emailError}</p>}
                {birthdayError && <p style={{ color: 'white', marginTop: '1rem', marginBottom: 0 }}>{birthdayError}</p>}                      
                <Button 
                    disabled={!isFormValid} 
                    onClick={nextStep}
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
            </form>
        </div>
    );
};

export default RegisterStep1;
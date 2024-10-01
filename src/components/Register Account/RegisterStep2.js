import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FieldEdit, Button, FieldEditPassword, FieldEditPhone } from "../RentState Components/components";
import { useStylesRegister } from "../../styles/useStyles";
import backArrow from '../../assets/backArrow.svg';

const RegisterStep2 = ({ nextStep, prevStep, updateUserData }) => {
    const classes = useStylesRegister();    
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dni, setDni] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [dniError, setDniError] = useState("");
    const isFormValid = user.trim() && password.trim() && confirmPassword && phone.trim() && dni.trim() && !passwordError && !dniError && !phoneError;

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        updateUserData({ password: newPassword });        
        if (confirmPassword && newPassword !== confirmPassword) {
            setPasswordError("Las contraseñas no coinciden.");
        } else {
            setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (password && newConfirmPassword !== password) {
            setPasswordError("Las contraseñas no coinciden.");
        } else {
            setPasswordError("");
        }
    };

    const handlePhoneChange = (e) => {
        const newPhone = e.target.value;
        setPhone(newPhone);
        updateUserData({ phone: newPhone });
        if (!/^\d{9}$/.test(newPhone)) {
            setPhoneError("Teléfono inválido");
        } else {
            setPhoneError("");
        }
    };

    const handleDniChange = (e) => {
        const newDni = e.target.value;
        setDni(newDni);
        updateUserData({ dni: newDni });
        if (/^\d{8}$/.test(newDni)) {
            setDniError("");
        } else {
            setDniError("DNI inválido");
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
            <button onClick={prevStep} className={classes.returnButton}>
                <img src={backArrow} alt="Regresar" style={{ width: '100%', height: '100%' }} />
            </button>
            <form onSubmit={handleRegister} className={classes.formContainer}>
                <h3 className={classes.title}>Crea tu cuenta</h3>
                <h3 className={classes.subtitle}>Paso 2/5</h3>
                <div className={classes.fieleditscontainer}>
                    <FieldEdit 
                        id="user" 
                        label="Usuario" 
                        value={user} 
                        onChange={(e) => {
                            setUser(e.target.value);
                            updateUserData({ username: e.target.value });
                        }} 
                    />
                    <FieldEditPassword
                        id="password"
                        label="Contraseña"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <FieldEditPassword
                        id="confirmPassword"
                        label="Repetir Contraseña"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                   <FieldEditPhone
                        id="phone" 
                        label="Teléfono" 
                        value={phone} 
                        onChange={handlePhoneChange}
                    />
                    <FieldEdit                 
                        id="dni" 
                        label="DNI" 
                        value={dni} 
                        onChange={handleDniChange} 
                    />
                </div>
                <div style={{ color: 'white', marginTop: '1rem', display: 'flex', justifyContent: 'center', width: '100%' }}>                    
                    {passwordError && <p style={{ marginBottom: 0, marginRight: '10px' }}>{passwordError}</p>}
                    {phoneError && <p style={{ marginBottom: 0, marginRight: '10px' }}>{phoneError}</p>}
                    {dniError && <p style={{ marginBottom: 0 }}>{dniError}</p>}
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

export default RegisterStep2;
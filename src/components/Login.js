import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../hooks/api'; 
import { useStylesLogin } from "../styles/useStyles";
import { Button, FieldEdit, FieldEditPassword } from "./RentState Components/components";
import ToastManager from "./RentState Components/ToastManager";

const Login = () => {
    const classes = useStylesLogin();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const isLoginButtonEnabled = username.trim() !== "" && password.trim() !== "";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/api/login', {
                username,
                password,
            });
            const { token, userId } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            ToastManager.success('Bienvenido a RentState');
            navigate("/home");
        } catch (error) {
            setAuthError("");
            ToastManager.error('Credenciales incorrectas, intenta nuevamente');
            console.error("Login failed:", error);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <form onSubmit={handleLogin} className={classes.formContainer}>
                <h3 style={{ color: 'white', fontWeight: 'lighter', fontSize: '2rem' }}>Iniciar Sesión</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                    <FieldEdit
                        id="username"
                        label="Usuario"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <FieldEditPassword
                        id="password"
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {authError && <p style={{ color: 'red', margin: 0 }}>{authError}</p>}
                </div>
                <div className={classes.buttonContainer}>
                    <Button 
                        disabled={!isLoginButtonEnabled}
                        width="20rem"
                    >
                        Ingresar
                    </Button>                   
                </div>
                <p style={{ fontSize: '0.9rem', color: '#E8E8E8' }}>
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" style={{ fontSize: '0.9rem', color: '#E8E8E8' }}>Registrate aquí</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
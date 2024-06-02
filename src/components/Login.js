import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../hooks/api'; 
import "../styles/Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        if (username.trim() === "") {
            setUsernameError("Username is required");
            return;
        } else {
            setUsernameError("");
        }

        if (password.trim() === "") {
            setPasswordError("Password is required");
            return;
        } else {
            setPasswordError("");
        }

        try {
            const response = await api.post('/auth/api/login', {
                username,
                password,
            });
            const { token, userId } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameError(""); 
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError("");
    };

    const isLoginButtonEnabled = username.trim() !== "" && password.trim() !== "";

    return (
        <div className="app-container">
            <div className="content-container">
                <div className="login-form-container">
                    <h3 style={{color:'white', fontWeight:'lighter', fontSize:'2rem' }}>Iniciar Sesión</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">                           
                            <input
                                id="username"
                                className={`form-control ${usernameError && "invalid"}`}
                                type="text"
                                placeholder="Usuario"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            {usernameError && <p className="error-message">{usernameError}</p>}
                        </div>
                        <div className="form-group">                           
                            <input
                                id="password"
                                className={`form-control ${passwordError && "invalid"}`}
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {passwordError && <p className="error-message">{passwordError}</p>}
                        </div>
                        <button
                            type="submit"
                            className={`custom-button ${!isLoginButtonEnabled ? "disabled" : ""}`}
                            style={{ padding: '0.8rem 8rem' }}
                            disabled={!isLoginButtonEnabled}
                        >
                            Ingresar
                        </button>

                        <p >
                            <a style={{fontSize:'0.9rem', color:'#E8E8E8', textDecoration:'none'}} href="#!">¿Olvidó su contraseña?</a>
                        </p>
                        <p  style={{fontSize:'0.9rem', color:'#E8E8E8'}}>
                            ¿No tienes una cuenta?{" "}
                            <Link to="/register"  style={{fontSize:'0.9rem', color:'#E8E8E8'}}> Registrate aquí </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

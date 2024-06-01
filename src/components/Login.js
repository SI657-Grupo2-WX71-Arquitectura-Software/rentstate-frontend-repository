import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../hooks/api'; // Asegúrate de que la ruta sea correcta
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
        setUsernameError(""); // Limpiar el mensaje de error al cambiar el nombre de usuario
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(""); // Limpiar el mensaje de error al cambiar la contraseña
    };

    const isLoginButtonEnabled = username.trim() !== "" && password.trim() !== "";

    return (
        <div className="app-container">
            <div className="content-container">
                <div className="login-form-container">
                    <h3 className="login-title fw-normal mb-3">Log in</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <div className="labels">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                            </div>
                            <input
                                id="username"
                                className={`form-control ${usernameError && "invalid"}`}
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            {usernameError && <p className="error-message">{usernameError}</p>}
                        </div>
                        <div className="form-group">
                            <div className="labels">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                            </div>
                            <input
                                id="password"
                                className={`form-control ${passwordError && "invalid"}`}
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {passwordError && <p className="error-message">{passwordError}</p>}
                        </div>
                        <button
                            type="submit"
                            className={`btn btn-primary w-100 ${!isLoginButtonEnabled && "disabled"}`}
                            disabled={!isLoginButtonEnabled}
                        >
                            Login
                        </button>
                        <p className="forgot-password text-muted mt-3">
                            <a href="#!">Forgot password?</a>
                        </p>
                        <p className="register-link">
                            Don't have an account?{" "}
                            <Link to="/register" className="link-info">
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

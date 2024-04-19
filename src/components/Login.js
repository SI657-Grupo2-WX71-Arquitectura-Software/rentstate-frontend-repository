  import React, { useState } from "react";

  import "../styles/Login.css"
  import { Link, useNavigate } from "react-router-dom";


  const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Validar campos antes de proceder al inicio de sesión
    if (email.trim() === "") {
      setEmailError("Email is required");
      return;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      return;
    } else {
      setPasswordError("");
    }
    navigate("/");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Limpiar el mensaje de error al cambiar el email
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); // Limpiar el mensaje de error al cambiar la contraseña
  };

  // Determinar si el botón de login debe estar habilitado
  const isLoginButtonEnabled = email.trim() !== "" && password.trim() !== "";  

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="login-form-container">
          <h3 className="login-title fw-normal mb-3">Log in</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <div className="labels">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
              </div>
              <input
                id="email"
                className={`form-control ${emailError && "invalid"}`}
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <p className="error-message">{emailError}</p>}
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
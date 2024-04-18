import React from "react";
import "../styles/Login.css"
import { useNavigate } from "react-router-dom";


const Login = () => {

    const navigate = useNavigate();

    const handleLogin = (e) => {
      e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  
      // Aquí podrías realizar la lógica de autenticación o guardar información en el localStorage
  
      // Redirigir al usuario a la página Home después del inicio de sesión exitoso
      navigate("/");
    };
    

    return(
        <div className="app-container">
      <div className="content-container">
        <div className="login-form-container">
          <h3 className="login-title fw-normal mb-3">Log in</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                className="form-control"
                type="email"
                placeholder="Enter your email address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <p className="forgot-password text-muted mt-3">
              <a href="#!">Forgot password?</a>
            </p>
            <p className="register-link">
              Don't have an account?{" "}
              <a href="#!" className="link-info">
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
      );
};

export default Login;
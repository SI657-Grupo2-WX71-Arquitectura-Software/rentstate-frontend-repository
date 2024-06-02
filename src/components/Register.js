import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../hooks/api" 
import "../styles/Register.css";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/api/register', {
                name,
                lastName,
                username: email,
                email,
                birthDate: new Date().toISOString(),
                gender,
                password,
                role: description, 
            });
            console.log("Registration successful:", response.data);
            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const isFormValid =
        email.trim() !== "" &&
        password.trim() !== "" &&
        name.trim() !== "" &&
        lastName.trim() !== "" &&
        gender.trim() !== "" &&
        description.trim() !== "" &&
        address.trim() !== "" &&
        age.trim() !== "";

    return (
        <div className="app-container">
            <div className="content-container">
                <div className="register-form-container">
                    <h3 style={{color:'white', fontWeight:'lighter', fontSize:'2rem' }}>Crea tu cuenta</h3>
                    <form onSubmit={handleRegister} className="register-form">
                        <div className="form-grid">
                            <div className="form-group">                              
                                <input
                                    id="name"
                                    className="form-control"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">                               
                                <input
                                    id="lastName"
                                    className="form-control"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your last name"
                                />
                            </div>
                            <div className="form-group">                               
                                <input
                                    id="email"
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <div className="form-group">                              
                                <input
                                    id="password"
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="form-group">                             
                                <input
                                    id="address"
                                    className="form-control"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your address"
                                />
                            </div>
                            <div className="form-group">                               
                                <select
                                    id="gender"
                                    className="form-control"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="non-binary">Non-binary</option>
                                    <option value="undisclosed">Prefer not to say</option>
                                </select>
                            </div>
                            <div className="form-group">                              
                                <input
                                    id="age"
                                    className="form-control"
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="Enter your age"
                                />
                            </div>
                            <div className="form-group">                              
                                <select
                                    id="description"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                    <option value="">Select an option</option>
                                    <option value="tenant">Inquilino</option>
                                    <option value="owner">Propietario</option>
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`custom-button ${!isFormValid ? "disabled" : ""}`}
                            disabled={!isFormValid}
                        >
                            Registrar
                        </button>                       
                        <p style={{fontSize:'0.9rem', color:'#E8E8E8'}}>
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/login" style={{fontSize:'0.9rem', color:'#E8E8E8'}}>   Inicia Sesión</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

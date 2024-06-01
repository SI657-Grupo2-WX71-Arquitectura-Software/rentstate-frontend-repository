import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../hooks/api" // Asegúrate de que la ruta sea correcta
import "../styles/Register.css"; // Estilos CSS para el formulario de registro

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
                username: email, // Assuming username is email
                email,
                birthDate: new Date().toISOString(), // Placeholder value for birthDate
                gender,
                password,
                role: description, // Assuming role is same as description
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
                    <h3 className="register-title fw-normal mb-3">Register</h3>
                    <form onSubmit={handleRegister} className="register-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
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
                                <label htmlFor="lastName" className="form-label">
                                    Last Name
                                </label>
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
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
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
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
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
                                <label htmlFor="address" className="form-label">
                                    Address
                                </label>
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
                                <label htmlFor="gender" className="form-label">
                                    Gender
                                </label>
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
                                <label htmlFor="age" className="form-label">
                                    Age
                                </label>
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
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
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
                            className={`btn btn-primary ${!isFormValid ? "disabled" : ""}`}
                            disabled={!isFormValid}
                        >
                            Register
                        </button>
                        <p className="login-link">
                            Already have an account?{" "}
                            <Link to="/login" className="link-info">
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../hooks/api";
import "../../styles/Register.css";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [district, setDistrict] = useState("");
    const [description, setDescription] = useState("");
    const [birthDate, setBirthDate] = useState(dayjs());
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const districts = [
        "Cercado de Lima",
        "Ate",
        "Barranco",
        "Breña",
        "Comas",
        "Chorrillos",
        "El Agustino",
        "Jesús María",
        "La Molina",
        "La Victoria",
        "Lince",
        "Magdalena del Mar",
        "Miraflores",
        "Pueblo Libre",
        "Puente Piedra",
        "Rímac",
        "San Isidro",
        "Independencia",
        "San Juan de Miraflores",
        "San Luis",
        "San Martín de Porres",
        "San Miguel",
        "Santiago de Surco",
        "Surquillo",
        "Villa María del Triunfo",
        "San Juan de Lurigancho",
        "Santa Rosa",
        "Los Olivos",
        "Villa El Salvador",
        "Santa Anita"
    ];

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/api/register', {
                name,
                lastName,
                username,
                email,
                district,
                birthDate: birthDate.toISOString(),
                gender,
                password,
                role: description, 
            });
            console.log("Registration successful:", response.data);
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const isFormValid =
        email.trim() !== "" &&
        password.trim() !== "" &&
        name.trim() !== "" &&
        lastName.trim() !== "" &&
        username.trim() !== "" &&
        gender.trim() !== "" &&
        district.trim() !== "" &&
        birthDate &&
        description.trim() !== "";

    return (
        <div className="app-container">
            <div className="content-container">
                <div className="register-form-container">
                    <h3 style={{ color: 'white', fontWeight: 'lighter', fontSize: '2rem' }}>Crea tu cuenta</h3>
                    <form onSubmit={handleRegister} className="register-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <input
                                    id="name"
                                    className="form-control"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nombre"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="lastName"
                                    className="form-control"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Apellido"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="username"
                                    className="form-control"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Usuario"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="email"
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="E-Mail"
                                />
                            </div>
                            <div className="form-group">
                                <TextField
                                    id="password"
                                    className="form-control"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        style: { backgroundColor: 'white' }
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {                                                     
                                            backgroundColor: 'white',                                           
                                        },                                       
                                    }}
                                />

                            </div>

                            <div className="form-group">
                                <select
                                    id="district"
                                    className="form-control"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                >
                                    <option value="">Distrito de Lima</option>
                                    {districts.map((district, index) => (
                                        <option key={index} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Fecha de Nacimiento"
                                        value={birthDate}
                                        onChange={(newValue) => setBirthDate(newValue)}
                                        renderInput={(params) => <input {...params} className="form-control" />}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {                                                     
                                                backgroundColor: 'white',                                           
                                            },                                       
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="form-group">
                                <select
                                    id="gender"
                                    className="form-control"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Género</option>
                                    <option value="female">Femenino</option>
                                    <option value="male">Masculino</option>
                                    <option value="non-binary">No Binario</option>
                                    <option value="undisclosed">Prefiero no Decir</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select
                                    id="description"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                    <option value="">Tipo de Usuario</option>
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

                        <p style={{ fontSize: '0.9rem', color: '#E8E8E8' }}>
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/login" style={{ fontSize: '0.9rem', color: '#E8E8E8' }}>Inicia Sesión</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
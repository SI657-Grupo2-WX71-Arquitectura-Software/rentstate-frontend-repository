import React, { useState } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, IconButton, Box, Avatar, Grid } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import "../styles/MyAccount.css";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { users } from "../auxiliars/MyConsts"; //Uso de db
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Save } from "@mui/icons-material";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const MyAccount = () => {

    const user = users[0]; // nota para yoru: jalamos el primer user de nuestra lista en MyConst.js
    const [isEditing, setIsEditing] = useState(false);
    const [avatarImage, setAvatarImage] = useState(user.photoUrl); 
    const [selectedDate, setSelectedDate] = useState(dayjs(user.birthDate));
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.lastName);
    const [role, setRole] = useState(user.role);
    const [gender, setGender] = useState(user.gender.toLowerCase());
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [address, setAddress] = useState(user.address);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log("Guardando cambios jeje..."); //nota para yoru: enviamos api request para actualizar datos
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatarImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="myAccount-container" style={{margin:'7rem 0'}}>
            <div className="avatar-container" style={{display:'flex', gap:'1rem', justifyContent:'left'}}>
                <div>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="upload-avatar"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="upload-avatar">
                        <IconButton component="span">
                            <Avatar 
                                alt="Avatar" 
                                src={avatarImage}
                                sx={{ width: 100, height: 100 }} 
                            />
                        </IconButton>
                    </label>
                </div>

                <div style={{fontSize:'2.2rem', fontWeight:'lighter'}}> 
                    <p> ¡Hola <span style={{color:'#1E5181', fontWeight:'normal'}}>{name} {lastName}</span>!</p>
                  
                </div>
                
            </div>

            <Box sx={{ marginTop: 3 }}>              

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Apellido"
                            variant="outlined"
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Tipo de Usuario</InputLabel>
                            <Select
                                label="Tipo de Usuario"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                disabled={!isEditing}
                            >
                                <MenuItem value="tenant">Inquilino</MenuItem>
                                <MenuItem value="owner">Propietario</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Género</InputLabel>
                            <Select
                                label="Género"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                disabled={!isEditing}
                            >
                                <MenuItem value="female">Femenino</MenuItem>
                                <MenuItem value="male">Masculino</MenuItem>
                                <MenuItem value="undisclosed">Prefiero no decir</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{marginTop:'0.5rem'}}> 
                        <TextField
                            label="Dirección"
                            variant="outlined"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} >
                                <DatePicker 
                                    label="Cumpleaños"
                                    value={selectedDate}
                                    onChange={(newValue) => setSelectedDate(newValue)}
                                    disabled={!isEditing}                                
                                /> 
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Box display="flex" alignItems="center" justifyContent='right' margin='1rem 0'>                   
                    {!isEditing && (                     
                        <Button variant="contained" color="secondary" onClick={handleEdit} sx={{ textTransform: 'none' }} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}>
                            <EditNoteIcon style={{marginRight:'0.3rem', marginTop:'-0.18rem'}}/>  Editar perfil 
                        </Button>
                    )}
                    {isEditing && (
                         <Button variant="contained" color="secondary" onClick={handleSave} sx={{ textTransform: 'none' }} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}>
                            <Save style={{marginRight:'0.3rem', marginTop:'-0.18rem'}}/>  Guardar Cambios 
                        </Button>                      
                    )}                   
                </Box>
              
            </Box>

            <div style={{display:'flex', gap:'1.8rem', width:'100%', justifyContent:'center', margin:'3rem 0rem 3rem 0rem'}}>
                <Link to="/list" style={{ textDecoration: "none" }}>
                    <div className={'category-opt'} style={{padding:'1.5rem'}}>
                        <MapsHomeWorkIcon />
                        <div className="category-text">Mis Propiedades</div>
                    </div>
                </Link>

                <Link to="/clients" style={{ textDecoration: "none" }}>
                    <div className={'category-opt'}  style={{padding:'1.5rem'}}>
                        <Diversity3Icon />
                        <div className="category-text">Mis Inquilinos</div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MyAccount;
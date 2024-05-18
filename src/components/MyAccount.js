import React, { useState } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, IconButton, Box, Avatar, Grid } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import "../styles/MyAccount.css";

const MyAccount = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [avatarImage, setAvatarImage] = useState(null);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log("Saving changes...");
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
        <div className="myAccount-container" style={{margin:'15% 0'}}>
            <div className="avatar-container">
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

            <Box sx={{ marginTop: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <h2>Información del usuario</h2>
                    {!isEditing && (
                        <IconButton className="edit-icon" aria-label="edit" onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                    )}
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>

                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            disabled={!isEditing}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <TextField
                            label="Apellido"
                            variant="outlined"
                            fullWidth
                            disabled={!isEditing}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Tipo de Usuario</InputLabel>

                            <Select
                                label="Descripción"
                                defaultValue=""
                                disabled={!isEditing}
                            >
                                <MenuItem value="">Seleccione una opción</MenuItem>
                                <MenuItem value="tenant">Inquilino</MenuItem>
                                <MenuItem value="landlord">Propietario</MenuItem>
                            </Select>
                            
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Género</InputLabel>

                            <Select
                                label="Género"
                                defaultValue=""
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
                            disabled={!isEditing}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <TextField
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            fullWidth
                            disabled={!isEditing}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <TextField
                            label="Dirección"
                            variant="outlined"
                            fullWidth
                            disabled={!isEditing}
                        />

                    </Grid>
                  
                    <Grid item xs={12} sm={6}>

                        <TextField
                            label="Edad"
                            type="number"
                            variant="outlined"
                            fullWidth
                            disabled={!isEditing}
                        />

                    </Grid>
                  
                </Grid>

                {isEditing && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        fullWidth
                        sx={{ marginTop: 3 }}
                    >
                        Guardar Cambios
                    </Button>
                )}

                <Box sx={{ marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                    <Link to="/property_rented" style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                            Propiedades Rentadas
                        </Button>
                    </Link>
                    <Link to="/list" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                            Lista de Propiedades
                        </Button>
                    </Link>
                    <Link to="/clients" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" fullWidth sx={{ textTransform: 'none' }}>
                            Mis Inquilinos
                        </Button>
                    </Link>
                </Box>

              

                <Box sx={{ marginTop: 3 }}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => console.log("Deleting account...")}
                        fullWidth
                        sx={{ textTransform: 'none' }}
                    >
                        Eliminar cuenta
                    </Button>
                </Box>

            </Box>
        </div>
    );
};

export default MyAccount;

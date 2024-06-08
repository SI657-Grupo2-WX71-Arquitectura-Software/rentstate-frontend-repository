import React, { useState, useEffect } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, IconButton, Box, Avatar, Grid, Skeleton} from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Save } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import userService from '../hooks/userService';
import "../styles/MyAccount.css";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [avatarImage, setAvatarImage] = useState(""); 
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [openDialog, setOpenDialog] = useState(false);


    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            if (!userId || !token) {
                return;
            }
            try {
                const userData = await userService.getUser(userId, token);
                setUser(userData);
                const storedAvatarImage = localStorage.getItem('avatarImage');
                if (storedAvatarImage) {
                    setAvatarImage(storedAvatarImage);
                } else {
                    setAvatarImage(userData.photoUrl);
                }
                setSelectedDate(dayjs(userData.birthDate));
                setName(userData.name);
                setLastName(userData.lastName);
                setRole(userData.role);
                setGender(userData.gender.toLowerCase());
                setUsername(userData.username);
                setPassword(userData.password);
                setDescription(userData.description);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsEditing(false);
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        try {
            const defaultPhotoUrl = "https://static.vecteezy.com/system/resources/previews/007/296/443/non_2x/user-icon-person-icon-client-symbol-profile-icon-vector.jpg";
    
            const userData = {
                id: userId,
                name,
                lastName,
                gender,
                description, 
                birthDate: selectedDate.toISOString(),
                photoUrl: defaultPhotoUrl,
                role
            };    
            await userService.updateUser(userData, token);
            console.log("Changes saved successfully");
        } catch (error) {
            if (error.response) {
                console.error("Error de servidor:", error.response.data);
            } else if (error.request) {
                console.error("No se recibió respuesta del servidor:", error.request);
            } else {
                console.error("Error al enviar la solicitud:", error.message);
            }
        }
    };
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                setAvatarImage(imageUrl);
                localStorage.setItem('avatarImage', imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClickOpen = () => {
        setOpenDialog(true);
      };
      
      const handleClose = () => {
        setOpenDialog(false);
      };
      
      const handleDelete = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        try {
          await userService.deleteUser(userId, token);
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      };

    if (!user) {
        return (
            <div className="myAccount-container" style={{ margin: '7rem 0' }}>
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                    <Skeleton variant="circular" width={100} height={100} />
                    <Skeleton variant="text" width={210} height={40} />
                    <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: '1rem' }} />
                    <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: '1rem' }} />
                </Box>
            </div>
        );
    }

    return (
        <div className="myAccount-container" style={{ margin: '7rem 0' }}>
            <div className="avatar-container" style={{ display: 'flex', gap: '1rem', justifyContent: 'left' }}>
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

                <div style={{ fontSize: '2.2rem', fontWeight: 'lighter' }}> 
                    <p> ¡Hola <span style={{ color: '#1E5181', fontWeight: 'normal' }}>{name} {lastName}</span>!</p>
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
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <Grid item xs={12} sm={6} style={{ marginTop: '0.5rem' }}> 
                        <TextField
                            label="Descripción"
                            variant="outlined"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={!isEditing}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker 
                                label="Cumpleaños"
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                disabled={!isEditing}                                
                            /> 
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                <Box display="flex" alignItems="center" justifyContent='right' margin='1rem 0'>  
                    {!isEditing && (
                        <Button variant="contained" color="secondary" onClick={handleEdit} sx={{ textTransform: 'none' }} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}>
                            <EditNoteIcon style={{ marginRight: '0.3rem', marginTop: '-0.18rem' }} />  Editar perfil 
                        </Button>
                    )}
                    {isEditing && (
                         <Button variant="contained" color="secondary" onClick={handleSave} sx={{ textTransform: 'none' }} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}>
                            <Save style={{ marginRight: '0.3rem', marginTop: '-0.18rem' }} />  Guardar Cambios 
                        </Button>                      
                    )}                   
                </Box>
              
            </Box>

            <div style={{ display: 'flex', gap: '1.8rem', width: '100%', justifyContent: 'center', margin: '3rem 0rem 3rem 0rem' }}>
                <Link to="/list" style={{ textDecoration: "none" }}>
                    <div className={'category-opt'} style={{ padding: '1.5rem' }}>
                        <MapsHomeWorkIcon />
                        <div className="category-text">Mis Propiedades</div>
                    </div>
                </Link>

                <Link to="/clients" style={{ textDecoration: "none" }}>
                    <div className={'category-opt'}  style={{ padding: '1.5rem' }}>
                        <Diversity3Icon />
                        <div className="category-text">Mis Inquilinos</div>
                    </div>
                </Link> 
            </div>

            <div style={{ display: 'flex', gap: '1.8rem', width: '100%', justifyContent: 'center', margin: '3rem 0rem 3rem 0rem' }}>
               
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="secondary" sx={{ textTransform: 'none' }} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}>
                        <LogoutIcon style={{ marginRight: '0.3rem', marginTop: '-0.18rem' }} />  Cerrar Sesión
                    </Button>
                </Link>

                <Button variant="contained" color="error" onClick={handleClickOpen} sx={{ textTransform: 'none' }} style={{ color: "white", backgroundColor: "red", padding: "0.5rem 1rem" }}>
                    <PersonRemoveIcon style={{ marginRight: '0.3rem', marginTop: '-0.18rem' }} />  Eliminar Cuenta
                </Button>

                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"> {"Eliminar Cuenta"} </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description"> ¿Está seguro de que desea eliminar su cuenta de manera permanente? Todos sus datos, chats, y propiedades se perderán. </DialogContentText>
                    </DialogContent>
                    <DialogActions>                      
                        <Button onClick={handleDelete} style={{ color: "#225E7C", padding: "0.5rem 1rem" }} sx={{ textTransform: 'none' }}>
                            Aceptar
                        </Button>
                        <Button onClick={handleClose} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}   sx={{ textTransform: 'none' }}>
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>


            </div>

        </div>
    );
};

export default MyAccount;

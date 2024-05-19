import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, Button, InputLabel, FormControl, IconButton } from '@mui/material';
import '../styles/Booking.css';
import { DeleteOutline, InsertPhoto } from '@mui/icons-material';

const AddProperty = ({ onBookingSuccess }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [distrito, setDistrito] = useState('');
    const [caracteristicas, setCaracteristicas] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [direccion, setDireccion] = useState('');

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleImageRemove = () => {
        setImagePreview(null);
    };

    const handleSubmit = () => {
        console.log('Categoria:', categoria, 
        '\nDistrito:', distrito, 
        '\nPrecio:', precio, 
        '\nDireccion:', direccion, 
        '\nCaracteristicas:', caracteristicas, 
        '\nDescripcion:', descripcion, 
        '\nImagen:', imagePreview);
    };

    return (
        <div className="bookingContainer" style={{ height: '90vh', display: 'flex', justifyContent: 'center', margin: '1rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'lighter', margin: '0rem 0 2rem 0' }}>Publica en <span style={{ fontWeight: 'normal', color: '#1E5181' }}>RENTSTATE</span></div>
            <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
                <div style={{ display: 'block' }}>
                    <div className="formColumn">
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoria}
                                label="Categoria"
                                onChange={(e) => setCategoria(e.target.value)}
                            >
                                <MenuItem value="casa">Casa</MenuItem>
                                <MenuItem value="departamento">Departamento</MenuItem>
                                <MenuItem value="oficina">Oficina</MenuItem>
                                <MenuItem value="habitacion">Habitación</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Distrito"
                            value={distrito}
                            onChange={(e) => setDistrito(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Precio"
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                    </div>
                    <div className="formColumn">
                        <TextField
                            label="Dirección"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Características"
                            value={caracteristicas}
                            onChange={(e) => setCaracteristicas(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />
                    </div>
                </div>
                <div className="formColumn" style={{ backgroundColor: '#EEEE', height: '60%', width: '40%', borderRadius: '1rem', justifyContent: 'center', display: 'block', alignContent: 'center', position: 'relative' }}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="upload-image"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="upload-image">
                        <IconButton component="span" style={{ width: '100%', height: '100%', padding: 0 }}>
                            {imagePreview ? (
                                <img
                                    alt="Imagen del Inmueble"
                                    src={imagePreview}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }}
                                />
                            ) : (
                                <InsertPhoto
                                    sx={{ width: '100%', height: '100%' }}
                                />
                            )}
                        </IconButton>
                    </label>
                    {imagePreview && (
                        <IconButton onClick={handleImageRemove} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white' }}>
                            <DeleteOutline />
                        </IconButton>
                    )}
                </div>
            </div>
            <div className="formActions" style={{ gap: '1rem', display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <Button onClick={handleBackToHome} sx={{ textTransform: 'none' }} style={{ color: "grey", padding: "0.5rem 1rem", backgroundColor: "#EEEE" }}>
                    Cancelar
                </Button>
                <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ textTransform: 'none' }} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}>
                    Publicar
                </Button>
            </div>
        </div>
    );
};
                        
export default AddProperty;
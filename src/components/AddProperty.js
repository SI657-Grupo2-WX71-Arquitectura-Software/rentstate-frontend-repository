import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, Button, InputLabel, FormControl, IconButton } from '@mui/material';
import '../styles/Booking.css';
import { DeleteOutline, InsertPhoto } from '@mui/icons-material';
import PropertyService from '../hooks/usePropertyService';

const AddProperty = ({ onBookingSuccess }) => {
    const [category, setCategory] = useState('');
    const [district, setDistrict] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [characteristics, setCharacteristics] = useState('');
    const [cardimage, setCardImage] = useState('');    
    const [price, setPrice] = useState('');
    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCardImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };



    const handleSubmit = async () => {
        try {
            const propertyData = {
                category,
                district,
                location,
                description,
                characteristics,
                cardimage,
                price,

            };
           
            const createdProperty = await PropertyService.createProperty(propertyData, userId);
            console.log('Propiedad creada:', createdProperty);
            navigate('/');            
        } catch (error) {
            console.error('Error al crear la propiedad:', error);
        }
    };

    return (
        <div className="bookingContainer" style={{ height: '90vh', display: 'flex', justifyContent: 'center', margin: '1rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'lighter', margin: '0rem 0 2rem 0' }}>Crea en <span style={{ fontWeight: 'normal', color: '#1E5181' }}>RENTSTATE</span></div>
            <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
                <div style={{ display: 'block' }}>
                    <div className="formColumn">
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Categoria"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <MenuItem value="casa">Casa</MenuItem>
                                <MenuItem value="departamento">Departamento</MenuItem>
                                <MenuItem value="oficina">Oficina</MenuItem>
                                <MenuItem value="habitacion">Habitación</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Distrito"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Precio"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                    </div>
                    <div className="formColumn">
                        <TextField
                            label="Dirección"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Características"
                            value={characteristics}
                            onChange={(e) => setCharacteristics(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />
                    </div>
                </div>
                <div className="formColumn" style={{ backgroundColor: 'white', height: '60%', width: '40%', borderRadius: '1rem', justifyContent: 'center', display: 'block', alignContent: 'center', position: 'relative' }}>
                <TextField
                    label="URL de la imagen"
                    value={cardimage}
                    onChange={(e) => setCardImage(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                {cardimage && (
                    <IconButton onClick={() => setCardImage('')} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white' }}>
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
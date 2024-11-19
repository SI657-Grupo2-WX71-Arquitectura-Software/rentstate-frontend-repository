import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Booking.css';
import PropertyService from '../hooks/usePropertyService';
import { PropertyCard } from './RentState Components/components';

const PostProperty = () => {
    const [category, setCategory] = useState('');
    const [district, setDistrict] = useState('');
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [characteristics, setCharacteristics] = useState('');
    const [price, setPrice] = useState('');
    const [cardimage, setCardImage] = useState('');
    const userId = localStorage.getItem('userId');

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

    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleSubmit = async () => {
        try {
            const propertyData = {
                category,
                district,
                location,
                latitude,
                longitude,
                description,
                characteristics,
                price,
                cardimage,
                userId: parseInt(userId), 
                available: true, 
            };

            const createdProperty = await PropertyService.createProperty(propertyData, userId);
            console.log('Propiedad creada:', createdProperty);
            toast.success('Propiedad creada exitosamente', {
                position: 'top-right',
                autoClose: 3000,
            });
            navigate('/home'); 
        } catch (error) {
            console.error('Error al crear la propiedad:', error);
            toast.error('Error al crear la propiedad', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

    const menuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            },
        },
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },
        getContentAnchorEl: null
    };

    const property = {
        cardimage: cardimage || 'https://via.placeholder.com/300x200?text=Imagen+de+Previsualización',
        district: district || 'Distrito',
        location: location || 'Locación',
        characteristics: characteristics || 'Características',
        price: price || 'Precio',
        latitude: latitude || '0',
        longitude: longitude || '0'
    };

    const owner = {
        id: 0,
        name: 'Propietario',
        lastName: '',
        photoUrl: 'https://via.placeholder.com/150'
    };

    return (
        <div className="bookingContainer" style={{ height: '100vh', display: 'flex', justifyContent: 'center', margin: '1rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'lighter', margin: '0rem 0 2rem 0' }}>Publica en <span style={{ fontWeight: 'normal', color: '#1E5181' }}>RENTSTATE</span></div>
           
            <div style={{ display: 'flex', margin: '0 30rem', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', width: '35rem' }}>
                    <div style={{ display: 'block' }}>
                        <div className="formColumn">                          
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="category-label">Categoría</InputLabel>
                                <Select
                                    labelId="category-label"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    label="Categoría"
                                    required
                                >
                                    <MenuItem value="Departamento">Departamento</MenuItem>
                                    <MenuItem value="Casa">Casa</MenuItem>
                                    <MenuItem value="Oficina">Oficina</MenuItem>
                                    <MenuItem value="Habitacion">Habitación</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="district-label">Distrito</InputLabel>
                                <Select
                                    labelId="district-label"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    label="Distrito"
                                    required
                                    MenuProps={menuProps}
                                >
                                    {districts.map((district, index) => (
                                        <MenuItem key={index} value={district}>
                                            {district}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                           
                            <TextField
                                label="Ubicación"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Latitud"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Longitud"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
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
                                label="Precio"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Imagen URL"
                                value={cardimage}
                                onChange={(e) => setCardImage(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                            />
                        </div>
                    </div>
                </div>

                <div style={{ width: '30rem', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <PropertyCard
                        property={property}
                        owner={owner}
                        onDelete={() => {}}
                        onFavoriteUpdate={() => {}}
                        isPreview={true}
                    />
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
            <ToastContainer />
        </div>
    );
}

export default PostProperty;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Select, MenuItem, Button, InputLabel, FormControl } from '@mui/material';
import '../styles/Booking.css';
import PropertyService from '../hooks/usePropertyService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProperty = () => {
    const [category, setCategory] = useState('');
    const [district, setDistrict] = useState('');
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [characteristics, setCharacteristics] = useState('');
    const [price, setPrice] = useState('');
    const [cardimage, setCardImage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

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

    const handleBackToHome = () => {
        navigate('/posts');
    };
    

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const property = await PropertyService.getPropertyById(id);
                setCategory(property.category);
                setDistrict(property.district);
                setLocation(property.location);
                setLatitude(property.latitude);
                setLongitude(property.longitude);
                setDescription(property.description);
                setCharacteristics(property.characteristics);
                setPrice(property.price);
                setCardImage(property.cardimage);
            } catch (error) {
                console.error('Error al cargar la propiedad:', error);
            }
        };

        fetchPropertyData();
    }, [id]);

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
            };

            await PropertyService.updateProperty(id, propertyData);
            toast.success('Propiedad actualizada exitosamente', {
                position: 'top-right',
                autoClose: 3000,
            });
            navigate('/posts');
        } catch (error) {
            console.error('Error al actualizar la propiedad:', error);
            toast.error('Error al actualizar la propiedad', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="bookingContainer" style={{ height: '100vh', display: 'flex', justifyContent: 'center', margin: '1rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'lighter', margin: '0rem 0 2rem 0' }}>Editar propiedad en <span style={{ fontWeight: 'normal', color: '#1E5181' }}>RENTSTATE</span></div>
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
                    <div key={1} className="card">
                        <img
                            src={cardimage || 'https://via.placeholder.com/300x200?text=Imagen+de+Previsualización'}
                            alt="Property"
                        />
                        <div className="card-details">
                            <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                                {district || 'Distrito'}
                            </p>
                            <p>{location || 'Locación'}</p>
                            <p>{characteristics || 'Características'}</p>
                            <p style={{ color: "#7a7a7a" }}>S/ {price || 'Precio'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="formActions" style={{ gap: '1rem', display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <Button onClick={handleBackToHome} sx={{ textTransform: 'none' }} style={{ color: "grey", padding: "0.5rem 1rem", backgroundColor: "#EEEE" }}>
                    Cancelar
                </Button>
                <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ textTransform: 'none' }} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}>
                    Guardar cambios
                </Button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default EditProperty;
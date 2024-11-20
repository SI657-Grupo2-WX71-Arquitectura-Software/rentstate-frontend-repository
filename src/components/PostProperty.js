import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Booking.css';
import PropertyService from '../hooks/usePropertyService';
import ToastManager from './RentState Components/ToastManager';
import { EmailIOTCredentials } from './EmailManagement/EmailIOTCredentials';
import AskForSecurityModal from './Modals/AskForSecurityModal';
import SecurityCredentialsModal from './Modals/SecurityCredentialsModal';
import UploadPropertyPhotosModal from './Modals/UploadPropertyPhotosModal';

const PostProperty = () => {
    const [category, setCategory] = useState('');
    const [district, setDistrict] = useState('');
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [characteristics, setCharacteristics] = useState('');
    const [price, setPrice] = useState('');
    const [cardimage, setCardImage] = useState([]);
    const [open, setOpen] = useState(false);
    const [openCredentials, setOpenCredentials] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const [createdPropertyId, setCreatedPropertyId] = useState(null);
    const userId = localStorage.getItem('userId');

    const districts = [ "Cercado de Lima", "Ate", "Barranco", "Breña", "Comas", "Chorrillos", "El Agustino", "Jesús María", "La Molina", "La Victoria", "Lince", "Magdalena del Mar", "Miraflores", "Pueblo Libre", "Puente Piedra", "Rímac", "San Isidro", "Independencia", "San Juan de Miraflores", "San Luis", "San Martín de Porres", "San Miguel", "Santiago de Surco", "Surquillo", "Villa María del Triunfo", "San Juan de Lurigancho", "Santa Rosa", "Los Olivos", "Villa El Salvador", "Santa Anita" ];

    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setCardImage(files);
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
                cardimage: [], 
                userId: parseInt(userId), 
                available: true, 
            };

            const createdProperty = await PropertyService.createProperty(propertyData, userId);
            console.log('Propiedad creada:', createdProperty);

            if (cardimage.length > 0) {
                await PropertyService.uploadPropertyPhotos(createdProperty.id, cardimage);
                console.log('Imágenes subidas exitosamente');
            }

            setCreatedPropertyId(createdProperty.id);

            setOpen(true);
          
        } catch (error) {
            console.error('Error al crear la propiedad:', error);
            ToastManager.error('Error al crear la propiedad');
        }
    };

    const handleAccept = async () => {
        try {
            await EmailIOTCredentials(setOpen, setOpenCredentials)
        } catch (error) {
            console.error('Error en handleAccept:', error)
        }
    }

    const handleReject = () => {
        navigate('/home');
    };

    const handleContinue = () => {
        setOpenCredentials(false);
        setOpenUpload(true);
    };

    const handleUploadImages = async () => {
        try {
            if (cardimage.length > 0) {
                await PropertyService.uploadPropertyPhotos(createdPropertyId, cardimage);
                console.log('Imágenes adicionales subidas exitosamente');
            }
            ToastManager.success('Imágenes adicionales subidas exitosamente', {
                position: 'top-right',
                autoClose: 3000,
            });
            setOpenUpload(false);
            navigate('/home');
        } catch (error) {
            console.error('Error al subir las imágenes adicionales:', error);
            ToastManager.error('Error al subir las imágenes adicionales', {
                position: ToastManager.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
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
                        </div>
                    </div>
                </div>

            </div>

            <div className="formActions" style={{ gap: '1rem', display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <Button onClick={handleBackToHome} sx={{ textTransform: 'none' }} style={{ color: "grey", padding: "0.5rem 1rem", backgroundColor: "#EEEE" }}>
                    Cancelar
                </Button>
                <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ textTransform: 'none' }} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}>
                    Continuar
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setOpenUpload(true)} sx={{ textTransform: 'none' }} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}>
                    A ver modal 
                </Button>
            </div>

            <AskForSecurityModal
                open={open}
                handleReject={handleReject}
                handleAccept={handleAccept}
            />
            
            <SecurityCredentialsModal
                open={openCredentials}
                handleReject={handleReject}
                handleContinue={handleContinue}
            />

            <UploadPropertyPhotosModal
                open={openUpload}
                handleClose={() => setOpenUpload(false)}
                handleFileChange={handleFileChange}
                handleUploadImages={handleUploadImages}
            />
        </div>
    );
}

export default PostProperty;
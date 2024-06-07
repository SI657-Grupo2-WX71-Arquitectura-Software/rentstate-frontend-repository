import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify'; // Importa react-toastify
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Booking.css';
import PostService from '../hooks/usePostService';

const MyPublish = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');    
    const [price, setPrice] = useState('');
    const [propertyId, setPropertyId] = useState('');
    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleSubmit = async () => {
        try {
            const postData = {
                title,
                content,
                price,
                propertyId,
                userId,
            };
            const createdPost = await PostService.createPost(postData);
            console.log('Post creada:', createdPost);

            // Muestra la notificación de éxito
            toast.success('Publicación creada exitosamente', {
                position: 'top-right',
                autoClose: 3000,
            });

        } catch (error) {
            // Manejar el error adecuadamente, como mostrar un mensaje de error al usuario
            console.error('Error al crear la propiedad:', error);
            toast.error('Error al crear la publicación', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="bookingContainer" style={{ height: '90vh', display: 'flex', justifyContent: 'center', margin: '1rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'lighter', margin: '0rem 0 2rem 0' }}>Publica en <span style={{ fontWeight: 'normal', color: '#1E5181' }}>RENTSTATE</span></div>
            <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
                <div style={{ display: 'block' }}>
                    <div className="formColumn">
                        <TextField
                            label="Titulo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Contenido"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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
                            label="Propiedad ID"
                            value={propertyId}
                            onChange={(e) => setPropertyId(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                    </div>
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

export default MyPublish;

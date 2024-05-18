import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, Typography, Button, Avatar, Grid, Snackbar } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import MapIcon from '@mui/icons-material/Map';
import Booking from '../components/Booking';
import '../styles/CardDetail.css';
import { properties } from '../auxiliars/MyConsts';
import Comments from '../components/Comments'; // Importa el componente Comments

function CardDetail() {
    const { id } = useParams(); // Obtener propertyId de la URL
    const propertyId = parseInt(id);

    const [rentSuccess, setRentSuccess] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleBookingSuccess = () => {
        setRentSuccess(true);
        setSnackbarOpen(true); // Abrir el Snackbar al aceptar la reserva exitosa
    };

    const selectedProperty = properties.find((property) => property.id === propertyId);

    if (!selectedProperty) {
        return <div>No se encontró la propiedad con el ID {propertyId}</div>;
    }

    const { cardimage, category, district, address, details, price } = selectedProperty;

    const handleSnackbarClose = () => {
        setSnackbarOpen(false); // Cerrar el Snackbar
    };

    return (
        <div className="cardDetails">
            <Card>
                <CardHeader title={category} subheader={`${district}, ${address}`} />
                <CardContent>
                    <Grid container spacing={2} className="grid_container">
                        <Grid item xs={6}>
                        <div className="avatarContainer">
                            <Avatar alt="Avatar" src="/path-to-your-avatar.jpg" />
                            <Typography variant="subtitle1" className="avatarName">
                            John
                            </Typography>
                        </div>
                        </Grid>
                    </Grid>

                    <img src={cardimage} alt="Property" className="propertyImage" />
                    <Typography variant="body1" color="textSecondary" component="p">
                        {details}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        $ {price}
                    </Typography>
                    <div className="cardActions">
                        <Button variant="contained" color="primary" startIcon={<MessageIcon />} fullWidth>
                        Enviar Mensaje
                        </Button>
                        <Button variant="outlined" color="primary" startIcon={<MapIcon />} fullWidth>
                        Ver en Mapa
                        </Button>

                        {/* Renderiza el componente Booking para seleccionar fechas */}
                        <Booking onBookingSuccess={handleBookingSuccess} />

                        {/* Snackbar para mostrar "Renta exitosa" */}
                        <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000} // Duración en milisegundos
                        onClose={handleSnackbarClose}
                        message="¡Renta exitosa!"
                        ContentProps={{
                            style: { backgroundColor: 'green', color: 'white' },
                        }}
                        />
                    </div>
                    <Comments />
                </CardContent>
            </Card>
        </div>
    );
    }

export default CardDetail;

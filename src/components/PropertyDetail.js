import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, Typography, Button, Avatar, Grid } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import MapIcon from '@mui/icons-material/Map';
import '../styles/PropertyDetail.css';
import { properties } from '../auxiliars/MyConsts';
import Comments from './Comments'; 

function PropertyDetail() {
    const { id } = useParams(); 
    const propertyId = parseInt(id);


 
    const selectedProperty = properties.find((property) => property.id === propertyId);

    if (!selectedProperty) {
        return <div>No se encontró la propiedad con el ID {propertyId}</div>;
    }

    const { cardimage, category, district, address, details, price } = selectedProperty;



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

                      
                    

                   
                   
                    </div>
                    <Comments />
                </CardContent>
            </Card>
        </div>
    );
    }

export default PropertyDetail;

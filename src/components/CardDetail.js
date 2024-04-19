import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, Typography, Button } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import MapIcon from '@mui/icons-material/Map';
import '../styles/CardDetail.css';
import { properties } from '../auxiliars/MyConsts';

function CardDetail() {
  const { id } = useParams(); // Obtener propertyId de la URL
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
          <img src={cardimage} alt="Property" className="propertyImage" />
          <Typography variant="body1" color="textSecondary" component="p">
            {details}
          </Typography>
          <Typography variant="h5" component="h2">
            $ {price}
          </Typography>
        </CardContent>
        <div className="cardActions">
          <Button variant="contained" color="primary" startIcon={<MessageIcon />} fullWidth>
            Send a Message
          </Button>
          <Button variant="outlined" color="primary" startIcon={<MapIcon />} fullWidth>
            View on Map
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CardDetail;

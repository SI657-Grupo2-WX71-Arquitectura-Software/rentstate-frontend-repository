import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import '../styles/Clients.css';
import PropertyService from '../hooks/usePropertyService';

const Clients = () => {
  const [interestedClients, setInterestedClients] = useState([]);

  useEffect(() => {
    const fetchInterestedClients = async () => {
      try {
        // Realiza la solicitud para obtener todas las propiedades
        const properties = await PropertyService.getAllProperties();
        
        // Filtra los nombres de los usuarios interesados
        const clients = properties.reduce((clientsArray, property) => {
          if (property.interest && property.interest.length > 0) {
            property.interest.forEach(interest => {
              if (!clientsArray.includes(interest.userName)) {
                clientsArray.push(interest.userName);
              }
            });
          }
          return clientsArray;
        }, []);

        setInterestedClients(clients);
      } catch (error) {
        console.error('Error al obtener los clientes interesados:', error);
      }
    };

    fetchInterestedClients();
  }, []);

  return (
    <div className="clients">
      <Typography variant="h6" gutterBottom>
        Clientes Interesados:
      </Typography>

      {interestedClients.length > 0 ? (
        interestedClients.map(clientName => (
          <div key={clientName} className="interestedClient">
            <Typography>{clientName}</Typography>
            <div className="interest_button">
              <Button
                variant="outlined"
                color="primary"
                className="accept_button"
              >
                Aceptar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
              >
                Rechazar
              </Button>
            </div>
          </div>
        ))
      ) : (
        <Typography>No hay clientes interesados.</Typography>
      )}

    </div>
  );
};

export default Clients;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PropertyDetail.css';
import PropertyService from '../hooks/usePropertyService';
import userService from '../hooks/userService'; // Importamos el userService
import { Avatar } from '@mui/material';

const PropertyDetail = () => {
    const { id } = useParams();
    const propertyId = parseInt(id);
    const [property, setProperty] = useState(null);
    const [owner, setOwner] = useState(null); // Estado para almacenar la información del propietario

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await PropertyService.getPropertyById(propertyId);
                setProperty(response);

                // Obtenemos la información del propietario usando el userService
                const ownerInfo = await userService.getUser(response.userId);
                setOwner(ownerInfo);
            } catch (error) {
                console.error(`Error al obtener la propiedad con ID ${propertyId}:`, error);
            }
        };

        fetchProperty();
    }, [propertyId]);

    if (!property || !owner) {
        return <div>Cargando...</div>;
    }

    const { cardimage, district, location, characteristics, price } = property;
    const { name, lastName } = owner;

    return (
        <div className="myAccount-container" style={{ margin: '7rem 0' }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <img src={cardimage} alt="Property" style={{ width: '60%' }} />
                <div style={{ display: 'block', textAlign: 'left' }}>
                    <p style={{ fontWeight: 'bolder' }}>{district}</p>
                    <p>{location}</p>
                    <p>{characteristics}</p>
                    <p>S/. {price}</p>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', alignItems: 'center' }}>
                        <div>
                            <Avatar alt="Avatar" src="/path-to-your-avatar.jpg" />
                        </div>
                        <div>
                                <div>Propietario: {name.charAt(0).toUpperCase() + name.slice(1)} {lastName.charAt(0).toUpperCase() + lastName.slice(1)}</div>
                                <div>{location}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;

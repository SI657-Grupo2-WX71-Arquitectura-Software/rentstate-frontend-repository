import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUser } from '../hooks/useUserService';
import PropertyService from '../hooks/usePropertyService';
import { Avatar, Skeleton, Typography, Box, Button } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import PlaceIcon from "@mui/icons-material/Place";

const ExternalProfileDetails = () => {
    const { id } = useParams();
    const [owner, setOwner] = useState(null);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const ownerInfo = await getUser(id);
                setOwner(ownerInfo);
                const userProperties = await PropertyService.getPropertiesByUserId(id);
                setProperties(userProperties);
                setLoading(false);
            } catch (error) {
                console.error(`Error al obtener el usuario con ID ${id}:`, error);
            }
        };

        fetchOwner();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Skeleton variant="circular" width={100} height={100} />
                <Skeleton variant="text" width={210} height={40} />
                <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: '1rem' }} />
                <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: '1rem' }} />
            </Box>
        );
    }

    const { name, lastName, gender, description, photoUrl } = owner;

    const filteredProperties = properties.filter(property => property.available && property.userId === owner.id);

    return (
        <div>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" style={{ margin: '8rem 0 5rem 0', gap: '0.6rem' }}>
                <Avatar alt="Avatar" src={photoUrl || '/default-avatar.jpg'} sx={{ width: 100, height: 100 }} />
                <Typography variant="h5">{`${name.charAt(0).toUpperCase() + name.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`}</Typography>
                <Typography variant="body1">{`Género: ${gender.charAt(0).toUpperCase() + gender.slice(1)}`}</Typography>
                <Typography variant="body1">{description}</Typography>

                <Button style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem", margin:'1rem' }}   sx={{ textTransform: 'none' }}>
                    <MessageIcon style={{ marginRight: '0.3rem', marginTop: '-0.18rem' }} /> Enviar Mensaje
                </Button>
            </Box>

            <div>
                <p style={{fontSize:'1.4rem', fontWeight:'normal'}}>Todas las Propiedades de {`${name.charAt(0).toUpperCase() + name.slice(1)}`} </p>
               
                    <div className="grid-properties">
                        {filteredProperties.map((property, index) => (
                            <div key={index} className="card">
                                <Link to={`/property/${property.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                    <img src={property.cardimage} alt="Property" />
                                    <div className="card-details">
                                        <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem", color: property.available ? "inherit" : "#C91A1A" }}>
                                            {property.district}
                                        </p>
                                        <p>{property.location}</p>
                                        <p>{property.characteristics}</p>
                                        <p style={{ color: "#7a7a7a" }}>S/ {property.price}</p>
                                        <a href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`} target="_blank" rel="noopener noreferrer">
                                            Ver Mapa
                                            <PlaceIcon style={{ fontSize: '1.2rem' }} />
                                        </a>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    );
};

export default ExternalProfileDetails;
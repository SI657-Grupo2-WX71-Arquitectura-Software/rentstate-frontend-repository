import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/PropertyDetail.css';
import PropertyService from '../hooks/usePropertyService';
import userService from '../hooks/useUserService';
import { Avatar, Skeleton, Button } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlaceIcon from "@mui/icons-material/Place";

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const propertyId = parseInt(id);
    const [property, setProperty] = useState(null);
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [googleLoaded, setGoogleLoaded] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await PropertyService.getPropertyById(propertyId);
                setProperty(response);

                const ownerInfo = await userService.getUser(response.userId);
                setOwner(ownerInfo);
                setLoading(false);
            } catch (error) {
                console.error(`Error al obtener la propiedad con ID ${propertyId}:`, error);
                setLoading(false);
            }
        };

        fetchProperty();
    }, [propertyId]);

    const handleOwnerClick = () => {
        const currentUserId = localStorage.getItem('userId');
        if (property && property.userId.toString() === currentUserId) {
            navigate(`/perfil`);
        } else {
            navigate(`/external-profile/${owner?.id}`);
        }
    };

    const handleGoogleMapsApiLoad = () => {
        setGoogleLoaded(true);
    };

    if (loading) {
        return (
            <div className="myAccount-container" style={{ margin: '7rem 0' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Skeleton variant="rectangular" width="60%" height={300} />
                    <div style={{ display: 'block', textAlign: 'left' }}>
                        <Skeleton variant="text" width="80%" height={30} />
                        <Skeleton variant="text" width="60%" height={30} />
                        <Skeleton variant="text" width="50%" height={30} />
                        <Skeleton variant="text" width="40%" height={30} />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', alignItems: 'center' }}>
                            <Skeleton variant="circular" width={40} height={40} />
                            <div>
                                <Skeleton variant="text" width={100} height={30} />
                                <Skeleton variant="text" width={150} height={30} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const { cardimage = '', district = '', location = '', characteristics = '', price = '', latitude = '', longitude = '' } = property || {};
    const { name = '', lastName = '', photoUrl = '' } = owner || {};

    const handleClickMap = () => {
        console.log("Ir a Google Maps");
    };

    const mapContainerStyle = {
        height: '400px',
        width: '100%',
    };

    const center = {
        lat: parseFloat(latitude) || 0,
        lng: parseFloat(longitude) || 0,
    };

    return (
        <div className="myAccount-container" style={{ margin: '7rem 0' }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <img src={cardimage} alt="Property" style={{ width: '60%' }} />
                <div style={{ display: 'block', textAlign: 'left' }}>
                    <p style={{ fontWeight: 'bolder' }}>{district}</p>
                    <p>{location}</p>
                    <p>{characteristics}</p>
                    <p>S/. {price}</p>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', alignItems: 'center', cursor: 'pointer' }} onClick={handleOwnerClick}>
                        <div>
                            <Avatar alt="Avatar" src={photoUrl || '/default-avatar.jpg'} />
                        </div>
                        <div>
                            <div>Propietario: {name.charAt(0).toUpperCase() + name.slice(1)} {lastName.charAt(0).toUpperCase() + lastName.slice(1)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
                <LoadScript googleMapsApiKey="AIzaSyCBij6DbsB8SQC_RRKm3-X07RLmvQEnP9w" onLoad={handleGoogleMapsApiLoad}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={15}
                    >
                        {googleLoaded && (
                            <Marker
                                position={center}
                                icon={{
                                    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                    scaledSize: new window.google.maps.Size(40, 40),
                                }}
                            />
                        )}
                    </GoogleMap>
                </LoadScript>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <Button variant="contained" color="secondary" href={`https://www.google.com/maps?q=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer" sx={{ textTransform: 'none' }} onClick={handleClickMap} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }}>
                        <PlaceIcon style={{ marginRight: '0.3rem', marginTop: '-0.18rem' }} />  Ir a Google Maps
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
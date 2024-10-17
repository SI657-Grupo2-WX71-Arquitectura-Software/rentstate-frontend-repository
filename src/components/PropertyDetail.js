import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/PropertyDetail.css';
import PropertyService from '../hooks/usePropertyService';
import { Avatar, Skeleton, Button, List, ListItem, ListItemAvatar, ListItemText, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlaceIcon from "@mui/icons-material/Place";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { getUser } from '../hooks/useUserService';

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const propertyId = parseInt(id);
    const [property, setProperty] = useState(null);
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [googleLoaded, setGoogleLoaded] = useState(false);
    const [interestedUsers, setInterestedUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [interestAdded, setInterestAdded] = useState(false);
    const [propertyAvailable, setPropertyAvailable] = useState(true);
    const isHomePage = (pathname) => {
        return pathname === '/';
    };
    const { cardimage = '', district = '', location = '', characteristics = '', price = '', latitude = '', longitude = '', userId } = property || {};
    const { name = '', lastName = '', photoUrl = '' } = owner || {};
    const [selectedUser, setSelectedUser] = useState(null);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    

    const fetchProperty = useCallback(async () => {
        try {
            const response = await PropertyService.getPropertyById(propertyId);
            setProperty(response);
    
            const ownerInfo = await getUser(response.userId);
            setOwner(ownerInfo);
            setLoading(false);
    
            const usersPromises = response.interestedUserIds.map(userId => getUser(userId));
            const usersDetails = await Promise.all(usersPromises);
            setInterestedUsers(usersDetails);
    
            if (response.available === false) {
                setPropertyAvailable(false);
            }
    
            const userId = localStorage.getItem('userId');
            if (userId && response.interestedUserIds.includes(parseInt(userId))) {
                setInterestAdded(true);
            }
    
        } catch (error) {
            console.error(`Error al obtener la propiedad con ID ${propertyId}:`, error);
        }
    }, [propertyId]);
    
    useEffect(() => {
        fetchProperty();
    
        const storedInterest = localStorage.getItem(`property-interest-${propertyId}`);
        if (storedInterest) {
            setInterestAdded(true);
        }
    
        const fromProfile = localStorage.getItem('fromProfile');
        if (fromProfile) {
            localStorage.removeItem('fromProfile');
        }
    }, [fetchProperty, propertyId, location.pathname]);

    
  
    

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setOpenConfirmationDialog(true);
    };

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

    const currentUserId = localStorage.getItem('userId');

    const handleRenewProperty = async () => {
        try {
            await PropertyService.renewPropertyAvailability(propertyId);
            setProperty(prevProperty => ({ ...prevProperty, available: true }));
            alert('La propiedad ha sido habilitada exitosamente.');
        } catch (error) {
            console.error('Error al habilitar la propiedad:', error);
            alert('Hubo un error al habilitar la propiedad.');
        }
    };

    const handleMarkUnavailable = async () => {
        try {
            await PropertyService.markPropertyUnavailable(propertyId);
            setProperty(prevProperty => ({ ...prevProperty, available: false }));
            alert('La propiedad ha sido deshabilitada exitosamente.');
        } catch (error) {
            console.error('Error al deshabilitar la propiedad:', error);
            alert('Hubo un error al deshabilitar la propiedad.');
        }
    };   

    const handleConfirmSendInterest = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const interestData = { userId: parseInt(userId) }; 
                await PropertyService.addInterestToProperty(property.id, interestData);
                alert('Solicitud de interés enviada exitosamente.');
            } else {
                alert('No se pudo obtener el ID del usuario. Por favor, inicia sesión.');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud de interés:', error);
            alert('Hubo un error al enviar la solicitud de interés.');
        } finally {
            handleCloseDialog();
        }
    };
    
    const handleConfirmUser = async () => {
        try {
            await PropertyService.markPropertyUnavailable(property.id);
            alert(`¡${selectedUser.name} ${selectedUser.lastName} es ahora tu inquilino oficial!`);
            setOpenConfirmationDialog(false);
            setPropertyAvailable(false);
            fetchProperty(); 
        } catch (error) {
            console.error('Error al deshabilitar la propiedad:', error);
        }
    };
    
    

    return (
        <div className="myAccount-container" style={{ margin: '7rem 0' }}>

            {currentUserId && property.userId.toString() === currentUserId && (
                <>
                    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                        {property.available ? (
                            <Typography variant="h6" style={{ color: 'green' }}>
                                Actualmente Disponible
                            </Typography>
                        ) : (
                            <Typography variant="h6" style={{ color: 'red' }}>
                                Actualmente No Disponible
                            </Typography>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1.8rem', width: '100%', justifyContent: 'center', margin: '3rem 0rem 3rem 0rem' }}>
                        <div className={'category-opt'} style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={handleRenewProperty}>
                            <CheckCircleIcon/>
                            <div className="category-text">Habilitar propiedad</div>
                        </div>
                        <div className={'category-opt'} style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={handleMarkUnavailable}>
                            <ThumbDownAltIcon/>
                            <div className="category-text">Deshabilitar propiedad</div>
                        </div>
                    </div>

                </>             
            )}

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
            {currentUserId && property.userId.toString() === currentUserId && property.available && (
                <div style={{ marginTop: '2rem', margin:'5rem 8rem' }}>
                    <h3 style={{fontWeight:'normal'}}>Usuarios interesados</h3>
                    {interestedUsers.length === 0 ? (
                        <Typography variant="subtitle1">
                            Esta propiedad no tiene usuarios interesados.
                        </Typography>
                    ) : (
                        <List>
                            {interestedUsers.map((user, index) => (
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar src={user.photoUrl || '/default-avatar.jpg'} />
                                    </ListItemAvatar>
                                    <ListItemText primary={`${user.name} ${user.lastName}`} />
                                    <CheckCircleIcon 
                                        style={{ color: 'gray', cursor: 'pointer' }} 
                                        onClick={() => handleUserClick(user)}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </div>
            )}
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

         

            <Dialog
                open={openConfirmationDialog}
                onClose={() => setOpenConfirmationDialog(false)}
            >
                <DialogTitle>Confirmar inquilino</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Seguro quieres que {selectedUser?.name} {selectedUser?.lastName} sea tu inquilino oficial?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmationDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmUser} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>


            {currentUserId && property.userId.toString() !== currentUserId && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <div 
                        className={'category-opt'} 
                        style={{ 
                            padding: '1.5rem', 
                            cursor: interestAdded ? 'not-allowed' : 'pointer', 
                            pointerEvents: interestAdded ? 'none' : 'auto' 
                        }} 
                        onClick={interestAdded ? null : handleOpenDialog}
                    >
                        <CheckCircleIcon />
                        <div className="category-text">{interestAdded ? 'Ya envió su solicitud' : 'Enviar solicitud de interés'}</div>
                    </div>
                </div>
            )}



            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmar solicitud de interés"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas enviar una solicitud de interés para esta propiedad?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmSendInterest} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>



     

        </div>
    );
};

export default PropertyDetail;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../styles/PropertyDetail.css';
import PropertyService from '../hooks/usePropertyService';
import userService from '../hooks/useUserService';
import { Avatar, Skeleton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, IconButton, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obtener la ruta actual
    const propertyId = parseInt(id);
    const [property, setProperty] = useState(null);
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [openRenewConfirmation, setOpenRenewConfirmation] = useState(false); // Estado para confirmación de renovar propiedad
    const [interestAdded, setInterestAdded] = useState(false);
    const [interestedUsers, setInterestedUsers] = useState([]);
    const [verifiedUsers, setVerifiedUsers] = useState([]); // Estado para usuarios verificados
    const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado
    const [propertyAvailable, setPropertyAvailable] = useState(true); // Estado para la disponibilidad de la propiedad

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await PropertyService.getPropertyById(propertyId);
                setProperty(response);

                const ownerInfo = await userService.getUser(response.userId);
                setOwner(ownerInfo);
                setLoading(false);

                // Obtener detalles de los usuarios interesados solo si no es la página de inicio
                if (!isHomePage(location.pathname)) {
                    const usersPromises = response.interestedUserIds.map(userId => userService.getUser(userId));
                    const usersDetails = await Promise.all(usersPromises);
                    setInterestedUsers(usersDetails);
                }

                // Verificar si la propiedad está disponible
                if (response.available === false) {
                    setPropertyAvailable(false);
                }
            } catch (error) {
                console.error(`Error al obtener la propiedad con ID ${propertyId}:`, error);
            }
        };

        fetchProperty();

        const storedInterest = localStorage.getItem(`property-interest-${propertyId}`);
        if (storedInterest) {
            setInterestAdded(true);
        }

        const fromProfile = localStorage.getItem('fromProfile');
        if (fromProfile) {
            localStorage.removeItem('fromProfile');
        }
    }, [propertyId, location.pathname]); // Agregar location.pathname como dependencia

    const handleAddInterest = () => {
        if (!interestAdded) {
            setOpenConfirmation(true);
        }
    };

    const handleAddConfirmed = async () => {
        try {
            await PropertyService.addInterestToProperty(propertyId);
            alert('¡Interés añadido correctamente!');
            setInterestAdded(true);
            localStorage.setItem(`property-interest-${propertyId}`, 'added');
        } catch (error) {
            console.error(`Error al añadir interés a la propiedad con ID ${propertyId}:`, error);
            alert('Error al intentar añadir interés. Por favor, inténtalo de nuevo.');
        }
        setOpenConfirmation(false); // Cerrar el diálogo después de confirmar el interés
    };

    const handleCancelAdd = () => {
        setOpenConfirmation(false);
    };

    const handleRentProperty = async () => {
        try {
            await PropertyService.markPropertyUnavailable(propertyId);
            alert('Propiedad rentada exitosamente');
            setPropertyAvailable(false); // Actualizar estado de disponibilidad
            setOpenConfirmation(false); // Cerrar el diálogo después de rentar la propiedad
            // Aquí podrías redirigir o actualizar la lista de interesados después de marcar como no disponible
            // Por ejemplo, redirigir a la página de inicio o actualizar la lista de usuarios interesados.
        } catch (error) {
            console.error(`Error al marcar la propiedad con ID ${propertyId} como no disponible:`, error);
            alert('Error al intentar marcar la propiedad como no disponible. Por favor, inténtalo de nuevo.');
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setOpenConfirmation(true);
    };

    const handleRenewClick = () => {
        setOpenRenewConfirmation(true);
    };

    const handleRenewConfirmed = async () => {
        try {
            await PropertyService.renewPropertyAvailability(propertyId);
            alert('Propiedad renovada exitosamente');
            setPropertyAvailable(true); // Actualizar estado de disponibilidad
            setOpenRenewConfirmation(false); // Cerrar el diálogo después de renovar la propiedad
        } catch (error) {
            console.error(`Error al intentar renovar la propiedad con ID ${propertyId}:`, error);
            alert('Error al intentar renovar la propiedad. Por favor, inténtalo de nuevo.');
        }
    };

    const handleCancelRenew = () => {
        setOpenRenewConfirmation(false);
    };

    // Función para verificar si la ruta es la página de inicio
    const isHomePage = (path) => {
        return path === '/' || path.startsWith('/home');
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

    const { cardimage, district, location: propertyLocation, characteristics, price } = property;
    const { name, lastName, photoUrl } = owner;

    const handleOwnerClick = () => {
        navigate(`/external-profile/${owner.id}`);
    };

    console.log(propertyAvailable)
    return (
        <div className="myAccount-container" style={{ margin: '7rem 0' }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <img src={cardimage} alt="Property" style={{ width: '60%' }} />
                <div style={{ display: 'block', textAlign: 'left' }}>
                    <p style={{ fontWeight: 'bolder' }}>{district}</p>
                    <p>{propertyLocation}</p>
                    <p>{characteristics}</p>
                    <p>S/. {price}</p>

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAddInterest}
                        disabled={interestAdded || !propertyAvailable} // Deshabilitar si ya se añadió interés o la propiedad no está disponible
                        style={{ marginTop: '1rem', cursor: !propertyAvailable ? 'not-allowed' : 'pointer', backgroundColor: !propertyAvailable ? '#e0e0e0' : '' }}
                    >
                        {interestAdded ? 'Añadido' : 'Añadir'}
                    </Button>

                    <Dialog open={openConfirmation} onClose={handleCancelAdd}>
                        <DialogTitle>¿Estás seguro de querer rentar esta propiedad?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Al rentar esta propiedad, ya no estará disponible para otros usuarios.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancelAdd} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={handleRentProperty} color="primary">
                                Aceptar
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openRenewConfirmation} onClose={handleCancelRenew}>
                        <DialogTitle>¿Estás seguro de querer renovar la disponibilidad de esta propiedad?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Al renovar esta propiedad, estará disponible nuevamente para otros usuarios.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancelRenew} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={handleRenewConfirmed} color="primary">
                                Aceptar
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '3 rem', alignItems: 'center', cursor: 'pointer' }} onClick={handleOwnerClick}>
                        <div>
                            <Avatar alt="Avatar" src={photoUrl || '/default-avatar.jpg'} />
                        </div>
                        <div>
                            <div>Propietario: {name.charAt(0).toUpperCase() + name.slice(1)} {lastName.charAt(0).toUpperCase() + lastName.slice(1)}</div>
                            <div>{propertyLocation}</div>
                        </div>
                    </div>

                    
                    {!propertyAvailable && (
                        <>
                            <h3 style={{ marginTop: '2rem' }}>Inquilinos que desean rentar:</h3>
                            <List>
                                {interestedUsers.length === 0 ? (
                                    <Typography variant="subtitle1">
                                        No hay inquilinos interesados.
                                    </Typography>
                                ) : (
                                    interestedUsers.map((user, index) => (
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar src={user.photoUrl || '/default-avatar.jpg'} />
                                            </ListItemAvatar>
                                            <ListItemText primary={`${user.name} ${user.lastName}`} secondary={user.email} />
                                            <IconButton onClick={() => handleUserClick(user)} disabled={!propertyAvailable}>
                                                <CheckCircleIcon style={{ color: !propertyAvailable ? '#bdbdbd' : 'green' }} />
                                            </IconButton>
                                            {/* Nuevo botón para renovar disponibilidad */}
                                            <IconButton onClick={handleRenewClick}>
                                                <RefreshIcon />
                                            </IconButton>
                                        </ListItem>
                                    ))
                                )}
                            </List>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;

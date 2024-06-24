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
    const location = useLocation(); 
    const propertyId = parseInt(id);
    const [property, setProperty] = useState(null);
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [openRenewConfirmation, setOpenRenewConfirmation] = useState(false); 
    const [interestAdded, setInterestAdded] = useState(false);
    const [interestedUsers, setInterestedUsers] = useState([]);
    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); 
    const [propertyAvailable, setPropertyAvailable] = useState(true); 

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await PropertyService.getPropertyById(propertyId);
                setProperty(response);

                const ownerInfo = await userService.getUser(response.userId);
                setOwner(ownerInfo);
                setLoading(false);

                if (!isHomePage(location.pathname)) {
                    const usersPromises = response.interestedUserIds.map(userId => userService.getUser(userId));
                    const usersDetails = await Promise.all(usersPromises);
                    setInterestedUsers(usersDetails);
                }

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
    }, [propertyId, location.pathname]); 

    const handleAddInterest = async () => {
        if (!interestAdded) {
            setOpenConfirmation(true);
        }
    };

    const handleAddConfirmed = async () => {
        try {
            await PropertyService.addInterestToProperty(propertyId);
            alert('¡Interés añadido correctamente!');

            const currentUser = await userService.getUser(owner.id);
            setInterestedUsers(prevUsers => [...prevUsers, currentUser]);

            setInterestAdded(true);
            localStorage.setItem(`property-interest-${propertyId}`, 'added');
        } catch (error) {
            console.error(`Error al añadir interés a la propiedad con ID ${propertyId}:`, error);
            alert('Error al intentar añadir interés. Por favor, inténtalo de nuevo.');
        }
        setOpenConfirmation(false);
    };

    const handleCancelAdd = () => {
        setOpenConfirmation(false);
    };

    const handleRentProperty = async () => {
        try {
            await PropertyService.markPropertyUnavailable(propertyId);
            alert('Propiedad rentada exitosamente');
            setPropertyAvailable(false); 
            setOpenConfirmation(false); 
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
            setPropertyAvailable(true); 
            setOpenRenewConfirmation(false); 
        } catch (error) {
            console.error(`Error al intentar renovar la propiedad con ID ${propertyId}:`, error);
            alert('Error al intentar renovar la propiedad. Por favor, inténtalo de nuevo.');
        }
    };

    const handleCancelRenew = () => {
        setOpenRenewConfirmation(false);
    };

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
                        disabled={interestAdded} 
                        style={{ marginTop: '1rem', cursor: 'pointer' }}
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
                                <IconButton onClick={handleRenewClick}>
                                    <RefreshIcon />
                                </IconButton>
                            </ListItem>
                        ))
                    )}
                </List>
            </div>
        </div>
    </div>
);

};

export default PropertyDetail;

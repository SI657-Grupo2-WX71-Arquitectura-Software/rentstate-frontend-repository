import React, { useState, useEffect } from 'react';
import { interestedZonesModalStyles } from '../../styles/useStyles';
import { getUser, updateUser } from '../../hooks/useUserService';
import { googleMapsLogo } from '../../assets';
import GoogleMapRentState from '../RentState Components/GoogleMapRentState';

export const InterestedZonesModal = ({ open, handleClose, handleDelete }) => {
    const classes = interestedZonesModalStyles(); 
    const [polygons, setPolygons] = useState([]);
    const currentUserId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser(currentUserId, token);
                if (userData.coverageAreaInterest) {
                    const userPolygons = userData.coverageAreaInterest.map(polygon => ({
                        coordinates: polygon.map(coord => ({ lat: coord.latitude, lng: coord.longitude }))
                    }));
                    setPolygons(userPolygons);
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        if (open) {
            fetchUserData();
        }
    }, [open, currentUserId, token]);

    const handleSaveZones = async () => {
        try {
            const userData = await getUser(currentUserId, token);
            const coverageAreaInterest = polygons.map(poly => 
                poly.coordinates.map(coord => ({
                    latitude: coord.lat,
                    longitude: coord.lng
                }))
            );

            const updatedUserData = {
                ...userData,
                coverageAreaInterest: []
            };

            updatedUserData.coverageAreaInterest = coverageAreaInterest;

            await updateUser(updatedUserData, token);
            console.log('Zonas guardadas exitosamente');
            handleClose()
        } catch (error) {
            console.error('Error al guardar las zonas:', error);
        }
    };

    useEffect(() => {
        console.log("Polígonos recibidos en el modal:", polygons);
    }, [polygons]);
    

    if (!open) return null;

    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.textTopContainer}>
                    <div>
                        <img src={googleMapsLogo} alt="googleMapsLogo" className={classes.icon} style={{height: '70px'}}/>
                    </div>
                    <div>
                        <div className={classes.title}>Zona de Interés (Z.I)</div>
                        <p style={{ color: '#434343', margin:'10px 0 0 0' }}>Selecciona la zona en la que te interesaria conseguir un inmueble, de esta manera, recibirás notificaciones de nuevos inmuebles en tu zona de interés seleccionada en este apartado.</p>
                    </div>
                </div>

                <div style={{margin:'10px 0'}}>
                    <GoogleMapRentState 
                        key={open ? "open" : "closed"}
                        mapType="poligon"
                        setPolygons={setPolygons}
                        initialPolygons={polygons}
                    />
                </div>

                <div className={classes.buttonsContainer}>                  
                    <div className={classes.button} onClick={handleClose} style={{ backgroundColor: '#7E7E7E' }}>
                        Cancelar
                    </div>
                    <div onClick={handleSaveZones} className={classes.button} style={{ backgroundColor: '#00283E' }}>
                        Guardar Zonas
                    </div>
                </div>
            </div>
        </div>
    );
};
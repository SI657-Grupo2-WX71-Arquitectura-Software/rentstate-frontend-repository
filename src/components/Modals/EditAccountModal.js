import React, { useState, useEffect } from 'react';
import { filterPropertiesModalStyles } from '../../styles/useStyles';
import { closeIcon } from '../../assets';
import { FieldEdit } from '../RentState Components/components';
import GoogleMapRentState from '../RentState Components/GoogleMapRentState';
import { getUser, updateUser } from '../../hooks/useUserService';

const EditAccountModal = ({ open, handleClose }) => {
    const classes = filterPropertiesModalStyles();
    const [userData, setUserData] = useState({});
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dni, setDni] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [address, setAddress] = useState('');

    const currentUserId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (open) {
            getUserData();
        }
    }, [open]);

    const getUserData = async () => {
        try {
            const data = await getUser(currentUserId, token);
            setUserData(data);
            setName(data.name);
            setLastName(data.lastName);
            setEmail(data.email);
            setPhone(data.phone);
            setDni(data.dni);
            setBirthdate(data.birthDate);
            setLatitude(data.latitude);
            setLongitude(data.longitude);
            setAddress(data.address);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleUpdateProfile = async () => {
        const updateUserResource = {
            ...userData,
            name,
            lastName,
            email,
            phone,
            dni,
            birthDate: birthdate,
            latitude,
            longitude,
            address,
        };

        try {
            await updateUser(updateUserResource, token);
            handleClose();
            window.location.reload();   
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleLocationChange = (location) => {
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        setAddress(location.address);
    };

    useEffect(() => {
        const updateUserResource = {
            ...userData,
            name,
            lastName,
            email,
            phone,
            dni,
            birthDate: birthdate,
            latitude,
            longitude,
            address,
        };
        console.log("Current user resource:", updateUserResource);
    }, [name, lastName, email, phone, dni, birthdate, latitude, longitude, address]);

    if (!open) return null;

    return (
        <div className={classes.overlay}>
            <div className={classes.modal} style={{ width: '80%' }}>
                <div className={classes.closeIcon}>
                    <img
                        src={closeIcon}
                        alt="Cerrar"
                        onClick={handleClose}
                        style={{ width: '1rem' }}
                    />
                </div>
                <div className={classes.title} style={{ marginBottom: '1rem' }}>Editar Perfil</div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className={classes.fieldBox} style={{ width: '40%' }}>
                        <FieldEdit
                            id="name"
                            label="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FieldEdit
                            id="lastName"
                            label="Apellidos"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <FieldEdit
                            id="email"
                            label="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FieldEdit
                            id="phone"
                            label="Teléfono"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <FieldEdit
                            id="dni"
                            label="DNI"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                        />
                        <FieldEdit
                            id="birthdate"
                            label="Fecha de Nacimiento"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                    </div>
                    <div style={{ width: '60%' }}>
                        <GoogleMapRentState
                            mapType="finder"
                            height="500px"
                            width="100%"
                            onLocationSelected={handleLocationChange}
                        />
                    </div>
                </div>
                <div className={classes.buttonsContainer}>
                    <div className={classes.button} onClick={handleUpdateProfile} style={{ backgroundColor: '#00283E' }}>
                        Guardar
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAccountModal;
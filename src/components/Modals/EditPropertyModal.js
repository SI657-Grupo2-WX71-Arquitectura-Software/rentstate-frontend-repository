import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { filterPropertiesModalStyles } from '../../styles/useStyles';
import { closeIcon } from '../../assets';
import { FieldEdit, FieldSelect } from '../RentState Components/components';
import GoogleMapRentState from '../RentState Components/GoogleMapRentState';
import { getPropertyById, updateProperty } from '../../hooks/usePropertyService';

const EditPropertyModal = ({ open, handleClose }) => {
    const classes = filterPropertiesModalStyles();
    const { id } = useParams();
    const [propertyData, setPropertyData] = useState({});
    const [category, setCategory] = useState('');
    const [district, setDistrict] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [address, setAddress] = useState('');

    const districts = [
        { value: "Cercado de Lima", label: "Cercado de Lima" },
        { value: "Ate", label: "Ate" },
        { value: "Barranco", label: "Barranco" },
        { value: "Breña", label: "Breña" },
        { value: "Comas", label: "Comas" },
        { value: "Chorrillos", label: "Chorrillos" },
        { value: "El Agustino", label: "El Agustino" },
        { value: "Jesús María", label: "Jesús María" },
        { value: "La Molina", label: "La Molina" },
        { value: "La Victoria", label: "La Victoria" },
        { value: "Lince", label: "Lince" },
        { value: "Magdalena del Mar", label: "Magdalena del Mar" },
        { value: "Miraflores", label: "Miraflores" },
        { value: "Pueblo Libre", label: "Pueblo Libre" },
        { value: "Puente Piedra", label: "Puente Piedra" },
        { value: "Rímac", label: "Rímac" },
        { value: "San Isidro", label: "San Isidro" },
        { value: "Independencia", label: "Independencia" },
        { value: "San Juan de Miraflores", label: "San Juan de Miraflores" },
        { value: "San Luis", label: "San Luis" },
        { value: "San Martín de Porres", label: "San Martín de Porres" },
        { value: "San Miguel", label: "San Miguel" },
        { value: "Santiago de Surco", label: "Santiago de Surco" },
        { value: "Surquillo", label: "Surquillo" },
        { value: "Villa María del Triunfo", label: "Villa María del Triunfo" },
        { value: "San Juan de Lurigancho", label: "San Juan de Lurigancho" },
        { value: "Santa Rosa", label: "Santa Rosa" },
        { value: "Los Olivos", label: "Los Olivos" },
        { value: "Villa El Salvador", label: "Villa El Salvador" },
        { value: "Santa Anita", label: "Santa Anita" }
    ];
    
    const categories = [
        { value: 'Departamento', label: 'Departamento' },
        { value: 'Casa', label: 'Casa' },
        { value: 'Oficina', label: 'Oficina' },
        { value: 'Habitación', label: 'Habitación' }
    ]

    useEffect(() => {
        if (open) {
            getPropertyData();
        }
    }, [open]);

    const getPropertyData = async () => {
        try {
            const data = await getPropertyById(id);
            setPropertyData(data);
            setCategory(data.category);
            setDistrict(data.district);
            setDescription(data.description);
            setPrice(data.price);
            setLatitude(data.latitude);
            setLongitude(data.longitude);
            setAddress(data.location);
        } catch (error) {
            console.error("Error fetching property data:", error);
        }
    };

    const handleUpdateProperty = async () => {
        const updatePropertyResource = {
            ...propertyData,
            category,
            district,
            description,
            price,
            latitude,
            longitude,
            location: address,
        };

        try {
            await updateProperty(id, updatePropertyResource);
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error("Error updating property:", error);
        }
    };

    const handleLocationChange = (location) => {
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        setAddress(location.address);
    };

    useEffect(() => {
        const updatePropertyResource = {
            ...propertyData,
            category,
            district,
            description,
            price,
            latitude,
            longitude,
            location: address,
        };
        console.log("Current property resource:", updatePropertyResource);
    }, [category, district, description, price, latitude, longitude, address]);

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
                <div className={classes.title} style={{ marginBottom: '1rem' }}>Editar Propiedad</div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className={classes.fieldBox} style={{ width: '40%' }}>
                        <FieldSelect
                            id="category"
                            label="Categoría"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            options={categories}
                            />
                        <FieldSelect
                            id="district"
                            label="Distrito"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            options={districts}
                            />
                        <FieldEdit
                            id="description"
                            label="Descripción"
                            value={description}
                            multiline
                            rows={6}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <FieldEdit
                            id="price"
                            label="Precio"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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
                    <div className={classes.button} onClick={handleUpdateProperty} style={{ backgroundColor: '#00283E' }}>
                        Guardar
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPropertyModal;
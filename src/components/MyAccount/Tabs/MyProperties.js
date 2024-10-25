import React, { useState, useEffect } from 'react';
import { PropertyCard, SearchBar } from '../../RentState Components/components';
import { useStylesMyProperties } from '../../../styles/useStyles';
import PropertyService from "../../../hooks/usePropertyService";
import { getUser } from "../../../hooks/useUserService";

const MyProperties = ({ currentUser }) => {
    const classes = useStylesMyProperties();
    const [searchTerm, setSearchTerm] = useState('');
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [owners, setOwners] = useState({});
    const [users, setUsers] = useState({});

    useEffect(() => {
        const fetchPropertiesAndOwners = async () => {
            try {
                const response = await PropertyService.getAllProperties();
                const userProperties = response.filter(property => property.userId === currentUser.id);
    
                const ownerIds = userProperties.map(p => p.userId);
                const ownerPromises = ownerIds.map(id => getUser(id));
                const ownersData = await Promise.all(ownerPromises);
                const ownersMap = ownersData.reduce((acc, owner, index) => {
                    acc[ownerIds[index]] = owner;
                    return acc;
                }, {});

                const userPromises = response.map(property => getUser(property.userId).catch(error => null));
                const userResponses = await Promise.all(userPromises);
                const usersData = userResponses.reduce((acc, user) => {
                    if (user) {
                        acc[user.id] = user;
                    }
                    return acc;
                }, {});
    
                setOwners(ownersMap);
                setUsers(usersData);
                setProperties(userProperties);
                setFilteredProperties(userProperties);
            } catch (error) {
                console.error("Error al obtener las propiedades y los datos del propietario:", error);
            }
        };
    
        if (currentUser && currentUser.id) {
            fetchPropertiesAndOwners();
        }
    }, [currentUser]);
    

    const handleSearchChange = (event) => {
        const search = event.target.value.toLowerCase();
        setSearchTerm(search);
        const filtered = properties.filter(property => {
            return property.district.toLowerCase().includes(search) ||
                   property.address.toLowerCase().includes(search) ||
                   property.price.toString().includes(search) ||
                   (`${owners[property.userId]?.name} ${owners[property.userId]?.lastName}`).toLowerCase().includes(search) ||
                   (property.isActive ? 'activo' : 'inactivo').includes(search);
        });
        setFilteredProperties(filtered);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 1rem 0' }}>
                <SearchBar 
                    placeholder="Buscar Inmueble" 
                    height="3rem" 
                    width="50vw" 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className={classes.scrollableDiv}>
                {filteredProperties.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#6C6B6B', fontSize: '1.2rem' }}>
                        ¡No tienes propiedades por el momento!
                    </div>
                ) : (
                    filteredProperties.map((property, index) => (
                        <PropertyCard
                            key={index}
                            property={property}
                            owner={owners[property.userId]}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MyProperties;
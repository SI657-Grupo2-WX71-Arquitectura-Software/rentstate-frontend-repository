import React, { useState, useEffect } from 'react';
import { PropertyCard, SearchBar, SkeletonPropertyCard } from '../../RentState Components/components';
import { useStylesMyProperties } from '../../../styles/useStyles';
import PropertyService from "../../../hooks/usePropertyService";
import { getUser } from "../../../hooks/useUserService";

const MyProperties = ({ currentUser }) => {
    const classes = useStylesMyProperties();
    const [searchTerm, setSearchTerm] = useState('');
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [owners, setOwners] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);

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
    
                setOwners(ownersMap);
                setProperties(userProperties);
                setFilteredProperties(userProperties);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener las propiedades y los datos del propietario:", error);
                setIsLoading(false);
            }
        };
    
        if (currentUser && currentUser.id) {
            fetchPropertiesAndOwners();
        }
    }, [currentUser]);
    

    const handleSearchChange = (event) => {
        const search = event.target.value.toLowerCase();
        setSearchTerm(search);
        setIsSearching(true);
        const filtered = properties.filter(property => {
            return (property.district && property.district.toLowerCase().includes(search)) ||
                (property.address && property.address.toLowerCase().includes(search)) ||
                (property.price && property.price.toString().includes(search)) ||
                (owners[property.userId] && `${owners[property.userId]?.name} ${owners[property.userId]?.lastName}`.toLowerCase().includes(search)) ||
                ((property.isActive ? 'activo' : 'inactivo').includes(search));
        });
        setFilteredProperties(filtered);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 1rem 0' }}>
                <SearchBar 
                    placeholder="Buscar Propiedad" 
                    height="3rem" 
                    width="50vw" 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className={classes.scrollableDiv}>
                {isLoading ? (
                    <div className={classes.propertyGrid}>
                        {Array.from(new Array(6)).map((_, index) => (
                            <SkeletonPropertyCard key={index} />
                        ))}
                    </div>            
                ) : filteredProperties.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#6C6B6B', fontSize: '1.2rem', margin: '2rem' }}>
                        {isSearching ? '¡No se encontró su búsqueda!' : '¡No tienes propiedades por el momento!'}
                    </div>
                ) : (
                    <div className={classes.propertyGrid}>
                        {filteredProperties.map((property, index) => (
                            <PropertyCard
                                key={index}
                                property={property}
                                owner={owners[property.userId]}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProperties;
import React, { useState, useEffect } from 'react';
import { favoritePropertiesStyles } from '../styles/useStyles';
import { getUser, getAllUsers } from '../hooks/useUserService';
import PropertyService from '../hooks/usePropertyService';
import { PropertyCard, SearchBar, SkeletonPropertyCard } from './RentState Components/components';

export const FavoriteProperties = () => {
    const classes = favoritePropertiesStyles();
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [users, setUsers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [userFetched, setUserFetched] = useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const fetchUserAndProperties = async () => {
        try {
            const currentUserId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            const [userData, allUsers] = await Promise.all([
                getUser(currentUserId, token),
                getAllUsers()
            ]);
            setUser(userData);
            setUserFetched(true);

            const usersData = allUsers.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {});
            setUsers(usersData);

            if (userData.favoriteProperties.length > 0) {
                const allProperties = await PropertyService.getAllProperties();
                const favoriteProperties = allProperties.filter(property =>
                    userData.favoriteProperties.includes(property.id)
                );
                setProperties(favoriteProperties);
                setFilteredProperties(favoriteProperties);
            }
        } catch (error) {
            console.error('Error fetching user or properties:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!userFetched) {
            fetchUserAndProperties();
        }
    }, [userFetched]);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredProperties(properties);
        } else {
            const lowercasedFilter = searchTerm.toLowerCase();
            const filteredData = properties.filter(property => {
                return Object.keys(property).some(key =>
                    property[key] && property[key].toString().toLowerCase().includes(lowercasedFilter)
                );
            });
            setFilteredProperties(filteredData);
        }
    }, [searchTerm, properties]);

    const handleFavoriteUpdate = () => {
        setIsLoading(true);
        fetchUserAndProperties();
    };

    return (
        <div className={classes.favContainer}>
            <div className={classes.searchBarContainer}>
                <SearchBar 
                    placeholder="Buscar Inmueble" 
                    height="3rem" 
                    width="50vw" 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {isLoading ? (
                <div className={classes.propertyGrid} style={{ marginBottom: '5rem' }}>
                    {Array.from(new Array(6)).map((_, index) => (
                        <SkeletonPropertyCard key={index} />
                    ))}
                </div>
            ) : user && user.favoriteProperties.length === 0 ? (
                <div className={classes.text}>¡No tienes inmuebles favoritos por el momento!</div>
            ) : (
                <div className={classes.propertyGrid} style={{ marginBottom: '5rem' }}>
                    {filteredProperties.map((property, index) => (
                        <PropertyCard
                            key={index}
                            property={property}
                            owner={users[property.userId]}
                            onDelete={() => {}}
                            onFavoriteUpdate={handleFavoriteUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
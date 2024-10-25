import React, { useEffect, useState } from "react";
import { homeStyles } from "../styles/useStyles";
import { PropertyCard, SearchBar } from "../components/RentState Components/components";
import ChairIcon from "@mui/icons-material/Chair";
import TuneIcon from "@mui/icons-material/Tune";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import CottageIcon from "@mui/icons-material/Cottage";
import PropertyService from "../hooks/usePropertyService";
import { getUser } from "../hooks/useUserService";

const HomeRentState = () => {
    const classes = homeStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [users, setUsers] = useState({});

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory((prevCategory) => prevCategory === category ? null : category);
    };

    useEffect(() => {
        if (selectedCategory) {
            setFilteredProperties(properties.filter(property => property.category === selectedCategory));
        } else {
            setFilteredProperties(properties);
        }
    }, [selectedCategory, properties]);
    
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await PropertyService.getAllProperties();
                const availableProperties = response.filter(property => property.available === true);
    
                const userResponses = await Promise.allSettled(
                    availableProperties.map(property => getUser(property.userId))
                );
                
                const usersData = {};
                const validProperties = [];
    
                userResponses.forEach((result, index) => {
                    if (result.status === 'fulfilled') {
                        usersData[availableProperties[index].userId] = result.value;
                        validProperties.push(availableProperties[index]);
                    } else {
                        console.error('Failed to load user data:', result.reason);
                    }
                });
    
                setProperties(validProperties);
                setFilteredProperties(validProperties);
                setUsers(usersData);
            } catch (error) {
                console.error("Error al obtener las propiedades:", error);
            }
        };
    
        fetchProperties();
    }, []);

    return (
        <div className={classes.homeContainer}>         
            <div className={classes.optionsContainer}>
                <div className={classes.optionButton} onClick={() => handleCategoryClick("Departamento")}>
                    <EmojiTransportationIcon />
                    Departamento
                </div>
                <div className={classes.optionButton} onClick={() => handleCategoryClick("Oficina")}> 
                    <HomeRepairServiceIcon />
                    Oficina
                </div>
                <div className={classes.optionButton} onClick={() => handleCategoryClick("Casa")}>
                    <CottageIcon />
                    Casa
                </div>
                <div className={classes.optionButton} onClick={() => handleCategoryClick("Habitacion")}>
                    <ChairIcon />
                    Habitación
                </div>
                <div className={classes.filterButton}>
                    <TuneIcon style={{ fontSize: "1.2rem" }} />
                </div>
            </div>
            <div className={classes.searchBarContainer}>
                <SearchBar 
                    placeholder="Buscar Inmueble" 
                    height="3rem" 
                    width="50vw" 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className={classes.propertyGrid}>
                {filteredProperties.map((property, index) => (
                    <PropertyCard
                        key={index}
                        property={property}
                        owner={users[property.userId]}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeRentState;
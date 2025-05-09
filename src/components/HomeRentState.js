import React, { useEffect, useState } from "react";
import { homeStyles } from "../styles/useStyles";
import { PropertyCard, SkeletonPropertyCard, SearchBar } from "../components/RentState Components/components";
import ChairIcon from "@mui/icons-material/Chair";
import TuneIcon from "@mui/icons-material/Tune";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import CottageIcon from "@mui/icons-material/Cottage";
import PropertyService from "../hooks/usePropertyService";
import { getAllUsers } from "../hooks/useUserService";
import { PropertyFiltersModal } from "./Modals/PropertyFiltersModal";

const HomeRentState = () => {
    const classes = homeStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [users, setUsers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000000 });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryClick = (category) => {
        const normalizedCategory = category.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        setSelectedCategory((prevCategory) => {
            const normalizedPrevCategory = prevCategory ? prevCategory.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : null;
            return normalizedPrevCategory === normalizedCategory ? null : category;
        });
    };  

    const handleOpenFilterModal = () => {
        setIsFilterModalOpen(true);
    };

    const handleCloseFilterModal = (min, max) => {
        setPriceRange({ min, max });
        setIsFilterModalOpen(false);
    };

    const handleDeleteFilters = () => {
        setPriceRange({ min: 0, max: 1000000000 });
    };

    const fetchPropertiesAndUsers = async () => {
        try {
            const [propertyResponse, userResponse] = await Promise.all([
                PropertyService.getAllProperties(),
                getAllUsers()
            ]);

            const availableProperties = propertyResponse.filter(property => property.available === true);
            
            const usersData = userResponse.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {});

            const validProperties = availableProperties.filter(property => usersData[property.userId]);

            setProperties(validProperties);
            setFilteredProperties(validProperties);
            setUsers(usersData);
        } catch (error) {
            console.error("Error al obtener las propiedades y usuarios:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPropertiesAndUsers();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setFilteredProperties(properties.filter(property => property.category === selectedCategory));
        } else {
            setFilteredProperties(properties);
        }
    }, [selectedCategory, properties]);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredProperties(properties);
        } else {
            const lowercasedFilter = searchTerm.toLowerCase();
            const filteredData = properties.filter(item => {
                return Object.keys(item).some(key =>
                    item[key] && item[key].toString().toLowerCase().includes(lowercasedFilter)
                );
            });
            setFilteredProperties(filteredData);
        }
    }, [searchTerm, properties]);

    useEffect(() => {
        const filtered = properties.filter(property => 
            property.price >= priceRange.min && property.price <= priceRange.max
        );
        setFilteredProperties(filtered);
    }, [priceRange, properties]);

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
                <div className={classes.optionButton} onClick={() => handleCategoryClick("Habitación")}>
                    <ChairIcon />
                    Habitación
                </div>
                <div className={classes.filterButton} onClick={handleOpenFilterModal}>
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
            <div className={classes.propertyGrid} style={{marginBottom:'5rem'}}>
                {isLoading ? (
                    Array.from(new Array(6)).map((_, index) => (
                        <SkeletonPropertyCard key={index} />
                    ))
                ) : (
                    filteredProperties.map((property, index) => (
                        <PropertyCard
                            key={index}
                            property={property}
                            owner={users[property.userId]}
                            onDelete={fetchPropertiesAndUsers}
                        />
                    ))
                )}
            </div>
            <PropertyFiltersModal
                open={isFilterModalOpen}
                handleClose={handleCloseFilterModal}
                handleDelete={handleDeleteFilters}
            />
        </div>
    );
};

export default HomeRentState;
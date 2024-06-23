import React, { useState, useEffect } from "react";
import "../styles/HomeRentState.css";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Slider, TextField, createTheme, Skeleton, Snackbar, Alert } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import PropertyService from "../hooks/usePropertyService";
import userService from "../hooks/useUserService";
import SearchIcon from "@mui/icons-material/Search";
import ChairIcon from "@mui/icons-material/Chair";
import TuneIcon from "@mui/icons-material/Tune";
import PlaceIcon from "@mui/icons-material/Place";
import CloseIcon from "@mui/icons-material/Close";
import CottageIcon from "@mui/icons-material/Cottage";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { Link } from "react-router-dom";

const theme = createTheme({
    palette: {
        rentstateblue: { main: "#225E7C" },
    },
});

const HomeRentState = () => {
    const [searchValue, setSearchValue] = useState("");
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [open, setOpen] = useState(false);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(300000);
    const isMobile = useMediaQuery("(max-width:600px)");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [nearbyPropertiesCount, setNearbyPropertiesCount] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
  

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await PropertyService.getAllProperties();
                setProperties(response);
                setFilteredProperties(response.filter(property => property.available !== false));
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener las propiedades:", error);
            }
        };

        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                if (userId && token) {
                    const userResponse = await userService.getUser(userId, token);
                    setUser(userResponse);
                } else {
                    console.error("No se encontró el ID del usuario o el token en el almacenamiento local.");
                }
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        };

        fetchProperties();
        fetchUser();
    }, []);

    useEffect(() => {
        if (user && properties.length > 0) {
            const nearbyProperties = properties.filter(property => property.district === user.district);
            setNearbyPropertiesCount(nearbyProperties.length);
            setOpenSnackbar(nearbyProperties.length > 0);
        }
    }, [user, properties]);

    const handleTextFieldChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchIconClick = () => {
        const filtered = properties.filter((property) =>
            Object.values(property).some((value) => {
                if (typeof value === "string" || value instanceof String) {
                    return value.toLowerCase().includes(searchValue.toLowerCase());
                }
                return false;
            })
        );
        setFilteredProperties(filtered);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearchIconClick();
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory((prevCategory) => prevCategory === category ? null : category);
    };

    const handleChange = (event, newValue) => {
        const [min, max] = newValue;
        setMinValue(min);
        setMaxValue(max);
    };

    const handleApplyFilters = () => {
        setFilteredProperties(
            properties.filter((property) => {
                const price = typeof property.price === 'string' ? parseFloat(property.price.replace(",", "")) : property.price;
                return price >= minValue && price <= maxValue;
            })
        );
        setOpen(false);
    };

    const handleClearFilters = () => {
        setMinValue(0);
        setMaxValue(300000);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickMap = (e) => {
        e.stopPropagation();
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div id="findProperty">
            <div className="findProperty-container">
                <div
                    className="search-system"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <TextField
                        id="outlined-textarea"
                        placeholder="Buscar Inmueble"
                        value={searchValue}
                        onChange={handleTextFieldChange}
                        onKeyDown={handleKeyDown}
                        sx={{
                            width: isMobile ? "70vw" : "30rem",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "200px",
                                "& fieldset": {
                                    borderColor: "#ececec !important",
                                },
                            },
                            "& .MuiInputBase-input": {
                                fontSize: "0.8rem",
                                padding: "0.8rem 1.3rem",
                            },
                        }}
                    />
                    <SearchIcon
                        style={{
                            height: "1.5rem",
                            color: "gray",
                            cursor: "pointer",
                        }}
                        onClick={handleSearchIconClick}
                    />
                </div>

                <div className="search-categories">
                    <div
                        className={`category-opt ${selectedCategory === "Departamento" ? "selected" : ""}`}
                        onClick={() => handleCategoryClick("Departamento")}
                    >
                        <EmojiTransportationIcon />
                        <div className="category-text">Departamento</div>
                    </div>
                    <div
                        className={`category-opt ${selectedCategory === "Oficina" ? "selected" : ""}`}
                        onClick={() => handleCategoryClick("Oficina")}
                    >
                        <HomeRepairServiceIcon />
                        <div className="category-text">Oficina</div>
                    </div>
                    <div
                        className={`category-opt ${selectedCategory === "Casa" ? "selected" : ""}`}
                        onClick={() => handleCategoryClick("Casa")}
                    >
                        <CottageIcon />
                        <div className="category-text">Casa</div>
                    </div>
                    <div
                        className={`category-opt ${selectedCategory === "Habitacion" ? "selected" : ""}`}
                        onClick={() => handleCategoryClick("Habitacion")}
                    >
                        <ChairIcon />
                        <div className="category-text">Habitacion</div>
                    </div>
                    <div className={"filter-opt"} onClick={handleClickOpen}>
                        <TuneIcon style={{ fontSize: "1.2rem" }} />
                    </div>
                </div>

                <div className="grid-properties">
                    {loading ? (
                        Array.from(new Array(6)).map((_, index) => (
                            <div key={index} className="card">
                                <Skeleton variant="rectangular" width="100%" height={140} />
                                <div className="card-details">
                                    <Skeleton variant="text" width="80%" />
                                    <Skeleton variant="text" width="60%" />
                                    <Skeleton variant="text" width="50%" />
                                    <Skeleton variant="text" width="30%" />
                                </div>
                            </div>
                        ))
                    ) : (
                        filteredProperties.map((project, index) => (
                            <div key={index} className="card">
                                <Link to={`/property/${project.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                    <img src={project.cardimage} alt="Property" />
                                    <div className="card-details">
                                        <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem", color: project.available ? "inherit" : "#C91A1A" }}>
                                            {project.district}
                                        </p>                                      
                                        <p>{project.location}</p>
                                        <p>{project.characteristics}</p>
                                        <p style={{ color: "#7a7a7a" }}>S/ {project.price}</p>
                                        <a href={`https://www.google.com/maps?q=${project.latitude},${project.longitude}`} target="_blank" rel="noopener noreferrer" onClick={handleClickMap}>
                                            Ver Mapa
                                            <PlaceIcon style={{ fontSize: '1.2rem' }} />
                                        </a>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ fontSize: "1.1rem" }}>
                    <div>Filtros</div>
                    <IconButton aria-label="close" onClick={handleClose} style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers style={{ padding: "0rem 4rem 2rem 4rem" }}>
                    <p>Rango de precio</p>
                    <Slider
                        value={[minValue, maxValue]}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={300000}
                        step={1}
                        valueLabelFormat={(value) => {
                            if (value === 0) {
                                return `S/ ${value.toLocaleString()}`;
                            } else if (value === 300000) {
                                return `+ S/ ${value.toLocaleString()}`;
                            } else {
                                return `S/ ${value.toLocaleString()}`;
                            }
                        }}
                        sx={{
                            color: theme.palette.rentstateblue.main,
                            "& .MuiSlider-thumb": {
                                backgroundColor: theme.palette.rentstateblue.main,
                            },
                            "& .MuiSlider-rail": {
                                backgroundColor: "#ccc",
                            },
                            "& .MuiSlider-track": {
                                backgroundColor: theme.palette.rentstateblue.main,
                            },
                        }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                        <TextField
                            label="Min"
                            type="number"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ startAdornment: <InputAdornment position="start">S/</InputAdornment> }}
                            variant="outlined"
                            value={minValue}
                            onChange={(e) => setMinValue(e.target.value)}
                        />
                        <TextField
                            label="Max"
                            type="number"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ startAdornment: <InputAdornment position="start">S/</InputAdornment> }}
                            variant="outlined"
                            value={maxValue}
                            onChange={(e) => setMaxValue(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions style={{ marginRight: "0.3rem" }}>
                    <Button onClick={handleClearFilters} style={{ color: "#225E7C", padding: "0.5rem 1rem" }} sx={{ textTransform: 'none' }}>
                        Limpiar
                    </Button>
                    <Button onClick={handleApplyFilters} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }} sx={{ textTransform: 'none' }}>
                        Filtrar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={600000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="info"
                    sx={{ width: '100%' }}
                    action={
                        <Button color="inherit" size="small">
                            <Link to="/nearby-properties" style={{ color: 'inherit', textDecoration: 'none' }}>
                                Ver estas propiedades
                            </Link>
                        </Button>
                    }
                >
                    ¡Tienes {nearbyPropertiesCount} propiedades cerca!
                </Alert>
            </Snackbar>

        </div>
    );
};

export default HomeRentState;
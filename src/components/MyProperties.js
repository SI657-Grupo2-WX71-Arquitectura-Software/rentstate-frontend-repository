import React, { useState, useEffect } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import { Link, useNavigate } from "react-router-dom";
import PropertyService from "../hooks/usePropertyService";
import { Skeleton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@mui/material";
import "../styles/MyProperties.css";

const MyProperties = () => {
    const [allProperties, setAllProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [openDialog, setOpenDialog] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);
    const navigate = useNavigate();

    const handleClickMap = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error("No se encontró el ID del usuario en el almacenamiento local.");
        }
    }, []);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await PropertyService.getAllProperties();
                setAllProperties(response);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener todas las propiedades:", error);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    useEffect(() => {
        if (userId && allProperties.length > 0) {
            const userProperties = allProperties.filter(property => property.userId === parseInt(userId));
            setFilteredProperties(userProperties);
        }
    }, [userId, allProperties]);

    const handleOpenDialog = (propertyId, e) => {
        e.stopPropagation();
        setPropertyToDelete(propertyId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setPropertyToDelete(null);
    };

    const handleDeleteProperty = async () => {
        try {
            await PropertyService.deleteProperty(propertyToDelete);
            setFilteredProperties(filteredProperties.filter(property => property.id !== propertyToDelete));
            handleCloseDialog();
        } catch (error) {
            console.error(`Error al eliminar la propiedad con ID ${propertyToDelete}:`, error);
        }
    };

    return (
        <div className="list">
            <div style={{ fontSize: '2.5rem', fontWeight: 'lighter', margin: '4rem 1rem 2rem 1rem' }}>Mis Propiedades</div>
            <div className="grid-properties">
                {loading ? (
                    Array.from(new Array(4)).map((_, index) => (
                        <div key={index} className="card">
                            <Skeleton variant="rectangular" width="100%" height={140} />
                            <div className="card-details">
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" width="60%" />
                                <Skeleton variant="rectangular" width="100%" height={40} />
                            </div>
                        </div>
                    ))
                ) : (
                    filteredProperties.length > 0 ? (
                        filteredProperties.map((project, index) => (
                            <div key={index} className="card">
                                <div onClick={(e) => e.stopPropagation()}>
                                    <Link to={`/property/${project.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                        <img src={project.cardimage} alt="Property" />
                                        <div className="card-details">
                                            <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem", color: project.available ? "inherit" : "#C91A1A" }}>
                                                {project.available ? "Disponible" : "No disponible"}
                                            </p>
                                            <p>{project.district}</p>
                                            <p>{project.location}</p>
                                            <p>{project.characteristics}</p>
                                            <p style={{ color: "#7a7a7a" }}>S/ {project.price}</p>
                                            <a href={`https://www.google.com/maps?q=${project.latitude},${project.longitude}`} target="_blank" rel="noopener noreferrer" onClick={handleClickMap}>
                                                Ver Mapa
                                                <PlaceIcon style={{ fontSize: '1.2rem' }} />
                                            </a>
                                        </div>
                                    </Link>
                                    <div style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.8rem' }}>
                                        <button onClick={(e) => handleOpenDialog(project.id, e)}>Eliminar</button>
                                        <button onClick={() => navigate(`/editar/${project.id}`)}>Editar</button>
                                        </div>


                                </div>
                            </div>
                        ))
                    ) : (
                        <Typography variant="h6" style={{ margin: '2rem 1rem' }}>
                            Usted no tiene ninguna propiedad publicada en RentState.
                        </Typography>
                    )
                )}
            </div>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Eliminar Publicación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Está seguro de que desea eliminar este inmueble permanentemente? Todos sus datos y lista de interesados se perderán.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteProperty} style={{ color: "#225E7C", padding: "0.5rem 1rem" }} sx={{ textTransform: 'none' }}>
                        Aceptar
                    </Button>
                    <Button onClick={handleCloseDialog} style={{ color: "white", backgroundColor: "#225E7C", padding: "0.5rem 1rem" }} sx={{ textTransform: 'none' }}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MyProperties;
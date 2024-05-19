import React, { useState, useEffect } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import { Link } from "react-router-dom";
import PropertyService from "../hooks/usePropertyService";
import "../styles/MyProperties.css";

const MyProperties = () => {
    const [filteredProperties, setFilteredProperties] = useState([]);
    const userId = 1; // Define el userId que deseas filtrar

    const handleClickMap = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await PropertyService.getPropertiesByUserId(userId);
                setFilteredProperties(response);
            } catch (error) {
                console.error("Error al obtener las propiedades del usuario:", error);
            }
        };

        fetchProperties();
    }, [userId]);

    return (
        <div className="list">
            <div style={{ fontSize: '2.5rem', fontWeight: 'lighter', margin: '4rem 1rem 2rem 1rem' }}>Mis Propiedades</div>
            <div className="grid-properties">
                {filteredProperties.map((project, index) => (
                    <div key={index} className="card">
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyProperties;

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import PropertyService from "../hooks/usePropertyService";
import { getUser } from '../hooks/useUserService';

const NearbyPropertiesMap = () => {
    const [properties, setProperties] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedProperty, setSelectedProperty] = useState(null);

    useEffect(() => {
        const fetchUserAndProperties = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const token = localStorage.getItem("token");
                if (userId && token) {
                    const userResponse = await getUser(userId, token);
                    setUser(userResponse);
                    const propertiesResponse = await PropertyService.getAllProperties();
                    const nearbyProperties = propertiesResponse.filter(
                        (property) => property.district === userResponse.district
                    );
                    setProperties(nearbyProperties);
                } else {
                    console.error("No se encontró el ID del usuario o el token en el almacenamiento local.");
                }
            } catch (error) {
                console.error("Error al obtener usuario y propiedades:", error);
            }
        };

        fetchUserAndProperties();
    }, []);

    const mapContainerStyle = {
        height: "100vh",
        width: "100%",
    };

    const center = properties.length > 0
        ? { lat: parseFloat(properties[0].latitude), lng: parseFloat(properties[0].longitude) }
        : { lat: -12.046374, lng: -77.042793 };

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <LoadScript googleMapsApiKey="AIzaSyCBij6DbsB8SQC_RRKm3-X07RLmvQEnP9w">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={13}
                >
                    {properties.map((property, index) => (
                        <Marker
                            key={index}
                            position={{
                                lat: parseFloat(property.latitude),
                                lng: parseFloat(property.longitude),
                            }}
                            onClick={() => setSelectedProperty(property)}
                        />
                    ))}

                    {selectedProperty && (
                        <InfoWindow
                            position={{
                                lat: parseFloat(selectedProperty.latitude),
                                lng: parseFloat(selectedProperty.longitude),
                            }}
                            onCloseClick={() => setSelectedProperty(null)}
                        >
                            <div>
                                <Link to={`/property/${selectedProperty.id}`}>
                                    <img
                                        src={selectedProperty.cardimage}
                                        alt="Property"
                                        style={{ width: "100px", height: "75px", marginBottom: "10px" }}
                                    />
                                </Link>
                                <div>{selectedProperty.location}</div>
                                <div><strong>Distrito:</strong> {selectedProperty.district}</div>
                                <div><strong>Precio:</strong> S/ {selectedProperty.price}</div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default NearbyPropertiesMap;
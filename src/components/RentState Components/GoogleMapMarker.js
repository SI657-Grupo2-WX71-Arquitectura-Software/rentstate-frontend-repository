import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import markerMap2 from '../../assets/markerMap2.svg';

const mapStyles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
];

const GoogleMapMarker = ({ height, width, latitude, longitude }) => {
    const [markerIcon, setMarkerIcon] = useState(null);

    const mapStylesContainer = {
        height: height,
        width: width,
        borderRadius: '20px',
    };

    const defaultCenter = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    };

    const mapOptions = {
        styles: mapStyles,
        mapTypeControl: false,
        zoomControl: false,
        rotateControl: false,
        streetViewControl: false,
        fullscreenControl: false,
    };

    useEffect(() => {
        if (window.google) {
            setMarkerIcon({
                url: markerMap2,
                scaledSize: new window.google.maps.Size(30, 30),
            });
        }
    }, []);

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_APIKEY}>
            <GoogleMap
                mapContainerStyle={mapStylesContainer}
                zoom={15}
                center={defaultCenter}
                options={mapOptions}
            >
                {markerIcon && <Marker position={defaultCenter} icon={markerIcon} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapMarker;

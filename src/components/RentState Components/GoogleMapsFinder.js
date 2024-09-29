import React, { useRef, useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Autocomplete, Marker } from '@react-google-maps/api';
import { FieldEditMapFinder } from './components';

const GoogleMapsFinder = ({ onAddressSelect }) => {
    const autocompleteRef = useRef(null);
    const inputRef = useRef(null);
    
    const [mapCenter, setMapCenter] = useState({
        lat: -12.087425387067672,
        lng: -77.04993935061512
    });

    const [markerPosition, setMarkerPosition] = useState(mapCenter);

    const mapContainerStyle = {
        height: '500px',
        width: '30vw'
    };

    useEffect(() => {
        if (autocompleteRef.current && inputRef.current) {
            autocompleteRef.current.bindTo("bounds", inputRef.current);
        }
    }, [autocompleteRef, inputRef]);

    const onPlaceSelected = () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.geometry) {
            const location = place.geometry.location.toJSON();
            setMapCenter(location);
            setMarkerPosition(location);
            if (onAddressSelect) {
                onAddressSelect(place.formatted_address);
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_APIKEY}
                libraries={['places']}
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapCenter}
                    zoom={15}
                >
                    <Marker
                        key={`${markerPosition.lat}-${markerPosition.lng}`}
                        position={markerPosition}
                    />
                </GoogleMap>

                <Autocomplete
                    onLoad={(autocomplete) => { autocompleteRef.current = autocomplete }}
                    onPlaceChanged={onPlaceSelected}
                >
                    <FieldEditMapFinder
                        id="autocomplete"
                        label="Dirección"
                        inputRef={inputRef}
                    />
                </Autocomplete>
            </LoadScript>
        </div>
    );
};

export default GoogleMapsFinder;

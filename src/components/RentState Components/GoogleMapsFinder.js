import React, { useRef, useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Autocomplete, Marker } from '@react-google-maps/api';
import { FieldEditMapFinder } from './components';

const GoogleMapsFinder = ({ onAddressSelect, updateUserData }) => {
    const autocompleteRef = useRef(null);
    const inputRef = useRef(null);

    const [mapCenter, setMapCenter] = useState({
        lat: -12.087425387067672,
        lng: -77.04993935061512
    });

    const [markerPosition, setMarkerPosition] = useState(mapCenter);

    const mapContainerStyle = {
        height: '500px',
        width: '50vw'
    };

    useEffect(() => {
        if (autocompleteRef.current && inputRef.current) {
            autocompleteRef.current.bindTo("bounds", inputRef.current);
        }
    }, [autocompleteRef, inputRef]);

    const onPlaceSelected = () => {
        const place = autocompleteRef.current.getPlace();
        //console.log('place:', place);
        if (place && place.geometry) {
            const location = place.geometry.location.toJSON();
            //console.log('Nueva ubicación:', location);
            setMapCenter(location);
            setMarkerPosition(location);
            if (onAddressSelect) {
                onAddressSelect(place.formatted_address);
            }
            const formattedData = extractDataFromPlace(place);
            updateUserData(formattedData);
        }
    };

    const extractDataFromPlace = (place) => {
        const { formatted_address, geometry: { location }, address_components } = place;
        const department = address_components.find(component => component.types.includes("administrative_area_level_1"))?.long_name;
        const city = address_components.find(component => component.types.includes("administrative_area_level_2"))?.long_name;
        const district = address_components.find(component => component.types.includes("locality"))?.long_name;

        return {
            address: formatted_address,
            latitude: location.lat(),
            longitude: location.lng(),
            district,
            city,
            department
        };
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
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import markerMap2 from '../../assets/markerMap2.svg';
import { parkMarker, restaurantMarker, schoolMarker } from '../../assets';

const libraries = ['drawing', 'places'];

const GoogleMapRentState = ({ mapType, height = '400px', width = '100%', latitude, longitude, setPolygons }) => {
    const containerStyle = { height, width };
    const validLatitude = latitude ? parseFloat(latitude) : -12.0714419;
    const validLongitude = longitude ? parseFloat(longitude) : -77.06724849999999;
    const [map, setMap] = useState(null);
    const [markerIcon, setMarkerIcon] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [activePolygon, setActivePolygon] = useState(null);
    const [placeMarkers, setPlaceMarkers] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [placeType, setPlaceType] = useState('restaurant');
    const centerRef = useRef({ lat: validLatitude, lng: validLongitude });
    const [mapCenter, setMapCenter] = useState(centerRef.current);
    const [markerPosition, setMarkerPosition] = useState(mapCenter);
    const autocompleteRef = useRef(null);
    const inputRef = useRef(null);

    const baseMapOptions = {
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ],
        mapTypeControl: mapType === 'propertyMarker',
        zoomControl: mapType === 'propertyMarker',
        rotateControl: mapType === 'propertyMarker',
        streetViewControl: mapType === 'propertyMarker',
        fullscreenControl: mapType === 'propertyMarker'
    };

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY,
        libraries
    });

    useEffect(() => {
        if (isLoaded && map) {
            setMarkerIcon({
                url: markerMap2,
                scaledSize: new window.google.maps.Size(40, 40)
            });
        }
    }, [isLoaded, map]);

    const searchNearbyPlaces = useCallback(() => {
        if (!window.google || !window.google.maps || !window.google.maps.places) {
            console.error('Google Places API is not loaded.');
            return;
        }

        const service = new window.google.maps.places.PlacesService(map);
        const request = {
            location: centerRef.current,
            radius: 1000, // Ajustar el radio a 1 km (1000 metros)
            type: [placeType] // Usar el tipo de lugar seleccionado
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const markers = results.map(place => ({
                    position: place.geometry.location,
                    name: place.name,
                    place_id: place.place_id,
                    address: place.vicinity,
                    type: placeType // Añadir el tipo de lugar al marcador
                }));
                setPlaceMarkers(markers);
            }
        });
    }, [map, placeType]);

    useEffect(() => {
        if (isLoaded && map && mapType === 'poligon') {
            const drawingManager = new window.google.maps.drawing.DrawingManager({
                drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
                drawingControl: true,
                drawingControlOptions: {
                    position: window.google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [window.google.maps.drawing.OverlayType.POLYGON]
                },
                polygonOptions: {
                    fillColor: '#04476C',
                    fillOpacity: 0.5,
                    strokeWeight: 2,
                    strokeColor: '#04476C',
                    clickable: true,
                    editable: true,
                    draggable: true,
                    zIndex: 1
                }
            });
            drawingManager.setMap(map);

            window.google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
                const coordinates = polygon.getPath().getArray().map(p => ({ lat: p.lat(), lng: p.lng() }));
                setPolygons(currentPolygons => [...currentPolygons, { polygon, coordinates }]);

                window.google.maps.event.addListener(polygon, 'click', () => {
                    setShowDialog(true);
                    setActivePolygon(polygon);
                });

                polygon.setEditable(true);
                polygon.setDraggable(true);

                window.google.maps.event.addListener(polygon, 'dragend', () => {
                    const updatedCoordinates = polygon.getPath().getArray().map(p => ({ lat: p.lat(), lng: p.lng() }));
                    setPolygons(currentPolygons =>
                        currentPolygons.map(poly => poly.polygon === polygon ? { ...poly, coordinates: updatedCoordinates } : poly)
                    );
                });
            });

            window.google.maps.event.addListener(map, 'center_changed', () => {
                const newCenter = map.getCenter();
                centerRef.current = { lat: newCenter.lat(), lng: newCenter.lng() };
            });
        }
    }, [isLoaded, map, setPolygons, mapType]);

    useEffect(() => {
        if (isLoaded && map && mapType === 'propertyMarker') {
            searchNearbyPlaces();
        }
    }, [isLoaded, map, mapType, searchNearbyPlaces]);

    const handlePlaceClick = useCallback((place) => {
        const service = new window.google.maps.places.PlacesService(map);
        const request = {
            placeId: place.place_id,
            fields: ['name', 'formatted_address', 'geometry']
        };

        service.getDetails(request, (placeDetails, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setSelectedPlace({
                    name: placeDetails.name,
                    address: placeDetails.formatted_address,
                    position: placeDetails.geometry.location
                });
            }
        });
    }, [map]);

    const handleDeletePolygon = () => {
        if (activePolygon) {
            setPolygons(currentPolygons => currentPolygons.filter(poly => poly.polygon !== activePolygon));
            activePolygon.setMap(null);
            setShowDialog(false);
        }
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    const onPlaceSelected = () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.geometry) {
            const location = place.geometry.location.toJSON();
            setMapCenter(location);
            setMarkerPosition(location);
        }
    };

    const handlePlaceTypeChange = (type) => {
        setPlaceType(type);
        searchNearbyPlaces();
    };

    const getMarkerIcon = (type) => {
        const size = new window.google.maps.Size(30, 30);
        switch (type) {
            case 'restaurant':
                return {
                    url: restaurantMarker,
                    scaledSize: size
                };
            case 'school':
                return {
                    url: schoolMarker,
                    scaledSize: size
                };
            case 'park':
                return {
                    url: parkMarker,
                    scaledSize: size
                };
            default:
                return {
                    url: markerMap2,
                    scaledSize: size
                };
        }
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    return isLoaded ? (
        <div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handlePlaceTypeChange('restaurant')}>Restaurantes</button>
                <button onClick={() => handlePlaceTypeChange('school')}>Escuelas</button>
                <button onClick={() => handlePlaceTypeChange('park')}>Parques</button>
            </div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={mapType === 'marker' || mapType === 'finder' || mapType === 'propertyMarker' ? 15 : 10}
                center={mapType === 'finder' || mapType === 'propertyMarker' ? mapCenter : centerRef.current}
                options={baseMapOptions}
                onLoad={setMap}
            >
                {(mapType === 'marker' || mapType === 'finder' || mapType === 'propertyMarker') && markerIcon && (
                    <Marker
                        position={mapType === 'finder' || mapType === 'propertyMarker' ? markerPosition : centerRef.current}
                        icon={markerIcon}
                    />
                )}

                {placeMarkers.map((place, index) => (
                    <Marker
                        key={index}
                        position={place.position}
                        icon={getMarkerIcon(place.type)}
                        onClick={() => handlePlaceClick(place)}
                    />
                ))}

                {selectedPlace && (
                    <InfoWindow
                        position={selectedPlace.position}
                        onCloseClick={() => setSelectedPlace(null)}
                    >
                        <div>
                            <h3>{selectedPlace.name}</h3>
                            <p>{selectedPlace.address}</p>
                        </div>
                    </InfoWindow>
                )}

                {mapType === 'poligon' && showDialog && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 100 }}>
                        <div style={{ background: 'white', padding: '20px', borderRadius: '2rem' }}>
                            <p style={{ margin: '2px 0' }}>¿Quieres eliminar este polígono?</p>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button style={{ backgroundColor: '#7E7E7E', borderRadius: '3rem' }} onClick={handleCancel}>
                                    Cancelar
                                </button>
                                <button style={{ backgroundColor: '#00283E', borderRadius: '3rem' }} onClick={handleDeletePolygon}>
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </GoogleMap>

            {mapType === 'finder' && (
                <Autocomplete
                    onLoad={autocomplete => {
                        autocompleteRef.current = autocomplete;
                    }}
                    onPlaceChanged={onPlaceSelected}
                >
                    <input
                        type="text"
                        placeholder="Busca una dirección"
                        ref={inputRef}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            marginTop: '1rem',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                </Autocomplete>
            )}
        </div>
    ) : (
        <div>Loading map...</div>
    );
};

export default GoogleMapRentState;
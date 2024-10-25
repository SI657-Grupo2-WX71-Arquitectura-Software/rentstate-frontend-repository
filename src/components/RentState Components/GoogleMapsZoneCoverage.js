import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const GoogleMapsFinder = ({ width = '100%', height = '400px' }) => {
    const containerStyle = { width, height };
    const center = { lat: -12.0714419, lng: -77.06724849999999 };
    const [map, setMap] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [activePolygon, setActivePolygon] = useState(null);
    const [polygons, setPolygons] = useState([]);

    useEffect(() => {
        if (window.google && map) {
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
                    setPolygons(currentPolygons => currentPolygons.map(poly => 
                        poly.polygon === polygon ? { ...poly, coordinates: updatedCoordinates } : poly
                    ));
                });
            });
        }
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

    // useEffect(() => {
    //     console.log("Estos son los polígonos actuales:", polygons.map(poly => poly.coordinates));
    // }, [polygons]);

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_APIKEY}
            libraries={['drawing']}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={setMap}
            >
                {showDialog && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 100 }}>
                        <div style={{ background: 'white', padding: '20px', borderRadius: '2rem' }}>
                            <p style={{margin:'2px 0'}}>¿Quieres eliminar este polígono?</p>
                            <div style={{display:'flex', gap:'5px'}}>
                                <button style={{backgroundColor:'#7E7E7E', borderRadius:'3rem'}} onClick={handleCancel}>Cancelar</button>
                                <button style={{backgroundColor:'#00283E', borderRadius:'3rem'}} onClick={handleDeletePolygon}>Aceptar</button>
                            </div>
                        </div>
                    </div>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapsFinder;
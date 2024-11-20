import React, { useState, useEffect } from 'react';
import { closeIcon, trashIcon } from '../../assets';
import { filterPropertiesModalStyles } from '../../styles/useStyles';
import PropertyService from '../../hooks/usePropertyService';

const UploadPropertyPhotosModal = ({ open, handleClose, handleUploadImages }) => {
    const classes = filterPropertiesModalStyles();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [lastPropertyId, setLastPropertyId] = useState(null);

    useEffect(() => {
        const fetchLastPropertyId = async () => {
            try {
                const properties = await PropertyService.getAllProperties();
                if (properties.length > 0) {
                    const lastProperty = properties[properties.length - 1];
                    setLastPropertyId(lastProperty.id);
                }
            } catch (error) {
                console.error('Error al obtener la última propiedad:', error);
            }
        };

        if (open) {
            fetchLastPropertyId();
        }
    }, [open]);

    if (!open) return null;

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleRemoveImage = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (lastPropertyId && selectedFiles.length > 0) {
            try {
                await PropertyService.uploadPropertyPhotos(lastPropertyId, selectedFiles);
                console.log('Imágenes subidas exitosamente');
                handleUploadImages(selectedFiles);
            } catch (error) {
                console.error('Error al subir las imágenes:', error);
            }
        }
    };

    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.closeIcon}>
                    <img
                        src={closeIcon}
                        alt="Cerrar"
                        onClick={handleClose}
                        style={{ width: '1rem', cursor: 'pointer' }}
                    />
                </div>
                <div className={classes.title}>Subir Imágenes de la Propiedad</div>
                <p style={{ color: '#434343' }}>Por favor, suba 5 o más imágenes para la propiedad.</p>

                <label className={classes.uploadButton}>
                    Elegir archivos
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
                <span className={classes.fileCount}>
                    {selectedFiles.length} archivo(s) seleccionado(s)
                </span>

                {selectedFiles.length > 0 && (
                    <div className={classes.previewContainer}>
                        {selectedFiles.map((file, index) => (
                            <div key={index} className={classes.previewItem}>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Vista previa ${index + 1}`}
                                    className={classes.previewImage}
                                />
                                <img
                                    src={trashIcon}
                                    alt="Eliminar"
                                    className={classes.removeIcon}
                                    onClick={() => handleRemoveImage(index)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className={classes.buttonsContainer}>                   
                    <div
                        className={classes.button}
                        onClick={handleUpload}
                        style={{ backgroundColor: '#00283E' }}
                    >
                        Publicar Propiedad
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadPropertyPhotosModal;
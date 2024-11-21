import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { createPropertyStyles } from '../../styles/useStyles'
import { trashIcon } from '../../assets'
import PropertyService from '../../hooks/usePropertyService'
import ToastManager from '../RentState Components/ToastManager'
import { useNavigate } from 'react-router-dom'

const CreateProperty6 = () => {
    const classes = createPropertyStyles()
    const [selectedFiles, setSelectedFiles] = useState([])
    const [lastPropertyId, setLastPropertyId] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLastPropertyId = async () => {
            try {
                const properties = await PropertyService.getAllProperties()
                if (properties.length > 0) {
                    const lastProperty = properties[properties.length - 1]
                    setLastPropertyId(lastProperty.id)
                } else {
                    console.error('No se encontró ninguna propiedad')
                }
            } catch (error) {
                console.error('Error al obtener la última propiedad:', error)
            }
        }

        fetchLastPropertyId()
    }, [])

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files)
        const updatedFiles = [...selectedFiles, ...files]
        setSelectedFiles(updatedFiles)
        console.log('Imágenes seleccionadas:', updatedFiles)
    }

    const handleRemoveImage = (index) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index)
        setSelectedFiles(updatedFiles)
        console.log('Imágenes después de eliminar:', updatedFiles)
    }

    const handleUpload = async () => {
        if (!lastPropertyId) {
            console.error('No se encontró el ID de la última propiedad.')
            return
        }

        if (selectedFiles.length === 0) {
            console.error('Debe seleccionar al menos una imagen antes de publicar')
            return
        }

        try {
            await PropertyService.uploadPropertyPhotos(lastPropertyId, selectedFiles)
            console.log('Imágenes subidas exitosamente')
            ToastManager.success('¡Propieadad Publicada exitosamente!')
            navigate('/home')
        } catch (error) {
            console.error('Error al subir imágenes:', error)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <form className={classes.formContainer} style={{ maxWidth: '90vw' }}>
                <h3 className={classes.step}>Paso 6/6</h3>
                <h3 className={classes.title}>Subir Imágenes de la Propiedad</h3>
                <h3 className={classes.subtitle}>
                    Por favor, suba al menos una imagen antes de publicar su propiedad.
                </h3>

                <p style={{ color: 'white', marginBottom: '1rem' }}>
                    Imágenes seleccionadas: {selectedFiles.length}
                </p>

                <div className="imagePreview" style={{ marginBottom: '1rem' }}>
                    {selectedFiles.length > 0 ? (
                        selectedFiles.map((file, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'inline-block',
                                    margin: '0.5rem',
                                    position: 'relative',
                                }}
                            >
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${index + 1}`}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        borderRadius: '5px',
                                    }}
                                />
                                <img
                                    src={trashIcon}
                                    alt="Eliminar"
                                    className={classes.removeIcon}
                                    onClick={() => handleRemoveImage(index)}
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        cursor: 'pointer',
                                        width: '20px',
                                        height: '20px',
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <p style={{ color: 'white' }}>No se han seleccionado imágenes.</p>
                    )}
                </div>

                <label
                    style={{
                        display: 'block',
                        marginBottom: '1rem',
                        cursor: 'pointer',
                        color: 'white',
                        textDecoration: 'underline',
                    }}
                >
                    Seleccionar imágenes
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>

                <div
                    className="formActions"
                    style={{
                        gap: '1rem',
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '2rem',
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleUpload}
                        sx={{ textTransform: 'none' }}
                        style={{
                            color: 'white',
                            backgroundColor: '#225E7C',
                            padding: '0.5rem 1rem',
                        }}
                    >
                        Publicar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CreateProperty6

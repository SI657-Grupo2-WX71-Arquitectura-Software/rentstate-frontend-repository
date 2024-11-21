import React, { useState, useEffect } from 'react'
import { preciseNeedsModalStyles } from '../../styles/useStyles'
import { needsIcon } from '../../assets'
import { getUser, updateUser } from '../../hooks/useUserService'

export const PreciseNeedsModal = ({ open, handleClose }) => {
    const classes = preciseNeedsModalStyles()

    const formatLabel = (label) =>
        label
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim()

    const [propertyFeatures, setPropertyFeatures] = useState({
        general: {
            tipo: '',
            areaTotal: '',
            dormitorios: '',
            antiguedad: '',
            antiguedadUnidad: 'Años',
            banos: '',
            balcon: false,
            terraza: false,
            pisos: '',
            estacionamiento: '',
            ruido: '',
            iluminacion: '',
            vista: ''
        },
        amenidades: {
            areasVerdes: false,
            piscina: false,
            gimnasio: false,
            salaEntretenimiento: false,
            areaCoworking: false,
            terrazaCompartida: false,
            zonaBBQ: false,
            salaReuniones: false,
            canchaDeporte: false,
            saunaSpa: false,
            juegosInfantiles: false,
            bodega: false,
            cafeteria: false,
            accesoDiscapacidad: false
        },
        costos: {
            alquiler: '',
            mantenimiento: '',
            incluyeLuz: false,
            incluyeAgua: false,
            incluyeInternet: false
        },
        sobreElEdificio: {
            petFriendly: false,
            ascensor: false,
            intercomunicador: false,
            servicioLimpieza: false,
            servicioVigilancia: false,
            recepcion: false
        }
    })

    const fetchUserData = async () => {
        try {
            const currentUserId = localStorage.getItem('userId')
            const token = localStorage.getItem('token')

            const userData = await getUser(currentUserId, token)

            if (userData.userNeeds) {
                setPropertyFeatures(userData.userNeeds)
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    useEffect(() => {
        if (open) {
            fetchUserData()
        }
    }, [open])

    const handleInputChange = (section, field, value) => {
        setPropertyFeatures((prevFeatures) => ({
            ...prevFeatures,
            [section]: {
                ...prevFeatures[section],
                [field]: value
            }
        }))
    }

    const handleSaveNeeds = async () => {
        try {
            const currentUserId = localStorage.getItem('userId')
            const token = localStorage.getItem('token')

            const userData = await getUser(currentUserId, token)

            const updatedUser = {
                ...userData,
                userNeeds: propertyFeatures
            }

            await updateUser(updatedUser, token)

            console.log('User updated successfully:', updatedUser)
            handleClose()
        } catch (error) {
            console.error('Error updating userNeeds:', error)
        }
    }

    if (!open) return null

    return (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.textTopContainer}>
                <div>
                    <img src={needsIcon} alt="icon" className={classes.icon} style={{ height: '70px' }} />
                </div>
                <div>
                    <div className={classes.title}>¡Necesidades Precisas!</div>
                    <p style={{ color: '#434343', margin: '10px 0 0 0' }}>
                    Ingresa el detalle de las características y necesidades que buscas en tu inmueble ideal (Requerido para uso
                    de Asistente Virtual Ren). Por favor completa todos los campos en la presente vista.
                    </p>
                </div>
                </div>

                <div className={classes.needContainer}>
                    {/* General */}
                    <div className={classes.needColumn}>
                        <div className={classes.titleCard}>General</div>
                        <label>
                        Tipo:
                        <select
                            value={propertyFeatures.general.tipo}
                            onChange={(e) => handleInputChange('general', 'tipo', e.target.value)}
                            className={classes.select}
                        >
                            <option value="">Seleccione</option>
                            <option value="Casa">Casa</option>
                            <option value="Departamento">Departamento</option>
                            <option value="Oficina">Oficina</option>
                            <option value="Habitación">Habitación</option>
                        </select>
                        </label>
                        {Object.entries(propertyFeatures.general)
                        .filter(([key]) => key !== 'tipo')
                        .map(([key, value]) => (
                            <div key={key} className={classes.subtitleCard}>
                            <label>
                                {typeof value === 'boolean' ? (
                                <>
                                    <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => handleInputChange('general', key, e.target.checked)}
                                    className={classes.checkbox}
                                    />
                                    <span></span>
                                    {formatLabel(key)}
                                </>
                                ) : (
                                <>
                                    {formatLabel(key)}:
                                    <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleInputChange('general', key, e.target.value)}
                                    className={classes.input}
                                    />
                                </>
                                )}
                            </label>
                            </div>
                        ))}
                    </div>

                    {/* Amenidades */}
                    <div className={classes.needColumn}>
                        <div className={classes.titleCard}>Amenidades</div>
                        {Object.entries(propertyFeatures.amenidades).map(([key, value]) => (
                        <div key={key} className={classes.subtitleCard}>
                            <label>
                            <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => handleInputChange('amenidades', key, e.target.checked)}
                                className={classes.checkbox}
                            />
                            <span></span>
                            {formatLabel(key)}
                            </label>
                        </div>
                        ))}
                    </div>

                    {/* Costos */}
                    <div className={classes.needColumn}>
                        <div className={classes.titleCard}>Costos</div>
                        {Object.entries(propertyFeatures.costos).map(([key, value]) => (
                        <div key={key} className={classes.subtitleCard}>
                            <label>
                            {typeof value === 'boolean' ? (
                                <>
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => handleInputChange('costos', key, e.target.checked)}
                                    className={classes.checkbox}
                                />
                                <span></span>
                                {formatLabel(key)}
                                </>
                            ) : (
                                <>
                                {formatLabel(key)}:
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleInputChange('costos', key, e.target.value)}
                                    className={classes.input}
                                />
                                </>
                            )}
                            </label>
                        </div>
                        ))}
                    </div>

                    {/* Sobre el Edificio */}
                    <div className={classes.needColumn}>
                        <div className={classes.titleCard}>Sobre el Edificio</div>
                        {Object.entries(propertyFeatures.sobreElEdificio).map(([key, value]) => (
                        <div key={key} className={classes.subtitleCard}>
                            <label>
                            <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => handleInputChange('sobreElEdificio', key, e.target.checked)}
                                className={classes.checkbox}
                            />
                            <span></span>
                            {formatLabel(key)}
                            </label>
                        </div>
                        ))}
                    </div>
                </div>

                <div className={classes.buttonsContainer}>
                    <div className={classes.button} onClick={handleClose} style={{ backgroundColor: '#7E7E7E' }}>
                        Cancelar
                    </div>
                    <div className={classes.button} onClick={handleSaveNeeds} style={{ backgroundColor: '#00283E' }}>
                        Guardar Necesidades
                    </div>
                </div>
            </div>
        </div>
    )
}
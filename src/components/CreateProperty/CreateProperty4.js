import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { createPropertyStyles } from '../../styles/useStyles'
import { Button } from '../RentState Components/components'

const CreateProperty4 = ({ onNext, updateData, propertyData }) => {
    const classes = createPropertyStyles()

    const [propertyFeatures, setPropertyFeatures] = useState({
        general: {
            tipo: propertyData.category,
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
            alquiler: propertyData.price,
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

    const handleInputChange = (section, field, value) => {
        setPropertyFeatures((prev) => {
            const updatedFeatures = {
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }
            console.log('propertyFeatures actualizado:', updatedFeatures)
            return updatedFeatures
        })
    }

    const toggleCheckbox = (section, field) => {
        setPropertyFeatures((prev) => {
            const updatedFeatures = {
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: !prev[section][field]
                }
            }
            console.log('propertyFeatures actualizado:', updatedFeatures)
            return updatedFeatures
        })
    }

    const handleNextStep = () => {
        updateData({ propertyFeatures }) 
        console.log('Enviando al padre:', propertyFeatures)
        onNext()
    }

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <form className={classes.formContainer} style={{ maxWidth: '90vw' }}>
                <h3 className={classes.step}>Paso 3/5</h3>
                <h3 className={classes.title}>Características del Inmueble</h3>
                <h3 className={classes.subtitle}>Ingrese todas las características de su inmueble</h3>

                <div className={classes.formContainerStep4}>
                    {/* General */}
                    <div className={classes.featureBox}>
                        <h4 className={classes.featureTitle}>General</h4>    
                        <div className={classes.inputGroup}>
                            <div className={classes.inputRow}>
                                <span className={classes.inputLabel}>Tipo:</span>
                                <select
                                    className={classes.selectField}
                                    value={propertyFeatures.general.tipo}
                                    onChange={(e) => handleInputChange('general', 'tipo', e.target.value)}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="Departamento">Departamento</option>
                                    <option value="Casa">Casa</option>
                                    <option value="Oficina">Oficina</option>
                                    <option value="Habitación">Habitación</option>
                                </select>
                            </div>
                            <div className={classes.inputRow}>
                                <span className={classes.inputLabel}>Área total (m²):</span>
                                <input
                                    type="number"
                                    className={classes.inputField}
                                    value={propertyFeatures.general.areaTotal}
                                    onChange={(e) => handleInputChange('general', 'areaTotal', e.target.value)}
                                />
                            </div>
                            <div className={classes.inputRow}>
                                <span className={classes.inputLabel}>Dormitorios:</span>
                                <input
                                    type="number"
                                    className={classes.inputField}
                                    value={propertyFeatures.general.dormitorios}
                                    onChange={(e) => handleInputChange('general', 'dormitorios', e.target.value)}
                                />
                            </div>
                            <div className={classes.inputRow}>
                                <span className={classes.inputLabel}>Antigüedad:</span>
                                <input
                                    type="number"
                                    className={classes.inputField}
                                    value={propertyFeatures.general.antiguedad}
                                    onChange={(e) => handleInputChange('general', 'antiguedad', e.target.value)}
                                />
                                <select
                                    className={classes.selectField}
                                    value={propertyFeatures.general.antiguedadUnidad}
                                    onChange={(e) => handleInputChange('general', 'antiguedadUnidad', e.target.value)}
                                >
                                    <option value="Años">Años</option>
                                    <option value="Meses">Meses</option>
                                    <option value="Días">Días</option>
                                </select>
                            </div>
                            <div className={classes.inputRow}>
                                <span className={classes.inputLabel}>Baños:</span>
                                <input
                                    type="number"
                                    className={classes.inputField}
                                    value={propertyFeatures.general.banos}
                                    onChange={(e) => handleInputChange('general', 'banos', e.target.value)}
                                />
                            </div>
                            <div className={classes.inputRow}>
                                <span className={classes.inputLabel}>Pisos:</span>
                                <input
                                    type="number"
                                    className={classes.inputField}
                                    value={propertyFeatures.general.pisos}
                                    onChange={(e) => handleInputChange('general', 'pisos', e.target.value)}
                                />
                            </div>
                            <div className={classes.inputRow}>
                                <span className={classes.inputLabel}>Estacionamientos:</span>
                                <input
                                    type="number"
                                    className={classes.inputField}
                                    value={propertyFeatures.general.estacionamiento}
                                    onChange={(e) => handleInputChange('general', 'estacionamiento', e.target.value)}
                                />
                            </div>
                            <div className={classes.inputRow}>
                                <span className={classes.inputLabel}>Ruido:</span>
                                <select
                                    className={classes.selectField}
                                    value={propertyFeatures.general.ruido}
                                    onChange={(e) => handleInputChange('general', 'ruido', e.target.value)}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="Bajo">Bajo</option>
                                    <option value="Medio">Medio</option>
                                    <option value="Alto">Alto</option>
                                </select>
                            </div>
                            <div className={classes.inputRow}>
                                <span className={classes.inputLabel}>Iluminación:</span>
                                <select
                                    className={classes.selectField}
                                    value={propertyFeatures.general.iluminacion}
                                    onChange={(e) => handleInputChange('general', 'iluminacion', e.target.value)}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="Alta">Alta</option>
                                    <option value="Media">Media</option>
                                    <option value="Baja">Baja</option>
                                </select>
                            </div>
                            <div className={classes.inputRow}>
                                <span className={classes.inputLabel}>Vista:</span>
                                <select
                                    className={classes.selectField}
                                    value={propertyFeatures.general.vista}
                                    onChange={(e) => handleInputChange('general', 'vista', e.target.value)}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="Al parque">Al parque</option>
                                    <option value="A la playa">A la playa</option>
                                    <option value="A edificios">A edificios</option>
                                    <option value="A la calle">A la calle</option>
                                    <option value="A montañas">A montañas</option>
                                    <option value="Interior">Interior</option>
                                </select>
                            </div>
                        </div>

                        {/* Checkboxes */}
                        <div className={classes.checkboxGroup}>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.general.balcon}
                                    onChange={() => toggleCheckbox('general', 'balcon')}
                                />
                                Balcón
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.general.terraza}
                                    onChange={() => toggleCheckbox('general', 'terraza')}
                                />
                                Terraza
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.general.deposito}
                                    onChange={() => toggleCheckbox('general', 'deposito')}
                                />
                                Depósito
                            </label>
                        </div>
                    </div>

                    {/* Costos y Sobre el Edificio combinados */}
                    <div className={classes.featureBox}>
                        <h4 className={classes.featureTitle}>Costos</h4>
                        {/* Campos con entrada de datos (Costos) */}
                        <div className={classes.inputGroup}>
                            <div className={classes.inputRow}>
                                <label className={classes.inputLabel}>Alquiler:</label>
                                <input
                                    type="number"
                                    className={classes.inputField}
                                    value={propertyFeatures.costos.alquiler}
                                    onChange={(e) => handleInputChange('costos', 'alquiler', e.target.value)}
                                    placeholder="S/."
                                />
                            </div>
                            <div className={classes.inputRow}>
                                <label className={classes.inputLabel}>Mantenimiento:</label>
                                <input
                                    type="number"
                                    className={classes.inputField}
                                    value={propertyFeatures.costos.mantenimiento}
                                    onChange={(e) => handleInputChange('costos', 'mantenimiento', e.target.value)}
                                    placeholder="S/."
                                />
                            </div>
                        </div>

                        {/* Checkboxes (Costos) */}
                        <div className={classes.checkboxGroup}>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.costos.incluyeLuz}
                                    onChange={() => toggleCheckbox('costos', 'incluyeLuz')}
                                />
                                Incluye Luz
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.costos.incluyeAgua}
                                    onChange={() => toggleCheckbox('costos', 'incluyeAgua')}
                                />
                                Incluye Agua
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.costos.incluyeInternet}
                                    onChange={() => toggleCheckbox('costos', 'incluyeInternet')}
                                />
                                Incluye Internet
                            </label>
                        </div>

                        <h4 className={classes.featureTitle}>Sobre el Edificio</h4>

                        {/* Checkboxes (Sobre el Edificio) */}
                        <div className={classes.checkboxGroup}>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.sobreElEdificio.petFriendly}
                                    onChange={() => toggleCheckbox('sobreElEdificio', 'petFriendly')}
                                />
                                PetFriendly
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.sobreElEdificio.ascensor}
                                    onChange={() => toggleCheckbox('sobreElEdificio', 'ascensor')}
                                />
                                Ascensor
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.sobreElEdificio.intercomunicador}
                                    onChange={() => toggleCheckbox('sobreElEdificio', 'intercomunicador')}
                                />
                                Intercomunicador
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.sobreElEdificio.servicioLimpieza}
                                    onChange={() => toggleCheckbox('sobreElEdificio', 'servicioLimpieza')}
                                />
                                Servicio de Limpieza
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.sobreElEdificio.servicioVigilancia}
                                    onChange={() => toggleCheckbox('sobreElEdificio', 'servicioVigilancia')}
                                />
                                Servicio de Vigilancia
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.sobreElEdificio.recepcion}
                                    onChange={() => toggleCheckbox('sobreElEdificio', 'recepcion')}
                                />
                                Recepción
                            </label>
                        </div>
                    </div>
                    {/* Amenidades */}
                    <div className={classes.featureBox}>
                        <h4 className={classes.featureTitle}>Amenidades</h4>
                        <div className={classes.checkboxGroup}>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.areasVerdes}
                                    onChange={() => toggleCheckbox('amenidades', 'areasVerdes')}
                                />
                                Áreas Verdes
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.piscina}
                                    onChange={() => toggleCheckbox('amenidades', 'piscina')}
                                />
                                Piscina
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.gimnasio}
                                    onChange={() => toggleCheckbox('amenidades', 'gimnasio')}
                                />
                                Gimnasio
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.salaEntretenimiento}
                                    onChange={() => toggleCheckbox('amenidades', 'salaEntretenimiento')}
                                />
                                Sala de entretenimiento
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.areaCoworking}
                                    onChange={() => toggleCheckbox('amenidades', 'areaCoworking')}
                                />
                                Área de Coworking
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.terrazaCompartida}
                                    onChange={() => toggleCheckbox('amenidades', 'terrazaCompartida')}
                                />
                                Terraza Compartida
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.zonaBBQ}
                                    onChange={() => toggleCheckbox('amenidades', 'zonaBBQ')}
                                />
                                Zona BBQ
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.salaReuniones}
                                    onChange={() => toggleCheckbox('amenidades', 'salaReuniones')}
                                />
                                Sala de Reuniones
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.canchaDeporte}
                                    onChange={() => toggleCheckbox('amenidades', 'canchaDeporte')}
                                />
                                Cancha de Deporte
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.saunaSpa}
                                    onChange={() => toggleCheckbox('amenidades', 'saunaSpa')}
                                />
                                Sauna y Spa
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.juegosInfantiles}
                                    onChange={() => toggleCheckbox('amenidades', 'juegosInfantiles')}
                                />
                                Juegos Infantiles
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.bodega}
                                    onChange={() => toggleCheckbox('amenidades', 'bodega')}
                                />
                                Bodega
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.cafeteria}
                                    onChange={() => toggleCheckbox('amenidades', 'cafeteria')}
                                />
                                Cafeteria
                            </label>
                            <label className={classes.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={propertyFeatures.amenidades.accesoDiscapacidad}
                                    onChange={() => toggleCheckbox('amenidades', 'accesoDiscapacidad')}
                                />
                                Acceso para Discapacidad
                            </label>
                        </div>
                    </div>
                </div>
                <div className="formActions" style={{ gap: '1rem', display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={handleNextStep} width="20rem">
                        Continuar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CreateProperty4
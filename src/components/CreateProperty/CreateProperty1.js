import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import '../../styles/Booking.css'
import { createPropertyStyles } from '../../styles/useStyles'
import { Button, FieldEdit, FieldSelect } from '../RentState Components/components'

const CreateProperty1 = ({ onNext, updateData }) => {
    const classes = createPropertyStyles()

    const [category, setCategory] = useState('')
    const [district, setDistrict] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    const isFormValid = category.trim() && district.trim() && price.trim() && description.trim()

    const districts = [
        { value: "Cercado de Lima", label: "Cercado de Lima" },
        { value: "Ate", label: "Ate" },
        { value: "Barranco", label: "Barranco" },
        { value: "Breña", label: "Breña" },
        { value: "Comas", label: "Comas" },
        { value: "Chorrillos", label: "Chorrillos" },
        { value: "El Agustino", label: "El Agustino" },
        { value: "Jesús María", label: "Jesús María" },
        { value: "La Molina", label: "La Molina" },
        { value: "La Victoria", label: "La Victoria" },
        { value: "Lince", label: "Lince" },
        { value: "Magdalena del Mar", label: "Magdalena del Mar" },
        { value: "Miraflores", label: "Miraflores" },
        { value: "Pueblo Libre", label: "Pueblo Libre" },
        { value: "Puente Piedra", label: "Puente Piedra" },
        { value: "Rímac", label: "Rímac" },
        { value: "San Isidro", label: "San Isidro" },
        { value: "Independencia", label: "Independencia" },
        { value: "San Juan de Miraflores", label: "San Juan de Miraflores" },
        { value: "San Luis", label: "San Luis" },
        { value: "San Martín de Porres", label: "San Martín de Porres" },
        { value: "San Miguel", label: "San Miguel" },
        { value: "Santiago de Surco", label: "Santiago de Surco" },
        { value: "Surquillo", label: "Surquillo" },
        { value: "Villa María del Triunfo", label: "Villa María del Triunfo" },
        { value: "San Juan de Lurigancho", label: "San Juan de Lurigancho" },
        { value: "Santa Rosa", label: "Santa Rosa" },
        { value: "Los Olivos", label: "Los Olivos" },
        { value: "Villa El Salvador", label: "Villa El Salvador" },
        { value: "Santa Anita", label: "Santa Anita" }
    ];
    
    const categories = [
        { value: 'Departamento', label: 'Departamento' },
        { value: 'Casa', label: 'Casa' },
        { value: 'Oficina', label: 'Oficina' },
        { value: 'Habitación', label: 'Habitación' }
    ]

    const nextStep = () => {
        if (isFormValid) {
            updateData({ category, district, description, price })
            onNext()
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <form className={classes.formContainer}>
                <h3 className={classes.step}>Paso 1/6</h3>
                <h3 className={classes.title}>Publica con RentState</h3>
                <h3 className={classes.subtitle}>Ingrese los datos generales de su inmueble</h3>

                <div className={classes.fieleditscontainer}>
                    <FieldSelect
                        id="category"
                        label="Categoría"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        options={categories}
                    />

                    <FieldSelect
                        id="district"
                        label="Distrito"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        options={districts}
                    />

                    <FieldEdit
                        id="price"
                        label="Precio"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <FieldEdit
                        id="description"
                        label="Descripción"
                        value={description}
                        multiline
                        rows={4}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="formActions" style={{ gap: '1rem', display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button disabled={!isFormValid} onClick={nextStep} width="20rem">
                        Siguiente
                    </Button>
                </div>
            </form>

           
        </div>
    )
}

export default CreateProperty1
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
        { value: 'cercado_de_lima', label: 'Cercado de Lima' },
        { value: 'ate', label: 'Ate' },
        { value: 'barranco', label: 'Barranco' }
    ]
    const categories = [
        { value: 'departamento', label: 'Departamento' },
        { value: 'casa', label: 'Casa' },
        { value: 'oficina', label: 'Oficina' },
        { value: 'habitacion', label: 'Habitación' }
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
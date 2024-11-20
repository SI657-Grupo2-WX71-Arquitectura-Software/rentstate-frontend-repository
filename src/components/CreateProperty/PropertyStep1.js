import React, { useState } from "react"
import { FieldEdit, Button, FieldSelect } from "../RentState Components/components"
import { useStylesRegister } from "../../styles/useStyles"

const PropertyStep1 = ({ nextStep, updatePropertyData }) => {
    const classes = useStylesRegister()

    const [category, setCategory] = useState("")
    const [district, setDistrict] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const isFormValid = category && district && price > 0 && description.trim()

    console.log('Props Received:') // Debugging log
    console.log('nextStep:', nextStep)
    console.log('updatePropertyData:', updatePropertyData)

    const handleRegister = (e) => {
        e.preventDefault()
        if (isFormValid) {
            console.log('Form Submitted') // Debugging log
            updatePropertyData({ category, district, price, description })
            nextStep()
        } else {
            console.warn("Formulario inválido. Verifica los campos.")
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <form className={classes.formContainerStep3} onSubmit={handleRegister}>
                <div style={{ display: "flex", gap: '8rem', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <h3 className={classes.title}>Publica con RentState</h3>
                        <h3 className={classes.subtitle}>Paso 1/6</h3>
                        <h3 className={classes.subtitle}>Ingrese los datos generales de su inmueble</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <FieldSelect
                            id="category"
                            label="Categoría"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            options={[
                                { value: "Casa", label: "Casa" },
                                { value: "Oficina", label: "Oficina" },
                                { value: "Departamento", label: "Departamento" },
                                { value: "Habitacion", label: "Habitación" }
                            ]}
                        />
                        <FieldSelect
                            id="district"
                            label="Distrito"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            options={[
                                { value: "Miraflores", label: "Miraflores" },
                                { value: "San Isidro", label: "San Isidro" },
                                { value: "Barranco", label: "Barranco" },
                                { value: "Surco", label: "Surco" }
                            ]}
                        />
                        <FieldEdit
                            id="price"
                            label="Precio"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                        <FieldEdit
                            id="description"
                            label="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline={true}
                            rows={6}
                        />
                        <Button type="submit" width="20rem" disabled={!isFormValid}>
                            Siguiente
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PropertyStep1

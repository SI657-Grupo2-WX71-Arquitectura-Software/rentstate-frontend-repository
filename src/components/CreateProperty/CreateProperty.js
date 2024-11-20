import React, { useState } from 'react'
import PropertyStep1 from './PropertyStep1'
import PropertyStep2 from './PropertyStep2'
import { createProperty } from '../../hooks/usePropertyService'

const CreateProperty = () => {
    const [step, setStep] = useState(1)
    const [propertyData, setPropertyData] = useState({
        category: "",
        district: "",
        location: "",
        latitude: "",
        longitude: "",
        description: "",
        characteristics: "",
        price: 0,
        cardimage: [""]
    })

    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

    const updatePropertyData = (newData) => {
        console.log('Updating Property Data:', newData) // Debugging log
        setPropertyData((prev) => ({ ...prev, ...newData }))
    }

    console.log('Step:', step)
    console.log('Property Data:', propertyData) // Debugging log

    switch (step) {
        case 1:
            return (
                <PropertyStep1
                    propertyData={propertyData}
                    updatePropertyData={updatePropertyData}
                    nextStep={nextStep}
                />
            )
        case 2:
            return (
                <PropertyStep2
                    propertyData={propertyData}
                    updatePropertyData={updatePropertyData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )
        default:
            return <div>Error: Paso no válido</div>
    }
}

export default CreateProperty

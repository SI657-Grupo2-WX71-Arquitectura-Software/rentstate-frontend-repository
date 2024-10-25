import React, { useState } from 'react';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep5';
import RegisterStep4 from './RegisterStep4';
import RegisterStep5 from './RegisterStep3';
import { createUser } from '../../hooks/useUserService';

const Register = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        name: "",
        lastName: "",
        username: "",
        email: "",
        district: "",
        birthDate: null,
        gender: "",
        password: "",
        role: "",
        latitude: 0,
        longitude: 0,
        photoUrl: "",
        department: "",
        city: "",
        address: "",
        phone: "",
        dni: ""
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const updateUserData = (newData) => {
        setUserData(prev => {
            const updatedData = {...prev, ...newData};
            //console.log("Datos actualizados:", updatedData);
            return updatedData;
        });
    };

    const handleFinalRegister = async () => {
        try {
            const result = await createUser(userData);
            console.log("Registro exitoso:", result);
        } catch (error) {
            console.error("Registro fallido:", error);
        }
    };

    switch(step) {
        case 1:
            return <RegisterStep1 userData={userData} updateUserData={updateUserData} nextStep={nextStep} />;
        case 2:
            return <RegisterStep2 userData={userData} updateUserData={updateUserData} nextStep={nextStep} prevStep={prevStep} />;
        case 3:
            return <RegisterStep5 userData={userData} updateUserData={updateUserData} nextStep={nextStep} prevStep={prevStep} />;
        case 4:
            return <RegisterStep4 userData={userData} updateUserData={updateUserData} nextStep={nextStep} prevStep={prevStep} />;
        case 5:
            return <RegisterStep3 userData={userData} updateUserData={updateUserData} nextStep={handleFinalRegister} prevStep={prevStep} />;
        default:
            return <div>Error</div>;
    }
};

export default Register;
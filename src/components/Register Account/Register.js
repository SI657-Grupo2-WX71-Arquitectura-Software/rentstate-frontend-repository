import React, { useState } from 'react';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import RegisterStep4 from './RegisterStep4';
import RegisterStep5 from './RegisterStep5';

const Register = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    switch(step) {
        case 1:
            return <RegisterStep1 nextStep={nextStep} />;
        case 2:
            return <RegisterStep2 nextStep={nextStep} prevStep={prevStep} />;
        case 3:
            return <RegisterStep3 nextStep={nextStep} prevStep={prevStep} />;
        case 4:
            return <RegisterStep4 nextStep={nextStep} prevStep={prevStep} />;
        case 5:
            return <RegisterStep5 nextStep={nextStep} prevStep={prevStep} />;
        default:
            return <div>Error</div>;
    }
};

export default Register;
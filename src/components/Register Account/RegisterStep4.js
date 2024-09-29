import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useStylesRegister } from "../../styles/useStyles";
import backArrow from '../../assets/backArrow.svg';
import { Button, FieldEdit, FieldSelect } from "../RentState Components/components";
import GoogleMapsFinder from "../RentState Components/GoogleMapsFinder";

const RegisterStep4 = ({ nextStep, prevStep }) => {
    const classes = useStylesRegister();
    const [department, setDepartment] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [address, setAddress] = useState("");
    const [mapAddress, setMapAddress] = useState("");
    const isFormValid = mapAddress;

    const handleRegister = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            nextStep();
        }
    };

    const handleAddressSelect = (address) => {
        setMapAddress(address);
        setAddress(address);
    };

    const departmentOptions = [
        { value: "male", label: "Masculino" },
        { value: "female", label: "Femenino" },
        { value: "non-binary", label: "No Binario" },
        { value: "undisclosed", label: "Prefiero no decir" }
    ];

    const cityOptions = [
        { value: "male", label: "Masculino" },
        { value: "female", label: "Femenino" },
        { value: "non-binary", label: "No Binario" },
        { value: "undisclosed", label: "Prefiero no decir" }
    ];

    const districtOptions = [
        { value: "male", label: "Masculino" },
        { value: "female", label: "Femenino" },
        { value: "non-binary", label: "No Binario" },
        { value: "undisclosed", label: "Prefiero no decir" }
    ];

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <button onClick={prevStep} className={classes.returnButton}>
                <img src={backArrow} alt="Regresar" style={{ width: '100%', height: '100%' }} />
            </button>

            <form onSubmit={handleRegister} className={classes.formContainerStep4}>                              
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems:'center', margin: '2rem 8rem ' }}>
                        <div>
                            <h3 className={classes.title}>Crea tu cuenta</h3>
                            <h3 className={classes.subtitle}>Paso 4/5</h3>
                        </div>
                        <div className={classes.fieleditscontainer}>
                            <FieldSelect 
                                id="department" 
                                label="Departamento" 
                                value={department} 
                                onChange={(e) => setDepartment(e.target.value)} 
                                options={departmentOptions}
                            />
                            <FieldSelect 
                                id="city" 
                                label="Ciudad" 
                                value={city} 
                                onChange={(e) => setCity(e.target.value)} 
                                options={cityOptions}
                            />
                            <FieldSelect 
                                id="district" 
                                label="Distrito" 
                                value={district} 
                                onChange={(e) => setDistrict(e.target.value)} 
                                options={districtOptions}
                            />
                            <FieldEdit
                                id="address" 
                                label="Dirección" 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} 
                            />                           
                        </div>                        
                        <Button
                            disabled={!isFormValid}
                            onClick={nextStep}
                        >
                            Siguiente
                        </Button>
                        <Link 
                            to="/login" 
                            style={{ color: '#FFF', marginTop: '15px' }}
                        >
                            ¿Ya tienes cuenta? Inicia Sesión
                        </Link>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', height: '100%' }}>
                        <GoogleMapsFinder onAddressSelect={handleAddressSelect} />
                    </div>        
            </form>          
        </div>
    );
};

export default RegisterStep4;
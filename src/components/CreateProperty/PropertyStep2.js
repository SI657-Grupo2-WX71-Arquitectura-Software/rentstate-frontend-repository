import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, FieldEdit, FieldSelect } from "../RentState Components/components";
import { useStylesRegister } from "../../styles/useStyles";
import backArrow from '../../assets/backArrow.svg';

const PropertyStep2 = ({ propertyData = {}, updatePropertyData, nextStep, prevStep }) => {
    const classes = useStylesRegister();
    const [category, setCategory] = useState(propertyData.category || "");
    const [district, setDistrict] = useState(propertyData.district || "");
    const [price, setPrice] = useState(propertyData.price || 0);
    const [description, setDescription] = useState(propertyData.description || "");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (category && district && price > 0 && description) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [category, district, price, description]);

    const handleNextStep = () => {
        updatePropertyData({ category, district, price, description });
        nextStep();
    };

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <button onClick={prevStep} className={classes.returnButton}>
                <img src={backArrow} alt="Regresar" style={{ width: '100%', height: '100%' }} />
            </button>
            <form className={classes.formContainerStep3}>
                <div style={{ display: "flex", gap: '8rem', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <div>
                        <h3 className={classes.title}>Subir Fotos</h3>
                        <h3 className={classes.subtitle}>Paso 2/6</h3>
                        <h3 className={classes.subtitle}>Suba fotos de su Propiedad, se requiere un mínimo de 5 fotos (busca reflejar el exterior de la propiedad, sus habitaciones, y caracterisicas llamativas).</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                          
                         <FieldEdit
                            id="price" 
                            label="Precio" 
                            type="price"
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)}
                        />
                         <FieldEdit
                            id="description" 
                            label="Descripción" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            multiline={true}
                            rows={6}
                        />
                        <Button
                            onClick={handleNextStep}
                            width="20rem"
                            disabled={!isFormValid}
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
                </div>              
            </form>
        </div>
    );
};

export default PropertyStep2;
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonUpload} from "../RentState Components/components";
import { useStylesRegister } from "../../styles/useStyles";
import backArrow from '../../assets/backArrow.svg'
import uploadIcon from '../../assets/uploadPhoto.svg'; 
import uploadCloudIcon from '../../assets/uploadCloudIcon.svg'; 


const RegisterStep3 = ({ nextStep, prevStep }) => {
    const classes = useStylesRegister();    
    const [photoUploaded, setPhotoUploaded] = useState("");
    const isFormValid = photoUploaded;
    const fileInputRef = useRef(null);
   
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setPhotoUploaded(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            nextStep();
        }
    };

    const handleClickUpload = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={classes.container}>
            <div className={classes.darkOverlay}></div>
            <button onClick={prevStep} className={classes.returnButton}>
                <img src={backArrow} alt="Regresar" style={{ width: '100%', height: '100%' }} />
            </button>

            <form onSubmit={handleRegister} className={classes.formContainerStep3}>
                <div style={{display:"flex", gap: '8rem', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                    <div>
                        <h3 className={classes.title}>Crea tu cuenta</h3>
                        <h3 className={classes.subtitle}>Paso 3/5</h3>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', gap:'0.3rem', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <div style={{
                                width: '300px',
                                height: '300px',
                                backgroundColor: '#C8C8C8',
                                borderRadius: '10px',
                                backgroundImage: `url(${photoUploaded})`,
                                backgroundSize: 'cover',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {!photoUploaded && <img src={uploadIcon} alt="Subir foto" style={{ width: '50%', height: '50%' }} />}
                            </div>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                accept="image/*"
                            />
                            <ButtonUpload
                                type="button"
                                onClick={handleClickUpload}
                                icon={uploadCloudIcon}   
                                style={{marginTop: 5}}  
                                iconWidth="24px"
                            >
                                Subir Foto de Perfil
                            </ButtonUpload>
                        </div>
                        <Button
                            disabled={!photoUploaded}
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
                </div>              
            </form>
        </div>
    );
};

export default RegisterStep3;
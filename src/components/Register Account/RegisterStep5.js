import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonUpload } from "../RentState Components/components";
import { useStylesRegister } from "../../styles/useStyles";
import backArrow from '../../assets/backArrow.svg';
import uploadIcon from '../../assets/uploadPhoto.svg'; 
import uploadCloudIcon from '../../assets/uploadCloudIcon.svg'; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../hooks/useUserService";

const RegisterStep5 = ({ prevStep }) => {
    const classes = useStylesRegister();    
    const [photoUploaded, setPhotoUploaded] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [userId, setUserId] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getAllUsers();
                const lastUser = users[users.length - 1];
                setUserId(lastUser.id);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);
   
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && userId) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post(`https://rentstate.antarticdonkeys.com/api/gateway-service/api/v1/users/upload-profile-picture/${userId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 200) {
                    setPhotoUploaded(URL.createObjectURL(file));
                    setUploadSuccess(true);
                } else {
                    setUploadSuccess(false);
                    console.error("Error subiendo la imagen:", response.statusText);
                }
            } catch (error) {
                console.error("Error subiendo la imagen:", error);
                setUploadSuccess(false);
            }
        }
    };

    const handleClickUpload = () => {
        fileInputRef.current.click();
    };

    const finalizeRegistration = () => {
        if (uploadSuccess) {
            navigate('/login');
        }
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
                        <h3 className={classes.title}>Crea tu cuenta</h3>
                        <h3 className={classes.subtitle}>Paso 5/5</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
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
                                style={{ marginTop: 5 }}  
                                iconWidth="24px"
                            >
                                Subir Foto de Perfil
                            </ButtonUpload>
                        </div>
                        <Button
                            disabled={!uploadSuccess}
                            onClick={finalizeRegistration}
                        >
                            Registrar
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

export default RegisterStep5;
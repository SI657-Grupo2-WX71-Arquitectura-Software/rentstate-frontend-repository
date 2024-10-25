import { Avatar } from "@mui/material";
import dayjs from 'dayjs';
import { getUser, createContact, getContacts  } from '../../src/hooks/useUserService';
import { emailIcon, phoneIcon } from '../../src/assets';
import { useNavigate, useParams } from "react-router-dom";
import { useStylesMyAccount } from "../styles/useStyles";
import MyProperties from "./MyAccount/Tabs/MyProperties";
import { useEffect, useState } from "react";
import { getPropertiesByUserId } from "../hooks/usePropertyService";
import { IconButton } from '@mui/material';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { getPropertyById } from '../hooks/usePropertyService';

const MyAccount = () => {
    const classes = useStylesMyAccount();
    const [avatarImage, setAvatarImage] = useState(""); 
    const { userId } = useParams();
    const [propertyCount, setPropertyCount] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('userId');
    const [owner, setOwner] = useState(null);

    const [user, setUser] = useState({
        id: '',
        name: '',
        lastName: '',
        username: '',
        role: '',
        gender: '',
        password: '',
        description: '',
        district: '',
        birthDate: dayjs(),
        photoUrl: '',
        phone: '',
        email: '',
        latitude: '',
        longitude: '',
        department: '',
        city: '',
        address: '',
        dni: '',
        premium: null,
        chatNewMessage: null,
        newPropertyNear: null,
        coverageAreaInterest: [],
        favoriteProperties: [],
        userNeeds: null,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userId && token) {
                    const userResponse = await getUser(userId, token);
                    console.log('User data fetched:', userResponse);
                    setUser(userResponse);
                    setOwner(userResponse);
                    setAvatarImage(userResponse.photoUrl);

                    const properties = await getPropertiesByUserId(userId);
                    const userProperties = properties.filter(property => property.userId === parseInt(userId));
                    console.log('Filtered properties:', userProperties);
                    setPropertyCount(userProperties.length);
                } else {
                    console.error("No se encontró el ID del usuario o el token en el almacenamiento local.");
                }
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        };

        fetchUserData();
    }, [userId, token]);

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const propertyData = await getPropertyById(id);
                const ownerData = await getUser(propertyData.userId);
                setOwner(ownerData);
            } catch (error) {
                console.error("Error al obtener los detalles de la propiedad o del propietario:", error);
            }
        };
        fetchPropertyData();
    }, [id]);

    const handleChatClick = async () => {
        try {
            if (!owner) {
                console.error('Owner no está definido');
                return;
            }         
            const contacts = await getContacts(currentUserId, token);
            const contactExists = contacts.includes(owner.username);
            if (!contactExists) {
                await createContact(currentUserId, owner.username, token);
            }
            navigate('/mensajes');
        } catch (error) {
            console.error('Error al crear el contacto:', error);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.containerDivisor}>
                <div className={classes.profileCard}>                  
                    <div style={{display:'flex', justifyContent:'center', marginTop:'1rem'}}>
                        <Avatar 
                            alt="Avatar" 
                            src={avatarImage}
                            sx={{ width: 200, height: 200 }} 
                        />
                    </div>
                    <div>
                        <div className={classes.title}>{user.name} {user.lastName}</div>
                        <div className={classes.subtitle}>{user.username}</div>
                    </div>

                    <div className={classes.dataContainer} style={{margin:'2rem 0'}}>
                        <div className={classes.text}>
                            Miembro <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                                {user.role === 'owner' ? 'Propietario' : user.role === 'tenant' ? 'Inquilino' : user.role}
                            </span>
                        </div>
                        <div className={classes.text}>
                            <img src={emailIcon} alt="Email" className={classes.icon} style={{height: '12px'}}/>
                            {user.email}
                        </div>
                        <div className={classes.text}>
                            <img src={phoneIcon} alt="Phone" className={classes.icon} style={{height: '15px'}}/>
                            (+51) {user.phone}
                        </div>                                               
                    </div>

                    <div className={classes.dataContainer}>
                        <div className={classes.text} style={{textAlign:'left'}}>
                            ¡Cuenta con <span style={{fontWeight:'bold', margin:'0 5px'}}>{propertyCount}</span> Propiedades en RentState!                          
                        </div>
                        <div className={classes.text} style={{textAlign:'left'}}>
                            Tiene <span style={{fontWeight:'bold', margin:'0 5px'}}>3</span> inquilinos activos                         
                        </div>     
                    </div>


                    <div className={classes.buttonContainer} onClick={handleChatClick} > 
                        <div className={classes.button} style={{backgroundColor: '#00283E', display:'flex', gap:'5px', justifyContent:'center' }}> 
                            <IconButton aria-label="mensajes" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer", padding:0 }}>
                                <MarkUnreadChatAltIcon />
                            </IconButton>
                            ¡Chatear!
                        </div>      
                    </div>



                </div>
                <div className={classes.tabsSection}>
                    <div className={classes.subtitle}>
                        <p style={{fontSize:'1.2rem'}}>Propiedades de <span style={{fontWeight:'bold'}}>{user.name} {user.lastName}</span></p>
                    </div>

                    <div className={classes.tabContent}>                        
                        <MyProperties currentUser={user} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
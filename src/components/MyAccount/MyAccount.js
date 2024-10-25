import React, { useEffect, useState } from "react";
import { IconButton, Avatar} from "@mui/material";
import dayjs from 'dayjs';
import { getUser, uploadProfilePicture } from '../../hooks/useUserService';
import { useStylesMyAccount } from "../../styles/useStyles";
import MyConfiguration from "./Tabs/MyConfiguration";
import MyTenants from "./Tabs/MyTenants";
import MyProperties from "./Tabs/MyProperties";
import { emailIcon, phoneIcon, dniIcon, editIcon, passwordIcon} from '../../assets';
import GoogleMapRentState from "../RentState Components/GoogleMapRentState";
const MyAccount = () => {
    const classes = useStylesMyAccount();
    const [selectedTab, setSelectedTab] = useState('myProperties');
    const [avatarImage, setAvatarImage] = useState(""); 
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
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            if (!userId || !token) {
                return;
            }
            try {
                const userData = await getUser(userId, token);
                setUser({
                    id: userData.id,
                    name: userData.name,
                    lastName: userData.lastName,
                    username: userData.username,
                    role: userData.role,
                    gender: userData.gender.toLowerCase(),
                    password: userData.password,
                    description: userData.description,
                    district: userData.district,
                    birthDate: dayjs(userData.birthDate),
                    photoUrl: userData.photoUrl,
                    phone: userData.phone,
                    email: userData.email,
                    latitude: userData.latitude,
                    longitude: userData.longitude,
                    department: userData.department,
                    city: userData.city,
                    address: userData.address,
                    dni: userData.dni,
                    premium: userData.premium,
                    chatNewMessage: userData.chatNewMessage,
                    newPropertyNear: userData.newPropertyNear,
                    coverageAreaInterest: userData.coverageAreaInterest,
                    favoriteProperties: userData.favoriteProperties,
                    userNeeds: userData.userNeeds,
                });
                setAvatarImage(userData.photoUrl);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarImage(reader.result);
            };
            reader.readAsDataURL(file);

            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                if (userId && token) {
                    await uploadProfilePicture(userId, file, token);
                    setUser(prevUser => ({
                        ...prevUser,
                        photoUrl: reader.result
                    }));
                }
            } catch (error) {
                console.error("Error uploading profile picture:", error);
            }
        }
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'myConfiguration':
                return <MyConfiguration />;
            case 'myTenants':
                return <MyTenants />;
            case 'myProperties':
                return <MyProperties currentUser={user} />;
            default:
                return <div>Hola</div>;
        }
    };
    
    return (
        <div className={classes.container}>
            <div className={classes.containerDivisor}>
                <div className={classes.profileCard}>
                    <div style={{display:'flex', width:'100%', justifyContent:'right', marginRight:'-10px'}}>
                        <img src={editIcon} alt="edit" className={classes.icon} style={{height: '16px'}}/>
                    </div>
                    <div>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="upload-avatar"
                            type="file"
                            onChange={handleAvatarChange}
                        />
                        <label htmlFor="upload-avatar">
                            <IconButton component="span">
                                <Avatar 
                                    alt="Avatar" 
                                    src={avatarImage}
                                    sx={{ width: 150, height: 150 }} 
                                />
                            </IconButton>
                        </label>
                    </div>
                    <div>
                        <div className={classes.title}>{user.name} {user.lastName}</div>
                        <div className={classes.subtitle}>{user.username}</div>
                    </div>

                    <div className={classes.dataContainer}>
                        <div className={classes.text}>
                            Usted es <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
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
                        <div className={classes.text}>
                            <img src={dniIcon} alt="DNI" className={classes.icon} style={{height: '12px'}}/>
                            DNI: {user.dni}
                        </div>
                        <div className={classes.subtext}>
                            <img src={passwordIcon} alt="Password" className={classes.icon} style={{height: '15px', marginRight:'15px'}}/>
                            *************
                        </div>
                    </div>

                    <div>
                        <GoogleMapRentState 
                            mapType="marker"
                            height="25vh" 
                            width="96%" 
                            latitude={user.latitude} 
                            longitude={user.longitude} 
                        />
                        <div className={classes.text} style={{textAlign:'left', fontSize:'0.7rem', margin:'10px 0'}}>
                            {user.address}                           
                        </div>
                    </div>

                </div>
                <div className={classes.tabsSection}>
                    <div className={classes.tabsButtons}>
                        <div className={`${classes.tabButton} ${selectedTab === 'myProperties' ? classes.tabButtonSelected : ''}`} onClick={() => setSelectedTab('myProperties')}> Mis Propiedades </div>
                        <div className={`${classes.tabButton} ${selectedTab === 'myTenants' ? classes.tabButtonSelected : ''}`} onClick={() => setSelectedTab('myTenants')}> Mis Inquilinos </div>
                        <div className={`${classes.tabButton} ${selectedTab === 'myConfiguration' ? classes.tabButtonSelected : ''}`} onClick={() => setSelectedTab('myConfiguration')}> Configuración </div>
                    </div>

                    <div className={classes.tabContent}>                        
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
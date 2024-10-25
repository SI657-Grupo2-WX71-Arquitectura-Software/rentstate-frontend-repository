import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { propertyDetailStyles } from '../styles/useStyles';
import { getPropertyById } from '../hooks/usePropertyService';
import { getUser, createContact, getContacts } from '../hooks/useUserService';
import ChairIcon from "@mui/icons-material/Chair";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import CottageIcon from "@mui/icons-material/Cottage";
import { starIcon, favoriteIcon, trashIcon, editIcon, tentantIcon, googleMapsLogo } from '../../src/assets';
import { Button } from './RentState Components/components';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { IconButton } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GoogleMapRentState from '../../src/components/RentState Components/GoogleMapRentState';

const PropertyDetail = () => {
    const classes = propertyDetailStyles();
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('userId');
    const [property, setProperty] = useState(null);
    const [owner, setOwner] = useState(null);

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const propertyData = await getPropertyById(id);
                setProperty(propertyData);
                const ownerData = await getUser(propertyData.userId);
                setOwner(ownerData);
            } catch (error) {
                console.error("Error al obtener los detalles de la propiedad o del propietario:", error);
            }
        };
        fetchPropertyData();
    }, [id]);

    if (!property || !owner) {
        return <div>Cargando...</div>;
    }

    const handleChatClick = async () => {
        try {
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

    const renderIcon = () => {
        switch (property.category) {
            case 'Departamento':
                return <EmojiTransportationIcon style={{ fontSize: "3rem", color: '#6C6B6B' }} />;
            case 'Oficina':
                return <HomeRepairServiceIcon  style={{ fontSize: "3rem", color: '#6C6B6B' }} />;
            case 'Casa':
                return <CottageIcon  style={{ fontSize: "3rem", color: '#6C6B6B' }} />;
            case 'Habitacion':
                return <ChairIcon  style={{ fontSize: "3rem", color: '#6C6B6B' }} />;
            default:
                return null;
        }
    };

    const handleWhatsAppClick = () => {
        const message = `¡Hola! Vengo de RentState Web y estoy interesado en tu propiedad en ${property.district} con dirección ${property.location}`;
        const url = `https://wa.me/${owner.phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const formatNumber = (num) => {
        const [integerPart, decimalPart] = num.toString().split(/[.,]/);
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    };

    return (
        <div className={classes.container}> 
            <div className={classes.containerTopDivisor}>
                <div className={classes.containerDivisor}>

                    <div className={classes.propertyCard}>

                        <div className={classes.iconsContainer}>
                            {String(currentUserId) === String(property.userId) ? (
                                <div style={{display:'flex', justifyContent:'center', gap:'10px'}}>
                                    <img src={trashIcon} alt="Delete" className={classes.optionsIcon} />
                                    <img src={editIcon} alt="Edit" className={classes.optionsIcon} />
                                </div>
                            ) : (
                                <img src={favoriteIcon} alt="Favorite" className={classes.optionsIcon} />
                            )}
                        </div>

                        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                            {renderIcon()}
                            <div>
                                <div className={classes.title} style={{display:'flex', gap:'10px'}}>
                                    {property.district}
                                    <div style={{fontWeight:'lighter', display:'flex', gap:'2px', alignItems:'center'}}>
                                        <img src={starIcon} alt="Phone" className={classes.icon} style={{height: '14px'}}/>
                                        <div style={{fontSize: '16px'}}>4.3</div>
                                    </div>
                                </div>
                                <div className={classes.subtitle}>{property.location}</div>
                            </div>
                        </div>

                        <div style={{margin:'1rem 0'}}>
                            <div className={classes.imageContainer}>
                                <img src={property.cardimage} alt="Property" className={classes.image} />
                            </div>
                            
                            <div className={classes.additionalImagesContainer}>
                                <div className={classes.additionalImage}>
                                    <img src={property.cardimage} alt="Additional Property 1" className={classes.additionalImageStyle} />
                                </div>
                                <div className={classes.additionalImage}>
                                    <img src={property.cardimage} alt="Additional Property 2" className={classes.additionalImageStyle} />
                                </div>
                                <div className={classes.additionalImageBlur}>
                                    <img src={property.cardimage} alt="Additional Property 3" className={classes.additionalImageStyle} />
                                    <div className={classes.overlay}>
                                        <span>+9</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.detailSection}>
                        <div className={classes.infoAndMapContainer}>
                            <div style={{margin:'1rem 0'}}>
                                <div className={classes.title} >
                                    Alquílalo a S/.{formatNumber(property.price)}      
                                </div>
                                <div className={classes.subtitle} >
                                    {property.category} · {property.characteristics}         
                                </div>
                            </div>

                            <div style={{margin:'1rem 0'}}>
                                <GoogleMapRentState 
                                    mapType="propertyMarker" 
                                    width="100%" 
                                    height="500px" 
                                    latitude={property.latitude} 
                                    longitude={property.longitude} 
                                />                        
                            </div>
                        </div>


                            {String(currentUserId) !== String(property.userId) ? (
                                <div className={classes.optionsContainer}>

                                    <div className={classes.contactCard}>
            
                                        <div style={{padding:'0rem 1rem', display:'flex', alignItems:'center'}}>
                                            <img src={owner.photoUrl} alt="Owner" style={{width: '100px', height: '100px', borderRadius: '50%', objectFit:'cover', objectPosition: 'center'}} />
                                        </div>  
            
                                        <div style={{display:'flex', flexDirection:'column', textAlign:'left', justifyContent:'center', gap:0, alignItems:'center'}}>
                                            
                                            <div style={{color:'#6C6B6B', fontSize:'1.2rem', margin:'0.5rem 0'}}>
                                                Publicado por <span style={{fontWeight:'bold'}}>{owner.name} {owner.lastName}</span>
                                            </div>
            
                                            <div style={{display:'flex', gap:'10px', margin:'0.5rem 0'}}>
                                                <Button width="auto" onClick={handleChatClick} style={{display:'flex', gap:'5px', margin:0}}>
                                                    <IconButton aria-label="mensajes" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer", padding:0 }}>
                                                        <MarkUnreadChatAltIcon />
                                                    </IconButton>
                                                    Chatea
                                                </Button>
                                                <Button width="auto" onClick={handleWhatsAppClick} style={{display:'flex', gap:'5px',margin:0}}>
                                                    <IconButton aria-label="mensajes" style={{ color: "#e0e0e0", fontSize: "2rem", cursor: "pointer", padding:0 }}>
                                                        <WhatsAppIcon />
                                                    </IconButton>
                                                    WhatsApp
                                                </Button>    
                                            </div>
            
                                        </div>
            
                                    </div>
            
                                    <div className={classes.interestButton}>
                                        <img src={tentantIcon} alt="Interested" style={{height: '3.5rem', fill:'#8E8E8E'}}/>
                                        <div>¡Me interesa!</div>
                                    </div>

                                    <div className={classes.interestButton}>
                                        <img src={googleMapsLogo} alt="Interested" style={{height: '3.5rem', fill:'#8E8E8E'}}/>
                                        <div>¡Ver en Google Maps!</div>
                                    </div>
                                </div>
                            ) : (

                                <p></p>
                            )}
                    </div>
                </div>
                {/* <div className={classes.containerDivisor}  style={{paddingTop:0}}>

                    <div style={{backgroundColor:'transparent',  width: '40%',  padding: '2rem',}}>
                        <p></p>                    
                    </div>

                    <div className={classes.detailSection}>

                        <div className={classes.infoAndMapContainer}>
                            <div style={{margin:'1rem 0'}}>
                                <div className={classes.title}> Descripción </div>
                                <div className={classes.subtitle} >
                                    {property.description}         
                                </div>
                            </div>                           
                        </div>
                    </div>

                </div> */}
            </div>
        </div>
    );
};

export default PropertyDetail;
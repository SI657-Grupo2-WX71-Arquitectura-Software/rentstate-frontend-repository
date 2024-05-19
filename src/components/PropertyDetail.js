import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PropertyDetail.css';
import { properties, users } from '../auxiliars/MyConsts';
import "../styles/MyAccount.css";
import { Avatar } from '@mui/material';

const PropertyDetail = () => {

    const { id } = useParams(); 
    const { userId } = useParams(); 
    const propertyId = parseInt(id); 
    const selectedProperty = properties.find((property) => property.id === propertyId);

    // const vinculatedOwner = users.find((owner) => owner.userId === parseInt(userId));

    if (!selectedProperty) {
        return <div>No se encontró la propiedad con el ID {propertyId}</div>;
    }

    // if (!vinculatedOwner) {
    //     return <div>No se encontró el dueño con el ID {parseInt(userId)}</div>;
    // }


    // const { name, lastName, email, photoUrl } = vinculatedOwner;

    const { cardimage, district, location, characteristics, price } = selectedProperty;

    return (
        <div className="myAccount-container" style={{margin:'7rem 0'}}>

            <div style={{display:'flex', gap:'2rem', alignItems:'center' }}>
                <img src={cardimage} alt="Property" style={{width:'60%',}} />
                <div style={{display:'block', textAlign:'left'}}>
                    <p style={{fontWeight:'bolder'}}>{district}</p>
                    <p>{location}</p>                  
                    <p>{characteristics}</p>
                    <p>S/. {price}</p>

                    <div style={{ display:'flex', gap:'1rem', marginTop:'3rem', alignItems:'center'}}>
                        <div>
                            <Avatar alt="Avatar" src="/path-to-your-avatar.jpg" />
                        </div> 
                        <div>
                            <div>Propietario: {district}</div>
                            <div>{location}</div>  
                        </div>
                    </div>  
                </div>

              
            </div>

        
        </div>
    );
};

export default PropertyDetail;
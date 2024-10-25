import React, { useState } from 'react';
import { InquilinoCard, SearchBar } from '../../RentState Components/components';
import { useStylesMyTenants } from '../../../styles/useStyles';

const MyTenants = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const classes = useStylesMyTenants();

    const inquilinos = [
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            name: "Lucas",
            lastName: "Garcia",
            isActive: true,
            property: "Miraflores"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            name: "Nirvana",
            lastName: "Garcia",
            isActive: false,
            property: "Miraflores"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            name: "Nirvana",
            lastName: "Garcia",
            isActive: true,
            property: "Barranco"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            name: "Juana",
            lastName: "Vargas",
            isActive: true,
            property: "Miraflores"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            name: "Nirvana",
            lastName: "Garcia",
            isActive: true,
            property: "Pueblo Libre"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            name: "Nirvana",
            lastName: "Garcia",
            isActive: true,
            property: "Jesús María"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            name: "Lucas",
            lastName: "Garcia",
            isActive: true,
            property: "Miraflores"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            name: "Nirvana",
            lastName: "Garcia",
            isActive: false,
            property: "Miraflores"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            name: "Nirvana",
            lastName: "Garcia",
            isActive: true,
            property: "Barranco"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            name: "Juana",
            lastName: "Vargas",
            isActive: true,
            property: "Miraflores"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            name: "Nirvana",
            lastName: "Garcia",
            isActive: true,
            property: "Pueblo Libre"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            name: "Nirvana",
            lastName: "Garcia",
            isActive: true,
            property: "Jesús María"
        },
    ];

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredInquilinos = inquilinos.filter(inquilino => {
        const fullName = `${inquilino.name} ${inquilino.lastName}`.toLowerCase();
        const property = inquilino.property.toLowerCase();
        const status = inquilino.isActive ? 'activo' : 'inactivo';
        const search = searchTerm.toLowerCase();
        if (search === 'activo') { return inquilino.isActive; }
        return fullName.includes(search) || property.includes(search) || status.includes(search);
    });

    return (
        <div>
            <div style={{display: 'flex', justifyContent:'center', margin:'0 0 1rem 0'}}>
                <SearchBar 
                    placeholder="Buscar Inquilino" 
                    height="3rem" 
                    width="50vw" 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className={classes.scrollableDiv}>
                {/* {filteredInquilinos.map((inquilino, index) => (
                    <InquilinoCard
                        key={index}
                        photoUrl={inquilino.photoUrl}
                        name={inquilino.name}
                        lastName={inquilino.lastName}
                        isActive={inquilino.isActive}
                        property={inquilino.property}
                    />
                ))} */}
                <div style={{ textAlign: 'center', color: '#6C6B6B', fontSize: '1.2rem' }}>
                    ¡No tienes inquilinos por el momento!
                </div>
            </div>
        </div>
    );
};

export default MyTenants;
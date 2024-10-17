
import React, { useState } from 'react';
import { PropertyCard, SearchBar } from '../../RentState Components/components';
import { useStylesMyProperties } from '../../../styles/useStyles';

const MyProperties = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const classes = useStylesMyProperties();
    const properties = [
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/3e8e5ae0-4ef3-4669-99d0-cdfa6f6b3b84-Monkey-Selfie.jpg",
            district: "Miraflores",
            isActive: true,
            address: "Av. Pardo 456, Lima",
            price: 2000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Juan",
            ownerLastName: "Sifuentes"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            district: "San Isidro",
            isActive: false,
            address: "Av. Conquistadores 850, Lima",
            price: 3000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Laura",
            ownerLastName: "Torres"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/3e8e5ae0-4ef3-4669-99d0-cdfa6f6b3b84-Monkey-Selfie.jpg",
            district: "Miraflores",
            isActive: true,
            address: "Av. Pardo 456, Lima",
            price: 2000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Juan",
            ownerLastName: "Sifuentes"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            district: "San Isidro",
            isActive: false,
            address: "Av. Conquistadores 850, Lima",
            price: 3000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Laura",
            ownerLastName: "Torres"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/3e8e5ae0-4ef3-4669-99d0-cdfa6f6b3b84-Monkey-Selfie.jpg",
            district: "Miraflores",
            isActive: true,
            address: "Av. Pardo 456, Lima",
            price: 2000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Juan",
            ownerLastName: "Sifuentes"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            district: "San Isidro",
            isActive: false,
            address: "Av. Conquistadores 850, Lima",
            price: 3000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Laura",
            ownerLastName: "Torres"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/3e8e5ae0-4ef3-4669-99d0-cdfa6f6b3b84-Monkey-Selfie.jpg",
            district: "Miraflores",
            isActive: true,
            address: "Av. Pardo 456, Lima",
            price: 2000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Juan",
            ownerLastName: "Sifuentes"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            district: "San Isidro",
            isActive: false,
            address: "Av. Conquistadores 850, Lima",
            price: 3000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Laura",
            ownerLastName: "Torres"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/3e8e5ae0-4ef3-4669-99d0-cdfa6f6b3b84-Monkey-Selfie.jpg",
            district: "Miraflores",
            isActive: true,
            address: "Av. Pardo 456, Lima",
            price: 2000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Juan",
            ownerLastName: "Sifuentes"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            district: "San Isidro",
            isActive: false,
            address: "Av. Conquistadores 850, Lima",
            price: 3000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Laura",
            ownerLastName: "Torres"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/3e8e5ae0-4ef3-4669-99d0-cdfa6f6b3b84-Monkey-Selfie.jpg",
            district: "Miraflores",
            isActive: true,
            address: "Av. Pardo 456, Lima",
            price: 2000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Juan",
            ownerLastName: "Sifuentes"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            district: "San Isidro",
            isActive: false,
            address: "Av. Conquistadores 850, Lima",
            price: 3000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Laura",
            ownerLastName: "Torres"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/3e8e5ae0-4ef3-4669-99d0-cdfa6f6b3b84-Monkey-Selfie.jpg",
            district: "Miraflores",
            isActive: true,
            address: "Av. Pardo 456, Lima",
            price: 2000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Juan",
            ownerLastName: "Sifuentes"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            district: "San Isidro",
            isActive: false,
            address: "Av. Conquistadores 850, Lima",
            price: 3000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Laura",
            ownerLastName: "Torres"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/3e8e5ae0-4ef3-4669-99d0-cdfa6f6b3b84-Monkey-Selfie.jpg",
            district: "Miraflores",
            isActive: true,
            address: "Av. Pardo 456, Lima",
            price: 2000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Juan",
            ownerLastName: "Sifuentes"
        },
        {
            photoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            district: "San Isidro",
            isActive: false,
            address: "Av. Conquistadores 850, Lima",
            price: 3000,
            ownerPhotoUrl: "https://storage.googleapis.com/rentstate-img/profile-pictures/1245511b-303a-4196-b4c0-eeb243188066-rei chiquita.jfif",
            ownerName: "Laura",
            ownerLastName: "Torres"
        }
    ];      

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProperties = properties.filter(property => {
        const district = property.district.toLowerCase();
        const address = property.address.toLowerCase();
        const ownerFullName = `${property.ownerName} ${property.ownerLastName}`.toLowerCase();
        const status = property.isActive ? 'activo' : 'inactivo';
        const price = property.price.toString();
        const search = searchTerm.toLowerCase();
        if (search === 'activo') { return property.isActive; }
        return district.includes(search) || address.includes(search) || ownerFullName.includes(search) || status.includes(search) || price.includes(search);
    });

    return (
        <div>
            <div style={{display: 'flex', justifyContent:'center', margin:'0 0 1rem 0'}}>
                <SearchBar 
                    placeholder="Buscar Inmueble" 
                    height="3rem" 
                    width="50vw" 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className={classes.scrollableDiv}>
                {filteredProperties.map((property, index) => (
                    <PropertyCard
                        key={index}
                        property={property}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyProperties;
const segmentsData = [
    {
        type: "Inquilinos",
        description: "Interesados en alquilar Inmuebles",
        image: "assets/inquilinos.png",
        imagetype: "assets/otakusLetters.png"
    },
    {
        type: "Propietarios",
        description: "Propietarios de inmuebles que quieren arrendar",
        image: "assets/propietarios.png",
        imagetype: "assets/vendedoresLetters.png"
    },
];


const properties = [   
    {
        id: 1,
        category: "Departamento",
        district: "Pueblo Libre",  
        location: "Abraham Valdelomar 522",
        latitude: "-12.070915286566354",
        longitude: "-77.06683609730793",    
        description: "Casa bonita en Pueblo Libre",
        characteristics: "104 m², 3 dorm, 2 baños",       
        available: true,     
        cardimage: "/assets/casa1.png",  
        price: "250,000",  
    },
    {
        id: 2,
        category: "Departamento",
        district: "Magdalena",  
        location: "Torres Matos 160",
        latitude: "-12.09516166400188",
        longitude: "-77.058574261341", 
        description: "Casa bonita en Pueblo Libre",
        characteristics: "104 m², 3 dorm, 2 baños",
        available: true,     
        cardimage: "/assets/casa2.png",
        price: "250,000",  
    }, 
    {
        id: 3,
        category: "Oficina",
        district: "San Miguel",
        location: "Prolongación Ayacucho 1240",
        latitude: "-12.08118129359087",
        longitude: "-77.08707786805587",
        description: "Casa bonita en Pueblo Libre",
        characteristics: "104 m², 3 dorm, 2 baños",
        available: true,     
        cardimage: "/assets/casa3.png",
        price: "250,000",  
    },     
    {
        id: 4,
        category: "Oficina",
        district: "Jesús María",
        location: "Av. Gregorio Escobedo 849",
        latitude: "-12.089381789828575",
        longitude: "-77.0568907554405",
        description: "Casa bonita en Pueblo Libre",
        characteristics: "104 m², 3 dorm, 2 baños",
        available: true,
        cardimage: "/assets/casa4.png",
        price: "250,000",  
    },   
    {
        id: 5,
        category: "Casa",
        district: "San Isidro",
        location: "Av. Gral. Salaverry 1004",
        latitude: "-12.075446193181135",
        longitude: "-77.04237157554505",
        description: "Casa bonita en Pueblo Libre",
        characteristics: "104 m², 3 dorm, 2 baños",
        available: true,
        cardimage: "/assets/casa2.png",
        price: "260,000",
    },
    {
        id: 6,
        category: "Habitacion",
        district: "Miraflores",
        location: "Calle Bolivar 131",
        latitude: "-12.125347466164694",
        longitude: "-77.02905908181769",
        description: "Casa bonita en Pueblo Libre",
        characteristics: "104 m², 3 dorm, 2 baños",
        available: true,
        cardimage: "/assets/casa3.png",
        price: "260,000",
    },   
];

const interestedPeople = [
    {
        id: 1,
        name: "Pepita",
        interest: "yes",
        propertyId: 1,
    },
    {
        id: 2,
        name: "Juan",
        interest: "no",
        propertyId: 2,
    },
    {
        id: 3,
        name: "María",
        interest: "yes",
        propertyId: 1,
    },
];


export { segmentsData, properties, interestedPeople };  
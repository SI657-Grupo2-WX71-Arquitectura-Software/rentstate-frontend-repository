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
        cardimage: "/assets/casa1.png",
        district: "Pueblo Libre",
        address: "Abraham Valdelomar 522",
        details: "104 m², 3 dorm, 2 baños",
        price: "250,000",
        latitude: "-12.070915286566354",
        longitude: "-77.06683609730793",
        rent: "rented", // Asigna "rented" al primer elemento
    },
    {
        id: 2,
        category: "Departamento",
        cardimage: "/assets/casa2.png",
        district: "Magdalena",
        address: "Torres Matos 160",
        details: "104 m², 3 dorm, 2 baños",
        price: "250,000",
        latitude: "-12.09516166400188",
        longitude: "-77.058574261341",
        rent: "rented", // Asigna "rented" al segundo elemento
    },
    {
        id: 3,
        category: "Oficina",
        cardimage: "/assets/casa3.png",
        district: "San Miguel",
        address: "Prolongación Ayacucho 1240",
        details: "104 m², 3 dorm, 2 baños",
        price: "250,000",
        latitude: "-12.08118129359087",
        longitude: "-77.08707786805587",
        rent: "rented", // Asigna "rented" al tercer elemento
    },
    {
        id: 4,
        category: "Oficina",
        cardimage: "/assets/casa4.png",
        district: "Jesús María",
        address: "Av. Gregorio Escobedo 849",
        details: "104 m², 3 dorm, 2 baños",
        price: "250,000",
        latitude: "-12.089381789828575",
        longitude: "-77.0568907554405",
        rent: "not", // Asigna "not" al cuarto elemento
    },
    {
        id: 5,
        category: "Casa",
        cardimage: "/assets/casa2.png",
        district: "San Isidro",
        address: "Av. Gral. Salaverry 1004",
        details: "104 m², 3 dorm, 2 baños",
        price: "260,000",
        latitude: "-12.075446193181135",
        longitude: "-77.04237157554505",
        rent: "not", // Asigna "not" al quinto elemento
    },
    {
        id: 6,
        category: "Habitacion",
        cardimage: "/assets/casa3.png",
        district: "Miraflores",
        address: "Calle Bolivar 131",
        details: "104 m², 3 dorm, 2 baños",
        price: "260,000",
        latitude: "-12.125347466164694",
        longitude: "-77.02905908181769",
        rent: "not", // Asigna "not" al sexto elemento
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
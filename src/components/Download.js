import React, { useState } from "react";
import "../styles/GoRentstate.css";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";
import CottageIcon from '@mui/icons-material/Cottage';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ChairIcon from '@mui/icons-material/Chair';
import TuneIcon from '@mui/icons-material/Tune';
import { properties } from "../auxiliars/MyConsts";
import PlaceIcon from '@mui/icons-material/Place';

const Download = () => {    
    const [searchValue, setSearchValue] = useState("");
    const [filteredProperties, setFilteredProperties] = useState(properties);

    const handleTextFieldChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchIconClick = () => {
        console.log("El usuario buscó:", searchValue);
        const filtered = properties.filter((property) =>
            Object.values(property).some((value) =>
                value.toLowerCase().includes(searchValue.toLowerCase())
            )
        );
        setFilteredProperties(filtered);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchIconClick();
        }
    };

   

    return (       
        <div id="findProperty"> 

            <div className="findProperty-container">
                    


                <div className="search-system" 
                    style={{
                        display:'flex',                       
                        alignItems:'center',
                        gap:'0.5rem'
                    }}
                >                   
                    <TextField
                        id="outlined-textarea"                          
                        placeholder="Buscar Inmueble"
                        value={searchValue}
                        onChange={handleTextFieldChange}
                        onKeyDown={handleKeyDown}
                        sx={{
                            width: '30rem',                                               
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '200px',                              
                                '& fieldset': {
                                    borderColor: '#ececec !important',                                   
                                },
                            },
                            '& .MuiInputBase-input': { fontSize: '0.8rem',  padding:'0.8rem 1.3rem' }                          
                        }}
                    />
                    <SearchIcon 
                        style={{
                            height:'1.5rem',   
                            color:'gray',   
                            cursor:'pointer'                         
                        }}
                        onClick={handleSearchIconClick}
                    />   
                </div>  

               

                <div className="search-categories">
                    <div className="category-opt">
                        <EmojiTransportationIcon/>
                        <div>Departamento</div>
                    </div>
                    <div className="category-opt">
                        <HomeRepairServiceIcon/>
                        <div>Oficina</div>
                    </div>
                    <div className="category-opt">
                        <CottageIcon/>
                        <div>Casa</div>
                    </div>
                    <div className="category-opt">
                        <ChairIcon/>
                        <div>Habitación</div>
                    </div> 
                    <div className="filter-opt">
                        <TuneIcon style={{fontSize:'1.2rem'}}/>                    
                    </div>                    
                </div>  



                <div className="grid-properties">

                    {filteredProperties.map((project, index) => (
                        <div key={index} className="card">
                            <img src={project.cardimage} alt="Property" />
                            <div className="card-details">
                            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{project.district}</p>
                            <p>{project.address}</p>
                            <p>{project.details}</p>
                            <p style={{ color: '#7a7a7a' }}>S/ {project.price}</p>
                            <a href={`https://www.google.com/maps?q=${project.latitude},${project.longitude}`} target="_blank" rel="noopener noreferrer">
                                Ver Mapa
                                <PlaceIcon style={{ fontSize: '1.2rem' }} />
                            </a>
                            </div>
                        </div>
                    ))}

                </div>




              


            </div>
        </div>      
    );
};

export default Download;
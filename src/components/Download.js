import React, { useState } from "react";
import "../styles/GoRentstate.css";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";

const Download = () => {    
    const [searchValue, setSearchValue] = useState("");
   
    const handleTextFieldChange = (event) => {
        setSearchValue(event.target.value);
    };
   
    const handleSearchIconClick = () => {
        console.log("El user buscó:", searchValue);
        setSearchValue("");
    };

    return (       
        <div id="goRentstate"> 

            <div className="goRentstate-container">
                    
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
            </div>
        </div>      
    );
};

export default Download;
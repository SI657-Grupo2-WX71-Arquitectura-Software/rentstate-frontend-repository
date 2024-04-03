import React from "react";
import "../styles/GoRentstate.css";
import { Search } from "@mui/icons-material";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";



const Download = () => {    




    return (       
        <div id="goRentstate"> 

            <div className="goRentstate-container">
                    
                <div className="i" >
                   
                       
                        <TextField
                            id="outlined-textarea"
                          
                            placeholder="Buscar Inmueble"
                            multiline
                        />
                     <SearchIcon />       

                   
        
                </div>

                {/* <div className="download-img" >
                    <img  src="/assets/RentStateBanner.png" alt="WhatsApp" />
                </div>    */}

            
                        
            </div>

        </div>      
    );
};

export default Download;
import React from "react";
import "../styles/GoRentstate.css";


const Download = () => {    
    return (       
        <div id="goRentstate"> 

            <div className="goRentstate-container">

                <div className="i" >

                    <p style={{fontWeight: '400', margin: '0'}}>Prueba la Web <span style={{color:'#225E7C',fontWeight: '500'}}>RentState</span></p>

                    <div style={{display:'flex', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                        <div className="home-button" onClick={() =>  window.open("https://renstate-aedf7.web.app/home", "_blank")}>
                            <p>Ir a RentState</p>
                        </div>
                    </div>

                </div>

                <div className="download-img" >
                    <img  src="/assets/RentStateBanner.png" alt="WhatsApp" />
                </div>   

            
                        
            </div>

        </div>      
    );
};

export default Download;
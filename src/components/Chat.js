import React, { useState } from "react";
import { FieldEditSearch } from "./RentState Components/components";


const Chat = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div style={{width: '100%', height:'100vh', justifyContent:'center', alignContent:'center', display:'flex', gap:'2rem', alignItems:'center'}}>            
            
            <div style={{
                width: '20vw', 
                height: '70vh', 
                backgroundColor: '#F2F2F2', 
                borderRadius: '2rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '1rem'
            }}>                
                <div style={{margin:'2rem 0 0rem 0'}}>
                    <FieldEditSearch
                        id="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Buscar Contacto"
                        width="15vw"
                        height="50px"
                    />
                </div>
                <div style={{backgroundColor:'white', borderRadius:'20px', padding:'13.2vw 7vw'}}>
                    Lista
                </div>                
            </div>



            <div style={{width:'40vw', height:'70vh', backgroundColor:'#F2F2F2', borderRadius:'2rem'}}>
                Chat
            </div>
        </div>
    );
}

export default Chat;

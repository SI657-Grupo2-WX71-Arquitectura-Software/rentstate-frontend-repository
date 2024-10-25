import React, { useState } from "react";
import { SearchBar } from "./RentState Components/components";
import { chatStyles } from "../styles/useStyles";


const Chat = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const classes = chatStyles();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    return (
        <div className={classes.chatContainer}>            
            <div className={classes.columnContacts}>                
                <div style={{margin:'2rem 0 0rem 0'}}>
                    <SearchBar 
                        placeholder="Buscar Contacto" 
                        height="2.5rem" 
                        width="auto" 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        borderColor={'transparent'}
                    />
                </div>

                <div className={classes.contactList}>
                    Lista
                </div>   

            </div>



            <div  className={classes.columnChat}>
                Chat
            </div>
        </div>
    );
}

export default Chat;
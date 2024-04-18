import React from "react";
import "../styles/MyAccount.css";
import List from "../components/List";
import Chat from "../components/Chat";

const MyAccount = () => {    
 
   
    return (       
        <div id="findProperty"> 
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <button>Update Profile</button>
                    </div>
                    <div className="information">
                        <span>Avatar: 
                            <img src="https://i.pinimg.com/564x/a0/2a/28/a02a28c20e7b91d1f5e75b8a789d1456.jpg" 
                            alt="user_image" />
                        </span>
                        <span>Username: <b>Jenny</b></span>
                        <span>Email: <b>Jenny@gmail.com</b></span>
                    </div>

                    <div className="title">
                        <h1>My Posts</h1>
                        <button>Create New Post</button>
                    </div>

                    <List/>

                    <div className="title">
                        <h1>Save Posts</h1>
                    </div>

                    <List/>
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Chat/>
                </div>
            </div>
         
        </div>      
    );
};

export default MyAccount;
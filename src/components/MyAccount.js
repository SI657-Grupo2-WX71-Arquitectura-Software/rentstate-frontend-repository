import React, { useEffect, useState } from "react";
import "../styles/MyAccount.css";
import List from "../components/List";
import Chat from "../components/Chat";
import { getUserInfo } from '../hooks/useUserService'; // Importa la función del servicio


const MyAccount = () => {    
    const [userInfo, setUserInfo] = useState(null);
   
    useEffect(() => {
        // Llama a la función del servicio para obtener la información del usuario
        async function fetchUserInfo() {
          try {
            const userData = await getUserInfo('userId'); // Reemplaza 'userId' con el ID del usuario
            setUserInfo(userData);
          } catch (error) {
            // Maneja los errores de la solicitud
            console.error('Error fetching user information:', error.message);
          }
        }
    
        fetchUserInfo(); // Llama a la función al montar el componente
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (       
        <div id="findProperty">
      {userInfo && (
        <div className="details">
          <div className="wrapper">
            <div className="title">
              <h1>User Information</h1>
              <button>Update Profile</button>
            </div>
            <div className="information">
              <span>Avatar:
                <img src={userInfo.photoUrl} alt="user_image" />
              </span>
              <span>Username: <b>{userInfo.name}</b></span>
              <span>Lastname: <b>{userInfo.lastName}</b></span>
            </div>

            <div className="title">
              <h1>My Posts</h1>
              <button>Create New Post</button>
            </div>

            <List />

            <div className="title">
              <h1>Save Posts</h1>
            </div>

            <List />
          </div>
        </div>
      )}
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
    );
};

export default MyAccount;
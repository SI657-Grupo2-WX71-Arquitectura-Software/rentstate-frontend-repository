import axios from 'axios';

const userService = axios.create({
  baseURL: 'http://localhost:8091', // Asegúrate de que esto coincida con tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

const updateUser = async (updateUserResource, token) => {
  try {
    const response = await userService.put(`/api/v1/users`,updateUserResource, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
   
    console.error("Error updating user:", error);
    throw error;
  }
};


const getUser = async (userId, token) => {
  const response = await userService.get(`/api/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Exporting all the functions explicitly
export default {
  updateUser,
  getUser
};
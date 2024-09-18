import axios from 'axios';

const userService = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

const updateUser = async (updateUserResource, token) => {
  try {
    const response = await userService.put(`/api/v1/users`, updateUserResource, {
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

const deleteUser = async (userId, token) => {
  try {
    const response = await userService.delete(`/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

const sendContactRequest = async (userId, contactUsername) => {
  try {
      const response = await userService.post(`/api/v1/users/${userId}/contacts/${contactUsername}`);
      return response.data;
  } catch (error) {
    console.error('Error al enviar la solicitud de contacto:', error.response || error.message);
    throw error;
  }
};

export default {
  updateUser,
  getUser,
  deleteUser,
  sendContactRequest 
};
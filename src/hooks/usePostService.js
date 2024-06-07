import axios from 'axios';

const BASE_URL = 'http://localhost:8093'; // Cambia la URL base según la configuración de tu backend

const PostService = {
  // Método para obtener todas las propiedades
  getAllPosts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/posts`);
      return response.data; // Retorna los datos de todas las propiedades
    } catch (error) {
      console.error('Error al obtener todas los posts:', error);
      throw error; // Manejar el error adecuadamente en tu componente React
    }
  },

  // Método para obtener una propiedad por ID
  getPostByPropertyId: async (propertyId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/posts/${propertyId}`);
      return response.data; // Retorna los datos de la propiedad específica
    } catch (error) {
      console.error(`Error al obtener la propiedad con ID ${propertyId}:`, error);
      throw error; // Manejar el error adecuadamente en tu componente React
    }
  },

   // Método para eliminar una propiedad por ID
   deletePost: async (propertyId) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/posts/${propertyId}`);
      // No necesitas devolver nada si el borrado es exitoso
    } catch (error) {
      console.error(`Error al eliminar la propiedad con ID ${propertyId}:`, error);
      throw error; // Manejar el error adecuadamente en tu componente React
    }
  },

  createPost: async (postData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/posts`, postData);
      return response.data; // Retorna los datos de la publicación creada
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      throw error; // Manejar el error adecuadamente en tu componente React
    }
  },
  
};

export default PostService;

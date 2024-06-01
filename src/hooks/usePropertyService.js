import axios from 'axios';

const BASE_URL = 'http://localhost:8094'; // Cambia la URL base según la configuración de tu backend

const PropertyService = {
  // Método para obtener todas las propiedades
  getAllProperties: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/properties`);
      return response.data; // Retorna los datos de todas las propiedades
    } catch (error) {
      console.error('Error al obtener todas las propiedades:', error);
      throw error; // Manejar el error adecuadamente en tu componente React
    }
  },

  // Método para obtener una propiedad por ID
  getPropertyById: async (propertyId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/properties/${propertyId}`);
      return response.data; // Retorna los datos de la propiedad específica
    } catch (error) {
      console.error(`Error al obtener la propiedad con ID ${propertyId}:`, error);
      throw error; // Manejar el error adecuadamente en tu componente React
    }
  },

  // Método para obtener propiedades por userId
  getPropertiesByUserId: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/properties?userId=${userId}`);
      return response.data; // Retorna los datos de las propiedades del usuario
    } catch (error) {
      console.error(`Error al obtener propiedades del usuario con ID ${userId}:`, error);
      throw error; // Manejar el error adecuadamente en tu componente React
    }
  },
};

export default PropertyService;

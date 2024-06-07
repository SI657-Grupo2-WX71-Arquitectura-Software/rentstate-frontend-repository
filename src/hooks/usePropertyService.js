import axios from 'axios';

const BASE_URL = 'http://localhost:8094'; 

const PropertyService = {
  getAllProperties: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/properties`);
      return response.data; // Retorna los datos de todas las propiedades
    } catch (error) {
      console.error('Error al obtener todas las propiedades:', error);
      throw error; 
    }
  },

  getPropertyById: async (propertyId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/properties/${propertyId}`);
      return response.data; // Retorna los datos de la propiedad específica
    } catch (error) {
      console.error(`Error al obtener la propiedad con ID ${propertyId}:`, error);
      throw error; 
    }
  },

  getPropertiesByUserId: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/properties?userId=${userId}`);
      return response.data; // Retorna los datos de las propiedades del usuario
    } catch (error) {
      console.error(`Error al obtener propiedades del usuario con ID ${userId}:`, error);
      throw error; 
    }
  },

  deleteProperty: async (propertyId) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/properties/${propertyId}`);
      // No necesitas devolver nada si el borrado es exitoso
    } catch (error) {
      console.error(`Error al eliminar la propiedad con ID ${propertyId}:`, error);
      throw error; 
    }
  },

  createProperty: async (propertyData, userId) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/properties?userId=${userId}`, propertyData);
      return response.data; // Retorna los datos de la propiedad creada
    } catch (error) {
      console.error('Error al crear la propiedad:', error);
      throw error;
    }
  },
};

export default PropertyService;

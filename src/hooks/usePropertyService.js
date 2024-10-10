import axios from 'axios';

const BASE_URL = 'https://rentstate.antarticdonkeys.com/api/gateway-service'; 

const PropertyService = {
  getAllProperties: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/properties`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener todas las propiedades:', error);
      throw error; 
    }
  },

  getPropertyById: async (propertyId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/properties/${propertyId}`);
      return response.data; 
    } catch (error) {
      console.error(`Error al obtener la propiedad con ID ${propertyId}:`, error);
      throw error; 
    }
  },

  getPropertiesByUserId: async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/properties`, {
            params: { userId: userId }
        });
        return response.data;
    } catch (error) {
        console.error(`Error al obtener propiedades del usuario con ID ${userId}:`, error);
        throw error;
    }
},

  deleteProperty: async (propertyId) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/properties/${propertyId}`);
    } catch (error) {
      console.error(`Error al eliminar la propiedad con ID ${propertyId}:`, error);
      throw error; 
    }
  },

  createProperty: async (propertyData, userId) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/properties?userId=${userId}`, propertyData);
      return response.data;
    } catch (error) {
      console.error('Error al crear la propiedad:', error);
      throw error;
    }
  },

  addInterestToProperty: async (propertyId, interestData) => {
    const url = `${BASE_URL}/api/v1/properties/${propertyId}/interest`;
    try {
        const response = await axios.post(url, interestData); 
        return response.data; 
    } catch (error) {
        throw error; 
    }
},


  markPropertyUnavailable: async (propertyId) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/properties/${propertyId}/unavailable`);
      return response.data;
    } catch (error) {
      console.error(`Error al marcar la propiedad con ID ${propertyId} como no disponible:`, error);
      throw error;
    }
  },

  renewPropertyAvailability: async (propertyId) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/properties/${propertyId}/available`);
      return response.data;
    } catch (error) {
      console.error(`Error al renovar la disponibilidad de la propiedad con ID ${propertyId}:`, error);
      throw error;
    }
  },
};

export default PropertyService;
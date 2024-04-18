import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Cambia la URL base según la configuración de tu backend

const PropertyService = {
  // Método para obtener todas las propiedades
  getPropertyById: async (propertyId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/properties/${propertyId}`);
      return response.data; // Retorna los datos de la propiedad específica
    } catch (error) {
      console.error(`Error al obtener la propiedad con ID ${propertyId}:`, error);
      throw error; // Manejar el error adecuadamente en tu componente React
    }
  },
};

export default PropertyService;

import axios from 'axios';

const propertyService = axios.create({
    baseURL: 'https://rentstate.antarticdonkeys.com/api/gateway-service',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllProperties = async () => {
    try {
        const response = await propertyService.get(`/api/v1/properties`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener todas las propiedades:', error);
        throw error;
    }
};

export const getPropertyById = async (propertyId) => {
    try {
        const response = await propertyService.get(`/api/v1/properties/${propertyId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la propiedad con ID ${propertyId}:`, error);
        throw error;
    }
};

export const getPropertiesByUserId = async (userId) => {
    try {
        const response = await propertyService.get(`/api/v1/properties`, {
            params: { userId: userId }
        });
        return response.data;
    } catch (error) {
        console.error(`Error al obtener propiedades del usuario con ID ${userId}:`, error);
        throw error;
    }
};

export const deleteProperty = async (propertyId, token) => {
    try {
        await propertyService.delete(`/api/v1/properties/${propertyId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error(`Error al eliminar la propiedad con ID ${propertyId}:`, error);
        throw error;
    }
};

export const createProperty = async (propertyData, userId, token) => {
    try {
        const response = await propertyService.post(`/api/v1/properties?userId=${userId}`, propertyData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear la propiedad:', error);
        throw error;
    }
};

export const addInterestToProperty = async (propertyId, interestData, token) => {
    const url = `/api/v1/properties/${propertyId}/interest`;
    try {
        const response = await propertyService.post(url, interestData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error al agregar interés a la propiedad con ID ${propertyId}:`, error);
        throw error;
    }
};

export const markPropertyUnavailable = async (propertyId, token) => {
    try {
        const response = await propertyService.put(`/api/v1/properties/${propertyId}/unavailable`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error al marcar la propiedad con ID ${propertyId} como no disponible:`, error);
        throw error;
    }
};

export const renewPropertyAvailability = async (propertyId, token) => {
    try {
        const response = await propertyService.put(`/api/v1/properties/${propertyId}/available`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error al renovar la disponibilidad de la propiedad con ID ${propertyId}:`, error);
        throw error;
    }
};

export default {
    getAllProperties,
    getPropertyById,
    getPropertiesByUserId,
    deleteProperty,
    createProperty,
    addInterestToProperty,
    markPropertyUnavailable,
    renewPropertyAvailability
};
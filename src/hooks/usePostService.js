import axios from 'axios';

const BASE_URL = 'https://rentstate.antarticdonkeys.com/api/gateway-service'; 

const PostService = {
    getAllPosts: async () => {
        try {
        const response = await axios.get(`${BASE_URL}/api/v1/posts`);
        return response.data; 
        } catch (error) {
        console.error('Error al obtener todas los posts:', error);
        throw error; 
        }
    },

    getPostByPropertyId: async (propertyId) => {
        try {
        const response = await axios.get(`${BASE_URL}/api/v1/posts/${propertyId}`);
        return response.data;
        } catch (error) {
        console.error(`Error al obtener la propiedad con ID ${propertyId}:`, error);
        throw error; 
        }
    },

    deletePost: async (propertyId) => {
        try {
        await axios.delete(`${BASE_URL}/api/v1/posts/${propertyId}`);
        } catch (error) {
        console.error(`Error al eliminar la propiedad con ID ${propertyId}:`, error);
        throw error;
        }
    },

    createPost: async (postData) => {
        try {
        const response = await axios.post(`${BASE_URL}/api/v1/posts`, postData);
        return response.data; 
        } catch (error) {
        console.error('Error al crear la publicación:', error);
        throw error; 
        }
    },

};

export default PostService;
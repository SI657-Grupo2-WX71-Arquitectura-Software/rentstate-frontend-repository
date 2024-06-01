import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8092', // Asegúrate de que esto coincida con tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

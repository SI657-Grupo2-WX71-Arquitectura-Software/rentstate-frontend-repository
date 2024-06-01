import axios from 'axios';

const userService = axios.create({
  baseURL: 'http://localhost:8091', // Asegúrate de que esto coincida con tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default userService;

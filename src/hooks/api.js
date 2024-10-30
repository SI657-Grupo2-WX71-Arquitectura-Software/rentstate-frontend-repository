import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rentstate.antarticdonkeys.com/api/gateway-service', 
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;

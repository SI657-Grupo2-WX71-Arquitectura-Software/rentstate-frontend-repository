import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api-rentstate.antarticdonkeys.com:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;

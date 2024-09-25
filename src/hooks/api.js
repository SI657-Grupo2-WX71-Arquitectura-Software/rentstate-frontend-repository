import axios from 'axios';

const api = axios.create({
  baseURL: 'http://34.171.129.103:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;

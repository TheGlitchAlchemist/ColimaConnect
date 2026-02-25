import axios from 'axios';

// Configuramos la URL base de tu Backend en Fedora
const api = axios.create({
  baseURL: 'http://localhost:3001/api' 
});

export default api;
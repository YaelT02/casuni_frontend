import axios from 'axios';

// Configuración base para las solicitudes
//const API_URL = 'http://localhost:5000/api/auth'; // URL del backend
const API_URL = 'https://casuni-backend-d46ce789fb30.herokuapp.com/api/auth'; // URL del backend

// Función para iniciar sesión
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // Devuelve los datos si la solicitud fue exitosa
  } catch (error) {
    // Si ocurre un error, lanza el mensaje para manejarlo en el frontend
    throw error.response ? error.response.data : { message: 'Error del servidor' };
  }
};


// Función para cambiar la contraseña en el primer inicio de sesión
export const changePassword = async (userId, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/change-password`, { userId, newPassword });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error del servidor' };
  }
};
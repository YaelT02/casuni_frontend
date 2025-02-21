import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .post(
          'https://casunibackend-5f8218b68a78.herokuapp.com/api/auth/protected'
          //'http://localhost:5000/api/auth/protected'
          , { token })
        .then((response) => {
          const authenticatedUser = { ...response.data.user, token };
          setUser(authenticatedUser);
          console.log('Usuario autenticado:', authenticatedUser);

          if (authenticatedUser.firstLogin && location.pathname !== '/change-password') {
            navigate('/change-password', { replace: true });
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error('Error validando el token:', error.response?.data || error.message);
          localStorage.removeItem('token');
          setUser(null);
          setLoading(false);

          if (location.pathname !== '/login') {
            navigate('/login', { replace: true });
          }
        });
    } else {
      setLoading(false);
      setUser(null);
      if (location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    }
  }, [navigate, location]);

  // Función para iniciar sesión
  const login = (userData, token) => {
    const authenticatedUser = { ...userData, token };
    setUser(authenticatedUser);
    localStorage.setItem('token', token);

    console.log('Usuario logueado:', authenticatedUser);

    if (userData.firstLogin) {
      navigate('/change-password', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
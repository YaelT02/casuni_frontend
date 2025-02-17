import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Si no está autenticado, redirige al login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Redirigir al cambio de contraseña si es el primer inicio de sesión
  if (user.firstLogin && location.pathname !== '/change-password') {
    return <Navigate to="/change-password" replace />;
  }

  // Verificar rol si es requerido
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
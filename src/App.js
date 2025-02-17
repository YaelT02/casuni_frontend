import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login_page/loginPage';
import HomePage from './HomePage/homePage';
import ManualsPage from './Manuals/manuales';
import UploadManualPage from './Components/uploadManual'; // Página para subir manuales
import CapacitacionNCRSS23 from './Capacitaciones/NCR/ncrSS23';
import { AuthProvider } from './context/authContext'; // Importar el AuthProvider
import ProtectedRoute from './Components/protectedRoute'; // Componente para rutas protegidas
import ChangePassword from './Login_page/changePassword';
import TermsAndConditions from './Components/termsAndConditions';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          
          {/* Rutas protegidas */}

          <Route 
          path="/change-password" 
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
            } 
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manuales"
            element={
              <ProtectedRoute>
                <ManualsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute requiredRole="admin">
                <UploadManualPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/capacitaciones/ncrSS23"
            element={
              <ProtectedRoute>
                <CapacitacionNCRSS23 />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

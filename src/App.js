import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login_page/loginPage';
import HomePage from './HomePage/homePage';
import ManualsPage from './Manuals/manuales';
import UploadManualPage from './Components/uploadManual'; // Página para subir manuales
import { AuthProvider } from './context/authContext'; // Importar el AuthProvider
import ProtectedRoute from './Components/protectedRoute'; // Componente para rutas protegidas
import ChangePassword from './Login_page/changePassword';
import TermsAndConditions from './Components/termsAndConditions';
import BitacoraTable from './Bitacora/bitacoraTable';
import CrearCurso from './Capacitaciones/createCourse';
import ModulosCurso from './Capacitaciones/createModulesPage';
import ListaCursos from './Capacitaciones/CoursesListPage';
import DetallesCurso from './Capacitaciones/CourseDetailsPage';

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
            path="/createCourse"
            element={
              <ProtectedRoute requiredRole="admin">
                <CrearCurso />
              </ProtectedRoute>
            }
          />

          <Route
            path="/createCourse/:courseId/modules"
            element={
              <ProtectedRoute requiredRole="admin">
                <ModulosCurso />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ListCourse"
            element={
              <ProtectedRoute>
                <ListaCursos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/capacitaciones/:id"
            element={
              <ProtectedRoute>
                <DetallesCurso />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bitacora"
            element={
              <ProtectedRoute requiredRole="admin">
                <BitacoraTable />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

// src/HomePage/homePage.js
import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import Header from '../Components/header';

const HomePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Encabezado fijo */}
      <Header />

      {/* Sección Hero */}
      <Box
        sx={{
          position: 'relative',
          height: '90vh',
          backgroundImage: 'url(/images/background_prueba.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        {/* Overlay de gradiente */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(24, 61, 131, 0.8), rgba(89, 149, 237, 0.8))',
          }}
        />
        {/* Contenido del Hero */}
        <Box sx={{ position: 'relative', textAlign: 'center', zIndex: 1, px: 2 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Bienvenido a CASUNI
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Consulta manuales y capacitaciones de forma rápida y sencilla.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#F9FD05',
              color: '#183D83',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#CBCA02' },
            }}
          >
            Descubrir Más
          </Button>
        </Box>
      </Box>

      {/* Sección de Funcionalidades */}
      <Box sx={{ backgroundColor: '#F4F4F4', py: 6 }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, color: '#183D83' }}>
            Nuestras Funcionalidades
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            {/* Tarjeta 1 */}
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                p: 4,
                flex: '1 1 300px',
                maxWidth: '350px',
                textAlign: 'center',
                borderTop: '4px solid #F9FD05',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: '#183D83' }}>
                Acceso Rápido
              </Typography>
              <Typography variant="body1" sx={{ color: '#555' }}>
                Encuentra rápidamente el manual o capacitación que buscas.
              </Typography>
            </Box>
            {/* Tarjeta 2 */}
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                p: 4,
                flex: '1 1 300px',
                maxWidth: '350px',
                textAlign: 'center',
                borderTop: '4px solid #5995ED',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: '#183D83' }}>
                Interfaz Moderna
              </Typography>
              <Typography variant="body1" sx={{ color: '#555' }}>
                Disfruta de una experiencia visual innovadora y amigable.
              </Typography>
            </Box>
            {/* Tarjeta 3 */}
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                p: 4,
                flex: '1 1 300px',
                maxWidth: '350px',
                textAlign: 'center',
                borderTop: '4px solid #CBCA02',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: '#183D83' }}>
                Soporte Integral
              </Typography>
              <Typography variant="body1" sx={{ color: '#555' }}>
                Obtén la asistencia que necesitas en cada paso.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer Impactante */}
      <Box
        sx={{
          backgroundColor: '#183D83',
          color: '#F4F4F4',
          py: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          © 2025 CASUNI S.A. de C.V. Todos los derechos reservados.
        </Typography>
        <Box sx={{ mt: 1 }}>
          {['Soporte', 'Áreas', 'Locaciones', 'Aviso de Privacidad', 'Aviso de Cookies', 'Términos de Uso', 'Aviso Legal'].map((item) => (
            <Link
              key={item}
              href="#"
              sx={{
                color: '#F4F4F4',
                textDecoration: 'none',
                mx: 1,
                '&:hover': { color: '#F9FD05' },
              }}
            >
              {item}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;

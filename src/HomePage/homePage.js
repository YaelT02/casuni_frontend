import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import Header from '../Components/header';

const HomePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Encabezado */}
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(/images/background_prueba.jpg)', // Ruta a la imagen de fondo
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70vh', // Limitar la altura de la imagen de fondo
          marginTop: '64px', // Ajustar para compensar la barra fija
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        
        <Box
          component="img"
          src="/images/Title.png"
          alt="CASUNI - Consulta de manuales y capacitaciones"
          sx={{
            width: '50%', // Ajusta el tamaño de la imagen según sea necesario
            maxWidth: '500px',
          }}
        />
      </Box>

      {/* Contenido Posterior */}
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Contenido adicional
        </Typography>
        <Typography>
          Contenido adicional
        </Typography>
      </Box>

      {/* Pie de Página */}
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          padding: 4,
          color: '#555',
          textAlign: 'center',
        }}
      >
        {/* Primera línea del pie */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 3,
            marginBottom: 2,
          }}
        >
          <Link href="#" sx={{ color: '#555', textDecoration: 'none' }}>
            Soporte
          </Link>

          <Link href="#" sx={{ color: '#555', textDecoration: 'none' }}>
            Areas
          </Link>
          <Link href="#" sx={{ color: '#555', textDecoration: 'none' }}>
            Locaciones
          </Link>
        </Box>

        {/* Segunda línea del pie */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 3,
            fontSize: '0.9rem',
          }}
        >
          <Link href="#" sx={{ color: '#555', textDecoration: 'none' }}>
            Aviso de Privacidad
          </Link>
          <Link href="#" sx={{ color: '#555', textDecoration: 'none' }}>
            Aviso de Cookies 
          </Link>
          <Link href="#" sx={{ color: '#555', textDecoration: 'none' }}>
            Terminos de Uso
          </Link>
          <Link href="#" sx={{ color: '#555', textDecoration: 'none' }}>
            Aviso Legal
          </Link>
        </Box>

        {/* Tercera línea del pie */}
        <Typography sx={{ fontSize: '0.8rem', marginTop: 2 }}>
          © 2025 CASUNI S.A. de C.V. Derechos Reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;

import React from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../../Components/header';

const NcrSS23 = () => {
  const videoUrl = 'https://res.cloudinary.com/dwqtvvok7/video/upload/v1738686652/casunimedia/iuiykvvfhob5rvwj9bmb.mp4'; // URL del video en Cloudinary

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        marginTop: '64px',
      }}
    >



        <Header/>
      {/* Título */}
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}
      >
        Capacitación NCR SS23
      </Typography>

      {/* Video */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '800px',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <video
          controls
          style={{
            width: '100%',
            borderRadius: '8px',
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta la reproducción de videos.
        </video>
      </Box>

      {/* Descripción */}
      <Typography
        variant="body1"
        sx={{ textAlign: 'center', mt: 3, color: '#555' }}
      >
        Este video muestra la capacitación técnica del modelo NCR SS23, cubriendo temas clave
        relacionados con su mantenimiento y operación.
      </Typography>
    </Box>
  );
};

export default NcrSS23;

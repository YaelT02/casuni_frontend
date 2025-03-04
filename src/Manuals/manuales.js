// src/Manuals/manuals.js
import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  Container
} from '@mui/material';
import Header from '../Components/header';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const ManualsPage = () => {
  const [manuals, setManuals] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchManuals = async () => {
      try {
        const response = await axios.get(
          'https://casunibackend-5f8218b68a78.herokuapp.com/api/manuals/',
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setManuals(response.data);
      } catch (error) {
        console.error('Error al obtener los manuales:', error);
      }
    };

    if (user && user.token) {
      fetchManuals();
    }
  }, [user]);

  const handleDownload = async (manual) => {
    try {
      // Realiza la petición con axios para que puedas enviar headers y recibir el archivo como blob
      const response = await axios.get(
        `https://casunibackend-5f8218b68a78.herokuapp.com/api/manuals/download/${manual.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'x-session-id': user.sessionId,
          },
          responseType: 'blob', // Importante para recibir el archivo correctamente
        }
      );

      // Crea un blob y fuerza la descarga con el nombre del manual
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${manual.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      // Limpieza
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el manual:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Container sx={{ paddingY: 4, marginTop: '80px' }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 3, fontWeight: 'bold', color: '#000' }}
        >
          Manuales de Consulta
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 2, color: '#333' }}
        >
          Descarga los manuales disponibles para los componentes que necesites.
        </Typography>
        {/* Lista simple de manuales */}
        {manuals.map((manual) => (
          <Box
            key={manual.id}
            sx={{
              marginBottom: 2,
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">{manual.title}</Typography>
            <Typography variant="body2">{manual.description}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDownload(manual)}
              sx={{ marginTop: 1, textTransform: 'none' }}
            >
              Descargar
            </Button>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default ManualsPage;

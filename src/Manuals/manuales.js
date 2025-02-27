import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Button,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../Components/header';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
//import { response } from 'express';

const ManualsPage = () => {
  const [manuals, setManuals] = useState([]);
  const { user } = useContext(AuthContext);

  // Define las marcas en el orden a mostrar
  const brands = ["Diebold", "Wincor", "Next Gen", "GRG", "NCR"];

  useEffect(() => {
    const fetchManuals = async () => {
      try {
        const response = await axios.get(
          'https://casunibackend-5f8218b68a78.herokuapp.com/api/manuals/'
          //'http://localhost:5000/api/manuals/'
          , {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setManuals(response.data);
      } catch (error) {
        console.error('Error al obtener los manuales:', error);
      }
    };

    if (user?.token) {
      fetchManuals();
    }
  }, [user]);

  const manualsByBrand = brands.reduce((acc, brand) => {
    acc[brand] = manuals.filter(manual => manual.brand === brand);
    return acc;
  }, {});

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <Header />

      {/* Contenido Principal */}
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
          Descarga los manuales disponibles para los componentes de la marca que necesites.
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ mb: 5, color: '#666' }}
        >
          Recuerda que la información consultada y descargada es confidencial.
        </Typography>

        {brands.map((brand) => (
          <Accordion key={brand} elevation={3} sx={{ borderRadius: 2, mb: 4 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: '#f4f4f4',
                borderRadius: 2,
                '&:hover': { backgroundColor: '#e0e0e0' },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Manuales {brand} Disponibles
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: '#fff', padding: 2 }}>
              {manualsByBrand[brand] && manualsByBrand[brand].length > 0 ? (
                manualsByBrand[brand].map((manual) => (
                  <Box
                    key={manual.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 2,
                      backgroundColor: '#f9f9f9',
                      borderRadius: 2,
                      boxShadow: 1,
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 'bold', color: '#333' }}
                      >
                        {manual.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {manual.description}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        axios.get(
                          `https://casunibackend-5f8218b68a78.herokuapp.com/api/manuals/download/${manual.id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${user.token}`,
                              'x-session-id': user.sessionId,
                            },
                            responseType: 'blob',
                          }
                        ).then((response) => {
                            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', manual.title); // o el nombre que desees
                            document.body.appendChild(link);
                            link.click();
                        }).catch(error => {
                            console.error('Error en la descarga:', error);
                        }); 
                      }}
                      sx={{ textTransform: 'none' }}
                    >
                      Descargar
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No hay manuales disponibles.
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* Pie de Página */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#f9f9f9',
          padding: 4,
          mt: 4,
          borderTop: '1px solid #ddd',
        }}
      >
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 3,
              mb: 2,
            }}
          >
            <Link href="#" sx={{ color: '#555', textDecoration: 'none', fontSize: '1rem' }}>
              Soporte
            </Link>
            <Link href="#" sx={{ color: '#555', textDecoration: 'none', fontSize: '1rem' }}>
              Áreas
            </Link>
            <Link href="#" sx={{ color: '#555', textDecoration: 'none', fontSize: '1rem' }}>
              Locaciones
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 3,
              fontSize: '0.9rem',
              mb: 2,
            }}
          >
            <Link href="#" sx={{ color: '#555', textDecoration: 'none' }}>
              Aviso de Privacidad
            </Link>
            <Link href="#" sx={{ color: '#555', textDecoration: 'none' }}>
              Aviso de Cookies
            </Link>
            <Link href="#" sx={{ color: '#555', textDecoration: 'none' }}>
              Términos de Uso
            </Link>
            <Link href="#" sx={{ color: '#555', textDecoration: 'none' }}>
              Aviso Legal
            </Link>
          </Box>
          <Typography align="center" sx={{ fontSize: '0.8rem', color: '#777' }}>
            © 2025 CASUNI S.A. de C.V. Derechos Reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default ManualsPage;

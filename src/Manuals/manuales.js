// src/Manuals/manuals.js
import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Header from '../Components/header';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const ManualsPage = () => {
  const [manuals, setManuals] = useState([]);
  const { user } = useContext(AuthContext);

  // Lista de marcas en el orden deseado
  const brands = ["Diebold", "Wincor", "Next Gen", "GRG", "NCR"];

  useEffect(() => {
    const fetchManuals = async () => {
      try {
        const response = await axios.get(
          'https://casuni-backend-d46ce789fb30.herokuapp.com/api/manuals/',
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

  // Agrupa los manuales por marca
  const manualsByBrand = brands.reduce((acc, brand) => {
    acc[brand] = manuals.filter(manual => manual.brand === brand);
    return acc;
  }, {});

  // Función de descarga (mantiene la lógica de bitácora)
  const handleDownload = async (manual) => {
    console.log("SessionId enviado:", user.sessionId);
    try {
      const response = await axios.get(
        `https://casuni-backend-d46ce789fb30.herokuapp.com/api/manuals/download/${manual.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'x-session-id': user.sessionId,
          },
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${manual.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el manual:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#F4F4F4' }}>
      <Header />

      <Container sx={{ py: 4, mt: '80px' }}>
        <Typography variant="h2" align="center" sx={{ mb: 4, fontWeight: 'bold', color: '#183D83' }}>
          Manuales de Consulta
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3, color: '#333' }}>
          Descarga los manuales disponibles para los componentes que necesites.
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 5, color: '#666' }}>
          Recuerda que la información consultada y descargada es confidencial.
        </Typography>

        {brands.map((brand) => (
          <Accordion key={brand} elevation={4} sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: '#5995ED',
                px: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F9FD05' }}>
                Manuales {brand} Disponibles
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: '#fff', p: 3 }}>
              {manualsByBrand[brand] && manualsByBrand[brand].length > 0 ? (
                <Grid container spacing={3}>
                  {manualsByBrand[brand].map((manual) => (
                    <Grid item xs={12} sm={6} md={4} key={manual.id}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: 3,
                          borderRadius: 2,
                          transition: 'transform 0.3s',
                          '&:hover': { transform: 'scale(1.03)' },
                        }}
                      >
                        {/* Encabezado de la tarjeta con ícono PDF */}
                        <Box sx={{ backgroundColor: '#183D83', p: 1, display: 'flex', alignItems: 'center' }}>
                          <PictureAsPdfIcon sx={{ color: '#F9FD05', mr: 1 }} />
                          <Typography variant="subtitle2" sx={{ color: '#F9FD05', fontWeight: 'bold' }}>
                            PDF
                          </Typography>
                        </Box>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#183D83' }}>
                            {manual.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {manual.description}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleDownload(manual)}
                            sx={{
                              textTransform: 'none',
                              backgroundColor: '#F9FD05',
                              color: '#183D83',
                              width: '100%',
                              '&:hover': { backgroundColor: '#CBCA02' },
                            }}
                          >
                            Descargar
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No hay manuales disponibles.
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* Footer Moderno */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#183D83',
          color: '#F4F4F4',
          py: 4,
          mt: 4,
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
            {['Soporte', 'Áreas', 'Locaciones'].map((item) => (
              <Link
                key={item}
                href="#"
                sx={{
                  color: '#F4F4F4',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  '&:hover': { color: '#F9FD05' },
                }}
              >
                {item}
              </Link>
            ))}
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
            {['Aviso de Privacidad', 'Aviso de Cookies', 'Términos de Uso', 'Aviso Legal'].map((item) => (
              <Link
                key={item}
                href="#"
                sx={{
                  color: '#F4F4F4',
                  textDecoration: 'none',
                  '&:hover': { color: '#F9FD05' },
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
          <Typography align="center" sx={{ fontSize: '0.8rem' }}>
            © 2025 CASUNI S.A. de C.V. Derechos Reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default ManualsPage;

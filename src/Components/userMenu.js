import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const [expanded, setExpanded] = useState(false); // Controla si el menú está expandido
  const navigate = useNavigate();

  // Simulación del nombre del usuario
  const userName = 'Juan Pérez';

  // Manejar cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    navigate('/login'); // Redirigir al login
  };

  // Manejar navegación a configuración
  const handleSettings = () => {
    navigate('/settings'); // Redirigir a Configuración
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Accordion
        disableGutters
        elevation={0}
        square
        expanded={expanded}
        onChange={() => setExpanded((prev) => !prev)}
        sx={{
          backgroundColor: 'transparent',
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: 'transparent',
            color: '#333',
            padding: 0,
            '&:hover': { backgroundColor: '#f4f4f4' },
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>{userName}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            position: 'absolute',
            top: '100%',
            right: 0,
            width: '200px',
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid #ddd',
            zIndex: 10,
            padding: 2,
          }}
        >
          <List>
            <ListItem
              sx={{
                cursor: 'pointer',
                '&:hover': { color: '#007bff' },
              }}
              onClick={handleSettings}
            >
              Configuración
            </ListItem>
            <ListItem
              sx={{
                cursor: 'pointer',
                '&:hover': { color: '#007bff' },
              }}
              onClick={handleLogout}
            >
              Cerrar Sesión
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default UserMenu;

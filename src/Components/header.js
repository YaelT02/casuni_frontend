// src/Components/header.js
import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore,
  Person,
  Settings,
  ExitToApp,
  Upload,
  ListAltSharp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Header = () => {
  const [capacitacionesAnchorEl, setCapacitacionesAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Menú de Capacitaciones
  const handleCapacitacionesMenuOpen = (event) => {
    setCapacitacionesAnchorEl(event.currentTarget);
  };
  const handleCapacitacionesMenuClose = () => {
    setCapacitacionesAnchorEl(null);
  };

  // Menú del Usuario
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCapacitacionesMenuClose();
    handleUserMenuClose();
  };

  const handleAccordionChange = (accordion) => {
    setActiveAccordion((prev) => (prev === accordion ? null : accordion));
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#ffffff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #ddd',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo y Menús */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Box
            component="img"
            src={'/images/logo_casuni.png'}
            alt="Logo"
            sx={{ height: 50, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />

          <Button
            onClick={() => handleNavigate('/manuales')}
            sx={{ color: '#183D83', textTransform: 'none', fontWeight: 'bold' }}
          >
            MANUALES
          </Button>

          <Box>
            <Button
              onClick={handleCapacitacionesMenuOpen}
              endIcon={<ExpandMore />}
              sx={{ color: '#183D83', textTransform: 'none', fontWeight: 'bold' }}
            >
              CAPACITACIONES
            </Button>
            <Menu
              anchorEl={capacitacionesAnchorEl}
              open={Boolean(capacitacionesAnchorEl)}
              onClose={handleCapacitacionesMenuClose}
              PaperProps={{
                sx: {
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                },
              }}
              sx={{ mt: 1 }}
            >
              {/* Desplegable con Accordions para cada marca */}
              <Accordion
                disableGutters
                elevation={0}
                square
                expanded={activeAccordion === 'diebold'}
                onChange={() => handleAccordionChange('diebold')}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: 1, m: 1, '&:before': { display: 'none' } }}
              >
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 2 }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#183D83' }}>Diebold</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                  <List>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/diebold/522-frontal')}
                    >
                      522 (Carga frontal)
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/diebold/522-trasera')}
                    >
                      522 (Carga trasera)
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion
                disableGutters
                elevation={0}
                square
                expanded={activeAccordion === 'wincor'}
                onChange={() => handleAccordionChange('wincor')}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: 1, m: 1, '&:before': { display: 'none' } }}
              >
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 2 }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#183D83' }}>Wincor</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                  <List>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-frontal')}
                    >
                      280 (Carga frontal)
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      280 (Carga trasera)
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      Cineo 2080
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion
                disableGutters
                elevation={0}
                square
                expanded={activeAccordion === 'nextgen'}
                onChange={() => handleAccordionChange('nextgen')}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: 1, m: 1, '&:before': { display: 'none' } }}
              >
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 2 }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#183D83' }}>Next Gen</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                  <List>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-frontal')}
                    >
                      5550
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      5500
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      5700
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion
                disableGutters
                elevation={0}
                square
                expanded={activeAccordion === 'grg'}
                onChange={() => handleAccordionChange('grg')}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: 1, m: 1, '&:before': { display: 'none' } }}
              >
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 2 }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#183D83' }}>GRG</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                  <List>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-frontal')}
                    >
                      H22
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion
                disableGutters
                elevation={0}
                square
                expanded={activeAccordion === 'ncr'}
                onChange={() => handleAccordionChange('ncr')}
                sx={{ backgroundColor: '#f9f9f9', borderRadius: 1, m: 1, '&:before': { display: 'none' } }}
              >
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 2 }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#183D83' }}>NCR</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2 }}>
                  <List>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/ncrSS23')}
                    >
                      SS23
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      SS27
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      SS84
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#CBCA02' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      SS38
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </Menu>
          </Box>
        </Box>

        {/* Menú del Usuario */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user?.role === 'admin' && (
            <Button
              onClick={() => handleNavigate('/upload')}
              variant="contained"
              startIcon={<Upload />}
              sx={{
                textTransform: 'none',
                backgroundColor: '#007bff',
                '&:hover': { backgroundColor: '#0056b3' },
              }}
            >
              Subir Archivos
            </Button>
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              '&:hover': { backgroundColor: '#f4f4f4' },
            }}
            onClick={handleUserMenuOpen}
          >
            <Typography sx={{ color: '#183D83', fontWeight: 'bold' }}>
              {user?.nombre || 'Usuario'}
            </Typography>
            <Person fontSize="large" sx={{ color: '#183D83' }} />
          </Box>

          <Menu
            anchorEl={userMenuAnchorEl}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
            PaperProps={{
              sx: {
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
              },
            }}
            sx={{ mt: 1 }}
          >
            {user?.role === 'admin' && (
              <MenuItem
                onClick={() => handleNavigate('/bitacora')}
                sx={{
                  px: 2,
                  py: 1,
                  '&:hover': { backgroundColor: '#f9f9f9', color: '#CBCA02' },
                }}
              >
                <ListItemIcon>
                  <ListAltSharp fontSize="small" sx={{ color: '#183D83' }} />
                </ListItemIcon>
                <ListItemText primary="Bitácora" sx={{ color: '#183D83' }} />
              </MenuItem>
            )}
            <MenuItem
              onClick={() => handleNavigate('/configuracion')}
              sx={{
                px: 2,
                py: 1,
                '&:hover': { backgroundColor: '#f9f9f9', color: '#CBCA02' },
              }}
            >
              <ListItemIcon>
                <Settings fontSize="small" sx={{ color: '#183D83' }} />
              </ListItemIcon>
              <ListItemText primary="Configuración" sx={{ color: '#183D83' }} />
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleLogout}
              sx={{
                px: 2,
                py: 1,
                '&:hover': { backgroundColor: '#f9f9f9', color: '#CBCA02' },
              }}
            >
              <ListItemIcon>
                <ExitToApp fontSize="small" sx={{ color: '#183D83' }} />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" sx={{ color: '#183D83' }} />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

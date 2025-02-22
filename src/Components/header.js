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

  // Abrir menú de Capacitaciones
  const handleCapacitacionesMenuOpen = (event) => {
    setCapacitacionesAnchorEl(event.currentTarget);
  };

  // Cerrar menú de Capacitaciones
  const handleCapacitacionesMenuClose = () => {
    setCapacitacionesAnchorEl(null);
  };

  // Abrir menú del usuario
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  // Cerrar menú del usuario
  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  // Manejar cierre de sesión
  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  // Navegación a páginas específicas
  const handleNavigate = (path) => {
    navigate(path);
    handleCapacitacionesMenuClose();
    handleUserMenuClose();
  };

  // Función para manejar la apertura/cierre de acordeones
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
          {/* Logo */}
          <Box
            component="img"
            src={'/images/logo_casuni.png'}
            alt="Logo"
            sx={{ height: 50, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />

          {/* Botón de Manuales */}
          <Button
            onClick={() => handleNavigate('/manuales')}
            sx={{ color: '#333', textTransform: 'none', fontWeight: 'bold' }}
          >
            MANUALES
          </Button>

          {/* Menú de Capacitaciones */}
          <Box>
            <Button
              onClick={handleCapacitacionesMenuOpen}
              endIcon={<ExpandMore />}
              sx={{ color: '#333', textTransform: 'none', fontWeight: 'bold' }}
            >
              CAPACITACIONES
            </Button>
            <Menu
              anchorEl={capacitacionesAnchorEl}
              open={Boolean(capacitacionesAnchorEl)}
              onClose={handleCapacitacionesMenuClose}
              sx={{ mt: 1 }}
            >

              {/* Marca: Diebold */}
              <Accordion disableGutters elevation={0} square expanded={activeAccordion === 'diebold'}
                onChange={() => handleAccordionChange('diebold')}
                sx={{ backgroundColor: 'transparent', '&:before': { display: 'none' } }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ fontWeight: 'bold' }}>Diebold</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
                      onClick={() => handleNavigate('/capacitaciones/diebold/522-frontal')}
                    >
                      522 (Carga frontal)
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
                      onClick={() => handleNavigate('/capacitaciones/diebold/522-trasera')}
                    >
                      522 (Carga trasera)
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Marca: Wincor */}
              <Accordion disableGutters elevation={0} square expanded={activeAccordion === 'wincor'}
                onChange={() => handleAccordionChange('wincor')}
                sx={{ backgroundColor: 'transparent', '&:before': { display: 'none' } }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ fontWeight: 'bold' }}>Wincor</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-frontal')}
                    >
                      280 (Carga frontal)
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      280 (Carga trasera)
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      Cineo 2080
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Marca: Next Gen */}
              <Accordion disableGutters elevation={0} square expanded={activeAccordion === 'nextgen'}
                onChange={() => handleAccordionChange('nextgen')}
                sx={{ backgroundColor: 'transparent', '&:before': { display: 'none' } }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ fontWeight: 'bold' }}>Next Gen</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-frontal')}
                    >
                      5550
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      5500
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      5700
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Marca: GRG */}
              <Accordion disableGutters elevation={0} square expanded={activeAccordion === 'grg'}
                onChange={() => handleAccordionChange('grg')}
                sx={{ backgroundColor: 'transparent', '&:before': { display: 'none' } }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ fontWeight: 'bold' }}>GRG</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-frontal')}
                    >
                      H22
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Marca: NCR */}
              <Accordion disableGutters elevation={0} square expanded={activeAccordion === 'ncr'}
                onChange={() => handleAccordionChange('ncr')}
                sx={{ backgroundColor: 'transparent', '&:before': { display: 'none' } }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ fontWeight: 'bold' }}>NCR</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
                      onClick={() => handleNavigate('/capacitaciones/ncrSS23')}
                    >
                      SS23
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      SS27
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
                      onClick={() => handleNavigate('/capacitaciones/wincor/280-trasera')}
                    >
                      SS84
                    </ListItem>
                    <ListItem
                      sx={{ cursor: 'pointer', '&:hover': { color: '#007bff' } }}
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
          {/* Botón para subir archivos (solo para admin) */}
          {user?.role === 'admin' && (
            <Button
              onClick={() => navigate('/upload')}
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
            <Typography sx={{ color: '#333', fontWeight: 'bold' }}>
              {user?.nombre || 'Usuario'} {/* Mostrar el nombre del usuario */}
            </Typography>
            <Person fontSize="large" sx={{ color: '#333' }} />
          </Box>

          {/* Menú desplegable del usuario */}
          <Menu
            anchorEl={userMenuAnchorEl}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
            sx={{ mt: 1 }}
          >
          
            {user?.role === 'admin' && (
              <MenuItem onClick={() => handleNavigate('/bitacora')}>
                <ListItemIcon>
                  <ListAltSharp fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Bitácora" />
              </MenuItem>
            )}

            <MenuItem onClick={() => handleNavigate('/configuracion')}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Configuración" />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
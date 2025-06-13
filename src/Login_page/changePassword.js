import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Link 
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState('');
  const [openTermsDialog, setOpenTermsDialog] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setMessage('Debes aceptar los Términos y Condiciones para cambiar tu contraseña.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post(
        'https://casuni-backend-d46ce789fb30.herokuapp.com/api/auth/change-password',
        {
          userId: user.id,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error.response?.data || error.message);
      setMessage('Error al cambiar la contraseña.');
    }
  };

  const handleOpenTermsDialog = (e) => {
    e.preventDefault();
    setOpenTermsDialog(true);
  };

  const handleCloseTermsDialog = () => {
    setOpenTermsDialog(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #183D83, #5995ED)',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: '#F4F4F4',
          borderRadius: 2,
          boxShadow: 3,
          padding: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#183D83' }}>
          Cambia tu contraseña
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nueva Contraseña"
            type="password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#183D83' },
                '&:hover fieldset': { borderColor: '#5995ED' },
                '&.Mui-focused fieldset': { borderColor: '#CBCA02' },
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirmar Contraseña"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#183D83' },
                '&:hover fieldset': { borderColor: '#5995ED' },
                '&.Mui-focused fieldset': { borderColor: '#CBCA02' },
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                sx={{
                  color: '#183D83',
                  '&.Mui-checked': {
                    color: '#F9FD05',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: '#183D83' }}>
                Acepto los{' '}
                <Link href="#" onClick={handleOpenTermsDialog} sx={{ color: '#5995ED' }}>
                  Términos y Condiciones
                </Link>
              </Typography>
            }
            sx={{ marginTop: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: '#F9FD05',
              color: '#183D83',
              '&:hover': { backgroundColor: '#CBCA02' },
            }}
          >
            Cambiar Contraseña
          </Button>
        </form>

        {message && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Box>

      <Dialog
        open={openTermsDialog}
        onClose={handleCloseTermsDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: '#183D83', color: '#F9FD05' }}>
          Términos y Condiciones de Descarga de Manuales
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: '#F4F4F4' }}>
          {/* Contenido de los términos */}
          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2, color: '#183D83' }}>
            <strong>1. Aceptación de los Términos</strong><br />
            Al descargar y/o utilizar los manuales de consulta proporcionados en este sitio web,
            usted acepta cumplir y estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con
            alguno de los términos aquí establecidos, le solicitamos que no realice la descarga ni haga uso de los manuales.
          </Typography>
          {/* Se continúa con el resto de los términos... */}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#F4F4F4' }}>
          <Button onClick={handleCloseTermsDialog} variant="contained" sx={{ backgroundColor: '#F9FD05', color: '#183D83' }}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChangePassword;

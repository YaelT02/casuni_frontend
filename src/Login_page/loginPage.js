import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'https://casuni-backend-d46ce789fb30.herokuapp.com/api/auth/login',
        {
          username,
          password,
        }
      );

      console.log('Respuesta del backend:', response.data);
      login(response.data.user, response.data.token, response.data.sessionId);
    } catch (err) {
      console.error('Error al iniciar sesión:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Error desconocido');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        // Fondo con gradiente usando Marian Blue y Cornflower Blue
        background: 'linear-gradient(135deg, #183D83, #5995ED)',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: '#F4F4F4', // White Smoke para el contenedor
          borderRadius: 2,
          boxShadow: 3,
          padding: 3,
          textAlign: 'center',
        }}
      >
        <Box
          component="img"
          src={'../images/logo_casuni.png'}
          alt="Logo Casuni"
          sx={{
            width: 150,
            marginBottom: 2,
          }}
        />

        <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#183D83' }}>
          Te damos la bienvenida
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Usuario"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#183D83' },
                '&:hover fieldset': { borderColor: '#5995ED' },
                '&.Mui-focused fieldset': { borderColor: '#CBCA02' },
              },
            }}
          />
          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: '#F9FD05', // Yellow para llamar la atención
              color: '#183D83',
              '&:hover': { backgroundColor: '#CBCA02' }, // Cambio a Citrine al pasar el mouse
            }}
          >
            Entrar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;

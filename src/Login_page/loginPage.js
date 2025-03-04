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
        'https://casunibackend-5f8218b68a78.herokuapp.com/api/auth/login'
        //'http://localhost:5000/api/auth/login'
        , {
        username,
        password,
      });

      console.log('Respuesta del backend:', response.data);

      // Llamar a la función `login` del contexto
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
        backgroundColor: 'blue',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: 'white',
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

        <Typography variant="h6" component="h2" gutterBottom>
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
          />
          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Entrar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
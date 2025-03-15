// src/UploadManual.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Header from '../Components/header';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const UploadManual = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modelId, setModelId] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Opciones para la lista desplegable de modelos
  const modelOptions = [
    { id: 1, label: 'Diebold: 522 (Carga Frontal)' },
    { id: 2, label: 'Diebold: 522 (Carga Trasera)' },
    { id: 3, label: 'Wincor: 280 (Carga Frontal)' },
    { id: 4, label: 'Wincor: 280 (Carga Trasera)' },
    { id: 5, label: 'Wincor: Cineo 2080' },
    { id: 6, label: 'Next Gen: 5550' },
    { id: 7, label: 'Next Gen: 5500' },
    { id: 8, label: 'Next Gen: 5700' },
    { id: 9, label: 'GRG: H22' },
    { id: 10, label: 'NCR: SS23' },
    { id: 11, label: 'NCR: SS27' },
    { id: 12, label: 'NCR: SS84' },
    { id: 13, label: 'NCR: SS38' },
  ];

  // Al seleccionar el archivo, se valida que sea PDF y se asigna su nombre al título
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setMessage('Solo se permiten archivos PDF.');
        return;
      }
      setFile(selectedFile);
      setTitle(selectedFile.name);
      setMessage('');
    }
  };

  // Permite eliminar el archivo seleccionado
  const handleDeleteFile = () => {
    setFile(null);
    setTitle('');
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.role !== 'admin') {
      setMessage('No tienes permiso para realizar esta acción.');
      return;
    }

    if (!file) {
      setMessage('Por favor, selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('model_id', modelId);
    formData.append('token', user?.token);

    setLoading(true);

    try {
      const response = await axios.post(
        'https://casunibackend-5f8218b68a78.herokuapp.com/api/manuals/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setMessage(response.data.message);

      // Limpiar el formulario
      setTitle('');
      setDescription('');
      setModelId('');
      setFile(null);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setMessage('Error al subir el archivo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#F4F4F4', minHeight: '100vh' }}>
      <Header />

      <Container
        sx={{
          py: 4,
          mt: '100px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 500,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <CardHeader
            title="Subir Manual"
            sx={{
              backgroundColor: '#183D83', // Fondo azul oscuro
              color: '#F9FD05',          // Texto en amarillo
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: '#F9FD05', // Botón amarillo
                  color: '#183D83',           // Texto azul
                  mb: 2,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#CBCA02' },
                }}
              >
                Seleccionar archivo
                <input type="file" hidden accept="application/pdf" onChange={handleFileChange} />
              </Button>

              {file && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                    p: 1,
                    border: '1px dashed #183D83',
                    borderRadius: 1,
                    backgroundColor: '#F9FD05',
                  }}
                >
                  <PictureAsPdfIcon sx={{ color: '#183D83' }} />
                  <Typography variant="body2" sx={{ color: '#183D83' }}>
                    {file.name}
                  </Typography>
                  <IconButton onClick={handleDeleteFile} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}

              <TextField
                fullWidth
                margin="normal"
                label="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#183D83' },
                    '&:hover fieldset': { borderColor: '#5995ED' },
                    '&.Mui-focused fieldset': { borderColor: '#F9FD05' },
                  },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#183D83' },
                    '&:hover fieldset': { borderColor: '#5995ED' },
                    '&.Mui-focused fieldset': { borderColor: '#F9FD05' },
                  },
                }}
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Modelo</InputLabel>
                <Select
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  label="Modelo"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#183D83' },
                      '&:hover fieldset': { borderColor: '#5995ED' },
                      '&.Mui-focused fieldset': { borderColor: '#F9FD05' },
                    },
                  }}
                >
                  {modelOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    backgroundColor: '#183D83',
                    color: '#F9FD05',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#5995ED' },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Subir'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>

      {message && (
        <Typography
          variant="body1"
          align="center"
          color={message.includes('Error') ? 'error' : 'primary'}
          sx={{ mt: 2 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default UploadManual;

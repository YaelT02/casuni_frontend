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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

  // Manejar la selección del archivo y asignar el nombre del archivo al título
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setTitle(selectedFile.name); // Asigna automáticamente el nombre del archivo como título
    }
  };

  // Eliminar el archivo seleccionado y limpiar el título asignado
  const handleDeleteFile = () => {
    setFile(null);
    setTitle('');
  };

  // Manejar el envío del formulario
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
        'http://localhost:5000/api/manuals/upload',
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Header />


      <br/>
<br/>
<br/>
<br/>

      <Typography variant="h4" gutterBottom>
        Subir Manual
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>

        <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
          Seleccionar archivo
          <input type="file" hidden accept="application/pdf" onChange={handleFileChange} />
        </Button>

        {file && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 2,
              padding: 1,
              border: '1px solid #ccc',
              borderRadius: 1,
              width: '100%',
            }}
          >
            <Typography variant="body2">
              Archivo seleccionado: {file.name}
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
        />
        <TextField
          fullWidth
          margin="normal"
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Modelo</InputLabel>
          <Select
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            label="Modelo"
          >
            {modelOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Subir'}
        </Button>
      </form>

      {message && (
        <Typography
          variant="body1"
          color={message.includes('Error') ? 'error' : 'primary'}
          sx={{ marginTop: 2 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default UploadManual;

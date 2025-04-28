import React, { useState, useContext } from 'react';
import {
  Container, Divider ,Box, TextField, Button, Typography, Grid, Paper, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { Add } from '@mui/icons-material';

const CreateModulesPage = () => {
  const { courseId } = useParams(); 
  console.log("Course ID:", courseId);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
 const [moduleData, setModuleData] = useState({
    title: '',
    description: '',
    order: '',
  });
  const [file, setFile] = useState(null);
  const [contentType, setContentType] = useState('pdf'); // O 'video' o 'presentation'
  const [contentOrder, setContentOrder] = useState('');
  const [message, setMessage] = useState('');

  const handleModuleChange = (e) => {
    setModuleData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitModule = async (e) => {
    e.preventDefault();

    try {
      // 1. Crear el módulo para el curso
      const moduleRes = await axios.post(
        `https://casunibackend-5f8218b68a78.herokuapp.com/api/modules/${courseId}/modules`,
        moduleData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const moduleId = moduleRes.data.moduleId; // suponiendo que el backend retorna el ID

      // 2. Si se seleccionó un archivo, subir contenido multimedia para ese módulo
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', `Contenido para ${moduleData.title}`);
        formData.append('type', contentType);
        formData.append('order', contentOrder);

        // Subir el contenido a través del endpoint correspondiente
        await axios.post(
          `https://casunibackend-5f8218b68a78.herokuapp.com/api/contents/${moduleId}/content`,
          formData,
          { headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'multipart/form-data' } }
        );
      }

      setMessage('Módulo y contenido subido exitosamente');
      // Opción: redirigir a una pantalla de resumen o limpiar el formulario para seguir agregando módulos.
      setModuleData({ title: '', description: '', order: '' });
      setFile(null);
      setContentOrder('');
    } catch (error) {
      console.error('Error al crear módulo o contenido:', error);
      setMessage('Error al crear módulo o contenido');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, backgroundColor: '#F4F4F4', borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} color="#183D83">
          Agregar Módulo y Contenido al Curso {courseId}
        </Typography>
        <form onSubmit={handleSubmitModule}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Título del Módulo" name="title" value={moduleData.title} onChange={handleModuleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={2} label="Descripción" name="description" value={moduleData.description} onChange={handleModuleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="number" label="Orden" name="order" value={moduleData.order} onChange={handleModuleChange} required />
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight="bold" color="#183D83" mb={2}>
            Contenido Multimedia para el Módulo (Opcional)
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: '#F9FD05',
                  color: '#183D83',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#CBCA02' },
                }}
              >
                Seleccionar Archivo
                <input type="file" hidden accept="application/pdf,video/*,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation" onChange={handleFileChange} />
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  label="Tipo"
                >
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="presentation">Presentación</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth type="number" label="Orden del Contenido" value={contentOrder} onChange={(e) => setContentOrder(e.target.value)} />
            </Grid>
          </Grid>
          <Box textAlign="right" mt={3}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Add />}
              sx={{
                backgroundColor: '#5995ED',
                color: '#fff',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#183D83' },
              }}
            >
              Agregar Módulo
            </Button>
          </Box>
          {message && (
            <Typography variant="body1" align="center" color={message.includes('Error') ? 'error' : 'primary'} sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </form>
        <Box textAlign="center" mt={4}>
          <Button variant="outlined" onClick={() => navigate('/admin/courses')} color="primary">
            Volver al listado de cursos
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateModulesPage;

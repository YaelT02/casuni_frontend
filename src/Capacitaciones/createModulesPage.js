// src/Capacitaciones/createModulesPage.js
import React, { useState, useContext } from 'react';
import {
  Container,
  Divider,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { Add } from '@mui/icons-material';

const CreateModulesPage = ({ courseId }) => {
  //const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [moduleData, setModuleData] = useState({
    title: '',
    description: '',
    order: '',
  });
  const [file, setFile] = useState(null);
  const [contentType, setContentType] = useState('pdf');
  const [contentOrder, setContentOrder] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleModuleChange = (e) => {
    setModuleData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSubmitModule = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 1) Crear el módulo
      const { data: moduleRes } = await axios.post(
        `https://casuni-backend-d46ce789fb30.herokuapp.com/api/modules/${courseId}/modules`,
        moduleData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const moduleId = moduleRes.moduleId;
      if (!moduleId) throw new Error('No retornó moduleId');

      // 2) Subir contenido si hay archivo
      if (file) {
        const form = new FormData();
        form.append('file', file);
        form.append('title', moduleData.title);
        form.append('type', contentType);
        form.append('order', contentOrder);

        await axios.post(
          `https://casuni-backend-d46ce789fb30.herokuapp.com/api/contents/${moduleId}/content`,
          form,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      setMessage('Módulo y contenido subido exitosamente');
      // Limpiar formulario
      setModuleData({ title: '', description: '', order: '' });
      setFile(null);
      setContentOrder('');
    } catch (error) {
      console.error('Error al crear módulo o contenido:', error);
      setMessage('Error al crear módulo o contenido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, backgroundColor: '#F4F4F4', borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} color="#183D83">
          Agregar Módulo y Contenido al Curso {courseId}
        </Typography>

        {/* Barra de progreso */}
        {loading && <LinearProgress sx={{ mb: 2 }} />}

        <form onSubmit={handleSubmitModule}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título del Módulo"
                name="title"
                value={moduleData.title}
                onChange={handleModuleChange}
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Descripción"
                name="description"
                value={moduleData.description}
                onChange={handleModuleChange}
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Orden"
                name="order"
                value={moduleData.order}
                onChange={handleModuleChange}
                required
                disabled={loading}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight="bold" color="#183D83" mb={2}>
            Contenido Multimedia (Opcional)
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                disabled={loading}
                sx={{
                  backgroundColor: '#F9FD05',
                  color: '#183D83',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#CBCA02' },
                }}
              >
                Seleccionar Archivo
                <input
                  type="file"
                  hidden
                  accept="video/*,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </Button>
              {file && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Archivo seleccionado: {file.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth disabled={loading}>
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
              <TextField
                fullWidth
                type="number"
                label="Orden del Contenido"
                value={contentOrder}
                onChange={(e) => setContentOrder(e.target.value)}
                disabled={loading}
              />
            </Grid>
          </Grid>

          <Box textAlign="right" mt={3}>
            <Button
              type="submit"
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Add />}
              disabled={loading}
              sx={{
                backgroundColor: '#5995ED',
                color: '#fff',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#183D83' },
              }}
            >
              {loading ? 'Cargando...' : 'Agregar Módulo'}
            </Button>
          </Box>

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
        </form>

        <Box textAlign="center" mt={4}>
          <Button
            variant="outlined"
            onClick={() => navigate('/createCourse')}
            color="primary"
            disabled={loading}
          >
            Volver al listado de cursos
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateModulesPage;

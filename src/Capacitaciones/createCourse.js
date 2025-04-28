// src/Components/admin/CreateCourseForm.js
import React, { useState, useContext } from 'react';
import {
  Box, TextField, Button, Typography, MenuItem, Select, FormControl,
  InputLabel, Container, Grid, Paper, IconButton, Divider
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const levels = ['beginner', 'intermediate', 'advanced'];
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

const CreateCourseForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimated_duration: '',
    level: '',
    model_id: '',
    // Nota: En esta fase, no incluimos módulos.
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://casunibackend-5f8218b68a78.herokuapp.com/api/courses',
        formData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log('Respuesta creación curso:', data);
      alert('Curso creado exitosamente');

      const trainingId = data.trainingId;
      if (!trainingId) throw new Error('No se recibió trainingId');
      
      navigate(`/createCourse/${trainingId}/modules`);
    } catch (error) {
      console.error('Error al crear curso', error);
      alert('Hubo un error al crear el curso');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: '#F4F4F4' }}>
        <Typography variant="h4" fontWeight="bold" mb={3} color="#183D83">
          Crear nuevo curso
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Título" name="title" value={formData.title} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={3} label="Descripción" name="description" value={formData.description} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="number" label="Duración estimada (min)" name="estimated_duration" value={formData.estimated_duration} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Nivel</InputLabel>
                <Select name="level" value={formData.level} onChange={handleChange} label="Nivel">
                  {levels.map(level => <MenuItem key={level} value={level}>{level}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Modelo</InputLabel>
                <Select name="model_id" value={formData.model_id} onChange={handleChange} label="Modelo">
                  {modelOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 4,
              backgroundColor: '#F9FD05',
              color: '#183D83',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#CBCA02' },
            }}
          >
            Crear curso
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateCourseForm;

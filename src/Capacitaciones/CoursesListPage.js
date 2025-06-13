// src/Components/CoursesListPage.js
import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress
} from '@mui/material';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CoursesListPage = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          'https://casuni-backend-d46ce789fb30.herokuapp.com/api/courses',
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setCourses(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user.token]);

  useEffect(() => {
    setFiltered(
      courses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, courses]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 10, mb: 8 }}>

    <Box sx={{ mb: 2 }}>
      <Button
        variant="outlined"
        onClick={() => navigate('/')}
        startIcon={<i className="fas fa-home"></i>}
        sx={{ textTransform: 'none' }}
      >
        Regresar a Principal
      </Button>
    </Box>

      <Typography variant="h4" fontWeight="bold" color="#183D83" gutterBottom>
        Capacitaciones Disponibles
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Buscar curso..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            sx: { backgroundColor: '#F4F4F4' }
          }}
        />
      </Box>

      {filtered.length === 0 ? (
        <Typography color="#666">No se encontraron cursos.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map(course => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 3,
                  borderRadius: 2
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Título */}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: '#183D83' }}
                  >
                    {course.title}
                  </Typography>
                  {/* Nivel, Marca y Modelo */}
                  <Typography variant="body2" sx={{ color: '#333', mt: 1 }}>
                    <strong>Nivel:</strong> {course.level}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333' }}>
                    <strong>Marca:</strong> {course.brand}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333' }}>
                    <strong>Modelo:</strong> {course.model_name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333' }}>
                    <strong>Módulos:</strong> {course.module_count || 0}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => navigate(`/capacitaciones/${course.id}`)}
                    sx={{
                      textTransform: 'none',
                      backgroundColor: '#5995ED',
                      color: '#F4F4F4',
                      '&:hover': { backgroundColor: '#183D83' }
                    }}
                  >
                    Ver detalles
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CoursesListPage;

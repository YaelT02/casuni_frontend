// src/Capacitaciones/MyCoursesPage.js
import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Header from '../Components/header';

const MyCoursesPage = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const { data } = await axios.get(
          //'https://casunibackend-5f8218b68a78.herokuapp.com/api/courses/my-courses',
          'http://localhost:5000/api/courses/my-courses',
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setCourses(data);
      } catch (err) {
        console.error('Error al cargar mis cursos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, [user.token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Container sx={{ mt: 12, mb: 8 }}>
        <Typography variant="h4" fontWeight="bold" color="#183D83" gutterBottom>
          Mis Cursos Creados
        </Typography>

        {courses.length === 0 ? (
          <Typography color="#666">No has creado ningún curso aún.</Typography>
        ) : (
          <Grid container spacing={3}>
            {courses.map(course => (
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
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#183D83' }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
                      <strong>Nivel:</strong> {course.level}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333' }}>
                      <strong>Marca:</strong> {course.brand}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333' }}>
                      <strong>Modelo:</strong> {course.model_name}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: '#333' }}>
                      <strong>Módulos:</strong> {course.module_count}
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
    </>
  );
};

export default MyCoursesPage;

import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await axios.get(
          `https://casunibackend-5f8218b68a78.herokuapp.com/api/courses/${id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setCourse(res.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, user.token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ mt: 10 }}>
        <Typography variant="h6" color="error">Curso no encontrado.</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 10, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" color="#183D83" gutterBottom>
        {course.title}
      </Typography>

      <Typography variant="subtitle1" color="#333">
        <strong>Nivel:</strong> {course.level}
      </Typography>
      <Typography variant="subtitle1" color="#333">
        <strong>Marca:</strong> {course.brand}
      </Typography>
      <Typography variant="subtitle1" color="#333" gutterBottom>
        <strong>Modelo:</strong> {course.model_name}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" color="#183D83" gutterBottom>
        Módulos del Curso ({course.modules?.length || 0})
      </Typography>

      {course.modules?.length > 0 ? (
        <List>
          {course.modules.map((mod) => (
            <Box key={mod.id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {mod.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                {mod.description}
              </Typography>

              {/* Mostrar contenidos del módulo */}
              {mod.contents?.length > 0 && (
                <List sx={{ pl: 2 }}>
                  {mod.contents.map((cont) => (
                    <ListItem key={cont.id} disablePadding>
                      <ListItemText
                        primary={cont.type.toUpperCase()}
                        secondary={
                          <a href={cont.url} target="_blank" rel="noreferrer">
                            {cont.url}
                          </a>
                        }
                      />
                      <Chip label={`Orden ${cont.order}`} size="small" color="primary" />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          ))}
        </List>
      ) : (
        <Typography>No hay módulos registrados para este curso.</Typography>
      )}
    </Container>
  );
};

export default CourseDetailsPage;

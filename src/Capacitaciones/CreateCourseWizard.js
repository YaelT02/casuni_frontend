// src/Components/admin/CreateCourseWizard.js
import React, { useState } from 'react';
import { Container, Paper, Stepper, Step, StepLabel, Box, Button } from '@mui/material';
import CreateCourseForm from './createCourse';
import CreateModulesPage from './createModulesPage';
import { useNavigate } from 'react-router-dom';

export default function CreateCourseWizard() {
  const [step, setStep]     = useState(0);
  const [courseId, setCourseId] = useState(null);
  const navigate = useNavigate();

  // callback que pasamos al form
  const handleCourseCreated = (newId) => {
    setCourseId(newId);
    setStep(1);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>

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

      <Paper sx={{ p: 4 }}>
        <Stepper activeStep={step} sx={{ mb: 4 }}>
          <Step><StepLabel>Datos del curso</StepLabel></Step>
          <Step><StepLabel>Agregar módulos</StepLabel></Step>
        </Stepper>

        {step === 0 && (
          <CreateCourseForm onSuccess={handleCourseCreated} />
        )}

        {step === 1 && (
          <Box>
            <Button onClick={() => setStep(0)} sx={{ mb: 2 }}>
              ← Volver a datos del curso
            </Button>
            {courseId && <CreateModulesPage courseId={courseId} />}
          </Box>
        )}
      </Paper>
    </Container>
  );
}

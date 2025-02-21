import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Link 
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState('');
  const [openTermsDialog, setOpenTermsDialog] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setMessage('Debes aceptar los Términos y Condiciones para cambiar tu contraseña.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post(
        //'http://localhost:5000/api/auth/change-password',
        'https://casunibackend-5f8218b68a78.herokuapp.com/api/auth/change-password',
        {
          userId: user.id,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error.response?.data || error.message);
      setMessage('Error al cambiar la contraseña.');
    }
  };

  // Funciones para abrir y cerrar el diálogo de Términos y Condiciones
  const handleOpenTermsDialog = (e) => {
    e.preventDefault();
    setOpenTermsDialog(true);
  };

  const handleCloseTermsDialog = () => {
    setOpenTermsDialog(false);
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
        <Typography variant="h6" component="h2" gutterBottom>
          Cambia tu contraseña
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nueva Contraseña"
            type="password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirmar Contraseña"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Casilla para aceptar Términos y Condiciones con enlace que abre el modal */}
          <FormControlLabel
            control={
              <Checkbox
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                Acepto los{' '}
                <Link href="#" onClick={handleOpenTermsDialog}>
                  Términos y Condiciones
                </Link>
              </Typography>
            }
            sx={{ marginTop: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Cambiar Contraseña
          </Button>
        </form>

        {message && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Box>

      {/* Modal de Términos y Condiciones */}
      <Dialog
        open={openTermsDialog}
        onClose={handleCloseTermsDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Términos y Condiciones de Descarga de Manuales</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
            <strong>1. Aceptación de los Términos</strong><br />
            Al descargar y/o utilizar los manuales de consulta proporcionados en este sitio web,
            usted acepta cumplir y estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con
            alguno de los términos aquí establecidos, le solicitamos que no realice la descarga ni haga uso de los manuales.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
            <strong>2. Objeto y Uso Autorizado</strong><br />
            Los manuales disponibles en este sitio web se ofrecen exclusivamente para uso interno y de consulta personal.
            Queda expresamente prohibido:
            <br />- Utilizar los manuales para fines comerciales o de lucro.
            <br />- Reproducir, modificar, distribuir o transferir total o parcialmente el contenido de los manuales sin
            la autorización previa y por escrito de CASUNI S.A. de C.V.
            <br />- Compartir o poner a disposición de terceros los manuales descargados.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
            <strong>3. Confidencialidad y Protección de la Información</strong><br />
            La información contenida en los manuales es confidencial y está protegida por las leyes de propiedad intelectual.
            Usted se compromete a mantener la confidencialidad de dicha información y a no divulgarla a terceros sin la debida autorización.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
            <strong>4. Responsabilidad y Limitación de Responsabilidad</strong><br />
            CASUNI S.A. de C.V. se exime de cualquier responsabilidad derivada del uso indebido de los manuales o de los daños directos
            o indirectos que pudieran ocasionarse como consecuencia del incumplimiento de estos Términos y Condiciones por parte del usuario.
            La descarga y el uso de los manuales se realizan bajo su exclusivo riesgo.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
            <strong>5. Restricciones de Distribución</strong><br />
            El usuario se compromete a utilizar los manuales únicamente para fines de consulta y capacitación interna.
            Queda prohibida la redistribución, publicación o venta de los manuales sin contar con la autorización expresa y por escrito de CASUNI S.A. de C.V.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
            <strong>6. Modificaciones</strong><br />
            CASUNI S.A. de C.V. se reserva el derecho de modificar, actualizar o reemplazar estos Términos y Condiciones en cualquier momento.
            Se recomienda a los usuarios revisar periódicamente esta sección para estar informados de las posibles actualizaciones.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
            <strong>7. Terminación del Acceso</strong><br />
            El incumplimiento de cualquiera de los términos aquí establecidos podrá dar lugar a la suspensión o cancelación inmediata
            del acceso a la descarga de manuales, sin derecho a reclamo o indemnización alguna por parte del usuario.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
            <strong>8. Ley Aplicable y Jurisdicción</strong><br />
            Estos Términos y Condiciones se regirán e interpretarán conforme a las leyes vigentes en [País/Estado].
            Cualquier controversia que surja en relación con estos términos se someterá a la jurisdicción de los tribunales competentes
            de [Ciudad/Estado], renunciando expresamente a cualquier otro fuero que pudiera corresponder.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
            <em>
              Al proceder con la descarga, usted reconoce haber leído, comprendido y aceptado íntegra y voluntariamente estos
              Términos y Condiciones.
            </em>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTermsDialog} variant="contained" color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChangePassword;

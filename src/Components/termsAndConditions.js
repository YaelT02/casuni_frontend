import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          TÉRMINOS Y CONDICIONES DE DESCARGA DE MANUALES
        </Typography>

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

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
            Aceptar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;

import React from 'react';
import { Box, Typography } from '@mui/material';

function About() {
    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>Acerca de</Typography>
            <Typography variant="body1"><strong>Nombre:</strong> Edwin Guerrero Cortez</Typography>
            <Typography variant="body1"><strong>Matrícula:</strong> 20221030</Typography>
            <Typography variant="body1"><strong>Cuatrimestre:</strong> 7° B</Typography>
            <Typography variant="body1"><strong>Carrera:</strong> Ingeniería en Desarrollo y Gestión de Software</Typography>
            <Typography variant="body1"><strong>Docente:</strong> Ing. Ana María Felipe Redondo</Typography>
        </Box>
    );
}

export default About;

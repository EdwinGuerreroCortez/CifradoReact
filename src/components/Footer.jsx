import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box 
            component="footer" 
            sx={{ 
                width: '100%', 
                padding: { xs: 2, sm: 3 },  // Ajuste de padding para pantallas pequeñas y medianas
                textAlign: 'center', 
                backgroundColor: '#f0f0f0', 
                borderTop: '1px solid #ddd',
                marginTop: 'auto',
                fontSize: { xs: '0.75rem', sm: '0.875rem' } // Tamaño de texto responsivo
            }}
        >
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                © 2024 Cifrados. Todos los derechos reservados.
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                20221030 Edwin Guerrero Cortez, 20221018 Adair Hernández Escobar - Ingeniería en Desarrollo y Gestión de Software - 7° "B"
            </Typography>
        </Box>
    );
}

export default Footer;

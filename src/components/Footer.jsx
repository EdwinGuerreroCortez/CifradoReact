import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box 
            component="footer" 
            sx={{ 
                width: '100%', 
                padding: 2, 
                textAlign: 'center', 
                backgroundColor: '#f0f0f0', 
                borderTop: '1px solid #ddd',
                marginTop: 'auto' // Para que el pie de página se quede al final
            }}
        >
            <Typography variant="body2">
                © 2024 Cifrados. Todos los derechos reservados.
            </Typography>
            <Typography variant="body2">
                Edwin Guerrero Cortez - Ingeniería en Desarrollo y Gestión de Software - 7° "B"
            </Typography>
        </Box>
    );
}

export default Footer;

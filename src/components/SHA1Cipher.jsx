import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Alert from '@mui/material/Alert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Bar } from 'react-chartjs-2';

// Importar los componentes necesarios de Chart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Registrar los componentes para que puedan ser utilizados
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SHA1Cipher() {
    const [message, setMessage] = useState('');
    const [result, setResult] = useState(''); // Para mostrar el hash generado
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [error, setError] = useState('');
    const [helpOpen, setHelpOpen] = useState(false);
    const [expanded, setExpanded] = useState(false); // Control para los acordeones

    // Datos para el gráfico de SHA-1
    const data = {
        labels: ['Rendimiento', 'Facilidad de Implementación'],
        datasets: [
            {
                label: 'Cifrado SHA-1',
                data: [7, 6], // Asignamos valores de ejemplo
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }
        ],
    };

    // Opciones para el gráfico
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Rendimiento y Facilidad de Implementación del Cifrado SHA-1',
            },
        },
    };

    // Función para convertir un array buffer a string hexadecimal
    const bufferToHex = (buffer) => {
        return [...new Uint8Array(buffer)]
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
    };

    // Función para generar el hash SHA-1
    const generateSHA1 = async (message) => {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(message);
            const hashBuffer = await crypto.subtle.digest('SHA-1', data); // Hash SHA-1
            const hashHex = bufferToHex(hashBuffer); // Convertir el hash a formato hexadecimal
            setResult(hashHex);
            setError(''); // Limpiar errores si los había
        } catch (err) {
            setError('Error al generar el hash.');
        }
    };

    const handleGenerateHash = () => {
        if (!message) {
            setError('Por favor, ingrese un mensaje válido.');
            return;
        }
        generateSHA1(message);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result).then(() => {
            setNotificationVisible(true);
        });
    };

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false); // Controlar la apertura y cierre de acordeones
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, position: 'relative' }}>
            {/* Botón de ayuda flotante en la esquina superior izquierda del formulario */}
            <ClickAwayListener onClickAway={() => setHelpOpen(false)}>
                <div>
                    <IconButton
                        onClick={() => setHelpOpen(!helpOpen)}
                        sx={{ position: 'absolute', top: 10, left: 10 }}
                        color="primary"
                    >
                        <HelpOutlineIcon />
                    </IconButton>

                    {helpOpen && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 50,
                                left: 10,
                                backgroundColor: 'white',
                                padding: 2,
                                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                                zIndex: 10,
                                borderRadius: '4px',
                                maxWidth: 300,
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                ¿Cómo usar el formulario?
                            </Typography>
                            <Typography variant="body2">
                                1. Introduzca el mensaje que desea cifrar en el campo "Mensaje".<br />
                                2. Haga clic en "Generar SHA-1" para obtener el resultado del hash.<br />
                                3. Puede copiar el resultado utilizando el ícono de copiar.
                            </Typography>
                        </Box>
                    )}
                </div>
            </ClickAwayListener>

            {/* Cuadro del formulario */}
            <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 3, marginBottom: 4 }}>
                <Typography variant="h4" gutterBottom>Generador de SHA-1</Typography>

                <TextField
                    label="Mensaje"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenerateHash}
                    sx={{ marginTop: 2 }}
                >
                    Generar SHA-1
                </Button>

                <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                    Resultado:
                </Typography>

                {/* Caja de resultado con control de overflow */}
                <Box sx={{
                    padding: 1,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    maxHeight: 150, // Limitar la altura del resultado
                    overflowY: 'auto', // Hacer scroll si el contenido es demasiado largo
                    wordWrap: 'break-word', // Romper palabras largas
                    whiteSpace: 'pre-wrap', // Respetar saltos de línea
                    border: '1px solid #ddd',
                    marginBottom: 2
                }}>
                    {result}
                </Box>

                {result && (
                    <IconButton color="primary" onClick={handleCopy}>
                        <ContentCopyIcon /> Copiar
                    </IconButton>
                )}
            </Box>

            {/* Mostrar la alerta de éxito o error */}
            <Snackbar
                open={notificationVisible}
                autoHideDuration={2000}
                onClose={() => setNotificationVisible(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setNotificationVisible(false)} severity="success" sx={{ width: '100%' }}>
                    Resultado copiado al portapapeles
                </Alert>
            </Snackbar>

            {error && (
                <Snackbar
                    open={!!error}
                    autoHideDuration={2000}
                    onClose={() => setError('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            )}

            {/* Acordeón desplegable para el gráfico */}
            <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Ver gráfico de Rendimiento y Facilidad</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6" gutterBottom>Rendimiento y Facilidad del SHA-1</Typography>
                        <Bar data={data} options={options} />
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* Acordeones de información fuera del cuadro de formulario */}
            <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>¿Qué es el Cifrado SHA-1?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    El SHA-1 (Secure Hash Algorithm 1) es una función de hash criptográfica que toma un mensaje y genera un valor hash de 160 bits (20 bytes).                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>¿Cómo funciona SHA-1?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    SHA-1 toma como entrada un mensaje de longitud variable y lo procesa en bloques de 512 bits, generando un hash único de 160 bits.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default SHA1Cipher;

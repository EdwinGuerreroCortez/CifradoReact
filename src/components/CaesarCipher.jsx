import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function CaesarCipher() {
    const [message, setMessage] = useState('');
    const [shift, setShift] = useState('');
    const [result, setResult] = useState('');
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [helpOpen, setHelpOpen] = useState(false);
    const [expanded, setExpanded] = useState(false); // Control de acordeones

    // Datos para el gráfico de Cifrado César
    const data = {
        labels: ['Rendimiento', 'Facilidad de Implementación'],
        datasets: [
            {
                label: 'Cifrado César',
                data: [10, 10], // Asignamos valores al rendimiento y facilidad de implementación
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }
        ],
    };

    // Opciones para el gráfico de barras
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Rendimiento y Facilidad de Implementación del Cifrado César',
            },
        },
    };

    const validateFields = () => {
        if (!message) {
            setErrorMessage('El campo de mensaje no puede estar vacío.');
            setErrorVisible(true);
            return false;
        }
        if (!shift) {
            setErrorMessage('Debe especificar un número de desplazamiento.');
            setErrorVisible(true);
            return false;
        }
        return true;
    };

    const handleEncrypt = () => {
        if (!validateFields()) return;

        const encrypted = message
            .split('')
            .map(char => {
                if (char >= 'A' && char <= 'Z') {
                    return String.fromCharCode((char.charCodeAt(0) + parseInt(shift) - 65) % 26 + 65);
                }
                return char;
            })
            .join('');
        setResult(encrypted);
    };

    const handleDecrypt = () => {
        if (!validateFields()) return;

        const decrypted = message
            .split('')
            .map(char => {
                if (char >= 'A' && char <= 'Z') {
                    return String.fromCharCode((char.charCodeAt(0) - parseInt(shift) - 65 + 26) % 26 + 65);
                }
                return char;
            })
            .join('');
        setResult(decrypted);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result).then(() => {
            setNotificationVisible(true);
        });
    };

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, position: 'relative' }}>
            
            {/* Alerta de éxito (resultado copiado al portapapeles) con Alert dentro de Snackbar */}
            <Snackbar
                open={notificationVisible}
                autoHideDuration={1000}
                onClose={() => setNotificationVisible(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setNotificationVisible(false)}>
                    Resultado copiado al portapapeles.
                </Alert>
            </Snackbar>

            {/* Alerta de error (validación de campos) con Alert dentro de Snackbar */}
            <Snackbar
                open={errorVisible}
                autoHideDuration={1000}
                onClose={() => setErrorVisible(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" onClose={() => setErrorVisible(false)}>
                    {errorMessage}
                </Alert>
            </Snackbar>

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
                                1. Introduzca el mensaje que desea cifrar o descifrar en el campo "Mensaje".<br />
                                2. Especifique el número de desplazamiento que desea utilizar para el cifrado en el campo "Desplazamiento".<br />
                                3. Haga clic en "Cifrar" para codificar el mensaje o "Descifrar" para recuperar el mensaje original.
                            </Typography>
                        </Box>
                    )}
                </div>
            </ClickAwayListener>

            {/* Cuadro del formulario */}
            <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 3, marginBottom: 4 }}>
                <Typography variant="h4" gutterBottom>Cifrado César</Typography>

                <TextField
                    label="Mensaje"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={message}
                    onChange={(e) => setMessage(e.target.value.toUpperCase())}
                />

                <TextField
                    label="Desplazamiento"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleEncrypt}>
                        Cifrar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDecrypt}>
                        Descifrar
                    </Button>
                </Box>

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

            {/* Acordeón desplegable para el gráfico */}
            <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Ver gráfico de Rendimiento y Facilidad</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6" gutterBottom>Rendimiento y Facilidad del Cifrado César</Typography>
                        <Bar data={data} options={options} />
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* Acordeones de información fuera del cuadro de formulario */}
            <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>¿Qué es el Cifrado César?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        El Cifrado César es una técnica de cifrado antigua que consiste en desplazar cada letra del alfabeto un número fijo de posiciones. 
                        Es uno de los cifrados más sencillos y fue usado por Julio César para proteger sus mensajes.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>¿Cómo se codifica y descifra?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <strong>Codificación:</strong><br />
                        - Cada letra del mensaje se desplaza un número fijo de posiciones en el alfabeto.<br />
                        <strong>Descifrado:</strong><br />
                        - Se realiza el desplazamiento inverso para recuperar el mensaje original.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default CaesarCipher;

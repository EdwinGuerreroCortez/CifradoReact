import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function ScytaleCipher() {
    const [message, setMessage] = useState('');
    const [columns, setColumns] = useState(0);
    const [result, setResult] = useState('');
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [error, setError] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const [expanded, setExpanded] = useState(false); // Control de acordeones

    // Datos para el gráfico de Cifrado Escítala
    const data = {
        labels: ['Rendimiento', 'Facilidad de Implementación'],
        datasets: [
            {
                label: 'Cifrado Escítala',
                data: [7, 6], // Asignamos valores al rendimiento y facilidad de implementación
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
                text: 'Rendimiento y Facilidad de Implementación del Cifrado Escítala',
            },
        },
    };

    const handleEncrypt = () => {
        if (!message || columns <= 0) {
            setError('Por favor, ingrese un mensaje y el número correcto de columnas.');
            setErrorVisible(true);
            setTimeout(() => {
                setErrorVisible(false);
            }, 2000);
            return;
        }
        setError('');
        setErrorVisible(false);

        let encrypted = '';
        const cleanMessage = message.replace(/\s+/g, '');

        for (let i = 0; i < columns; i++) {
            for (let j = i; j < cleanMessage.length; j += columns) {
                encrypted += cleanMessage[j];
            }
        }

        setResult(encrypted);
    };

    const handleDecrypt = () => {
        if (!message || columns <= 0) {
            setError('Por favor, ingrese un mensaje y el número correcto de columnas.');
            setErrorVisible(true);
            setTimeout(() => {
                setErrorVisible(false);
            }, 2000);
            return;
        }
        setError('');
        setErrorVisible(false);

        let decrypted = new Array(message.length).fill('');
        let position = 0;

        for (let i = 0; i < columns; i++) {
            for (let j = i; j < message.length && position < message.length; j += columns) {
                decrypted[j] = message[position];
                position++;
            }
        }

        setResult(decrypted.join(''));
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
                                1. Introduzca el mensaje que desea cifrar o descifrar en el campo "Mensaje".<br />
                                2. Especifique el número de columnas que desea utilizar para el cifrado en el campo "Número de columnas".<br />
                                3. Haga clic en "Cifrar" para codificar el mensaje o "Descifrar" para recuperar el mensaje original.
                            </Typography>
                        </Box>
                    )}
                </div>
            </ClickAwayListener>

            {/* Cuadro del formulario */}
            <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 3, marginBottom: 4 }}>
                <Typography variant="h4" gutterBottom>Cifrado Escítala</Typography>

                <TextField
                    label="Mensaje"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <TextField
                    label="Número de columnas"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={columns}
                    onChange={(e) => setColumns(Number(e.target.value))}
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

            <Snackbar
                open={errorVisible}
                autoHideDuration={2000}
                onClose={() => setErrorVisible(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setErrorVisible(false)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

            {/* Acordeón desplegable para el gráfico */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Ver gráfico de Rendimiento y Facilidad</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6" gutterBottom>Rendimiento y Facilidad del Cifrado Escítala</Typography>
                        <Bar data={data} options={options} />
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* Acordeones de información fuera del cuadro de formulario */}
            <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>¿Qué es el Cifrado Escítala?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        El Cifrado Escítala es una técnica de cifrado antiguo que utiliza una vara cilíndrica y una tira de cuero para organizar el mensaje. 
                        El mensaje se escribe en filas y se codifica al leerlo en columnas. 
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>¿Cómo se codifica y descifra?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <strong>Codificación:</strong><br />
                        - Dividir el mensaje en columnas.<br />
                        - Leer las letras verticalmente para obtener el mensaje cifrado.<br /><br />
                        <strong>Descifrado:</strong><br />
                        - Colocar el mensaje cifrado en columnas.<br />
                        - Leer horizontalmente para recuperar el mensaje original.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default ScytaleCipher;

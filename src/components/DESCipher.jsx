import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Alert from '@mui/material/Alert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Bar } from 'react-chartjs-2';
import CryptoJS from 'crypto-js';

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

function DESCipher() {
    const [message, setMessage] = useState('');
    const [key, setKey] = useState('');
    const [result, setResult] = useState(''); // Para mostrar el resultado cifrado o descifrado
    const [encryptedMessage, setEncryptedMessage] = useState(''); // Guardar el mensaje cifrado original
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [error, setError] = useState('');
    const [helpOpen, setHelpOpen] = useState(false);
    const [expanded, setExpanded] = useState(false); // Control para los acordeones

    // Datos para el gráfico de Cifrado DES
    const data = {
        labels: ['Rendimiento', 'Facilidad de Implementación'],
        datasets: [
            {
                label: 'Cifrado DES',
                data: [7, 5], // Asignamos valores de ejemplo
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
                text: 'Rendimiento y Facilidad de Implementación del Cifrado DES',
            },
        },
    };

    const handleEncrypt = () => {
        if (!message || !key) {
            setError('Por favor, ingrese un mensaje y una clave válida.');
            return;
        }

        try {
            const encrypted = CryptoJS.DES.encrypt(message, key).toString();
            setEncryptedMessage(encrypted); // Guardar el mensaje cifrado
            setResult(encrypted); // Mostrar el resultado cifrado
            setError(''); // Limpiar cualquier mensaje de error
        } catch (e) {
            setError('Error al cifrar el mensaje.');
        }
    };

    const handleDecrypt = () => {
        if (!encryptedMessage || !key) {
            setError('Por favor, ingrese la clave correcta para descifrar.');
            return;
        }

        try {
            const decrypted = CryptoJS.DES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8);

            if (!decrypted) {
                throw new Error('Clave incorrecta o mensaje no válido.');
            }

            setResult(decrypted); // Mostrar el mensaje descifrado
            setError(''); // Limpiar cualquier mensaje de error si es correcto
        } catch (error) {
            setError('Clave incorrecta o mensaje no válido.');
            setResult(''); // Vaciar el resultado si la clave es incorrecta
        }
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
                                2. Especifique la clave para cifrar o descifrar en el campo "Clave Secreta".<br />
                                3. Haga clic en "Cifrar" o "Descifrar" para obtener el resultado.
                            </Typography>
                        </Box>
                    )}
                </div>
            </ClickAwayListener>

            {/* Cuadro del formulario */}
            <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 3, marginBottom: 4 }}>
                <Typography variant="h4" gutterBottom>Cifrado DES</Typography>

                <TextField
                    label="Mensaje"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <TextField
                    label="Clave Secreta"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
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
                        <Typography variant="h6" gutterBottom>Rendimiento y Facilidad del Cifrado DES</Typography>
                        <Bar data={data} options={options} />
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* Acordeones de información fuera del cuadro de formulario */}
            <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>¿Qué es el Cifrado DES?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        El Cifrado DES (Data Encryption Standard) es un algoritmo de cifrado simétrico que utiliza una clave para cifrar y descifrar los datos.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>¿Cómo funciona el Cifrado DES?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        El Cifrado DES divide el mensaje en bloques de 64 bits y aplica la clave para transformar los datos de manera compleja en varias rondas de cifrado.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default DESCipher;

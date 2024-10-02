import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, IconButton, Accordion, AccordionSummary, AccordionDetails, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DSASignature = () => {
  const [messageToSign, setMessageToSign] = useState(''); // Mensaje para firmar
  const [messageToVerify, setMessageToVerify] = useState(''); // Mensaje para verificar
  const [publicKey, setPublicKey] = useState(''); // Clave pública en formato PEM
  const [privateKey, setPrivateKey] = useState(''); // Clave privada en formato PEM
  const [inputPrivateKey, setInputPrivateKey] = useState(''); // Clave privada manual
  const [inputPublicKey, setInputPublicKey] = useState('');   // Clave pública manual
  const [signature, setSignature] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [error, setError] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); // Control para los acordeones

  // Datos para el gráfico de Rendimiento y Facilidad
  const data = {
    labels: ['Rendimiento', 'Facilidad de Implementación'],
    datasets: [
      {
        label: 'DSA',
        data: [4, 5], // Valores de ejemplo para DSA
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ],
  };

  // Opciones para el gráfico
  const options = {
    responsive: true, // Asegura que el gráfico se ajuste dinámicamente
    maintainAspectRatio: false, // Para manejar manualmente la proporción del gráfico
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Rendimiento y Facilidad de Implementación del DSA' },
    },
  };


  // Generar claves DSA en el frontend usando SubtleCrypto
  const generateKeys = async () => {
    try {
      const keyPair = await window.crypto.subtle.generateKey({
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: { name: 'SHA-256' },
      }, true, ['sign', 'verify']);

      const exportedPublicKey = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
      const exportedPrivateKey = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

      // Convertir claves a formato PEM
      const publicKeyPem = convertToPem(exportedPublicKey, 'PUBLIC KEY');
      const privateKeyPem = convertToPem(exportedPrivateKey, 'PRIVATE KEY');

      setPublicKey(publicKeyPem);
      setPrivateKey(privateKeyPem);
      setError('');
    } catch (error) {
      setError('Error al generar las claves');
    }
  };

  // Firmar mensaje
  const signMessage = async () => {
    if (!messageToSign || !inputPrivateKey) {
      setError('Por favor, ingrese un mensaje y una clave privada válida.');
      return;
    }

    try {
      const key = await importPrivateKey(inputPrivateKey);
      const enc = new TextEncoder();
      const signature = await window.crypto.subtle.sign(
        { name: 'RSASSA-PKCS1-v1_5' },
        key,
        enc.encode(messageToSign)
      );
      setSignature(arrayBufferToHex(signature));
      setError('');
    } catch (error) {
      setError('Error al firmar el mensaje');
    }
  };

  // Verificar firma
  const verifySignature = async () => {
    if (!messageToVerify || !inputPublicKey || !signature) {
      setError('Por favor, ingrese el mensaje, la firma y una clave pública válida.');
      return;
    }

    try {
      const key = await importPublicKey(inputPublicKey);
      const enc = new TextEncoder();
      const valid = await window.crypto.subtle.verify(
        { name: 'RSASSA-PKCS1-v1_5' },
        key,
        hexToArrayBuffer(signature),
        enc.encode(messageToVerify)
      );
      setIsValid(valid);
      setError('');
    } catch (error) {
      setError('Error al verificar la firma');
    }
  };

  // Función para copiar texto al portapapeles
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setNotificationVisible(true);
  };

  // Convertir ArrayBuffer a formato PEM
  const convertToPem = (buffer, label) => {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    const pemString = `-----BEGIN ${label}-----\n${base64.match(/.{1,64}/g).join('\n')}\n-----END ${label}-----`;
    return pemString;
  };

  // Importar clave privada desde PEM
  const importPrivateKey = async (pem) => {
    const binaryDerString = window.atob(pem.split('\n').filter(line => line && !line.startsWith('-----')).join(''));
    const binaryDer = new Uint8Array([...binaryDerString].map(char => char.charCodeAt(0)));
    return window.crypto.subtle.importKey(
      'pkcs8',
      binaryDer,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      true,
      ['sign']
    );
  };

  // Importar clave pública desde PEM
  const importPublicKey = async (pem) => {
    const binaryDerString = window.atob(pem.split('\n').filter(line => line && !line.startsWith('-----')).join(''));
    const binaryDer = new Uint8Array([...binaryDerString].map(char => char.charCodeAt(0)));
    return window.crypto.subtle.importKey(
      'spki',
      binaryDer,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      true,
      ['verify']
    );
  };

  // Convertir ArrayBuffer a hexadecimal
  const arrayBufferToHex = (buffer) => {
    return [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  // Convertir hexadecimal a ArrayBuffer
  const hexToArrayBuffer = (hex) => {
    return new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))).buffer;
  };

  // Control del acordeón
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto', padding: 2, position: 'relative' }}>
      <Typography variant="h4" gutterBottom>Firma Digital DSA</Typography>

      {/* Formulario de tres columnas */}
      <Grid container spacing={2}>
        {/* Columna Izquierda: Generar Claves */}
        <Grid item xs={12} md={4}>
          <Box sx={{ border: '1px solid #ccc', padding: 3, minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            {/* Icono de ayuda en la parte superior izquierda de "Generar Claves" */}
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
                      1. En la columna "Firmar Mensaje", ingrese el mensaje y la clave privada para generar una firma.<br />
                      2. En la columna "Verificar Firma", ingrese el mensaje, la firma generada y la clave pública para verificar la firma.
                    </Typography>
                  </Box>
                )}
              </div>
            </ClickAwayListener>

            <Typography variant="h5">Generar Claves</Typography>

            <Box sx={{ marginTop: 3 }}>
              {publicKey && (
                <>
                  <Typography variant="h6" sx={{ marginTop: 2 }}>Clave Pública:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ wordWrap: 'break-word', maxWidth: '75%' }}>
                      {publicKey.slice(0, 30)}...
                    </Typography>
                    <IconButton onClick={() => copyToClipboard(publicKey)} aria-label="copy">
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </>
              )}

              {privateKey && (
                <>
                  <Typography variant="h6" sx={{ marginTop: 2 }}>Clave Privada:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ wordWrap: 'break-word', maxWidth: '75%' }}>
                      {privateKey.slice(0, 30)}...
                    </Typography>
                    <IconButton onClick={() => copyToClipboard(privateKey)} aria-label="copy">
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </>
              )}
            </Box>
            <Button variant="contained" color="primary" onClick={generateKeys} sx={{ marginTop: 2 }}>
              Generar Claves DSA
            </Button>
          </Box>
        </Grid>

        {/* Columna del Medio: Firmar Mensaje */}
        <Grid item xs={12} md={4}>
          <Box sx={{ border: '1px solid #ccc', padding: 3, minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h5">Firmar Mensaje</Typography>
            <TextField
              label="Mensaje a Firmar"
              variant="outlined"
              fullWidth
              margin="normal"
              value={messageToSign}
              onChange={(e) => setMessageToSign(e.target.value)}
            />
            <TextField
              label="Clave Privada"
              variant="outlined"
              fullWidth
              margin="normal"
              value={inputPrivateKey}
              onChange={(e) => setInputPrivateKey(e.target.value)}
              multiline
              rows={4}
            />

            <Box sx={{ marginTop: 2, minHeight: '80px' }}>
              {signature && (
                <>
                  <Typography variant="h6" sx={{ marginTop: 2 }}>Firma Generada:</Typography>
                  <Typography variant="body2" sx={{ wordWrap: 'break-word' }}>{signature.slice(0, 30)}...</Typography>
                </>
              )}
            </Box>
            <Button variant="contained" color="primary" onClick={signMessage}>
              Firmar Mensaje
            </Button>
          </Box>
        </Grid>

        {/* Columna Derecha: Verificar Firma */}
        <Grid item xs={12} md={4}>
          <Box sx={{ border: '1px solid #ccc', padding: 3, minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h5">Verificar Firma</Typography>
            <TextField
              label="Mensaje a Verificar"
              variant="outlined"
              fullWidth
              margin="normal"
              value={messageToVerify}
              onChange={(e) => setMessageToVerify(e.target.value)}
            />
            <TextField
              label="Clave Pública"
              variant="outlined"
              fullWidth
              margin="normal"
              value={inputPublicKey}
              onChange={(e) => setInputPublicKey(e.target.value)}
              multiline
              rows={4}
            />

            <Box sx={{ marginTop: 2, minHeight: '80px' }}>
              {isValid !== null && (
                <Typography variant="h6" color={isValid ? 'green' : 'red'} sx={{ marginTop: 2 }}>
                  {isValid ? 'Firma válida' : 'Firma no válida'}
                </Typography>
              )}
            </Box>
            <Button variant="contained" color="secondary" onClick={verifySignature}>
              Verificar Firma
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Acordeón para mostrar el gráfico */}
      <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Ver gráfico de Rendimiento y Facilidad</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: '100%', height: { xs: '300px', sm: '400px', md: '500px' }, maxWidth: '100%' }}>
            <Typography variant="h6" gutterBottom>Rendimiento y Facilidad del DSA</Typography>
            <Bar data={data} options={options} />
          </Box>
        </AccordionDetails>

      </Accordion>

      {/* Acordeones para información adicional */}
      <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>¿Qué es el DSA?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          El DSA (Algoritmo de Firma Digital) es un estándar de firma digital basado en criptografía asimétrica.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>¿Cómo funciona el DSA?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          El DSA utiliza dos claves: una clave privada para firmar y una clave pública para verificar. La clave privada genera una firma digital única para un mensaje, mientras que la clave pública permite verificar esa firma.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={notificationVisible}
        autoHideDuration={2000}
        message="Resultado copiado al portapapeles"
        onClose={() => setNotificationVisible(false)}
      />

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
    </Box>
  );
};

export default DSASignature;

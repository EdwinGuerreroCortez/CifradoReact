import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CaesarCipher from './components/CaesarCipher';
import ScytaleCipher from './components/ScytaleCipher';
import DESCipher from './components/DESCipher';  // Importar DESCipher
import RSASignature from './components/DSASignature';
import SHA1Cipher from './components/SHA1Cipher';
import About from './components/About';
import LayoutEncabezado from './components/LayoutEncabezado';

function App() {
  return (
    <Router>
      <LayoutEncabezado>
        <Routes>
        <Route path="/" element={<CaesarCipher />} />
          <Route path="/caesar" element={<CaesarCipher />} />
          <Route path="/scytale" element={<ScytaleCipher />} />
          <Route path="/des" element={<DESCipher />} />
          <Route path="/rsa-signature" element={<RSASignature />} />
          <Route path="/sha1" element={<SHA1Cipher />} /> {/* Añadir la ruta de SHA-1 */}
          <Route path="/about" element={<About />} />
        </Routes>
      </LayoutEncabezado>
    </Router>
  );
}

export default App;

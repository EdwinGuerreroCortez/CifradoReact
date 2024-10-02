import React from 'react';
import CaesarCipher from './CaesarCipher'; // Importa desde la misma carpeta
import ScytaleCipher from './ScytaleCipher'; // Importa desde la misma carpeta
import About from './About'; // Importa desde la misma carpeta

function EncryptionMethods() {
    return (
        <div className="container">
            <h1 className="title is-2">Métodos de Cifrado</h1>
            <h2 className="subtitle is-3">Cifrado por método de desplazamiento y transposición</h2>

            <div className="columns">
                <div className="column">
                    <CaesarCipher />
                </div>
                <div className="column">
                    <ScytaleCipher />
                </div>
            </div>

            <About />
        </div>
    );
}

export default EncryptionMethods;

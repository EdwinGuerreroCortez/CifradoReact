import React from 'react';
import BarraNav from './BarraNav'; // Componente de navegación
import Footer from './Footer';     // Componente de pie de página

const LayoutEncabezado = ({ children }) => {
  return (
    <div className="layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ zIndex: 1000 }}>
        <BarraNav />
      </header>
      <main className="main-content" style={{ flexGrow: 1, paddingTop: '64px' }}>
        {/* paddingTop asegura que el contenido no esté cubierto por la barra de navegación */}
        {children} 
      </main>
      <footer style={{ zIndex: 999 }}>
        <Footer />
      </footer>
    </div>
  );
};

export default LayoutEncabezado;

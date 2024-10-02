import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const BarraNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClick = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#1e88e5', padding: '0.5rem 1rem', zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" component="div" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
              Cifrados Pro
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuClick}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMoreAnchorEl}
                open={Boolean(mobileMoreAnchorEl)}
                onClose={handleMobileMenuClose}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: '#f5f5f5',
                    width: '200px',
                    position: 'fixed', // Cambiar a "fixed" para que el menú sea fijo sobre el contenido
                    top: '50px', // Ajusta la distancia desde la parte superior para que no se solape con la barra de navegación
                    right: '0', // Alinearlo a la derecha
                    zIndex: theme.zIndex.modal + 1, // Asegura que esté sobre el contenido
                  },
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleMobileMenuClose} component={Link} to="/caesar">
                  Cifrado César
                </MenuItem>
                <MenuItem onClick={handleMobileMenuClose} component={Link} to="/scytale">
                  Cifrado Escítala
                </MenuItem>
                <MenuItem onClick={handleMobileMenuClose} component={Link} to="/des">
                  Cifrado DES
                </MenuItem>
                <MenuItem onClick={handleMobileMenuClose} component={Link} to="/sha1">
                  Cifrado SHA-1
                </MenuItem>
                <MenuItem onClick={handleMobileMenuClose} component={Link} to="/rsa-signature">
                  Firma Digital DSA
                </MenuItem>
                <MenuItem onClick={handleMobileMenuClose} component={Link} to="/about">
                  <InfoIcon sx={{ marginRight: '0.5rem' }} /> Acerca de
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={handleMenuClick}
                endIcon={<ArrowDropDownIcon />}
                sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 'bold' }}
              >
                <LockIcon sx={{ marginRight: '0.5rem' }} /> Cifrados
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
                    position: 'absolute', // Mantiene el menú flotante sobre el contenido
                    zIndex: theme.zIndex.modal, // Asegura que el menú esté sobre el contenido
                  },
                }}
              >
                <MenuItem onClick={handleClose} component={Link} to="/caesar">
                  Cifrado César
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/scytale">
                  Cifrado Escítala
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/des">
                  Cifrado DES
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/sha1">
                  Cifrado SHA-1
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/rsa-signature">
                  Firma Digital DSA
                </MenuItem>
              </Menu>

              <Button
                color="inherit"
                component={Link}
                to="/about"
                startIcon={<InfoIcon />}
                sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 'bold', marginLeft: '1rem' }}
              >
                Acerca de
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* Añade un espacio para el contenido para que no sea cubierto por la AppBar en modo fijo */}
      <Toolbar />
    </>
  );
};

export default BarraNav;

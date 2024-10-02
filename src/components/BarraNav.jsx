import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const BarraNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
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
                onClick={toggleDrawer(true)}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    <ListItem button component={Link} to="/caesar">
                      <ListItemText primary="Cifrado César" />
                    </ListItem>
                    <ListItem button component={Link} to="/scytale">
                      <ListItemText primary="Cifrado Escítala" />
                    </ListItem>
                    <ListItem button component={Link} to="/des">
                      <ListItemText primary="Cifrado DES" />
                    </ListItem>
                    <ListItem button component={Link} to="/sha1">
                      <ListItemText primary="Cifrado SHA-1" />
                    </ListItem>
                    <ListItem button component={Link} to="/rsa-signature">
                      <ListItemText primary="Firma Digital DSA" />
                    </ListItem>
                    <ListItem button component={Link} to="/about">
                      <InfoIcon sx={{ marginRight: '0.5rem' }} /> 
                      <ListItemText primary="Acerca de" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
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
                    position: 'absolute',
                    zIndex: theme.zIndex.modal,
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
      <Toolbar />
    </>
  );
};

export default BarraNav;

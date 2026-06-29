import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Fab } from '@mui/material';

export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#FFF8F0' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <Fab 
        color="success" 
        aria-label="whatsapp"
        onClick={() => window.open('https://wa.me/919825184531', '_blank')}
        sx={{
          position: 'fixed',
          bottom: { xs: 24, md: 40 },
          right: { xs: 24, md: 40 },
          bgcolor: '#25D366',
          color: 'white',
          '&:hover': { bgcolor: '#128C7E' },
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)'
        }}
      >
        <WhatsAppIcon fontSize="large" />
      </Fab>
    </Box>
  );
}

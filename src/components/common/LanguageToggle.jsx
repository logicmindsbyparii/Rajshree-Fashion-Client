import React from 'react';
import { Stack, Button } from '@mui/material';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
};

export default function LanguageToggle({ 
  insideDrawer = false, 
  scrolled = false, 
  isHomePage = false,
  isAdminPage = false 
}) {
  const currentTrans = getCookie('googtrans');
  const isHiActive = currentTrans.includes('/hi');
  const isEnActive = !isHiActive;

  const toggleLanguage = (lng) => {
    if ((lng === 'hi' && isHiActive) || (lng === 'en' && isEnActive)) return;
    
    if (lng === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    } else {
      document.cookie = `googtrans=/en/${lng}; path=/`;
      document.cookie = `googtrans=/en/${lng}; domain=${window.location.hostname}; path=/`;
    }
    window.location.reload();
  };

  // Theme color logic configuration
  // For Admin Page, we want a fixed visible color
  let defaultColor, activeBgColor, activeTextColor;

  if (isAdminPage) {
    defaultColor = '#5A6E65';
    activeBgColor = '#0A1E14';
    activeTextColor = '#FFF';
  } else {
    defaultColor = (scrolled || !isHomePage || insideDrawer) ? '#5A6E65' : 'rgba(255,248,240,0.6)';
    activeBgColor = (scrolled || !isHomePage || insideDrawer) ? '#0A1E14' : '#D4B26F';
    activeTextColor = (scrolled || !isHomePage || insideDrawer) ? '#FFF' : '#0A1E14';
  }

  let borderColor;
  if (isAdminPage) {
    borderColor = 'rgba(10,30,20,0.15)';
  } else {
    borderColor = (scrolled || !isHomePage || insideDrawer) ? 'rgba(10,30,20,0.15)' : 'rgba(255,248,240,0.2)';
  }

  return (
    <Stack 
      direction="row" 
      spacing={0.5} 
      alignItems="center"
      sx={{ 
        border: `1px solid ${borderColor}`,
        p: 0.5,
        mx: insideDrawer ? 3 : 1,
        mb: insideDrawer ? 2 : 0,
        bgcolor: insideDrawer ? '#FFF' : 'transparent'
      }}
    >
      <Button
        size="small"
        onClick={() => toggleLanguage('en')}
        sx={{
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          minWidth: 32,
          py: 0.5,
          px: 1,
          borderRadius: 0,
          color: isEnActive ? activeTextColor : defaultColor,
          bgcolor: isEnActive ? activeBgColor : 'transparent',
          '&:hover': { bgcolor: isEnActive ? activeBgColor : 'rgba(0,0,0,0.03)' }
        }}
      >
        EN
      </Button>
      <Button
        size="small"
        onClick={() => toggleLanguage('hi')}
        sx={{
          fontSize: '0.6rem',
          fontWeight: 600,
          minWidth: 40,
          py: 0.5,
          px: 1,
          borderRadius: 0,
          color: isHiActive ? activeTextColor : defaultColor,
          bgcolor: isHiActive ? activeBgColor : 'transparent',
          '&:hover': { bgcolor: isHiActive ? activeBgColor : 'rgba(0,0,0,0.03)' }
        }}
      >
        हिंदी
      </Button>
    </Stack>
  );
}

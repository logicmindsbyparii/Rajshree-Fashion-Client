import React, { useState } from 'react';
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
  const [activeLang, setActiveLang] = useState(currentTrans.includes('/hi') ? 'hi' : 'en');
  
  const isHiActive = activeLang === 'hi';
  const isEnActive = activeLang === 'en';

  const toggleLanguage = (lng) => {
    if (activeLang === lng) return;
    
    // Optimistic UI update
    setActiveLang(lng);
    
    // Set cookies for Google Translate manually
    const domain = window.location.hostname;
    if (lng === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${domain}; path=/;`;
    } else {
      document.cookie = `googtrans=/en/${lng}; path=/`;
      document.cookie = `googtrans=/en/${lng}; domain=${domain}; path=/`;
      document.cookie = `googtrans=/en/${lng}; domain=.${domain}; path=/`;
    }

    // Try to trigger the native Google Translate dropdown to translate instantly without reload
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = lng === 'en' ? 'en' : lng;
      select.dispatchEvent(new Event('change'));
      
      // Some versions of Google Translate use an empty string for the default language
      if (lng === 'en' && select.value !== 'en') {
        select.value = '';
        select.dispatchEvent(new Event('change'));
      }
    } else {
      // Fallback if the widget hasn't loaded properly
      window.location.reload();
    }
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

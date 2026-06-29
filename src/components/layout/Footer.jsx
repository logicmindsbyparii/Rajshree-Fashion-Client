import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube'; // Imported YouTube Icon

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        // PREMIUM DEEP EMERALD GREEN PALETTE
        background: 'radial-gradient(circle at bottom, #123322 0%, #0A1E14 100%)',
        color: '#FFF8F0',
        pt: { xs: 8, md: 12 },
        pb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Gold Shimmer Border Accent Line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, #D4B26F, transparent)',
          opacity: 0.3
        }}
      />

      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 5, md: 6 }}>
          
          {/* Column 1: Brand & Social Handles */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                color: '#D4B26F',
                mb: 0.5,
                fontSize: { xs: '1.6rem', md: '1.8rem' },
                lineHeight: 1.2
              }}
            >
              Rajshree
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(212,178,111,0.6)',
                mb: 2.5,
                display: 'block',
                letterSpacing: '0.2em',
                fontSize: '0.6rem',
                fontWeight: 300
              }}
            >
              {t('footerEst', 'EST. 1998 · LUXURY ETHNIC WEAR MANUFACTURING')}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,248,240,0.6)',
                lineHeight: 1.9,
                maxWidth: 380,
                fontSize: '0.85rem',
                mb: 3
              }}
            >
              {t('footerDescription', "For over two decades, Rajshree Fashion has been crafting exceptional suits for discerning women. Each piece is a testament to our heritage of precision craftsmanship, using only the finest fabrics sourced from around the world.")}
            </Typography>
            
            {/* Social Media Link Connectors with Added YouTube Target */}
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {[
                { icon: InstagramIcon, label: 'Instagram', url: 'https://instagram.com/rajshree_fashion' },
                { icon: FacebookIcon, label: 'Facebook', url: 'https://facebook.com/rajshree_fashion' },
                { icon: YouTubeIcon, label: 'YouTube', url: 'https://www.youtube.com/@rajshreefashion' }
              ].map(({ icon: Icon, label, url }, i) => (
                <IconButton
                  key={i}
                  aria-label={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'rgba(212,178,111,0.5)',
                    border: '1px solid rgba(212,178,111,0.15)',
                    borderRadius: '8px',
                    p: 1.5,
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                      bgcolor: 'rgba(212,178,111,0.1)',
                      color: '#D4B26F',
                      borderColor: 'rgba(212,178,111,0.4)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Column 2: Navigation Links */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="caption"
              sx={{
                color: '#D4B26F',
                mb: 2.5,
                display: 'block',
                letterSpacing: '0.2em',
                fontSize: '0.6rem',
                fontWeight: 500
              }}
            >
              {t('footerNavigate', 'Navigate')}
            </Typography>
            {[
              { label: t('navHome', 'Home'), path: '/' },
              { label: t('navShop', 'Shop'), path: '/shop' }
            ].map((link) => (
              <Link
                key={link.label}
                component={RouterLink}
                to={link.path}
                underline="none"
                sx={{
                  display: 'block',
                  color: 'rgba(255,248,240,0.55)',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  mb: 1.5,
                  transition: 'all 0.3s',
                  '&:hover': { color: '#D4B26F', paddingLeft: '4px' }
                }}
              >
                {link.label}
              </Link>
            ))}
          </Grid>

          {/* Column 3: Collections Category Links */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="caption"
              sx={{
                color: '#D4B26F',
                mb: 2.5,
                display: 'block',
                letterSpacing: '0.2em',
                fontSize: '0.6rem',
                fontWeight: 500
              }}
            >
              {t('footerCollections', 'Collections')}
            </Typography>
            {['Signature Line', 'Festive Collection', 'Summer Essentials', 'Everyday Elegance', 'Premium Collection'].map((col) => (
              <Link
                key={col}
                component={RouterLink}
                to={`/shop?collection=${encodeURIComponent(col)}`}
                underline="none"
                sx={{
                  display: 'block',
                  color: 'rgba(255,248,240,0.55)',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  mb: 1.5,
                  transition: 'all 0.3s',
                  '&:hover': { color: '#D4B26F', paddingLeft: '4px' }
                }}
              >
                {col}
              </Link>
            ))}
          </Grid>

          {/* Column 4: Maps Anchor Terminal */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="caption"
              sx={{
                color: '#D4B26F',
                mb: 2.5,
                display: 'block',
                letterSpacing: '0.2em',
                fontSize: '0.6rem',
                fontWeight: 500
              }}
            >
              {t('footerVisit', 'Visit Our Atelier')}
            </Typography>

            <Box sx={{ width: '100%', height: 180, borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(212,178,111,0.2)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.1059501962122!2d72.87415657504856!3d21.18794968050142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fca0eb4c349%3A0x48cf9ca4b66c1cff!2sRajshree%20Fashion!5e0!3m2!1sen!2sin!4v1782727816764!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
                title="Rajshree Fashion Maps Terminal"
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(212,178,111,0.12)', my: { xs: 4, md: 5 } }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          {/* Copyright Section */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,248,240,0.35)', fontSize: '0.65rem', letterSpacing: '0.08em' }}
            >
              © {new Date().getFullYear()} Rajshree Fashion. All rights reserved.
            </Typography>
          </Box>
          
          {/* Logic Minds Credits */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,248,240,0.35)', fontSize: '0.65rem', letterSpacing: '0.05em' }}
            >
              Design & developed by{' '}
              <Link 
                href="https://www.logicmindsbyparii.com" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: '#D4B26F', 
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Logic Minds By Parii
              </Link>
            </Typography>
          </Box>

          {/* Secure Admin Route Access Gate */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <Link 
              component={RouterLink} 
              to="/secret-admin-rajshree" 
              underline="none"
              sx={{ textDecoration: 'none' }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,248,240,0.1)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  fontStyle: 'italic',
                  fontFamily: '"Playfair Display", serif',
                  transition: 'all 0.3s',
                  '&:hover': { color: 'rgba(255,248,240,0.8)' }
                }}
              >
                Crafted with passion. Worn with pride.
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

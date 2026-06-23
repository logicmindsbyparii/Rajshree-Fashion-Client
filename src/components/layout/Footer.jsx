import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: 'radial-gradient(ellipse at bottom, #3D121B 0%, #1A0A0E 100%)',
        color: '#FFF8F0',
        pt: { xs: 8, md: 12 },
        pb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle top border */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          opacity: 0.3
        }}
      />

      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 5, md: 6 }}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                color: '#C9A96E',
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
                color: 'rgba(212,165,116,0.6)',
                mb: 2.5,
                display: 'block',
                letterSpacing: '0.2em',
                fontSize: '0.6rem',
                fontWeight: 300
              }}
            >
              EST. 1998 · LUXURY ETHNIC WEAR MANUFACTURING
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
              For over two decades, Rajshree Fashion has been crafting exceptional suits for
              discerning women. Each piece is a testament to our heritage of precision
              craftsmanship, using only the finest fabrics sourced from around the world.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { icon: InstagramIcon, label: 'Instagram' },
                { icon: FacebookIcon, label: 'Facebook' },
                { icon: PinterestIcon, label: 'Pinterest' }
              ].map(({ icon: Icon, label }, i) => (
                <IconButton
                  key={i}
                  aria-label={label}
                  sx={{
                    color: 'rgba(212,165,116,0.5)',
                    border: '1px solid rgba(212,165,116,0.15)',
                    borderRadius: '8px',
                    p: 1.5,
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: 'rgba(212,165,116,0.1)',
                      color: '#C9A96E',
                      borderColor: 'rgba(201,169,110,0.3)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="caption"
              sx={{
                color: '#C9A96E',
                mb: 2.5,
                display: 'block',
                letterSpacing: '0.2em',
                fontSize: '0.6rem',
                fontWeight: 500
              }}
            >
              Navigate
            </Typography>
            {[
              { label: 'Home', path: '/' },
              { label: 'Shop', path: '/shop' },
              { label: 'Collections', path: '/shop' },
              { label: 'About', path: '/' }
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
                  '&:hover': { color: '#C9A96E', paddingLeft: '4px' }
                }}
              >
                {link.label}
              </Link>
            ))}
          </Grid>

          {/* Collections */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="caption"
              sx={{
                color: '#C9A96E',
                mb: 2.5,
                display: 'block',
                letterSpacing: '0.2em',
                fontSize: '0.6rem',
                fontWeight: 500
              }}
            >
              Collections
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
                  '&:hover': { color: '#C9A96E', paddingLeft: '4px' }
                }}
              >
                {col}
              </Link>
            ))}
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="caption"
              sx={{
                color: '#C9A96E',
                mb: 2.5,
                display: 'block',
                letterSpacing: '0.2em',
                fontSize: '0.6rem',
                fontWeight: 500
              }}
            >
              Visit Our Atelier
            </Typography>

            <Box sx={{ width: '100%', height: 180, borderRadius: '8px', overflow: 'hidden' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120638.06452273418!2d72.77531985950005!3d19.11364501257497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Rajshree Fashion Location"
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(212,165,116,0.12)', my: { xs: 4, md: 5 } }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          {/* Copyright - Left */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,248,240,0.35)', fontSize: '0.65rem', letterSpacing: '0.08em' }}
            >
              © {new Date().getFullYear()} Rajshree Fashion. All rights reserved.
            </Typography>
          </Box>
          
          {/* Developer Credit - Center */}
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
                  color: '#C9A96E', 
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Logic Minds By Parii
              </Link>
            </Typography>
          </Box>

          {/* Secret Admin - Right */}
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

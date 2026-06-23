import React, { useRef, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export default function AuthLayout({ children, title, subtitle }) {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const brandRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(brandRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );

      tl.fromTo(formRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 },
        '-=0.2'
      );
    }, [formRef]);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: '#FFF8F0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Left side - Brand Panel */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '45%',
          bgcolor: '#1A0A0E',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 8,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(ellipse at 30% 50%, rgba(107,29,42,0.4) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 20%, rgba(201,169,110,0.06) 0%, transparent 40%)
            `
          }
        }}
      >
        {/* Subtle pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage: 'radial-gradient(#C9A96E 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 400 }}>
          {/* Brand */}
          <Box
            component="span"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer', display: 'inline-block', mb: 4 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#FFF8F0',
                fontWeight: 600,
                fontSize: '2rem',
                lineHeight: 1.2,
                '& span': {
                  display: 'block',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 300,
                  fontSize: '0.5rem',
                  letterSpacing: '0.25em',
                  color: 'rgba(255,248,240,0.5)',
                  mt: 0.3
                }
              }}
            >
              Rajshree
              <span>FASHION · SINCE 1998</span>
            </Typography>
          </Box>

          {/* Auth title */}
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              color: '#FFF8F0',
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              fontWeight: 600,
              mb: 2,
              lineHeight: 1.2
            }}
          >
            {title === 'Welcome Back' ? 'Welcome Back' : 'Join the Legacy'}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,248,240,0.6)',
              fontSize: '0.9rem',
              lineHeight: 1.8,
              mb: 4
            }}
          >
            {subtitle}
          </Typography>

          {/* Decorative line */}
          <Box sx={{ width: 50, height: 2, bgcolor: '#C9A96E', mb: 2, borderRadius: '1px' }} />

          <Typography
            variant="caption"
            sx={{
              color: 'rgba(201,169,110,0.5)',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              display: 'block'
            }}
          >
            RAJSHREE FASHION · EST. 1998
          </Typography>
        </Box>
      </Box>

      {/* Right side - Form Panel */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 10, md: 0 },
          px: { xs: 2, sm: 4, md: 6 }
        }}
      >
        <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
          {/* Mobile brand */}
          <Box
            ref={brandRef}
            sx={{ display: { xs: 'block', md: 'none' }, mb: 4, textAlign: 'center' }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#6B1D2A',
                fontWeight: 600,
                cursor: 'pointer',
                '& span': {
                  display: 'block',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 300,
                  fontSize: '0.5rem',
                  letterSpacing: '0.25em',
                  color: '#6B6B6B',
                  mt: 0.3
                }
              }}
              onClick={() => navigate('/')}
            >
              Rajshree
              <span>FASHION</span>
            </Typography>
          </Box>

          <Box ref={formRef}>
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Alert } from '@mui/material';
import AnimatedSection from '../common/AnimatedSection';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      return;
    }
    setLoading(true);
    // Simulate subscription
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#1A0A0E', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle pattern overlay */}
      <Box sx={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.03,
        backgroundImage: 'radial-gradient(#C9A96E 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />

      {/* Top border accent */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
        opacity: 0.3
      }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <AnimatedSection y={30}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="overline" sx={{ color: '#C9A96E', display: 'block', mb: 1.5 }}>
              Stay Connected
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#FFF8F0',
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 600,
                mb: 2
              }}
            >
              Join the Atelier
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,248,240,0.6)',
                fontSize: '0.85rem',
                lineHeight: 1.8,
                mb: 4,
                maxWidth: 420,
                mx: 'auto'
              }}
            >
              Subscribe to receive exclusive access to new collections, private trunk shows,
              and behind-the-scenes stories from our atelier.
            </Typography>

            {/* Subscription form */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                gap: 1.5,
                maxWidth: 480,
                mx: 'auto',
                flexDirection: { xs: 'column', sm: 'row' }
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus(null); }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,248,240,0.06)',
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: 'rgba(255,248,240,0.15)',
                      borderWidth: 1
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(201,169,110,0.4)'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#C9A96E',
                      borderWidth: 1.5
                    },
                    '& input': {
                      color: '#FFF8F0',
                      fontSize: '0.85rem',
                      py: 1.8,
                      px: 2,
                      '&::placeholder': {
                        color: 'rgba(255,248,240,0.35)'
                      }
                    }
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: '#C9A96E',
                  color: '#1A1A1A',
                  py: 1.8,
                  px: 4,
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  borderRadius: '8px',
                  whiteSpace: 'nowrap',
                  minWidth: { xs: '100%', sm: 140 },
                  '&:hover': {
                    bgcolor: '#DFC89A',
                    boxShadow: '0 8px 24px rgba(201,169,110,0.25)'
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(201,169,110,0.3)',
                    color: 'rgba(26,26,26,0.5)'
                  }
                }}
              >
                {loading ? 'Sending...' : 'Subscribe'}
              </Button>
            </Box>

            {status === 'success' && (
              <Alert severity="success" sx={{ mt: 2, borderRadius: '8px', fontSize: '0.8rem', bgcolor: 'rgba(46,125,50,0.1)', color: '#A5D6A7', border: '1px solid rgba(165,214,167,0.3)' }}>
                Welcome to the Rajshree atelier! Check your inbox for a confirmation.
              </Alert>
            )}
            {status === 'error' && (
              <Alert severity="error" sx={{ mt: 2, borderRadius: '8px', fontSize: '0.8rem', bgcolor: 'rgba(198,40,40,0.1)', color: '#EF9A9A', border: '1px solid rgba(239,154,154,0.3)' }}>
                Please enter a valid email address.
              </Alert>
            )}

            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,248,240,0.3)',
                fontSize: '0.6rem',
                display: 'block',
                mt: 2.5,
                letterSpacing: '0.03em'
              }}
            >
              No spam, ever. Unsubscribe anytime. We respect your inbox.
            </Typography>
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
}

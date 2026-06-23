import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/home/HeroSection';
import HeritageShowcase from '../components/home/HeritageShowcase';
import PressQuotes from '../components/home/PressQuotes';
import VideoSection from '../components/home/VideoSection';
import AtelierShowcase from '../components/home/AtelierShowcase';
import ServicesSection from '../components/home/ServicesSection';
import AnimatedSection from '../components/common/AnimatedSection';
import { Typography, Container, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ReplayIcon from '@mui/icons-material/Replay';
import SecurityIcon from '@mui/icons-material/Security';

const features = [
  { icon: HandshakeIcon, title: 'Handcrafted Quality', desc: 'Every suit is meticulously handcrafted by master artisans with over 60 hours of detailed workmanship. Each stitch is a mark of excellence.' },
  { icon: LocalShippingIcon, title: 'Worldwide Delivery', desc: 'Free shipping to over 15 countries. Each suit is carefully packed, insured, and delivered with white-glove service.' },
  { icon: SecurityIcon, title: 'Premium Materials', desc: 'Only the finest fabrics from Italy, England, and Scotland. Each bolt is hand-selected for quality, drape, and longevity.' },
  { icon: ReplayIcon, title: 'Perfect Fit Guarantee', desc: 'Not satisfied? We offer complimentary alterations and a 30-day fit guarantee on all suits. Your satisfaction is our priority.' }
];

export default function HomePage() {
  const navigate = useNavigate();

  // Scroll to top on mount and handle hash navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection />

      {/* Heritage Showcase - Our Legacy */}
      <HeritageShowcase />

      {/* Press Quotes - Social Proof */}
      <PressQuotes />

      {/* YouTube Shorts/Videos Section */}
      <VideoSection />

      {/* Atelier Showcase - Craftsmanship Storytelling */}
      <AtelierShowcase />

      {/* Features Section - The Rajshree Difference */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: '#FFF8F0', borderTop: '1px solid #E8DDD0', borderBottom: '1px solid #E8DDD0' }}>
        <Container maxWidth="xl">
          <AnimatedSection>
            <Typography
              variant="overline"
              sx={{ color: '#C9A96E', textAlign: 'center', mb: 1.5, display: 'block' }}
            >
              Why Choose Us
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                textAlign: 'center',
                color: '#1A1A1A',
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                mb: 6,
                fontWeight: 600
              }}
            >
              The Rajshree Difference
            </Typography>
          </AnimatedSection>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {features.map((feature, i) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <AnimatedSection delay={i * 0.1} y={30}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: { xs: 3.5, md: 4.5 },
                      border: '1px solid #E8DDD0',
                      bgcolor: '#FDF8F3',
                      height: '100%',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      '&:hover': {
                        borderColor: '#D4A574',
                        transform: 'translateY(-6px)',
                        boxShadow: '0 12px 40px rgba(107,29,42,0.06)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(107,29,42,0.06)',
                        mx: 'auto',
                        mb: 3,
                        borderRadius: '12px',
                        transition: 'all 0.4s',
                        '.MuiBox-root:hover &': {
                          bgcolor: 'rgba(107,29,42,0.1)',
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <feature.icon sx={{ color: '#6B1D2A', fontSize: 26 }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        color: '#1A1A1A',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        mb: 1
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#6B6B6B', fontSize: '0.8rem', lineHeight: 1.9 }}
                    >
                      {feature.desc}
                    </Typography>
                  </Box>
                </AnimatedSection>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Services Section - Beyond the Garment */}
      <ServicesSection />

      {/* CTA Banner */}
      <AnimatedSection delay={0.3} y={40}>
        <Container maxWidth="xl">
          <Box
            sx={{
              my: { xs: 6, md: 8 },
              p: { xs: 5, md: 7 },
              bgcolor: '#1A0A0E',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
                opacity: 0.3
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  color: '#FFF8F0',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 600,
                  mb: 1.5
                }}
              >
                Experience the Art of Semi-Stitched Suits
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255,248,240,0.6)', mb: 3.5, maxWidth: 520, mx: 'auto', fontSize: '0.9rem', lineHeight: 1.8 }}
              >
                Visit our atelier for a personal consultation. Every journey begins with a conversation.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/shop')}
                sx={{
                  bgcolor: '#C9A96E',
                  color: '#1A1A1A',
                  py: 1.8,
                  px: 5,
                  fontSize: '0.7rem',
                  '&:hover': { bgcolor: '#DFC89A', boxShadow: '0 8px 28px rgba(201,169,110,0.3)' }
                }}
              >
                Explore the Collection
              </Button>
            </Box>
          </Box>
        </Container>
      </AnimatedSection>

      {/* Newsletter Section */}

    </Box>
  );
}

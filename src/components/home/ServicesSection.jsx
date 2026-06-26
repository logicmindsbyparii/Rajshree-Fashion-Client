import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../common/AnimatedSection';
import StraightenIcon from '@mui/icons-material/Straighten';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import StyleIcon from '@mui/icons-material/Style';
import DiamondIcon from '@mui/icons-material/Diamond';

const services = [
  {
    icon: StyleIcon,
    title: 'Bespoke Design',
    subtitle: 'Completely custom suits',
    description: 'From initial consultation to final fitting, our master artisans create a suit uniquely yours. Choose from over 500 fabrics and define every detail — from neck design to border work.',
    color: '#0A3B24'
  },
  {
    icon: StraightenIcon,
    title: 'Personal Fitting',
    subtitle: 'Precision measurements',
    description: 'Our fitting process is an art form. With over 150 individual measurements and multiple fitting sessions, we ensure your suit drapes flawlessly, moving with you like a second skin.',
    color: '#C9A96E'
  },
  {
    icon: ContentCutIcon,
    title: 'Alterations & Restoration',
    subtitle: 'Preserving your investment',
    description: 'Extend the life of your cherished suits with our expert alteration and restoration services. From resizing to reweaving, our artisans treat every piece with the same care as a new creation.',
    color: '#0A3B24'
  },
  {
    icon: DiamondIcon,
    title: 'Wedding & Special Occasions',
    subtitle: 'Life\'s most memorable moments',
    description: 'For life\'s most important occasions, we offer dedicated wedding and event services. From bridal trousseau to family ensembles, we create heirloom pieces to be cherished for generations.',
    color: '#C9A96E'
  }
];

export default function ServicesSection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: '#FDF8F3' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <AnimatedSection y={30}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography variant="overline" sx={{ color: '#C9A96E', display: 'block', mb: 1.5 }}>
              Services
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: '#1A1A1A',
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                fontWeight: 600,
                mb: 2
              }}
            >
              Beyond the Garment
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#6B6B6B',
                maxWidth: 520,
                mx: 'auto',
                fontSize: '0.9rem',
                lineHeight: 1.9
              }}
            >
              Our commitment to you extends far beyond the sale. We offer a complete ecosystem
              of services designed to make every Rajshree experience exceptional.
            </Typography>
          </Box>
        </AnimatedSection>

        {/* Services grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} key={service.title}>
              <AnimatedSection delay={index * 0.1} y={30}>
                <Box
                  sx={{
                    p: { xs: 3.5, md: 4.5 },
                    bgcolor: '#FFF8F0',
                    border: '1px solid #E8DDD0',
                    height: '100%',
                    display: 'flex',
                    gap: 3,
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                      borderColor: '#D4A574',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 40px rgba(10,59,36,0.06)'
                    }
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: service.color === '#0A3B24' ? 'rgba(10,59,36,0.08)' : 'rgba(201,169,110,0.12)',
                      borderRadius: '8px',
                      transition: 'all 0.4s',
                      '.MuiBox-root:hover &': {
                        transform: 'scale(1.05)',
                        bgcolor: service.color === '#0A3B24' ? 'rgba(10,59,36,0.12)' : 'rgba(201,169,110,0.16)'
                      }
                    }}
                  >
                    <service.icon sx={{ color: service.color, fontSize: 24 }} />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        color: '#1A1A1A',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        mb: 0.3
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#C9A96E',
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        mb: 1,
                        display: 'block',
                        fontWeight: 500
                      }}
                    >
                      {service.subtitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6B6B6B',
                        fontSize: '0.8rem',
                        lineHeight: 1.9
                      }}
                    >
                      {service.description}
                    </Typography>
                  </Box>
                </Box>
              </AnimatedSection>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <AnimatedSection delay={0.3} y={30}>
          <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 8 } }}>
            {/* <Button
              variant="contained"
              onClick={() => navigate('/shop')}
              sx={{
                bgcolor: '#0A3B24',
                color: '#FFF8F0',
                py: 1.8,
                px: 5,
                fontSize: '0.7rem',
                '&:hover': { bgcolor: '#062617' }
              }}
            >
              Book a Consultation
            </Button> */}
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
}

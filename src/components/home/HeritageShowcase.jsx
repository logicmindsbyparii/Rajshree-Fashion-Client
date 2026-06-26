import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapReveal } from '../../hooks/useGsap';
import AnimatedSection from '../common/AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

const heritageItems = [
  {
    title: 'Premium Fabrics',
    subtitle: 'Sourced from the world\'s finest mills',
    description: 'We source our fabrics from legendary mills across Italy, England, and Scotland. From Super 200s wool to pure cashmere and silk blends, each bolt is hand-selected for quality, drape, and longevity.',
    color: '#0A3B24',
    number: '01'
  },
  {
    title: 'Master Artisans',
    subtitle: 'Generations of semi-stitched suits excellence',
    description: 'Our atelier houses master craftsmen with decades of experience. Each suit undergoes over 60 hours of handwork — from canvas stitching to beautiful embroidery — ensuring a fit that transcends off-the-rack.',
    color: '#C9A96E',
    number: '02'
  },
  {
    title: 'Heritage Cuts',
    subtitle: 'Timeless silhouettes, modern sensibilities',
    description: 'Our patterns are built on archival blocks refined over 25 years. We marry classic construction techniques with contemporary proportions for a silhouette that is both timeless and distinctly modern.',
    color: '#0A3B24',
    number: '03'
  }
];

export default function HeritageShowcase() {
  const sectionRef = useRef(null);
  const headingRef = useGsapReveal({ y: 40, duration: 1 });
  const lineRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the decorative line
      gsap.fromTo(lineRef.current,
        { width: 0 },
        {
          width: 80,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 90%',
            once: true
          }
        }
      );
    }, [sectionRef]);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 18 },
        bgcolor: '#FDF8F3',
        overflow: 'hidden'
      }}
    >
      {/* Subtle background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(#0A3B24 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="xl">
        {/* Section Header */}
        <Box ref={headingRef} sx={{ mb: { xs: 8, md: 12 }, textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{ color: '#C9A96E', mb: 1.5, display: 'block' }}
          >
            Our Legacy
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: '#1A1A1A',
              fontSize: { xs: '2rem', md: '2.8rem', lg: '3.2rem' },
              mb: 2,
              fontWeight: 600
            }}
          >
            The Art of Semi-Stitched Suits
          </Typography>
          <Box
            ref={lineRef}
            sx={{
              height: '2px',
              bgcolor: '#C9A96E',
              mx: 'auto',
              mb: 3,
              borderRadius: '1px'
            }}
          />
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
            For over two decades, Rajshree Fashion has been synonymous with uncompromising
            quality and timeless elegance. Every stitch tells a story.
          </Typography>
        </Box>

        {/* Heritage Items */}
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {heritageItems.map((item, index) => (
            <Grid item xs={12} md={4} key={item.title}>
              <AnimatedSection delay={index * 0.15} y={50}>
                <Box
                  sx={{
                    position: 'relative',
                    p: { xs: 3.5, md: 5 },
                    bgcolor: '#FFF8F0',
                    border: '1px solid #E8DDD0',
                    height: '100%',
                    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                      borderColor: '#D4A574',
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 48px rgba(10,59,36,0.08)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '3px',
                      height: '100%',
                      bgcolor: item.color,
                      opacity: 0.15
                    }
                  }}
                >
                  {/* Number */}
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '4rem',
                      fontWeight: 700,
                      color: item.color,
                      opacity: 0.06,
                      lineHeight: 1,
                      position: 'absolute',
                      top: 8,
                      right: 16,
                      userSelect: 'none'
                    }}
                  >
                    {item.number}
                  </Typography>

                  {/* Icon mark */}
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: item.color === '#0A3B24' ? 'rgba(10,59,36,0.08)' : 'rgba(201,169,110,0.12)',
                      mb: 2.5,
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        border: `2px solid ${item.color}`,
                        transform: 'rotate(45deg)',
                        opacity: 0.6
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      color: '#1A1A1A',
                      fontSize: { xs: '1.2rem', md: '1.35rem' },
                      fontWeight: 600,
                      mb: 0.5,
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: '#C9A96E',
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      mb: 2,
                      display: 'block',
                      fontWeight: 500
                    }}
                  >
                    {item.subtitle}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6B6B6B',
                      fontSize: '0.85rem',
                      lineHeight: 1.9,
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </AnimatedSection>
            </Grid>
          ))}
        </Grid>

        {/* Stats Bar */}
        <AnimatedSection delay={0.3} y={40}>
          <Box
            ref={statsRef}
            sx={{
              mt: { xs: 8, md: 12 },
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: '1px',
              bgcolor: '#E8DDD0',
              border: '1px solid #E8DDD0',
              overflow: 'hidden'
            }}
          >
            {[
              { number: '25+', label: 'Years of Excellence' },
              { number: '50K+', label: 'Suits Crafted', accent: true },
              { number: '15+', label: 'Countries Served' },
              { number: '100%', label: 'Handcrafted', accent: true }
            ].map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  textAlign: 'center',
                  py: { xs: 3.5, md: 5 },
                  px: 2,
                  bgcolor: stat.accent ? 'rgba(10,59,36,0.02)' : '#FFF8F0',
                  transition: 'background 0.3s',
                  '&:hover': {
                    bgcolor: stat.accent ? 'rgba(10,59,36,0.04)' : 'rgba(253,248,243,0.8)'
                  }
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    color: stat.accent ? '#C9A96E' : '#0A3B24',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 600,
                    mb: 0.5
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#6B6B6B',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 400
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
}

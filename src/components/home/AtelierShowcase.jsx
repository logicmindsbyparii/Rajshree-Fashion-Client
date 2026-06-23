import React, { useRef, useEffect } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '../common/AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

const craftsmanshipSteps = [
  {
    title: 'Fabric Selection',
    subtitle: 'The Foundation of Luxury',
    description: 'Every suit begins with a journey across continents. Our master selectors personally visit mills to handpick the finest silks, cottons, and georgettes.',
    duration: '2-3 Weeks',
    icon: '◈'
  },
  {
    title: 'Pattern Making',
    subtitle: 'Architecting the Silhouette',
    description: 'Our pattern makers translate over 150 body measurements into bespoke paper patterns. Each pattern is hand-drafted and refined over multiple fittings to achieve a silhouette that moves with perfect grace.',
    duration: '1 Week',
    icon: '◇'
  },
  {
    title: 'Canvas Construction',
    subtitle: 'The Inner Structure',
    description: 'The heart of a Rajshree suit — a beautiful flowy base hand-cut from premium fabric. Stitched with thousands of invisible stitches, it provides the suit its sculpted structure while allowing natural movement.',
    duration: '20+ Hours',
    icon: '◆'
  },
  {
    title: 'Hand Finishing',
    subtitle: 'The Signature Details',
    description: 'Our artisans devote over 40 hours to hand-finishing each suit. From silk embroidery to perfect finishing along borders, every detail is executed with needle and thread — a dying art we proudly preserve.',
    duration: '40+ Hours',
    icon: '✦'
  }
];

export default function AtelierShowcase() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the central timeline line
      gsap.fromTo(lineRef.current,
        { height: 0 },
        {
          height: '100%',
          duration: 2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1
          }
        }
      );

      // Animate step dots on scroll
      const dots = sectionRef.current?.querySelectorAll('.timeline-dot');
      if (dots) {
        dots.forEach((dot, i) => {
          ScrollTrigger.create({
            trigger: dot,
            start: 'top 85%',
            onEnter: () => {
              gsap.to(dot, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(2)',
                delay: i * 0.1
              });
            },
            once: true
          });
        });
      }
    }, [sectionRef]);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="atelier-section"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: '#FFF8F0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="xl">
        {/* Section header */}
        <AnimatedSection y={30}>
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
            <Typography variant="overline" sx={{ color: '#C9A96E', display: 'block', mb: 1.5 }}>
              The Atelier
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: '#1A1A1A',
                fontSize: { xs: '1.8rem', md: '2.6rem' },
                fontWeight: 600,
                mb: 2
              }}
            >
              The Making of a Masterpiece
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#6B6B6B',
                maxWidth: 560,
                mx: 'auto',
                fontSize: '0.9rem',
                lineHeight: 1.9
              }}
            >
              From raw fabric to finished suit — over 80 hours of meticulous handwork goes into
              every Rajshree Fashion suit. This is the art of semi-stitched suits, preserved and perfected.
            </Typography>
          </Box>
        </AnimatedSection>

        {/* Timeline layout */}
        <Box sx={{ position: 'relative' }}>
          {/* Central timeline line */}
          <Box
            ref={lineRef}
            sx={{
              position: 'absolute',
              left: { xs: 24, md: '50%' },
              top: 0,
              bottom: 0,
              width: '2px',
              bgcolor: '#E8DDD0',
              transform: { md: 'translateX(-50%)' },
              zIndex: 0,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 12,
                height: 12,
                bgcolor: '#C9A96E',
                borderRadius: '50%'
              }
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {craftsmanshipSteps.map((step, index) => (
              <Box
                key={step.title}
                ref={stepsRef}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                  alignItems: 'flex-start',
                  mb: { xs: 6, md: 10 },
                  position: 'relative',
                  pl: { xs: 7, md: 0 }
                }}
              >
                {/* Timeline dot */}
                <Box
                  className="timeline-dot"
                  sx={{
                    position: 'absolute',
                    left: { xs: 17, md: '50%' },
                    top: { xs: 28, md: 36 },
                    transform: { xs: 'translateX(-50%)', md: 'translateX(-50%)' },
                    width: 18,
                    height: 18,
                    bgcolor: index % 2 === 0 ? '#6B1D2A' : '#C9A96E',
                    borderRadius: '50%',
                    zIndex: 2,
                    scale: 0,
                    opacity: 0,
                    boxShadow: `0 0 0 4px ${index % 2 === 0 ? 'rgba(107,29,42,0.15)' : 'rgba(201,169,110,0.2)'}`
                  }}
                />

                {/* Content card */}
                <Box
                  sx={{
                    width: { xs: '100%', md: '45%' },
                    ml: { md: index % 2 === 0 ? 0 : '55%' },
                    mr: { md: index % 2 === 0 ? '55%' : 0 }
                  }}
                >
                  <AnimatedSection delay={index * 0.1} y={30}>
                    <Box
                      sx={{
                        p: { xs: 3, md: 4 },
                        bgcolor: '#FDF8F3',
                        border: '1px solid #E8DDD0',
                        transition: 'all 0.4s',
                        '&:hover': {
                          borderColor: '#D4A574',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(107,29,42,0.06)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                        <Typography
                          sx={{
                            fontFamily: '"Playfair Display", serif',
                            fontSize: '1.5rem',
                            color: index % 2 === 0 ? '#6B1D2A' : '#C9A96E',
                            lineHeight: 1
                          }}
                        >
                          {step.icon}
                        </Typography>
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            bgcolor: index % 2 === 0 ? 'rgba(107,29,42,0.06)' : 'rgba(201,169,110,0.1)',
                            borderRadius: '4px'
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: index % 2 === 0 ? '#6B1D2A' : '#C9A96E',
                              fontSize: '0.5rem',
                              letterSpacing: '0.1em',
                              fontWeight: 500,
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {step.duration}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Playfair Display", serif',
                          color: '#1A1A1A',
                          fontSize: '1.15rem',
                          fontWeight: 600,
                          mb: 0.3
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#C9A96E',
                          fontSize: '0.6rem',
                          letterSpacing: '0.15em',
                          mb: 1.5,
                          display: 'block',
                          fontWeight: 500
                        }}
                      >
                        {step.subtitle}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#6B6B6B',
                          fontSize: '0.85rem',
                          lineHeight: 1.9
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </AnimatedSection>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.3} y={30}>
          <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 8 } }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2.5,
                p: { xs: 3, md: 4 },
                bgcolor: '#FDF8F3',
                border: '1px solid #E8DDD0',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '0.6rem', letterSpacing: '0.1em', display: 'block', mb: 0.3 }}>
                  TOTAL CRAFTSMANSHIP
                </Typography>
                <Typography sx={{ fontFamily: '"Playfair Display", serif', color: '#6B1D2A', fontSize: '1.5rem', fontWeight: 600 }}>
                  80+ Hours
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '0.55rem', letterSpacing: '0.05em' }}>
                  Per garment
                </Typography>
              </Box>
              <Box sx={{ width: '1px', height: 40, bgcolor: '#E8DDD0', display: { xs: 'none', sm: 'block' } }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '0.6rem', letterSpacing: '0.1em', display: 'block', mb: 0.3 }}>
                  MASTER ARTISANS
                </Typography>
                <Typography sx={{ fontFamily: '"Playfair Display", serif', color: '#6B1D2A', fontSize: '1.5rem', fontWeight: 600 }}>
                  30+
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '0.55rem', letterSpacing: '0.05em' }}>
                  Years average experience
                </Typography>
              </Box>
              <Box sx={{ width: '1px', height: 40, bgcolor: '#E8DDD0', display: { xs: 'none', sm: 'block' } }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '0.6rem', letterSpacing: '0.1em', display: 'block', mb: 0.3 }}>
                  FABRICS SOURCED FROM
                </Typography>
                <Typography sx={{ fontFamily: '"Playfair Display", serif', color: '#6B1D2A', fontSize: '1.5rem', fontWeight: 600 }}>
                  6 Countries
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '0.55rem', letterSpacing: '0.05em' }}>
                  Italy, England, Scotland & more
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/shop')}
                sx={{
                  bgcolor: '#6B1D2A',
                  color: '#FFF8F0',
                  py: 1.8,
                  px: 5,
                  fontSize: '0.7rem',
                  '&:hover': { bgcolor: '#3D0C11' }
                }}
              >
                Explore the Collection
              </Button>
            </Box>
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
}

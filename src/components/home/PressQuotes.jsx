import React, { useRef, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '../common/AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

const pressQuotes = [
  {
    quote: "The finest semi-stitched suits I have ever purchased. The fabric quality and detailed embroidery truly make every piece feel uniquely bespoke. Exceptional service!",
    source: "Aarti Sharma",
    publication: "Mumbai",
    year: "Verified Buyer"
  },
  {
    quote: "Rajshree Fashion represents the pinnacle of luxury ethnic wear. Their attention to fabric selection and hand-finishing rivals traditional high-end boutiques.",
    source: "Priya Desai",
    publication: "Surat",
    year: "Verified Buyer"
  },
  {
    quote: "An absolute delight! The suits are versatile, timeless, and elegantly crafted. They bring quiet luxury and immense elegance to every festive occasion.",
    source: "Nandini Verma",
    publication: "Delhi",
    year: "Verified Buyer"
  }
];

export default function PressQuotes() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = trackRef.current?.children;
      if (!cards) return;

      // Animate each quote card on scroll
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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
        py: { xs: 10, md: 14 },
        bgcolor: '#FDF8F3',
        borderTop: '1px solid #E8DDD0',
        borderBottom: '1px solid #E8DDD0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle background */}
      <Box sx={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.02,
        backgroundImage: 'radial-gradient(#C9A96E 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        pointerEvents: 'none'
      }} />

      <Container maxWidth="xl">
        <AnimatedSection y={30}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography variant="overline" sx={{ color: '#C9A96E', display: 'block', mb: 1 }}>
              Customer Experiences
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: '#1A1A1A',
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                fontWeight: 600,
                mb: 1
              }}
            >
              What Our Clients Say
            </Typography>
          </Box>
        </AnimatedSection>

        <Box ref={trackRef}>
          <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
            {pressQuotes.map((item, index) => (
              <Grid item xs={12} md={4} key={item.source}>
                <Box
                  sx={{
                    position: 'relative',
                    p: { xs: 3.5, md: 4.5 },
                    bgcolor: '#FFF8F0',
                    border: '1px solid #E8DDD0',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                      borderColor: '#D4A574',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 40px rgba(10,59,36,0.06)'
                    }
                  }}
                >
                  {/* Quote icon */}
                  <FormatQuoteIcon
                    sx={{
                      color: '#C9A96E',
                      fontSize: 36,
                      mb: 1.5,
                      opacity: 0.4
                    }}
                  />

                  {/* Quote text */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#1A1A1A',
                      fontSize: '0.9rem',
                      lineHeight: 1.9,
                      fontStyle: 'italic',
                      fontFamily: '"Playfair Display", serif',
                      flexGrow: 1,
                      mb: 3
                    }}
                  >
                    "{item.quote}"
                  </Typography>

                  {/* Source */}
                  <Box sx={{ borderTop: '1px solid #E8DDD0', pt: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: '#0A3B24',
                        fontSize: '0.7rem',
                        letterSpacing: '0.12em',
                        fontWeight: 600
                      }}
                    >
                      {item.source}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.3 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: '#6B6B6B', fontSize: '0.6rem', letterSpacing: '0.08em' }}
                      >
                        {item.publication}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#C9A96E', fontSize: '0.55rem', letterSpacing: '0.1em', fontWeight: 500 }}
                      >
                        {item.year}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>


      </Container>
    </Box>
  );
}

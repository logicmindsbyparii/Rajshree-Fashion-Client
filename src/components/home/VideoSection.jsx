import React, { useRef, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '../common/AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

// Using standard YouTube Shorts video IDs for fashion content
const videos = [
  { id: 'tABNKLlo4rs', title: 'Rajshree Fashion Surat 1' },
  { id: 'u-FtKBBPp5g', title: 'Rajshree Fashion Surat 2' },
  { id: 'souDEe_13UM', title: 'Rajshree Fashion Surat 3' },
  { id: 'LAPJW9W6qTI', title: 'Rajshree Fashion Surat 4' }
];

export default function VideoSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = trackRef.current?.children;
      if (!cards) return;

      gsap.fromTo(cards,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
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
        py: { xs: 8, md: 12 },
        bgcolor: '#FFF8F0',
        position: 'relative'
      }}
    >
      <Container maxWidth="xl">
        <AnimatedSection y={30}>
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
            <Typography variant="overline" sx={{ color: '#C9A96E', display: 'block', mb: 1 }}>
              Behind the Scenes
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: '#1A1A1A',
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                fontWeight: 600,
                fontFamily: '"Playfair Display", serif',
                mb: 1
              }}
            >
              Watch Our Craftsmanship
            </Typography>
          </Box>
        </AnimatedSection>

        <Box ref={trackRef}>
          <Grid container spacing={4} justifyContent="center">
            {videos.map((video, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '9/16',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 12px 32px rgba(10,59,36,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 40px rgba(10,59,36,0.15)'
                    }
                  }}
                >
                <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.id}?playsinline=1&rel=0&modestbranding=1`}
                title={video.title}
                frameBorder="0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

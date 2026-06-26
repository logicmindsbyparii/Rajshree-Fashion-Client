import React, { useRef, useEffect, useState } from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import gsap from 'gsap';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../shop/ProductCard';
import { LuxurySkeletonGrid } from '../common/LuxurySkeleton';
import AnimatedSection from '../common/AnimatedSection';

export default function ProductCarousel() {
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Featured products for carousel
  const featured = products.slice(0, 8);

  // Calculate max index based on viewport
  useEffect(() => {
    const updateMaxIndex = () => {
      const width = window.innerWidth;
      let perView = 4; // lg default
      if (width < 900) perView = 3;
      if (width < 700) perView = 2;
      if (width < 500) perView = 1;
      setMaxIndex(Math.max(0, featured.length - perView));
    };
    updateMaxIndex();
    window.addEventListener('resize', updateMaxIndex);
    return () => window.removeEventListener('resize', updateMaxIndex);
  }, [featured.length]);

  // Entrance animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el || loading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, [el]);

    return () => ctx.revert();
  }, [loading]);

  const goToIndex = (targetIndex) => {
    if (isAnimating || targetIndex === currentIndex) return;
    setIsAnimating(true);

    const track = trackRef.current;
    if (!track) return;

    const cardWidth = track.children[0]?.offsetWidth || 0;
    const gap = 24;
    const offset = -(targetIndex * (cardWidth + gap));

    gsap.to(track, {
      x: offset,
      duration: 0.5 + 0.15 * Math.abs(targetIndex - currentIndex),
      ease: 'power3.inOut',
      onComplete: () => {
        setCurrentIndex(targetIndex);
        setIsAnimating(false);
      }
    });
  };

  const slideTo = (direction) => {
    const newIndex = direction === 'next'
      ? Math.min(currentIndex + 1, maxIndex)
      : Math.max(currentIndex - 1, 0);
    goToIndex(newIndex);
  };

  if (loading) {
    return (
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#FFF8F0' }}>
        <Container maxWidth="xl">
          <LuxurySkeletonGrid count={4} />
        </Container>
      </Box>
    );
  }

  return (      <Box
        ref={containerRef}
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: '#FFF8F0',
          overflow: 'hidden'
        }}
      >
      <Container maxWidth="xl">
        {/* Section Header */}
        <AnimatedSection>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: { xs: 4, md: 6 }, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography
                variant="overline"
                sx={{ color: '#C9A96E', mb: 1, display: 'block' }}
              >
                Featured Collection
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  color: '#1A1A1A',
                  fontSize: { xs: '1.6rem', md: '2.2rem' },
                  fontWeight: 600
                }}
              >
                Curated for You
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <IconButton
                onClick={() => slideTo('prev')}
                disabled={currentIndex === 0}
                sx={{
                  border: '1px solid #E8DDD0',
                  borderRadius: '8px',
                  color: currentIndex === 0 ? '#D4D4D4' : '#1A1A1A',
                  transition: 'all 0.3s',
                  '&:hover': { borderColor: '#D4A574', bgcolor: 'rgba(212,165,116,0.08)' },
                  '&.Mui-disabled': { borderColor: '#F0E8DD', opacity: 0.5 }
                }}
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => slideTo('next')}
                disabled={currentIndex >= maxIndex}
                sx={{
                  border: '1px solid #E8DDD0',
                  borderRadius: '8px',
                  color: currentIndex >= maxIndex ? '#D4D4D4' : '#1A1A1A',
                  transition: 'all 0.3s',
                  '&:hover': { borderColor: '#D4A574', bgcolor: 'rgba(212,165,116,0.08)' },
                  '&.Mui-disabled': { borderColor: '#F0E8DD', opacity: 0.5 }
                }}
              >
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate('/shop')}
                sx={{ ml: 1, fontSize: '0.65rem', py: 1.1, px: 3, borderRadius: '8px' }}
              >
                View All
              </Button>
            </Box>
          </Box>
        </AnimatedSection>

        {/* Carousel Track */}
        {featured.length > 0 ? (            <Box sx={{ position: 'relative', overflow: 'hidden', mx: -0.5, px: 0.5, borderRadius: '8px' }}>
            <Box
              ref={trackRef}
              sx={{
                display: 'flex',
                gap: 3,
                willChange: 'transform'
              }}
            >
              {featured.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    flex: '0 0 calc(25% - 18px)',
                    minWidth: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)', lg: 'calc(25% - 18px)' }
                  }}
                >
                  <ProductCard product={product} />
                </Box>
              ))}
            </Box>

            {/* Dots navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: 4.5 }}>
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <Box
                  key={i}
                  onClick={() => goToIndex(i)}
                  sx={{
                    width: currentIndex === i ? 32 : 8,
                    height: 8,
                    borderRadius: currentIndex === i ? '4px' : '50%',
                    bgcolor: currentIndex === i ? '#0A3B24' : '#D4C5B0',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': { bgcolor: currentIndex === i ? '#0A3B24' : '#C9A96E' }
                  }}
                />
              ))}
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" sx={{ color: '#6B6B6B', mb: 2 }}>
              No products available yet.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/admin')}>
              Add Products
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

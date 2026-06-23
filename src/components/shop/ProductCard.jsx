import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import gsap from 'gsap';
import ProductDetailModal from '../common/ProductDetailModal';
import { getProductImage } from '../../constants/images';

export default function ProductCard({ product }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const imgHoverRef = useRef(null);
  const detailsRef = useRef(null);
  const accentRef = useRef(null);
  const shimmerRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const imgSrc = getProductImage(product);


  // GSAP entrance + hover animations
  useEffect(() => {
    const card = cardRef.current;
    const img = imgRef.current;
    const hoverImg = imgHoverRef.current;
    const details = detailsRef.current;
    const accent = accentRef.current;
    if (!card || !img) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(card,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.05
        }
      );

      // Hover animations without cross-fade
      card.addEventListener('mouseenter', () => {
        const tl = gsap.timeline({ overwrite: 'auto' });
        tl.to(img, { scale: 1.08, duration: 0.7, ease: 'power2.out' });
        
        gsap.to(details, { y: -3, duration: 0.3, ease: 'power2.out' });
        if (accent) gsap.to(accent, { width: '60%', duration: 0.4, ease: 'power2.out' });
        if (shimmerRef.current) {
          gsap.to(shimmerRef.current, { x: '100%', duration: 0.5, ease: 'power2.inOut' });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
        gsap.to(details, { y: 0, duration: 0.3, ease: 'power2.out' });
        if (accent) gsap.to(accent, { width: '30%', duration: 0.4, ease: 'power2.out' });
        if (shimmerRef.current) gsap.set(shimmerRef.current, { x: '-100%' });
      });
    }, [card]);

    return () => ctx.revert();
  }, []);

  const priceFormatted = `₹${parseFloat(product.price).toLocaleString('en-IN')}`;
  const inStock = product.stock_quantity > 0 && product.is_available;

  const handleCardClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Box
        ref={cardRef}
        onClick={handleCardClick}
        sx={{
          position: 'relative',
          bgcolor: '#FDF8F3',
          borderRadius: '12px',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'box-shadow 0.5s, transform 0.5s',
          boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(107,29,42,0.12), 0 2px 12px rgba(0,0,0,0.05)',
            transform: 'translateY(-4px)'
          }
        }}
      >
        {/* Image Container */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            height: { xs: 280, md: 340 },
            bgcolor: '#F5F0EB'
          }}
        >
          {/* Shimmer overlay on hover */}
          <Box
            ref={shimmerRef}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '60%',
              height: '100%',
              background: 'linear-gradient(110deg, transparent 0%, rgba(255,248,240,0.12) 50%, transparent 100%)',
              transform: 'translateX(-100%)',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          />

          {/* Primary image */}
          <Box
            ref={imgRef}
            component="img"
            src={imgSrc}
            alt={product.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              willChange: 'transform'
            }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=600&q=80';
            }}
          />



          {/* Bottom gradient fade */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(transparent, rgba(253,248,243,0.95))',
              zIndex: 1
            }}
          />

          {/* Availability Badge */}
          {!inStock && (
            <Chip
              label="Out of Stock"
              size="small"
              sx={{
                position: 'absolute',
                top: 14,
                left: 14,
                bgcolor: 'rgba(61,12,17,0.9)',
                color: '#FFF8F0',
                fontSize: '0.5rem',
                letterSpacing: '0.12em',
                borderRadius: '6px',
                height: 24,
                zIndex: 3,
                fontWeight: 500,
                '& .MuiChip-label': { px: 1.5 }
              }}
            />
          )}

          {/* Collection tag */}
          {product.collection_name && inStock && (
            <Chip
              label={product.collection_name}
              size="small"
              sx={{
                position: 'absolute',
                top: 14,
                left: 14,
                bgcolor: 'rgba(255,248,240,0.9)',
                color: '#1A1A1A',
                fontSize: '0.5rem',
                letterSpacing: '0.08em',
                borderRadius: '6px',
                height: 24,
                zIndex: 3,
                fontWeight: 400,
                backdropFilter: 'blur(4px)',
                '& .MuiChip-label': { px: 1.5 }
              }}
            />
          )}

          {/* Price tag - bottom left */}
          <Typography
            sx={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              zIndex: 3,
              fontFamily: '"Inter", sans-serif',
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 500,
              color: '#6B1D2A',
              letterSpacing: '0.02em'
            }}
          >
            {priceFormatted}
          </Typography>
        </Box>

        {/* Details Section */}
        <Box ref={detailsRef} sx={{ p: 2.5, pt: 2, willChange: 'transform' }}>
          {/* Fabric type */}
          <Typography
            variant="caption"
            sx={{
              color: '#C9A96E',
              fontSize: '0.5rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              display: 'block',
              mb: 0.5,
              fontWeight: 500
            }}
          >
            {product.fabric_type || 'Premium Fabric'}
          </Typography>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Playfair Display", serif',
              color: '#1A1A1A',
              fontSize: '1rem',
              fontWeight: 600,
              mb: 0.5,
              lineHeight: 1.3
            }}
          >
            {product.title}
          </Typography>

          {/* Accent line */}
          <Box
            ref={accentRef}
            sx={{
              width: '30%',
              height: '2px',
              bgcolor: '#C9A96E',
              mb: 1.5,
              borderRadius: '1px'
            }}
          />

          {/* Stock indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
            <Typography
              variant="caption"
              sx={{
                color: inStock ? '#2E7D32' : '#C62828',
                fontSize: '0.55rem',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                '&::before': {
                  content: '""',
                  display: 'inline-block',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: inStock ? '#2E7D32' : '#C62828'
                }
              }}
            >
              {inStock ? `${product.stock_quantity} in stock` : 'Unavailable'}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.5, transition: 'opacity 0.3s', '&:hover': { opacity: 1 } }}>
              <Typography
                variant="caption"
                sx={{
                  color: '#6B1D2A',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 500
                }}
              >
                Details
              </Typography>
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  transition: 'transform 0.3s',
                  fontSize: '0.65rem',
                  color: '#6B1D2A',
                  '.MuiBox-root:hover &': { transform: 'translateX(3px)' }
                }}
              >
                →
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={product}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

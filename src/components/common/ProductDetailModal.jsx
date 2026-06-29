import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import gsap from 'gsap';
import { getProductImage } from '../../constants/images';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function ProductDetailModal({ product, open, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const closeBtnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const overlay = overlayRef.current;
    const modal = modalRef.current;
    const img = imgRef.current;
    const text = textRef.current;
    const closeBtn = closeBtnRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Overlay fade
      tl.fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      // Modal scale in
      tl.fromTo(modal,
        { opacity: 0, scale: 0.93, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

      // Image
      if (img) {
        tl.fromTo(img,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // Text content stagger
      if (text) {
        const textChildren = text.children;
        tl.fromTo(textChildren,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' },
          '-=0.35'
        );
      }

      // Close button
      if (closeBtn) {
        tl.fromTo(closeBtn,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' },
          '-=0.2'
        );
      }
    }, [overlay, modal, img, text, closeBtn]);

    document.body.style.overflow = 'hidden';

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!product) return null;

  const imgSrc = getProductImage(product, true);
  const priceFormatted = `₹${parseFloat(product.price).toLocaleString('en-IN')}`;
  const inStock = product.stock_quantity > 0 && product.is_available;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: open ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 1.5, md: 4 }
      }}
    >
      {/* Overlay */}
      <Box
        ref={overlayRef}
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(10, 5, 5, 0.85)',
          backdropFilter: 'blur(12px)'
        }}
      />

      {/* Modal */}
      <Box
        ref={modalRef}
        sx={{
          position: 'relative',
          bgcolor: '#FFF8F0',
          borderRadius: '16px',
          width: '100%',
          maxWidth: 960,
          maxHeight: { xs: '95vh', md: '88vh' },
          overflow: 'auto',
          boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
          zIndex: 1,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': { bgcolor: '#D4A574', borderRadius: 2 }
        }}
      >
        {/* Close button */}
        <IconButton
          ref={closeBtnRef}
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            bgcolor: 'rgba(255,248,240,0.95)',
            backdropFilter: 'blur(8px)',
            color: '#1A1A1A',
            '&:hover': { bgcolor: '#FFF8F0' },
            width: 40,
            height: 40,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: { md: 600 }
          }}
        >
          {/* Left: Image */}
          <Box
            ref={imgRef}
            sx={{
              flex: { md: '0 0 50%' },
              position: 'relative',
              minHeight: { xs: 300, md: 'auto' }
            }}
          >
            <Box
              component="img"
              src={imgSrc}
              alt={product.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&q=80';
              }}
            />

            {/* Subtle overlay on image */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '30%',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.15))'
              }}
            />
          </Box>

          {/* Right: Details */}
          <Box
            ref={textRef}
            sx={{
              flex: 1,
              p: { xs: 3, md: 4, lg: 5 },
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              overflowY: 'auto'
            }}
          >
            {/* Breadcrumb */}
            <Box component="div">
              <Typography
                variant="caption"
                sx={{
                  color: '#C9A96E',
                  fontSize: '0.5rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  mb: 1,
                  display: 'block',
                  fontWeight: 500
                }}
              >
                {product.collection_name || 'Premium Collection'}
                <Box component="span" sx={{ mx: 0.75, opacity: 0.5 }}>·</Box>
                {product.fabric_type || 'Luxury Fabric'}
              </Typography>
            </Box>

            {/* Title */}
            <Box component="div">
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  color: '#1A1A1A',
                  fontSize: { xs: '1.4rem', md: '1.8rem', lg: '2rem' },
                  fontWeight: 600,
                  mb: 0.75,
                  lineHeight: 1.2
                }}
              >
                {product.title}
              </Typography>
            </Box>

            {/* Price */}
            <Box component="div">
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  color: '#0A3B24',
                  fontSize: { xs: '1.3rem', md: '1.6rem' },
                  fontWeight: 500,
                  mb: 2,
                  letterSpacing: '-0.01em'
                }}
              >
                {priceFormatted}
              </Typography>
            </Box>

            {/* Divider */}
            <Box component="div" sx={{ mb: 2 }}>
              <Divider sx={{ borderColor: '#E8DDD0' }} />
            </Box>

            {/* Description */}
            <Box component="div">
              <Typography
                variant="body2"
                sx={{
                  color: '#6B6B6B',
                  fontSize: '0.85rem',
                  lineHeight: 1.9,
                  mb: 2.5
                }}
              >
                {product.description || 'A meticulously crafted suit from the Rajshree Fashion atelier. Each piece embodies our commitment to heritage craftsmanship and timeless elegance.'}
              </Typography>
            </Box>

            {/* Details grid */}
            <Box component="div">
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
                mb: 2.5,
                bgcolor: 'rgba(232,221,208,0.2)',
                p: 2.5,
                borderRadius: '8px'
              }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                    Fabric
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1A1A1A', fontSize: '0.8rem', fontWeight: 500 }}>
                    {product.fabric_type || 'Premium Semi-Stitched Suits'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                    Collection
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1A1A1A', fontSize: '0.8rem', fontWeight: 500 }}>
                    {product.collection_name || 'Signature Line'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                    Availability
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      color: inStock ? '#2E7D32' : '#C62828',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: inStock ? '#2E7D32' : '#C62828' }} />
                    {inStock ? `${product.stock_quantity} units available` : 'Out of stock'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                    Product ID
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1A1A1A', fontSize: '0.8rem', fontWeight: 500, fontFamily: '"Inter", monospace' }}>
                    #{String(product.id).slice(0, 8).toUpperCase()}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Features */}
            <Box component="div">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                {[
                  { icon: VerifiedIcon, text: 'Handcrafted by master artisans' },
                  { icon: LocalShippingIcon, text: 'Complimentary worldwide shipping' }
                ].map((feature, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: 'rgba(201,169,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <feature.icon sx={{ color: '#C9A96E', fontSize: 14 }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '0.75rem' }}>
                      {feature.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Size Information */}
            <Box component="div" sx={{ mb: 4, bgcolor: '#FDF8F3', p: 2, borderRadius: '8px', border: '1px solid #E8DDD0' }}>
              <Typography variant="body2" sx={{ color: '#1A1A1A', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1 }}>
                <span style={{ color: '#6B6B6B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Size:</span> 
                Free Size (Unstitched)
              </Typography>
            </Box>

            {/* Action buttons */}
            <Box component="div" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, mt: 'auto' }}>
              <Button
                variant="contained"
                fullWidth
                disabled={!inStock}
                onClick={() => {
                  if (inStock) {
                    const message = encodeURIComponent(`Hi, I would like to order: ${product.title} (ID: #${product.id})`);
                    window.open(`https://wa.me/919825184531?text=${message}`, '_blank');
                    onClose();
                  }
                }}
                sx={{
                  bgcolor: '#25D366',
                  color: '#FFFFFF',
                  py: 1.8,
                  fontSize: '0.7rem',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  borderRadius: '8px',
                  '&:hover': { bgcolor: '#128C7E' },
                  '&.Mui-disabled': { bgcolor: '#E8DDD0', color: '#6B6B6B' }
                }}
              >
                {inStock ? 'Order on WhatsApp' : 'Out of Stock'}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={onClose}
                sx={{
                  borderColor: '#E8DDD0',
                  color: '#1A1A1A',
                  py: 1.8,
                  px: 2,
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  borderRadius: '8px',
                  whiteSpace: 'normal',
                  lineHeight: 1.2,
                  '&:hover': { borderColor: '#0A3B24', color: '#0A3B24', bgcolor: 'transparent' }
                }}
              >
                Continue Browsing
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

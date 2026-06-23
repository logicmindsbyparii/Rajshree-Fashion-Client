import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import gsap from 'gsap';
import { useProducts } from '../../context/ProductContext';
import ProductCard from './ProductCard';
import { LuxurySkeletonGrid } from '../common/LuxurySkeleton';

export default function ProductGrid({ filters = {} }) {
  const { products, loading } = useProducts();
  const gridRef = useRef(null);

  // Filter products based on active filters
  const filteredProducts = products.filter((product) => {
    if (filters.fabric_type && product.fabric_type !== filters.fabric_type) return false;
    if (filters.collection && product.collection_name !== filters.collection) return false;
    if (filters.availability === 'available' && (!product.is_available || product.stock_quantity <= 0)) return false;
    if (filters.availability === 'unavailable' && (product.is_available && product.stock_quantity > 0)) return false;
    return true;
  });

  // Stagger entrance animation
  useEffect(() => {
    const cards = gridRef.current?.children;
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          overwrite: 'auto'
        }
      );
    }, [cards]);

    return () => ctx.revert();
  }, [filteredProducts]);

  if (loading) {
    return <LuxurySkeletonGrid count={8} />;
  }

  if (filteredProducts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            color: '#6B6B6B',
            fontSize: '1.2rem',
            mb: 1
          }}
        >
          No suits found
        </Typography>
        <Typography variant="body2" sx={{ color: '#6B6B6B', maxWidth: 400, mx: 'auto', lineHeight: 1.8 }}>
          Try adjusting your filters to discover more from our collection.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={gridRef}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: 'repeat(3, 1fr)' },
        gap: 3
      }}
    >
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}

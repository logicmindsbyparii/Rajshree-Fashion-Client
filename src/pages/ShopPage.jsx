import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/shop/ProductGrid';
import Filters from '../components/shop/Filters';
import AnimatedSection from '../components/common/AnimatedSection';

export default function ShopPage() {
  const { fabricTypes, collections, fetchProducts } = useProducts();
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Parse URL params for collection on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const collection = params.get('collection');
    if (collection) {
      setActiveFilters(prev => ({ ...prev, collection }));
    }
  }, []);

  // Clean URL after reading params
  useEffect(() => {
    if (window.location.search) {
      window.history.replaceState({}, '', '/shop');
    }
  }, []);

  const filterCount = Object.keys(activeFilters).length;

  return (
    <Box sx={{ pt: { xs: 10, md: 12 }, pb: { xs: 8, md: 12 }, bgcolor: '#FFF8F0', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Page Header */}
        <AnimatedSection>
          <Box sx={{ mb: { xs: 5, md: 7 } }}>
            <Typography
              variant="overline"
              sx={{ color: '#C9A96E', mb: 1, display: 'block' }}
            >
              Our Collection
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#1A1A1A',
                fontSize: { xs: '2rem', md: '2.8rem' },
                fontWeight: 600,
                mb: 1.5
              }}
            >
              Semi-Stitched Suits
            </Typography>
            <Typography variant="body1" sx={{ color: '#6B6B6B', fontSize: '0.9rem', maxWidth: 520, lineHeight: 1.8 }}>
              Discover our curated collection of handcrafted semi-stitched suits. Each piece is a testament
              to our commitment to quality, elegance, and timeless style for the modern woman.
            </Typography>
          </Box>
        </AnimatedSection>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          {/* Filters Sidebar */}
          <Grid item xs={12} md={3}>
            <Filters
              fabricTypes={fabricTypes}
              collections={collections}
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
            />
          </Grid>

          {/* Product Grid */}
          <Grid item xs={12} md={9}>
            {/* Results bar */}
            <Box sx={{ mb: 2.5, px: 0.5, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ color: '#6B6B6B', fontSize: '0.65rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                >
                  {filterCount > 0 ? `${filterCount} Filter${filterCount > 1 ? 's' : ''} Active` : 'All Suits'}
                </Typography>
              </Box>
              {filterCount > 0 && (
                <Typography
                  variant="caption"
                  onClick={() => setActiveFilters({})}
                  sx={{
                    color: '#0A3B24',
                    fontSize: '0.6rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'color 0.3s',
                    '&:hover': { color: '#062617' }
                  }}
                >
                  Clear All
                </Typography>
              )}
            </Box>

            <ProductGrid filters={activeFilters} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

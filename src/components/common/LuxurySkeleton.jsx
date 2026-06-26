import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

/**
 * LuxurySkeletonCard - Premium skeleton for product cards
 */
export function LuxurySkeletonCard() {
  return (
    <Box sx={{ border: '1px solid #E8DDD0', bgcolor: '#FDF8F3', overflow: 'hidden' }}>
      <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 0, transform: 'none' }} />
      <Box sx={{ p: 3 }}>
        <Skeleton width="60%" height={20} sx={{ mb: 1, transform: 'none' }} />
        <Skeleton width="40%" height={16} sx={{ mb: 2, transform: 'none' }} />
        <Skeleton width="30%" height={24} sx={{ transform: 'none' }} />
      </Box>
    </Box>
  );
}

/**
 * LuxurySkeletonGrid - A grid of skeleton cards for product loading
 */
export function LuxurySkeletonGrid({ count = 4 }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <LuxurySkeletonCard key={i} />
      ))}
    </Box>
  );
}

/**
 * LuxurySkeletonText - Single glowing text line skeleton
 */
export function LuxurySkeletonText({ width = '80%', height = 16, mb = 1 }) {
  return (
    <Skeleton
      variant="text"
      width={width}
      height={height}
      sx={{
        transform: 'none',
        mb,
        bgcolor: '#F0E8DD',
        '&::after': {
          background: 'linear-gradient(90deg, transparent, rgba(255,248,240,0.6), transparent)'
        }
      }}
    />
  );
}

/**
 * LuxurySkeletonHero - Skeleton for the hero section
 */
export function LuxurySkeletonHero() {
  return (
    <Box sx={{ height: '100vh', bgcolor: '#F0E8DD', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 3 }}>
      <Skeleton variant="text" width={400} height={80} sx={{ transform: 'none', bgcolor: '#E8DDD0' }} />
      <Skeleton variant="text" width={300} height={24} sx={{ transform: 'none', bgcolor: '#E8DDD0' }} />
      <Skeleton variant="rectangular" width={180} height={50} sx={{ transform: 'none', bgcolor: '#E8DDD0', mt: 2 }} />
    </Box>
  );
}

/**
 * LuxuryLoadingScreen - Full-page loading with brand
 */
export default function LuxuryLoadingScreen() {
  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#FFF8F0',
      gap: 4
    }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: '"Playfair Display", serif',
          color: '#0A3B24',
          fontWeight: 600,
          letterSpacing: '0.05em'
        }}
      >
        Rajshree
      </Typography>
      <Box sx={{ width: 40, height: 40, border: '2px solid #E8DDD0', borderTop: '2px solid #0A3B24', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </Box>
  );
}

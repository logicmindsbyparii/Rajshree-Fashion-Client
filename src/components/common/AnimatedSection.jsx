import React from 'react';
import { Box } from '@mui/material';
import { useGsapReveal } from '../../hooks/useGsap';

/**
 * AnimatedSection - Wraps children with GSAP scroll-triggered fade-in animation
 * 
 * Props:
 * - delay: Animation delay (default: 0)
 * - stagger: Stagger delay for children (default: 0)
 * - y: Vertical offset (default: 60)
 * - duration: Animation duration (default: 1)
 * - sx: Additional MUI Box sx props
 * - as: HTML element type (default: 'div')
 */
export default function AnimatedSection({ children, delay = 0, stagger = 0, y = 60, duration = 1, sx = {}, ...props }) {
  const ref = useGsapReveal({ delay, stagger, y, duration });

  return (
    <Box ref={ref} sx={{ ...sx }} {...props}>
      {children}
    </Box>
  );
}

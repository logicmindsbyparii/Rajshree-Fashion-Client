import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AnimatedSection from '../common/AnimatedSection';

export default function Filters({ fabricTypes, collections, activeFilters, onFilterChange }) {
  const [showMobile, setShowMobile] = useState(false);

  const handleFilter = (key, value) => {
    const newFilters = { ...activeFilters };
    if (newFilters[key] === value) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  const FilterChip = ({ label, selected, onClick }) => (
    <Chip
      label={label}
      onClick={onClick}
      variant={selected ? 'filled' : 'outlined'}
      size="small"
      sx={{
        borderRadius: '6px',
        fontFamily: '"Inter", sans-serif',
        fontSize: '0.65rem',
        letterSpacing: '0.05em',
        height: 32,
        fontWeight: selected ? 500 : 400,
        bgcolor: selected ? '#0A3B24' : 'transparent',
        color: selected ? '#FFF8F0' : '#1A1A1A',
        borderColor: selected ? '#0A3B24' : '#D4A574',
        '&:hover': {
          bgcolor: selected ? '#062617' : 'rgba(10,59,36,0.04)',
          borderColor: '#0A3B24'
        },
        '& .MuiChip-label': { px: 1.5 },
        transition: 'all 0.25s ease'
      }}
    />
  );

  const filterContent = (
    <Box>
      {/* Fabric Type */}
      {fabricTypes.length > 0 && (
        <Box sx={{ mb: 3.5 }}>
          <Typography
            variant="caption"
            sx={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: '#6B6B6B', mb: 1.5, display: 'block', textTransform: 'uppercase', fontWeight: 500 }}
          >
            Fabric Type
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {fabricTypes.map((fabric) => (
              <FilterChip
                key={fabric}
                label={fabric}
                selected={activeFilters.fabric_type === fabric}
                onClick={() => handleFilter('fabric_type', fabric)}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Collection */}
      {collections.length > 0 && (
        <Box sx={{ mb: 3.5 }}>
          <Typography
            variant="caption"
            sx={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: '#6B6B6B', mb: 1.5, display: 'block', textTransform: 'uppercase', fontWeight: 500 }}
          >
            Collection
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {collections.map((col) => (
              <FilterChip
                key={col}
                label={col}
                selected={activeFilters.collection === col}
                onClick={() => handleFilter('collection', col)}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Availability */}
      <Box sx={{ mb: 1 }}>
        <Typography
          variant="caption"
          sx={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: '#6B6B6B', mb: 1.5, display: 'block', textTransform: 'uppercase', fontWeight: 500 }}
        >
          Availability
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {[
            { value: 'available', label: 'In Stock' },
            { value: 'unavailable', label: 'Out of Stock' }
          ].map((opt) => (
            <FilterChip
              key={opt.value}
              label={opt.label}
              selected={activeFilters.availability === opt.value}
              onClick={() => handleFilter('availability', opt.value)}
            />
          ))}
        </Box>
      </Box>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Box sx={{ mt: 3.5, pt: 3.5, borderTop: '1px solid #E8DDD0' }}>
          <Chip
            icon={<ClearAllIcon sx={{ fontSize: 14 }} />}
            label="Clear All Filters"
            onClick={clearFilters}
            variant="outlined"
            size="small"
            sx={{
              borderRadius: '6px',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              color: '#0A3B24',
              borderColor: '#0A3B24',
              height: 32,
              '&:hover': { bgcolor: 'rgba(10,59,36,0.04)' }
            }}
          />
        </Box>
      )}
    </Box>
  );

  return (
    <AnimatedSection y={30} delay={0.1}>
      <Box
        sx={{
          border: '1px solid #E8DDD0',
          bgcolor: '#FDF8F3',
          p: { xs: 2.5, md: 4 },
          mb: { xs: 1, md: 0 },
          borderRadius: '8px'
        }}
      >
        {/* Mobile Toggle */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            mb: showMobile ? 2 : 0
          }}
          onClick={() => setShowMobile(!showMobile)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TuneIcon sx={{ fontSize: 18, color: '#C9A96E' }} />
            <Typography
              variant="caption"
              sx={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#1A1A1A', textTransform: 'uppercase', fontWeight: 500 }}
            >
              Filters
              {hasActiveFilters && (
                <Box component="span" sx={{ ml: 1, color: '#0A3B24', fontWeight: 600 }}>
                  ({Object.keys(activeFilters).length})
                </Box>
              )}
            </Typography>
          </Box>
          <IconButton size="small" sx={{ color: '#6B6B6B' }}>
            {showMobile ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        {/* Desktop always visible, mobile collapsible */}
        <Box sx={{ display: { xs: showMobile ? 'block' : 'none', md: 'block' } }}>
          {filterContent}
        </Box>
      </Box>
    </AnimatedSection>
  );
}

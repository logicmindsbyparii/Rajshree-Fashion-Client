import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import LogoutIcon from '@mui/icons-material/Logout';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import ProductForm from './ProductForm';
import InventoryTable from './InventoryTable';
import LanguageToggle from '../common/LanguageToggle';

export default function AdminDashboard() {
  const { products } = useProducts();
  const { user, logout } = useAuth();
  const [editProduct, setEditProduct] = useState(null);

  const totalProducts = products.length;
  const inStock = products.filter(p => p.is_available && p.stock_quantity > 0).length;
  const lowStock = products.filter(p => p.stock_quantity > 0 && p.stock_quantity < 10).length;
  const totalValue = products.reduce((sum, p) => sum + (parseFloat(p.price) * (p.stock_quantity || 0)), 0);

  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      icon: InventoryIcon,
      color: '#0A3B24',
      bgColor: 'rgba(10,59,36,0.06)'
    },
    {
      label: 'In Stock',
      value: inStock,
      icon: CheckCircleIcon,
      color: '#2E7D32',
      bgColor: 'rgba(46,125,50,0.06)'
    },
    {
      label: 'Low Stock',
      value: lowStock,
      icon: WarningIcon,
      color: '#E65100',
      bgColor: 'rgba(230,81,0,0.06)'
    },
    {
      label: 'Inventory Value',
      value: `₹${totalValue.toLocaleString('en-IN')}`,
      icon: MonetizationOnIcon,
      color: '#C9A96E',
      bgColor: 'rgba(201,169,110,0.06)'
    }
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: '#FFF8F0', minHeight: '100vh', pt: { xs: 10, md: 12 } }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ color: '#C9A96E', mb: 1, fontSize: '0.6rem', letterSpacing: '0.2em' }}
            >
              ADMIN PORTAL
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#1A1A1A',
                fontSize: { xs: '1.6rem', md: '2rem' },
                mb: 0.5
              }}
            >
              Inventory Management
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B6B6B', fontSize: '0.85rem' }}>
              Welcome back, {user?.name || 'Admin'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <LanguageToggle isAdminPage={true} />
            <Button
              variant="outlined"
              onClick={logout}
              startIcon={<LogoutIcon />}
              sx={{
                color: '#0A3B24',
                borderColor: '#0A3B24',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                px: 3,
                '&:hover': {
                  bgcolor: 'rgba(10,59,36,0.05)',
                  borderColor: '#062617'
                }
              }}
            >
              Sign Out
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {stats.map((stat) => (
            <Grid item xs={6} md={3} key={stat.label}>
              <Paper
                sx={{
                  p: { xs: 2, md: 3 },
                  bgcolor: '#FDF8F3',
                  border: '1px solid #E8DDD0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: stat.bgColor,
                    flexShrink: 0
                  }}
                >
                  <stat.icon sx={{ color: stat.color, fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: '#6B6B6B', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      color: '#1A1A1A',
                      fontSize: { xs: '1.2rem', md: '1.5rem' },
                      fontWeight: 600,
                      mt: 0.25
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Form + Inventory Grid */}
        <Grid container spacing={4}>
          {/* Product Form */}
          <Grid item xs={12} lg={5}>
            <Box
              id="product-form-box"
              sx={{
                border: '1px solid #E8DDD0',
                bgcolor: '#FDF8F3',
                p: { xs: 2.5, md: 4 },
                position: 'sticky',
                top: 100
              }}
            >
              <ProductForm
                editProduct={editProduct}
                onCancel={() => setEditProduct(null)}
              />
            </Box>
          </Grid>

          {/* Inventory Table */}
          <Grid item xs={12} lg={7}>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ color: '#6B6B6B', mb: 2, fontSize: '0.6rem', letterSpacing: '0.15em' }}
              >
                CURRENT INVENTORY ({totalProducts} items)
              </Typography>
              <InventoryTable onEdit={(product) => {
                setEditProduct(product);
                const formBox = document.getElementById('product-form-box');
                if (formBox) {
                  formBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  window.scrollBy(0, -100);
                }
              }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

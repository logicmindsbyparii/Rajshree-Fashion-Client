import React from 'react';
import { Box, Container, Typography, Button, Grid, IconButton, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';
import { getProductImage } from '../constants/images';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <Box sx={{ pt: 15, pb: 10, minHeight: '80vh', bgcolor: '#FFF8F0', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontFamily: '"Playfair Display", serif', color: '#1A1A1A', mb: 3 }}>
            Your Cart is Empty
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/shop')}
            sx={{ bgcolor: '#6B1D2A', '&:hover': { bgcolor: '#3D0C11' }, py: 1.5, px: 4 }}
          >
            Continue Shopping
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 15, pb: 10, minHeight: '100vh', bgcolor: '#FFF8F0' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontFamily: '"Playfair Display", serif', color: '#1A1A1A', mb: 5 }}>
          Shopping Cart
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Box key={`${item.id}-${item.size}`} sx={{ display: 'flex', mb: 3, p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <Box component="img" src={getProductImage(item)} alt={item.title} sx={{ width: 100, height: 120, objectFit: 'cover', borderRadius: 1 }} />
                <Box sx={{ ml: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>{item.title}</Typography>
                    <IconButton onClick={() => removeFromCart(item.id, item.size)} color="error" size="small"><DeleteOutlineIcon /></IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary">{item.fabric_type} · Size: {item.size}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #E8DDD0', borderRadius: 1 }}>
                      <IconButton onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} size="small"><RemoveIcon fontSize="small" /></IconButton>
                      <Typography sx={{ px: 2, fontSize: '0.9rem' }}>{item.quantity}</Typography>
                      <IconButton onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} size="small"><AddIcon fontSize="small" /></IconButton>
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#6B1D2A' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 100 }}>
              <Typography variant="h6" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>Order Summary</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography>₹{cartTotal.toLocaleString('en-IN')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography>Calculated at checkout</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#6B1D2A' }}>₹{cartTotal.toLocaleString('en-IN')}</Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/checkout')}
                sx={{ bgcolor: '#6B1D2A', '&:hover': { bgcolor: '#3D0C11' }, py: 1.5 }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

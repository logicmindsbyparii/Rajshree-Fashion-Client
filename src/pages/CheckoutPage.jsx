import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Paper, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (cartItems.length === 0 && !success) {
    navigate('/shop');
    return null;
  }

  if (success) {
    return (
      <Box sx={{ pt: 20, pb: 10, minHeight: '80vh', bgcolor: '#FFF8F0', textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h3" sx={{ fontFamily: '"Playfair Display", serif', color: '#0A3B24', mb: 3 }}>
            Order Placed Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Thank you for shopping with Rajshree Fashion. We have received your order and will process it shortly.
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 15, pb: 10, minHeight: '100vh', bgcolor: '#FFF8F0' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontFamily: '"Playfair Display", serif', color: '#1A1A1A', mb: 5 }}>
          Checkout
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>Billing Details</Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="First Name" required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Last Name" required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Email Address" type="email" required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Address" required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="City" required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Postal Code" required />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset" sx={{ mt: 2, mb: 1 }}>
                      <FormLabel component="legend" sx={{ fontFamily: '"Playfair Display", serif', color: '#1A1A1A', mb: 1 }}>Payment Method</FormLabel>
                      <RadioGroup
                        row
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <FormControlLabel value="razorpay" control={<Radio sx={{ color: '#C9A96E', '&.Mui-checked': { color: '#0A3B24' } }} />} label="Razorpay" />
                        <FormControlLabel value="stripe" control={<Radio sx={{ color: '#C9A96E', '&.Mui-checked': { color: '#0A3B24' } }} />} label="Stripe" />
                        <FormControlLabel value="cod" control={<Radio sx={{ color: '#C9A96E', '&.Mui-checked': { color: '#0A3B24' } }} />} label="Cash on Delivery" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ bgcolor: '#0A3B24', '&:hover': { bgcolor: '#062617' }, py: 1.5, mt: 2 }}
                    >
                      Place Order (₹{cartTotal.toLocaleString('en-IN')})
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>Order Summary</Typography>
              {cartItems.map(item => (
                <Box key={`${item.id}-${item.size}`} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">{item.title} (Size: {item.size}) x {item.quantity}</Typography>
                  <Typography variant="body2">₹{(item.price * item.quantity).toLocaleString('en-IN')}</Typography>
                </Box>
              ))}
              <Box sx={{ my: 2, borderBottom: '1px solid #E8DDD0' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Total</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#0A3B24' }}>₹{cartTotal.toLocaleString('en-IN')}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

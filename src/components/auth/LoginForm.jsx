import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Link, Alert,
  InputAdornment, IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const userData = await login(formData.email, formData.password);
      navigate(userData.role === 'admin' ? '/secret-admin-rajshree' : '/shop');
    } catch {
      // Error is already set in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Playfair Display", serif',
          color: '#1A1A1A',
          fontSize: { xs: '1.6rem', md: '1.8rem' },
          mb: 0.5
        }}
      >
        Welcome Back
      </Typography>
      <Typography variant="body2" sx={{ color: '#6B6B6B', mb: 4, fontSize: '0.85rem' }}>
        Sign in to access your account and orders.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 0, fontSize: '0.8rem' }}>
          {error}
        </Alert>
      )}

      {resetSent && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 0, fontSize: '0.8rem' }}>
          Password reset link has been sent to your email! (Please contact your administrator if not received).
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        sx={{ mb: 2.5 }}
        size="medium"
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        sx={{ mb: 3 }}
        size="medium"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                size="small"
                sx={{ color: '#6B6B6B' }}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, mt: -2 }}>
        <Button 
          onClick={() => {
            if (!formData.email) {
              setErrors({ email: 'Please enter your email first to reset password' });
              return;
            }
            setResetSent(true);
            setErrors({});
          }} 
          sx={{ 
            fontSize: '0.7rem', 
            textTransform: 'none', 
            color: '#6B6B6B', 
            p: 0, 
            minWidth: 0,
            '&:hover': { color: '#0A3B24', bgcolor: 'transparent', textDecoration: 'underline' } 
          }}
        >
          Forgot password?
        </Button>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{
          py: 1.8,
          mb: 3,
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          bgcolor: '#0A3B24',
          '&:hover': { bgcolor: '#062617' },
          '&.Mui-disabled': { bgcolor: 'rgba(10,59,36,0.3)' }
        }}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
    </Box>
  );
}

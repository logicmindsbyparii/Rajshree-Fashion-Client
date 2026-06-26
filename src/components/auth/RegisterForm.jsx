import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Link, Alert,
  InputAdornment, IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../context/AuthContext';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();

  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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
      await register(formData.name, formData.email, formData.password);
      navigate('/shop');
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
        Create Account
      </Typography>
      <Typography variant="body2" sx={{ color: '#6B6B6B', mb: 4, fontSize: '0.85rem' }}>
        Join the Rajshree Fashion community.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 0, fontSize: '0.8rem' }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        sx={{ mb: 2.5 }}
        size="medium"
      />

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
        sx={{ mb: 2.5 }}
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

      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        sx={{ mb: 3 }}
        size="medium"
      />

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
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#6B6B6B', fontSize: '0.8rem' }}>
          Already have an account?{' '}
          <Link
            component={RouterLink}
            to="/login"
            sx={{
              color: '#0A3B24',
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

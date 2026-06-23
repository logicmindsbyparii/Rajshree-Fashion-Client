import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import LuxuryLoadingScreen from '../components/common/LuxurySkeleton';

export default function AdminPage() {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login');
    } else if (!loading && isLoggedIn && !isAdmin) {
      navigate('/shop');
    }
  }, [loading, isLoggedIn, isAdmin, navigate]);

  if (loading) {
    return <LuxuryLoadingScreen />;
  }

  if (!isLoggedIn || !isAdmin) {
    return null;
  }

  return <AdminDashboard />;
}

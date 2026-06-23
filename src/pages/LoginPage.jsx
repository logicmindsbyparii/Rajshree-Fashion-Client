import React, { useEffect } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/shop');
    }
  }, [isLoggedIn, navigate]);

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your account, track orders, and manage your preferences for a tailored experience."
    >
      <LoginForm />
    </AuthLayout>
  );
}

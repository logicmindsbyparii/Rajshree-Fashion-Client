import React, { useEffect } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/shop');
    }
  }, [isLoggedIn, navigate]);

  return (
    <AuthLayout
      title="Join the Legacy"
      subtitle="Create your account to explore our exclusive collection and enjoy a personalized shopping experience."
    >
      <RegisterForm />
    </AuthLayout>
  );
}

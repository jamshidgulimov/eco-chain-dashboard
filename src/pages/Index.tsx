import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import UserDashboard from '@/components/dashboards/UserDashboard';
import CollectionPointDashboard from '@/components/dashboards/CollectionPointDashboard';
import FactoryDashboard from '@/components/dashboards/FactoryDashboard';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  switch (user.role) {
    case 'user':
      return <UserDashboard />;
    case 'collection-point':
      return <CollectionPointDashboard />;
    case 'factory':
      return <FactoryDashboard />;
    default:
      return <LoginForm />;
  }
};

export default Index;

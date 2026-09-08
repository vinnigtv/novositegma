import React, { useState } from 'react';
import { isAuthenticated } from '../lib/auth';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminDashboard } from '../components/admin/AdminDashboard';

export const AdminPage: React.FC = () => {
  const [autenticado, setAutenticado] = useState<boolean>(() => isAuthenticated());

  if (!autenticado) {
    return <AdminLogin onSucesso={() => setAutenticado(true)} />;
  }
  return <AdminDashboard />;
};
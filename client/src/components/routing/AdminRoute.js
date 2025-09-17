import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const AdminRoute = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, user } = authContext;

  if (loading) return <Spinner />;

  return isAuthenticated && user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;

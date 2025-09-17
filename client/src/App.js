import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/pages/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Grievance from './components/grievances/Grievance';
import AdminDashboard from './components/pages/AdminDashboard';
import AuthorityManager from './components/admin/AuthorityManager';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import AuthState from './context/auth/AuthState';
import GrievanceState from './context/grievance/GrievanceState';
import AuthorityState from './context/authority/AuthorityState';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <GrievanceState>
        <AuthorityState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Routes>
                  <Route exact path="/" element={<Landing />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<PrivateRoute />}>
                    <Route index element={<Dashboard />} />
                  </Route>
                  <Route path="/grievance/:id" element={<PrivateRoute />}>
                    <Route index element={<Grievance />} />
                  </Route>
                  <Route path="/admin" element={<AdminRoute />}>
                    <Route index element={<AdminDashboard />} />
                <Route path="authorities" element={<AuthorityManager />} />
                  </Route>
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AuthorityState>
      </GrievanceState>
    </AuthState>
  );
};

export default App;

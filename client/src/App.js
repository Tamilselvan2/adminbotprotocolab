import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/pages/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Grievance from './components/grievances/Grievance';
import AuthState from './context/auth/AuthState';
import GrievanceState from './context/grievance/GrievanceState';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <GrievanceState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/grievance/:id" element={<Grievance />} />
              </Routes>
            </div>
          </Fragment>
        </Router>
      </GrievanceState>
    </AuthState>
  );
};

export default App;

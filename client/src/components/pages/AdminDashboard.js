import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="large text-primary">Admin Dashboard</h1>
      <p className="lead">Welcome, Admin</p>
      <div className="admin-menu">
        <Link to="/admin/authorities" className="btn btn-light">Manage Authorities</Link>
        {/* <Link to="/admin/users" className="btn btn-light">Manage Users</Link> */}
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useContext, useEffect } from 'react';
import GrievanceContext from '../../context/grievance/grievanceContext';
import AuthContext from '../../context/auth/authContext';
import GrievanceItem from '../grievances/GrievanceItem';
import GrievanceForm from '../grievances/GrievanceForm';

const Dashboard = () => {
  const grievanceContext = useContext(GrievanceContext);
  const authContext = useContext(AuthContext);

  const { grievances, getGrievances, loading } = grievanceContext;

  useEffect(() => {
    authContext.loadUser();
    getGrievances();
    // eslint-disable-next-line
  }, []);

  if (grievances.length === 0 && !loading) {
    return <h4>No grievances found.</h4>;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Grievance Feed</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {authContext.user && authContext.user.name}
      </p>
      <GrievanceForm />
      <div className="posts">
        {grievances.map((grievance) => (
          <GrievanceItem key={grievance._id} grievance={grievance} />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;

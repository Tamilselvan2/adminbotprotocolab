import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GrievanceContext from '../../context/grievance/grievanceContext';

const GrievanceItem = ({ grievance }) => {
  const { _id, title, description, createdAt, status, deadline } = grievance;
  const grievanceContext = useContext(GrievanceContext);
  const { repostGrievance } = grievanceContext;

  const onRepost = () => {
    repostGrievance(_id);
  };

  const canRepost = () => {
    const now = new Date();
    if (status === 'open') {
      const createdDate = new Date(createdAt);
      const hoursSinceCreation = (now - createdDate) / (1000 * 60 * 60);
      return hoursSinceCreation >= 24;
    }
    if (status === 'in-progress' && deadline) {
      const deadlineDate = new Date(deadline);
      return now > deadlineDate;
    }
    return false;
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/grievance/${_id}`}>
          <h4>{title}</h4>
        </Link>
        <p className="my-1">{description}</p>
        <p className="post-date">Posted on {new Date(createdAt).toLocaleDateString()}</p>
        <Link to={`/grievance/${_id}`} className="btn btn-primary">
          View Discussion
        </Link>
        {canRepost() && (
          <button onClick={onRepost} className="btn btn-dark">
            Repost
          </button>
        )}
      </div>
    </div>
  );
};

export default GrievanceItem;

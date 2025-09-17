import React from 'react';
import { Link } from 'react-router-dom';

const GrievanceItem = ({ grievance: { _id, title, description, createdAt } }) => {
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
      </div>
    </div>
  );
};

export default GrievanceItem;

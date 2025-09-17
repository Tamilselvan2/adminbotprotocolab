import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GrievanceContext from '../../context/grievance/grievanceContext';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import Spinner from '../layout/Spinner';

const Grievance = () => {
  const { id } = useParams();
  const grievanceContext = useContext(GrievanceContext);
  const { getGrievance, grievance, loading, comments } = grievanceContext;

  useEffect(() => {
    getGrievance(id);
    // eslint-disable-next-line
  }, [id]);

  if (loading || grievance === null) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <h1>{grievance.title}</h1>
      <p>{grievance.description}</p>
      <p>
        <strong>Location:</strong> {grievance.location}
      </p>
      <p>
        <strong>Status:</strong> {grievance.status}
      </p>
      <CommentForm grievanceId={grievance._id} />
      <div className="comments">
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Grievance;

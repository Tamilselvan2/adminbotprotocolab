import React, { useState, useContext } from 'react';
import GrievanceContext from '../../context/grievance/grievanceContext';

const CommentForm = ({ grievanceId }) => {
  const grievanceContext = useContext(GrievanceContext);
  const { addComment } = grievanceContext;

  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(grievanceId, { text });
    setText('');
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this grievance"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;

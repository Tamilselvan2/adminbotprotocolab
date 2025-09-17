import React from 'react';

const CommentItem = ({ comment }) => {
  return (
    <div className="comment bg-light p-1 my-1">
      <p>{comment.text}</p>
      <p className="post-date">
        Posted by {comment.createdBy.name} on {new Date(comment.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CommentItem;

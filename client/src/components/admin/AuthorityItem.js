import React, { useContext } from 'react';
import AuthorityContext from '../../context/authority/authorityContext';

const AuthorityItem = ({ authority }) => {
  const authorityContext = useContext(AuthorityContext);
  const { deleteAuthority, setCurrentAuthority } = authorityContext;

  const { _id, name, level, members } = authority;

  const onDelete = () => {
    deleteAuthority(_id);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span style={{ float: 'right' }} className={'badge '}>
          Level: {level}
        </span>
      </h3>
      <ul className="list">
        {members && members.length > 0 && (
          <li>
            <i className="fas fa-users" /> {members.map(member => member.name).join(', ')}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrentAuthority(authority)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default AuthorityItem;

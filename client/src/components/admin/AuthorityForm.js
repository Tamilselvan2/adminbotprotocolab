import React, { useState, useContext, useEffect } from 'react';
import AuthorityContext from '../../context/authority/authorityContext';

const AuthorityForm = () => {
  const authorityContext = useContext(AuthorityContext);
  const { addAuthority, updateAuthority, clearCurrentAuthority, current } = authorityContext;

  useEffect(() => {
    if (current !== null) {
      setAuthority(current);
    } else {
      setAuthority({
        name: '',
        level: 1,
        higherAuthority: '',
      });
    }
  }, [authorityContext, current]);

  const [authority, setAuthority] = useState({
    name: '',
    level: 1,
    higherAuthority: '',
  });

  const { name, level, higherAuthority } = authority;

  const onChange = (e) =>
    setAuthority({ ...authority, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addAuthority(authority);
    } else {
      updateAuthority(authority);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrentAuthority();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Authority' : 'Add Authority'}</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="number"
        placeholder="Level"
        name="level"
        value={level}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Higher Authority ID"
        name="higherAuthority"
        value={higherAuthority}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value={current ? 'Update Authority' : 'Add Authority'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default AuthorityForm;

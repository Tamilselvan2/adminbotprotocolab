import React, { useEffect, useContext } from 'react';
import AuthorityContext from '../../context/authority/authorityContext';
import AuthorityItem from './AuthorityItem';
import AuthorityForm from './AuthorityForm';

const AuthorityManager = () => {
  const authorityContext = useContext(AuthorityContext);
  const { authorities, getAuthorities } = authorityContext;

  useEffect(() => {
    getAuthorities();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className="large text-primary">Authority Management</h1>
      <AuthorityForm />
      <div>
        {authorities.map((authority) => (
          <AuthorityItem key={authority._id} authority={authority} />
        ))}
      </div>
    </div>
  );
};

export default AuthorityManager;

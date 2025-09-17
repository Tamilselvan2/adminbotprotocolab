import React, { useState, useContext, useEffect } from 'react';
import GrievanceContext from '../../context/grievance/grievanceContext';
import AuthorityContext from '../../context/authority/authorityContext';

const GrievanceForm = () => {
  const grievanceContext = useContext(GrievanceContext);
  const authorityContext = useContext(AuthorityContext);
  const { addGrievance } = grievanceContext;
  const { authorities, getAuthorities } = authorityContext;

  useEffect(() => {
    getAuthorities();
    // eslint-disable-next-line
  }, []);

  const [grievance, setGrievance] = useState({
    title: '',
    description: '',
    location: '',
    authorityId: '',
  });

  const { title, description, location, authorityId } = grievance;

  const onChange = (e) =>
    setGrievance({ ...grievance, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addGrievance(grievance);
    setGrievance({
      title: '',
      description: '',
      location: '',
      authorityId: '',
    });
  };

  return (
    <div className='grievance-form'>
      <h2 className='text-primary'>Submit a Grievance</h2>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={title}
          onChange={onChange}
        />
        <textarea
          placeholder='Description'
          name='description'
          value={description}
          onChange={onChange}
        ></textarea>
        <input
          type='text'
          placeholder='Location'
          name='location'
          value={location}
          onChange={onChange}
        />
        {/* TODO: Replace with a dropdown of authorities */}
        <select name="authorityId" value={authorityId} onChange={onChange}>
          <option value="" disabled>
            Select an Authority
          </option>
          {authorities.map((authority) => (
            <option key={authority._id} value={authority._id}>
              {authority.name}
            </option>
          ))}
        </select>
        <div>
          <input
            type="submit"
            value='Submit Grievance'
            className='btn btn-primary btn-block'
          />
        </div>
      </form>
    </div>
  );
};

export default GrievanceForm;

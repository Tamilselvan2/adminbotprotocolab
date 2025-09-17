import React, { useState, useContext } from 'react';
import GrievanceContext from '../../context/grievance/grievanceContext';

const GrievanceForm = () => {
  const grievanceContext = useContext(GrievanceContext);
  const { addGrievance } = grievanceContext;

  const [grievance, setGrievance] = useState({
    title: '',
    description: '',
    location: '',
    authorityId: '', // Will be a dropdown
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
        <input
          type='text'
          placeholder='Authority ID'
          name='authorityId'
          value={authorityId}
          onChange={onChange}
        />
        <div>
          <input
            type='submit'
            value='Submit Grievance'
            className='btn btn-primary btn-block'
          />
        </div>
      </form>
    </div>
  );
};

export default GrievanceForm;

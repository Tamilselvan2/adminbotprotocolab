import React, { useReducer } from 'react';
import axios from 'axios';
import grievanceContext from './grievanceContext';
import grievanceReducer from './grievanceReducer';
import {
  GET_GRIEVANCES,
  ADD_GRIEVANCE,
  GRIEVANCE_ERROR,
  GET_GRIEVANCE,
  ADD_COMMENT,
  COMMENT_ERROR,
} from '../types';

const GrievanceState = (props) => {
  const initialState = {
    grievances: [],
    grievance: null,
    comments: [],
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(grievanceReducer, initialState);

  // Get Grievances
  const getGrievances = async () => {
    try {
      const res = await axios.get('/api/grievances');
      dispatch({
        type: GET_GRIEVANCES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GRIEVANCE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Grievance
  const addGrievance = async (grievance) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/grievances', grievance, config);
      dispatch({
        type: ADD_GRIEVANCE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GRIEVANCE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get Grievance
  const getGrievance = async (id) => {
    try {
      const res = await axios.get(`/api/grievances/${id}`);
      dispatch({
        type: GET_GRIEVANCE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GRIEVANCE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Comment
  const addComment = async (grievanceId, formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(`/api/grievances/comment/${grievanceId}`, formData, config);
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  return (
    <grievanceContext.Provider
      value={{
        grievances: state.grievances,
        grievance: state.grievance,
        comments: state.comments,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getGrievances,
        addGrievance,
        getGrievance,
        addComment,
      }}
    >
      {props.children}
    </grievanceContext.Provider>
  );
};

export default GrievanceState;

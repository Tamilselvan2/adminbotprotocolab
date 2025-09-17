import React, { useReducer } from 'react';
import axios from 'axios';
import authorityContext from './authorityContext';
import authorityReducer from './authorityReducer';
import {
  GET_AUTHORITIES,
  ADD_AUTHORITY,
  DELETE_AUTHORITY,
  UPDATE_AUTHORITY,
  AUTHORITY_ERROR,
  SET_CURRENT_AUTHORITY,
  CLEAR_CURRENT_AUTHORITY,
} from '../types';

const AuthorityState = (props) => {
  const initialState = {
    authorities: [],
    current: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(authorityReducer, initialState);

  // Get Authorities
  const getAuthorities = async () => {
    try {
      const res = await axios.get('/api/authorities');
      dispatch({ type: GET_AUTHORITIES, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTHORITY_ERROR, payload: err.response.msg });
    }
  };

  // Add Authority
  const addAuthority = async (authority) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/authorities', authority, config);
      dispatch({ type: ADD_AUTHORITY, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTHORITY_ERROR, payload: err.response.msg });
    }
  };

  // Update Authority
  const updateAuthority = async (authority) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/authorities/${authority._id}`, authority, config);
      dispatch({ type: UPDATE_AUTHORITY, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTHORITY_ERROR, payload: err.response.msg });
    }
  };

  // Delete Authority
  const deleteAuthority = async (id) => {
    try {
      await axios.delete(`/api/authorities/${id}`);
      dispatch({ type: DELETE_AUTHORITY, payload: id });
    } catch (err) {
      dispatch({ type: AUTHORITY_ERROR, payload: err.response.msg });
    }
  };

  // Set Current Authority
  const setCurrentAuthority = (authority) => {
    dispatch({ type: SET_CURRENT_AUTHORITY, payload: authority });
  };

  // Clear Current Authority
  const clearCurrentAuthority = () => {
    dispatch({ type: CLEAR_CURRENT_AUTHORITY });
  };

  return (
    <authorityContext.Provider
      value={{
        authorities: state.authorities,
        current: state.current,
        error: state.error,
        loading: state.loading,
        getAuthorities,
        addAuthority,
        updateAuthority,
        deleteAuthority,
        setCurrentAuthority,
        clearCurrentAuthority,
      }}
    >
      {props.children}
    </authorityContext.Provider>
  );
};

export default AuthorityState;

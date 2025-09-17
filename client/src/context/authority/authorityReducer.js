import {
    GET_AUTHORITIES,
    ADD_AUTHORITY,
    DELETE_AUTHORITY,
    UPDATE_AUTHORITY,
    AUTHORITY_ERROR,
    SET_CURRENT_AUTHORITY,
    CLEAR_CURRENT_AUTHORITY,
  } from '../types';

  export default (state, action) => {
    switch (action.type) {
      case GET_AUTHORITIES:
        return {
          ...state,
          authorities: action.payload,
          loading: false,
        };
      case ADD_AUTHORITY:
        return {
          ...state,
          authorities: [...state.authorities, action.payload],
          loading: false,
        };
      case UPDATE_AUTHORITY:
        return {
          ...state,
          authorities: state.authorities.map((authority) =>
            authority._id === action.payload._id ? action.payload : authority
          ),
          loading: false,
        };
      case DELETE_AUTHORITY:
        return {
          ...state,
          authorities: state.authorities.filter(
            (authority) => authority._id !== action.payload
          ),
          loading: false,
        };
      case AUTHORITY_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      case SET_CURRENT_AUTHORITY:
        return {
          ...state,
          current: action.payload,
        };
      case CLEAR_CURRENT_AUTHORITY:
        return {
          ...state,
          current: null,
        };
      default:
        return state;
    }
  };

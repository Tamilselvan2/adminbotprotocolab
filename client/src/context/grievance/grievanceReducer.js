import {
  GET_GRIEVANCES,
  ADD_GRIEVANCE,
  GRIEVANCE_ERROR,
  GET_GRIEVANCE,
  ADD_COMMENT,
  COMMENT_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_GRIEVANCES:
      return {
        ...state,
        grievances: action.payload,
        loading: false,
      };
    case GET_GRIEVANCE:
      return {
        ...state,
        grievance: action.payload.grievance,
        comments: action.payload.comments,
        loading: false,
      };
    case ADD_GRIEVANCE:
      return {
        ...state,
        grievances: [action.payload, ...state.grievances],
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        loading: false,
      };
    case GRIEVANCE_ERROR:
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

import {
  UPDATE_PROFILE,
  GET_PROFILE,
  FETCH_ERROR,
  UPDATE_ERROR,
  ON_PROCESS,
  RESET_DATA
} from '../actions/types';

const initState = { loading: false, error: '', userinfo: null };

export default (state = initState, action) => {
  switch (action.type) {
    case ON_PROCESS:
      return { loading: true };
    case GET_PROFILE:
      return { loading: false, userinfo: action.payload };
    case FETCH_ERROR:
    case UPDATE_ERROR:
      return { loading: false, error: action.err };
    case UPDATE_PROFILE:
      return { loading: false };
    case RESET_DATA:
      return initState;
    default:
      return state;
  }
};

import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlaceFormReducer from './PlaceFormReducer';
import PlaceReducer from './PlaceReducer';

export default combineReducers({
  auth: AuthReducer,
  placeForm: PlaceFormReducer,
  places: PlaceReducer
});

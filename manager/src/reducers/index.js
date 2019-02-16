import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlaceFormReducer from './PlaceFormReducer';
import PlaceReducer from './PlaceReducer';
import NavigationReducer from './NavigationReducer';

export default combineReducers({
  auth: AuthReducer,
  placeForm: PlaceFormReducer,
  places: PlaceReducer,
  navigation: NavigationReducer
});

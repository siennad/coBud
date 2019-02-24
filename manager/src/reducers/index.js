import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlaceFormReducer from './PlaceFormReducer';
import PlaceReducer from './PlaceReducer';
import NavigationReducer from './NavigationReducer';
import UsersProfileReducer from './UsersProfileReducer';
import ChatReducer from './ChatReducer';

export default combineReducers({
  auth: AuthReducer,
  placeForm: PlaceFormReducer,
  places: PlaceReducer,
  navigation: NavigationReducer,
  userProfile: UsersProfileReducer,
  chat: ChatReducer
});

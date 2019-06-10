import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlaceFormReducer from './PlaceFormReducer';
import PlaceReducer from './PlaceReducer';
import UsersProfileReducer from './UsersProfileReducer';
import ChatReducer from './ChatReducer';
import ChatPrivateReducer from './ChatPrivateReducer';

export default combineReducers({
  auth: AuthReducer,
  placeForm: PlaceFormReducer,
  places: PlaceReducer,
  userProfile: UsersProfileReducer,
  chat: ChatReducer,
  chatPrivate: ChatPrivateReducer
});

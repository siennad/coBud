import firebase from 'firebase';
import * as _ from 'lodash';

import { Actions } from 'react-native-router-flux';
import * as types from './types';

export const listUser = messageArray => ({
  type: types.LOAD_FRIEND_SUCCESS,
  payload: _.values(messageArray)
});

export const loadFriendList = () => dispatch => {
  const currentUser = firebase.auth();
  console.log(currentUser);
};

import firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';

import {
  UPDATE_PROFILE,
  GET_PROFILE,
  FETCH_ERROR,
  UPDATE_ERROR,
  ON_PROCESS,
  RESET_DATA
} from './types';

export const getUserProfile = id => async dispatch => {
  dispatch({ type: ON_PROCESS });

  return await firebase
    .database()
    .ref(`/users/${id}/profile`)
    .on('value', data => {
      if (data.exists()) {
        return dispatch({ type: GET_PROFILE, payload: data.val() });
      }
      return dispatch({ type: FETCH_ERROR, err: 'Profile not found' });
    });
};

export const updateProfile = ({ userId, value }) => async dispatch => {
  dispatch({ type: ON_PROCESS });

  return await firebase
    .database()
    .ref(`/users/${userId}/profile`)
    .set(
      {
        name: value.name,
        _id: userId,
        phone: value.phone ? value.phone : '',
        address: value.address ? value.address : '',
        city: value.city ? value.city : '',
        lng: value.lng ? value.lng : '',
        lat: value.lat ? value.lat : '',
        hobby: value.hobby ? value.hobby : ''
      },
      async err => {
        if (err) {
          await dispatch({ type: UPDATE_ERROR, err });
        }
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: value.name
          })
          .then(() => {
            dispatch({ type: UPDATE_PROFILE });
            Actions.viewprofile({ type: 'reset' });
          });
      }
    );
};

export const reset = () => ({ type: RESET_DATA });

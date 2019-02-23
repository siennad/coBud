import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  UPDATE_PROFILE,
  GET_PROFILE,
  FETCH_ERROR,
  UPDATE_ERROR,
  ON_PROCESS
} from './types';

export const getUserProfile = id => async dispatch => {
  dispatch({ type: ON_PROCESS });

  return await firebase
    .database()
    .ref(`/users/${id}/profile`)
    .on('value', data => {
      if (data.exists()) {
        console.log(data);
        dispatch({ type: GET_PROFILE, payload: data });
      }
      dispatch({ type: FETCH_ERROR, err: 'Profile not found' });
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
        phone: value.phone ? value.phone : '',
        address: value.address ? value.address : '',
        city: value.city ? value.city : '',
        lng: value.lng ? value.lng : '',
        lat: value.lat ? value.lat : '',
        hobby: value.hobby ? value.hobby : ''
      },
      async err => {
        if (err) {
          console.log(err);
          await dispatch({ type: UPDATE_ERROR, err });
        }
        await dispatch({ type: UPDATE_PROFILE });
        Actions.viewprofile();
      }
    );
  /* .then(r => {
      console.log(r);
      dispatch({ type: UPDATE_PROFILE });
      Actions.viewprofile();
    });*/
  /*   async err => {
        if (err) {
          console.log(err);
          await dispatch({ type: UPDATE_ERROR, err });
        }
        await dispatch({ type: UPDATE_PROFILE });
        Actions.viewprofile();

        firebase
          .database()
          .ref(`/users/${userId}`)
          .set({
            username: value.name,
            displayName: value.name
          })
          .then(e => {
            console.log(e);
          });
      }
    );*/
};

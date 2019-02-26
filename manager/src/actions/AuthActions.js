import firebase from 'firebase';
// import * as admin from 'firebase-admin';
import { Actions } from 'react-native-router-flux';
import * as _ from 'lodash';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  SAVE_USER_DETAIL,
  ON_PROCESS,
  FETCH_ERROR,
  FETCH_SUCCESS
} from './types';

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text
});

export const loginUser = ({ email, password }) => dispatch => {
  dispatch({ type: LOGIN_USER });

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(e =>
      // console.log(e);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

        .then(user => loginUserSuccess(dispatch, user))
        .catch(err =>
          // console.log(err);
          loginUserFail(dispatch)
        )
    );
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};

export const logoutUser = () => dispatch => {
  console.log('log out');
  dispatch({ type: LOGOUT_USER });

  firebase
    .auth()
    .signOut()
    .then(() => {
      Actions.auth();
    })
    .catch(error => {
      console.log(error);
    });
};

const saveUserDetail = (uid, email, displayName = null) => dispatch => {
  const userDetail = {
    userUid: uid,
    userEmail: email,
    userName: displayName || null
  };
  const ref = firebase.database().ref(`users/userDetail/${uid}`);
  const newRef = ref.set(userDetail);
  const loadUserDetails = firebase.database().ref('users/userDetail/');
  const newLoad = loadUserDetails.on('value', snapshot => {
    console.log('dispatch loadUserDetails-------');
    console.log(snapshot.val());
    console.log('end dispatch loadUserDetails-------');

    dispatch({
      type: SAVE_USER_DETAIL,
      payload: _.values(snapshot.val())
    });
  });
};
const loginUserSuccess = async (dispatch, user) => {
  await dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  console.log(user);
  await dispatch(saveUserDetail(user.user.uid, user.user.email, user.user.displayName));
  Actions.main();
};

// const loadUserList = () => dispatch => {
//   dispatch({
//     type: ON_PROCESS
//   });
//   console.log('load user here-------');
//   admin
//     .auth()
//     .listUsers(100)
//     .then(res => console.log(res));
// };

// const loginUserSuccess = async (dispatch, user) => {
//   await dispatch({
//     type: LOGIN_USER_SUCCESS,
//     payload: user
//   });
//   console.log(firebase.auth());
//   // await dispatch(loadUserList());
//   Actions.main();
// };

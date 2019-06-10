import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  SAVE_USER_DETAIL
} from './types';

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text.trim()
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text.trim()
});

export const loginUser = ({ email, password }) => dispatch => {
  dispatch({ type: LOGIN_USER });

  firebase
    .auth()
    .signInWithEmailAndPassword(email.trim(), password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(e => {
      console.log(e);
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password)

        .then(user => loginUserSuccess(dispatch, user))
        .catch(err => {
          console.log(err);
          return loginUserFail(dispatch);
        });
    });
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
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

const saveUserDetail = (uid, email, displayName = null) => dispatch => {
  const userDetail = {
    userUid: uid,
    userEmail: email,
    userName: displayName || null
  };
  const ref = firebase.database().ref(`userDetail/${uid}`);
  const newRef = ref.set(userDetail);
  const loadUserDetails = firebase.database().ref('userDetail');
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

export const logoutUser = () => dispatch => {
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

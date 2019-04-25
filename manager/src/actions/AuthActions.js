import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from "./types";
import axios from 'axios';

export const google = axios.get('google.com').then(r=>console.log(r));

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

  Actions.main();
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

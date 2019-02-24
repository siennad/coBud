import firebase from 'firebase';
import * as _ from 'lodash';
import {
  CHAT_MESSAGE_LOADING,
  CHAT_MESSAGE_SUCCESS,
  CHAT_MESSAGE_ERROR,
  CHAT_LOAD_MESSAGES_SUCCESS,
  CHAT_LOAD_MESSAGES_ERROR
} from './types';

//const FIREBASE_REF_LOCAL_MESSAGES = firebase.database().ref('messages');
const FIREBASE_REF_MESSAGES_LIMIT = 20;

export const sendMessage = (message, local) => dispatch => {
  dispatch(chatMessageLoading());

  const currentUser = firebase.auth().currentUser;
  const createdAt = new Date().getTime();
  const chatMessage = {
    text: message,
    createdAt,
    user: {
      id: currentUser.uid,
      email: currentUser.displayName
        ? currentUser.displayName
        : currentUser.email
    }
  };
  if (local) {
    //if this is the local chat room
    firebase
      .database()
      .ref('messages')
      .push()
      .set(chatMessage, error => {
        if (error) {
          dispatch(chatMessageError(error.message));
        } else {
          dispatch(chatMessageSuccess());
        }
      });
  } else {
    //this is the private chat
  }
};

export const loadMessages = local => dispatch => {
  if (local) {
    dispatch(chatMessageLoading());

    firebase
      .database()
      .ref('messages')
      .limitToLast(FIREBASE_REF_MESSAGES_LIMIT)
      .on(
        'value',
        snapshot => {
          console.log(snapshot.val());
          const msg = _.values(snapshot.val());
          console.log('--- values');
          console.log(msg);
          dispatch(loadMessagesSuccess(msg));
        },
        errorObject => {
          dispatch(loadMessagesError(errorObject.message));
        }
      );
  }
};

export const turnOffChat = local => {
  if (local) {
    firebase
      .database()
      .ref('messages')
      .off();
  }
};

const chatMessageLoading = () => ({
  type: CHAT_MESSAGE_LOADING
});

const chatMessageSuccess = () => ({
  type: CHAT_MESSAGE_SUCCESS
});

const chatMessageError = error => ({
  type: CHAT_MESSAGE_ERROR,
  error
});

const loadMessagesSuccess = messages => ({
  type: CHAT_LOAD_MESSAGES_SUCCESS,
  messages
});

const loadMessagesError = error => ({
  type: CHAT_LOAD_MESSAGES_ERROR,
  error
});

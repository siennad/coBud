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

const generateRoomToken = (currentUserId, uid) => {
  const roomToken1 = `${currentUserId}-${uid}`;
  const roomToken2 = `${uid}-${currentUserId}`;
  return currentUserId > uid ? roomToken1 : roomToken2;
};

export const sendMessage = (messages, local, userSelectedID = null) => dispatch => {
  dispatch(chatMessageLoading());
  console.log(messages);
  _.forEach(messages, message => {
    const createdAt = new Date().getTime();
    console.log(message);
    const chatMessage = {
      _id: message._id,
      text: message.text,
      createdAt,
      user: message.user
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
      const currentUser = firebase.auth().currentUser;
      const refUid = generateRoomToken(currentUser.uid, userSelectedID);
      const ref = firebase.database().ref(`privateMessage/${refUid}`);
      const newref = ref.push(chatMessage);
      //this is the private chat
    }
  });
};

export const loadMessages = (local, uid = null) => dispatch => {
  if (local) {
    dispatch(chatMessageLoading());

    firebase
      .database()
      .ref('messages')
      .limitToLast(FIREBASE_REF_MESSAGES_LIMIT)
      .on(
        'value',
        snapshot => {
          let msg = _.values(snapshot.val());
          _.map(_.values(snapshot.val()), obj => ({
            _id: obj._id,
            text: obj.text,
            createdAt: obj.createdAt
          }));
          msg = _.orderBy(msg, ['createdAt'], ['desc']);
          dispatch(loadMessagesSuccess(msg));
          return msg;
        },
        errorObject => {
          dispatch(loadMessagesError(errorObject.message));
          return null;
        }
      );
  } else if (!local) {
    const currentUser = firebase.auth().currentUser;
    const refUid = generateRoomToken(currentUser.uid, uid);
    console.log('loadmessage refUid here----');
    console.log(refUid);
    console.log('loadmessage refUid here----');
    firebase
      .database()
      .ref(`privateMessage/${refUid}`)
      .on(
        'value',
        snapshot => {
          let msg = _.values(snapshot.val());
          _.map(_.values(snapshot.val()), obj => ({
            _id: obj._id,
            text: obj.text,
            createdAt: obj.createdAt
          }));
          msg = _.orderBy(msg, ['createdAt'], ['desc']);
          dispatch(loadMessagesSuccess(msg));
          return msg;
        },
        errorObject => {
          dispatch(loadMessagesError(errorObject.message));
          return null;
        }
      );
  }
  return null;
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

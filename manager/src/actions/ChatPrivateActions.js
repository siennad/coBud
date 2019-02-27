import firebase from "firebase";
import * as _ from "lodash";

import { Actions } from "react-native-router-flux";
import * as types from "./types";

// export const UserInputHandle = text => ({
//   type: types.USER_INPUT_HANDLE,
//   payload: text
// });

export const loadPrivateMessagesSuccess = messageArray =>
  // console.log('------ actions');

  // console.log(messageArray);
  // console.log('------End actions');
  ({
    type: types.LOAD_MESSAGE_SUCCESS,
    payload: _.values(messageArray)
  });

export const loadPrivateMessagesError = error => ({
  type: types.LOAD_MESSAGE_ERROR,
  error
});
const generateRoomToken = (currentUserId, uid) => {
  const roomToken1 = `${currentUserId}-${uid}`;
  const roomToken2 = `${uid}-${currentUserId}`;
  return currentUserId > uid ? roomToken1 : roomToken2;
};

export const sendPrivateMessage = (messageInput, uid) => dispatch => {
  dispatch({ type: types.USER_INPUT_HANDLE });
  const currentUser = firebase.auth().currentUser;
  const chatMessage = {
    time: Date.now(),
    user: {
      name: currentUser.email,
      uid: currentUser.uid,
      text: messageInput
    }
  };
  const refUid = generateRoomToken(currentUser.uid, uid);
  const ref = firebase.database().ref(`message/privateMessage/${refUid}`);
  const newref = ref.push(chatMessage);
};

// FetchMessage

export const loadPrivateMessages = uid => dispatch => {
  const currentUser = firebase.auth().currentUser;
  const refUid = generateRoomToken(currentUser.uid, uid);
  // const check = checkUid(currentUser.uid, uid1, uid2);
  const ref = firebase
    .database()
    // .ref(`users/message/${currentUser.uid}`)
    .ref(`message/privateMessage/${refUid}`)
    .on(
      "value",
      snapshot => {
        // console.log(snapshot.val());
        dispatch(loadPrivateMessagesSuccess(snapshot.val()));
      },
      errorObject => {
        dispatch(loadPrivateMessagesError(errorObject.message));
      }
    );
};

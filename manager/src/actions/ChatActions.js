import firebase from 'firebase';
import * as _ from 'lodash';

import { Actions } from 'react-native-router-flux';
import * as types from './types';
// export const UserInputHandle = text => ({
//   type: types.USER_INPUT_HANDLE,
//   payload: text
// });

export const loadMessagesSuccess = messageArray => {
  console.log('------ actions');

  console.log(messageArray);
  console.log('------End actions');
  return {
    type: types.LOAD_MESSAGE_SUCCESS,
    payload: _.values(messageArray)
  };
};

export const loadMessagesError = error => ({
  type: types.LOAD_MESSAGE_ERROR,
  error
});

export const sendMessage = messageInput => dispatch => {
  dispatch({ type: types.USER_INPUT_HANDLE });
  // console.log(Actions.payload);
  // console.log(messageInput);
  const currentUser = firebase.auth().currentUser;
  const chatMessage = {
    text: messageInput,
    time: Date.now(),
    user: {
      name: currentUser.displayName
    }
  };
  const ref = firebase.database().ref(`users/message/${currentUser.uid}`);
  // .push(chatMessage);

  const newref = ref.push(chatMessage);
  // console.log(newref.key);

  // const readUserData = ref.on('value', snapshot => {
  //   console.log(snapshot.val());
  //   const animals = [];
  //   snapshot.forEach(doc => {
  //     animals.push({
  //       key: doc.key,
  //       text: doc.toJSON().text
  //     });
  //     console.log('doc.toJSON.text here-----');
  //   });
  //   console.log(animals);
  // });
};

// FetchMessage

export const loadMessages = () => dispatch => {
  const currentUser = firebase.auth().currentUser;
  const ref = firebase
    .database()
    .ref(`users/message/${currentUser.uid}`)
    .on(
      'value',
      snapshot => {
        console.log(snapshot.val());
        dispatch(loadMessagesSuccess(snapshot.val()));
        //console.log(dispatch(loadMessagesSuccess(snapshot.val())));
      },
      errorObject => {
        dispatch(loadMessagesError(errorObject.message));
      }
    );
};

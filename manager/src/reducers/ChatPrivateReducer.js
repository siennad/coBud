import * as types from '../actions/types';

const initialState = {
  sending: false,
  sendingError: null,
  messageInput: '',
  loadMessagesError: null,
  messageOutput: [],
  receivedAt: ''
};

const ChatPrivateReducer = (state = initialState, action) => {
  // console.log('------ reducer');
  // console.log(action);
  switch (action.type) {
    case types.USER_INPUT_HANDLE:
      return { ...state, messageInput: action.payload };
    case types.LOAD_MESSAGE_SUCCESS:
      return {
        ...state,
        messageOutput: action.payload,
        loadMessagesError: null
      };
    case types.LOAD_MESSAGE_ERROR:
      return { ...state, messageOutput: null, loadMessagesError: action.error };
    // case CHAT_MESSAGE_LOADING:
    //   return { ...state, sending: true, sendingError: null };
    // case CHAT_MESSAGE_ERROR:
    //   return { ...state, sending: false, sendingError: action.error };
    // case CHAT_MESSAGE_SUCCESS:
    //   return { ...state, sending: false, sendingError: null, message: '' };
    // case CHAT_MESSAGE_UPDATE:
    //   return { ...state, sending: false, message: action.payload, sendingError: null };
    default:
      return state;
  }
};

export default ChatPrivateReducer;

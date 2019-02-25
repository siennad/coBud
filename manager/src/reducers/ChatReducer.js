import {
  CHAT_MESSAGE_LOADING,
  CHAT_MESSAGE_SUCCESS,
  CHAT_MESSAGE_ERROR,
  CHAT_MESSAGE_UPDATE,
  CHAT_LOAD_MESSAGES_SUCCESS,
  CHAT_LOAD_MESSAGES_ERROR
} from '../actions/types';

const initialState = {
  loading: false,
  sendingError: null,
  message: '',
  messages: [],
  loadMessagesError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHAT_MESSAGE_LOADING:
      return { ...state, loading: true, sendingError: null };
    case CHAT_MESSAGE_ERROR:
      return { ...state, loading: false, sendingError: action.error };
    case CHAT_MESSAGE_SUCCESS:
      return { ...state, loading: false, sendingError: null, message: '' };
    case CHAT_MESSAGE_UPDATE:
      return {
        ...state,
        loading: false,
        message: action.text,
        sendingError: null
      };
    case CHAT_LOAD_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.messages,
        loadMessagesError: null
      };
    case CHAT_LOAD_MESSAGES_ERROR:
      return {
        ...state,
        loading: false,
        messages: null,
        loadMessagesError: action.error
      };
    default:
      return state;
  }
};

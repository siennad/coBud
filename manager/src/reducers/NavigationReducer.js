import { ON_HOME, ON_MAP, ON_CONNECTION, ON_NOTIFICATION, ON_MENU } from '../actions/types';

const INITIAL_STATE = {
  isOnHome: false,
  isOnMap: false,
  isOnConnection: false,
  isOnNotification: false,
  isOnMenu: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_MAP:
      return {
        isOnMap: true
      };

    case ON_CONNECTION:
      return {
        isOnConnection: true
      };

    case ON_NOTIFICATION:
      return {
        isOnNotification: true
      };

    case ON_MENU:
      return {
        isOnMenu: true
      };

    case ON_HOME:
    default:
      return {
        isOnHome: true
      };
  }
};

import { ON_HOME, ON_MAP, ON_CONNECTION, ON_NOTIFICATION, ON_MENU } from './types';

export const navigateToHome = () => ({
  type: ON_HOME
});

export const navigateToMap = () => ({
  type: ON_MAP
});


export const navigateToConnections = () => ({
  type: ON_CONNECTION
});


export const navigateToNotifications = () => ({
  type: ON_NOTIFICATION
});

export const navigateToMenu = () => ({
  type: ON_MENU
});

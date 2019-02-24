import { StackNavigator } from 'react-navigation'

import ChatScreen from './ChatScreen'
import MainScreen from './MainScreen';

const routeConfig = {
  Chat: { screen: ChatScreen }, 
  Main: {screen: MainScreen}
}

const initConfig ={
  initialRouteName: 'Main'
}
export default StackNavigator(routeConfig, initConfig)

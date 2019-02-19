import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps',
  'Warning: componentWillUpdate',
]);

AppRegistry.registerComponent('manager', () => App);

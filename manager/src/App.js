import React, { Component } from 'react';
// import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { ThemeContext, getTheme } from 'react-native-material-ui';

import reducers from './reducers';
import Router from './Router';

import { uiTheme } from './components/common/commonStyle';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDfuR6HkFNFAzlSeP30KVU8jRT-KFuPQfo',
      authDomain: 'manager-bc45f.firebaseapp.com',
      databaseURL: 'https://manager-bc45f.firebaseio.com',
      projectId: 'manager-bc45f',
      storageBucket: 'manager-bc45f.appspot.com',
      messagingSenderId: '955345807214'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <ThemeContext.Provider store={store} value={getTheme(uiTheme)}>
        <Router />
      </ThemeContext.Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import { StyleProvider } from 'native-base';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
//import getTheme from '../native-base-theme/components';
//import material from '../native-base-theme/variables/material';

class App extends Component {
  constructor(props) {
    super(props);

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
      <Provider store={store}>
        {/* <StyleProvider style={getTheme(material)}>*/}
        <Router />
        {/*</StyleProvider>*/}
      </Provider>
    );
  }
}

export default App;

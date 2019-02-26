import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { StyleProvider } from 'native-base';
import { createLogger } from 'redux-logger';
import firebase from 'firebase';
// import * as admin from 'firebase-admin';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

//const admin = require('firebase-admin');
//const serviceAccount = require('../env/exampleKey.json');

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyDhXDXGoUlylaALOggGVfHFtzBaQM9GRp0',
      authDomain: 'example-fd303.firebaseapp.com',
      databaseURL: 'https://example-fd303.firebaseio.com',
      projectId: 'example-fd303',
      storageBucket: 'example-fd303.appspot.com',
      messagingSenderId: '893002210882'
    };
    firebase.initializeApp(config);
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   databaseURL: 'https://example-fd303.firebaseio.com'
    // });
  }

  //   const config = {
  //     apiKey: 'AIzaSyDfuR6HkFNFAzlSeP30KVU8jRT-KFuPQfo',
  //     authDomain: 'manager-bc45f.firebaseapp.com',
  //     databaseURL: 'https://manager-bc45f.firebaseio.com',
  //     projectId: 'manager-bc45f',
  //     storageBucket: 'manager-bc45f.appspot.com',
  //     messagingSenderId: '955345807214'
  //   };
  //   firebase.initializeApp(config);
  // }

  render() {
    const composeEnhancers = global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
      reducers,
      process.env.NODE_ENV === 'production'
        ? applyMiddleware(ReduxThunk)
        : composeEnhancers(applyMiddleware(ReduxThunk, createLogger()))
    );

    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(material)}>
          <Router />
        </StyleProvider>
      </Provider>
    );
  }
}

export default App;

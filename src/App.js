/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
//import LoginForm from './components/LoginForm'; I'll leave it for test purposes
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyD8n9-pT8QC1FKP1Nya57TyIxHRQ3oW_NA',
      authDomain: 'manager-790a5.firebaseapp.com',
      databaseURL: 'https://manager-790a5.firebaseio.com',
      projectId: 'manager-790a5',
      storageBucket: '',
      messagingSenderId: '189135050821'
    };
    firebase.initializeApp(config);
  }

  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}


export default App;

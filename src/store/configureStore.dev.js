import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import rootEpic from '../epics';
import { createEpicMiddleware } from 'redux-observable';
import DevTools from '../containers/DevTools';
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import { reactReduxFirebase } from 'react-redux-firebase';
import createSocketIoMiddleware from 'redux-socket.io';
import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBX3jBV3-jGNqLwhSznY864MfPlp5H89Tw",
    authDomain: "riandev-d7a54.firebaseapp.com",
    databaseURL: "https://riandev-d7a54.firebaseio.com",
    storageBucket: "riandev-d7a54.appspot.com",
    messagingSenderId: "559609159517"  
}

const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}

firebase.initializeApp(firebaseConfig);


const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, config)
)(createStore)

const epicMiddleware = createEpicMiddleware(rootEpic);

const loggerMiddleware = createLogger()

const enhancer = compose(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        promiseMiddleware,
        epicMiddleware
    ),
    DevTools.instrument()

);

// compose = Composes functions from right to left.

export default function configureStore() {
  
  const store = createStoreWithFirebase(rootReducer, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
    module.hot.accept('../epics', () => 
      epicMiddleware.replaceEpic(rootEpic)
    )
  }

  return store;
}
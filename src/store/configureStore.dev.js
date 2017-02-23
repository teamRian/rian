import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger()

const enhancer = compose(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        promiseMiddleware
    ),
    DevTools.instrument()

);

// compose = Composes functions from right to left.

export default function configureStore(initState) {

  const store = createStore(rootReducer, initState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}
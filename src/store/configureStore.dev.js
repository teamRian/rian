import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import rootEpic from '../epics';
import { createEpicMiddleware } from 'redux-observable';
import DevTools from '../containers/DevTools';
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

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
  
  const store = createStore(rootReducer, enhancer);

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
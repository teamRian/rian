import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise';

export default function configureStore(initialState) {
  return createStore(
  	rootReducer,
  	initialState,
  	applyMiddleware(
  		thunkMiddleware,
  		promiseMiddleware
  	)
  );
}
import { combineReducers } from 'redux'
import {
  // SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  // REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'
import * as ChatReducer from './ChatReducer';

var initstate = {
	data: 1 
}

// Import Reducers
import * as NoteEditorReducer from './NoteEditorReducer.js';
import * as TodosReducer from './TodosReducer.js';
import * as CalendarReducer from './CalendarReducer';

const rootReducer = combineReducers(
	Object.assign(
		{}, 
		NoteEditorReducer,
		TodosReducer,
		CalendarReducer,
		ChatReducer
	))

export default rootReducer;


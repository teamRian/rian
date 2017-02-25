import { combineReducers } from 'redux'
<<<<<<< HEAD
import {
  // SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  // REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'
import * as ChatReducer from './ChatReducer';
=======

import * as NoteEditorReducer from './NoteEditorReducer.js'
import * as CalendarReducer from './CalendarReducer'
import * as WhiteBoard from './WhiteBoard'

>>>>>>> draft.js & redux & redux-react connection success

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
<<<<<<< HEAD
		TodosReducer,
		CalendarReducer,
		ChatReducer
=======
		CalendarReducer,
		WhiteBoard
>>>>>>> draft.js & redux & redux-react connection success
	))

export default rootReducer;


import { combineReducers } from 'redux'
import {
  // SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  // REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

// Import Reducers
import * as UserReducer from './UserReducer';
<<<<<<< HEAD
import * as ChatReducer from './ChatReducer';
import * as CalendarReducer from './CalendarReducer';
import * as NoteEditorReducer from './NoteEditorReducer';
import * as WhiteBoardReducer from './WhiteBoardReducer.js';
import * as TodosReducer from './TodosReducer.js';
import * as FileUploadReducer from './FileUploadReducer'
=======
import * as ProjectReducer from './ProjectReducer';
import * as CalendarReducer from './CalendarReducer';
import * as NoteEditorReducer from './NoteEditorReducer';
import * as WhiteBoardReducer from './WhiteBoardReducer';
import * as ChatReducer from './ChatReducer';
import * as TodosReducer from './TodosReducer';
>>>>>>> change layout to flexbox and addedd project schema

const rootReducer = combineReducers(
	Object.assign(
		{}, 
		UserReducer,
<<<<<<< HEAD
		TodosReducer,
		NoteEditorReducer,
		CalendarReducer,
=======
		ProjectReducer,
		CalendarReducer,
		NoteEditorReducer,
		TodosReducer,
>>>>>>> change layout to flexbox and addedd project schema
		ChatReducer,
		WhiteBoardReducer,
		FileUploadReducer
	))

export default rootReducer;


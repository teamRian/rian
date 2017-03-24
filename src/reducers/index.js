import { combineReducers } from 'redux'
import {
	// SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
	// REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

// Import Reducers
import * as UserReducer from './UserReducer';
import * as CalendarReducer from './CalendarReducer';
import * as PlanReducer from './PlanReducer';
import * as TodosReducer from './TodosReducer.js';
import * as FileManagementReducer from './FileManagementReducer.js';
import * as ProjectReducer from './ProjectReducer';
import * as NoteEditorReducer from './NoteEditorReducer';
import * as WhiteBoardReducer from './WhiteBoardReducer';
import { firebaseStateReducer } from 'react-redux-firebase';
import * as NoteTimelineReducer from './NoteTimelineReducer';
import * as FirebaseChatReducer from './FirebaseChatReducer'

const rootReducer = combineReducers(
	Object.assign(
		{}, 
		UserReducer,
		TodosReducer,
		ProjectReducer,
		CalendarReducer,
		PlanReducer,
		NoteEditorReducer,
		WhiteBoardReducer,
		FileManagementReducer,
  	{firebase: firebaseStateReducer},
  	NoteTimelineReducer,
  	FirebaseChatReducer
	))

export default rootReducer;


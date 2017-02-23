import { combineReducers } from 'redux';

// Import Reducers
import * as NoteEditorReducer from './NoteEditorReducer.js';
import * as TodosReducer from './TodosReducer.js';
import * as CalendarReducer from './CalendarReducer';

const rootReducer = combineReducers(
	Object.assign(
		{}, 
		NoteEditorReducer,
		TodosReducer,
		CalendarReducer
	))

export default rootReducer;

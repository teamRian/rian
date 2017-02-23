import { combineReducers } from 'redux';

// Import Reducers
import * as NoteEditorReducer from './NoteEditorReducer.js';
import * as TodosReducer from './TodosReducer.js';

const rootReducer = combineReducers(
	Object.assign(
		{}, 
		NoteEditorReducer,
		TodosReducer
	))

export default rootReducer;

import { combineReducers } from 'redux'

import * as NoteEditorReducer from './NoteEditorReducer.js'
import * as CalendarReducer from './CalendarReducer'


var initstate = {
	data: "TEST!" 
}

var tempreducer = function(state = initstate, action){
	switch(action.type) {
		case "PASS":
			return 
		default:
			return state
	}
}

const rootReducer = combineReducers(
	Object.assign(
		{}, 
		{ tempreducer },
		NoteEditorReducer,
		CalendarReducer
	))

export default rootReducer
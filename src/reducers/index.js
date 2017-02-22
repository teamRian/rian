import { combineReducers } from 'redux'

import * as NoteEditorReducer from './NoteEditorReducer.js'

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
		NoteEditorReducer
	))

export default rootReducer
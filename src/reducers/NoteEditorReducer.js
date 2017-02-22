import { NoteWrite } from '../actions/NoteEditorActions.js'

var NoteState = {
	data: "HEllO, RIAN!!"
}


export function NoteEditor(state = NoteState, action) {
	switch (action.type){
		case "WRITE":
			return Object.assign({}, state, {
				data: action.data
			})
		default:
			return state
	}
}
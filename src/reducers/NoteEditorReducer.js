import { NoteWrite } from '../actions/NoteEditorActions.js'
import { NOTE_WRITE, NOTE_ONCHANGE } from '../constants/index.js'
import { Editor, Raw } from 'slate'
import initialState from '../components/NoteEditor/css/state.json'
var NoteState = {
	data: Raw.deserialize(initialState, { terse: true })
}


export function NoteEditor(state = NoteState, action) {

	switch (action.type){
		case NOTE_WRITE:
			return Object.assign({}, state, {
				data: action.data
			})
		case NOTE_ONCHANGE:
			return Object.assign({}, state, {
				data: action.data
			})
		default:
			return state
	}
}


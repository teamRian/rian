import { NoteWrite } from '../actions/NoteEditorActions.js'
import { NOTE_RENDER_CHANGE, NOTE_EDITOR_STATE } from '../constants/index.js'


var NoteState = {
	onEditor: false,
	notelocation: null,
	inforlocation: null,
	indexlocation: null, 
}


export function NoteEditor(state = NoteState, action) {

	switch (action.type){
		case NOTE_EDITOR_STATE:
			return Object.assign({}, state, {
				onEditor: action.data
			})
		case NOTE_RENDER_CHANGE:
			return Object.assign({}, state, {
				notelocation: action.notelocation,
				inforlocation: action.inforlocation,
				indexlocation: action.indexlocation
			})
		default:
			return state
	}

}


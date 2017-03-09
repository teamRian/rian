import { NoteWrite } from '../actions/NoteEditorActions.js'
import { NOTE_WRITE, NOTE_ONCHANGE } from '../constants/index.js'
import mockdata from '../components/NoteTimeline/mockTimelinedata.js'


var NoteState = {
	data: "",
	noteTimeline: mockdata,
	timeline: "",
	status: ""
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
		case 'NOTE_TIMELINE_SUCCESS':
			return Object.assign({}, state, {
				timeline: action.data,
				status: "SUCCESS"
			})
		case 'NOTE_TIMELINE_CANCLE':
			return Object.assign({}, state, {
				status: "CANCLE"
			})
		default:
			return state
	}

}


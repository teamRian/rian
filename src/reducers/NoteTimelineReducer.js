import { } from '../actions/NoteTimelineActions.js'
import {  NOTE_TIMELINE_LOADING, NOTE_TIMELINE_SUCCESS, NOTE_TIMELINE_FAIL, NOTE_SCROLLVIEW_SUCCESS } from '../constants/index.js'



var TimelineState = {
	timeline: null,
	status: null
}


export function NoteTimeline(state = TimelineState, action) {

	switch (action.type){
		case NOTE_TIMELINE_LOADING:
			return Object.assign({}, state, {
				status: "Loading"
			})
		case NOTE_TIMELINE_SUCCESS:
			return Object.assign({}, state, {
				timeline: action.data,
				status: "SUCCESS"
			})
		case NOTE_SCROLLVIEW_SUCCESS:
			
			return Object.assign({}, state, {
				timeline: state.timeline.map((item, index)=>{
					if (index === action.data.listNum) {
						
						return Object.assign(item, action.data.Note)
					} else {
						return item
					}
				}),
				status: "GEToneNoteSUCCESS"
			})			
		case NOTE_TIMELINE_FAIL:
			return Object.assign({}, state, {
				status: "Why was fail?"
			})
		default:
			return state
	}

}


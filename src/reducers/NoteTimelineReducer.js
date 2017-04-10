import { 
	NOTE_TIMELINE_SUCCESS,
 	NOTE_ONENOTE_SUCCESS,
 	UPDATE_TIMELINE_RENDER,
 	CHANGE_TIMELINE_STATUS
} from '../constants/index.js'


var TimelineState = {
	timeline: null,
	status: "Loading",
	HowManyNote: 0,
	TimelineUpdate: false,
	HowSorting: 'final_modified'	
}


export function NoteTimeline(state = TimelineState, action) {

	switch (action.type){
		case NOTE_TIMELINE_SUCCESS:
			return Object.assign({}, state, {
				timeline: action.data,
				status: "SUCCESS",
				HowManyNote: action.data.length,
				HowSorting: 'final_modified',
				TimelineUpdate: true
			})
		case NOTE_ONENOTE_SUCCESS:
			return Object.assign({}, state, {
				timeline: state.timeline.map((item, index)=>{
					if (index === action.timelineNum) {
						return Object.assign(item, action.data)
					} else {
						return item
					}
				}),
				status: "GEToneNoteSUCCESS"
			})
		case UPDATE_TIMELINE_RENDER:	
			return Object.assign({}, state, {
				timelineRender: action.data
			})
		case CHANGE_TIMELINE_STATUS:
			return Object.assign({}, state, {
				TimelineUpdate: action.data
			})
		default:
			return state
	}

}


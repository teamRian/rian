import { } from '../actions/NoteTimelineActions.js'
import { 
    NOTE_TIMELINE_LOADING, 
	NOTE_TIMELINE_SUCCESS,
    NOTE_TIMELINE_FAIL, 
    NOTE_SCROLLVIEW_SUCCESS,
    TIMELINE_RENDERING 
} from '../constants/index.js'



var TimelineState = {
	timeline: null,
	timelineRender: null,
	status: null
}


export function NoteTimeline(state = TimelineState, action) {

	switch (action.type){
		case NOTE_TIMELINE_LOADING:
			return Object.assign({}, state, {
				status: "Loading"
			})
		case NOTE_TIMELINE_SUCCESS:
			var timelineArray = []
			for (var key in action.data) {
				timelineArray[Number(key)] = action.data[key]
			}
			timelineArray.map( (a, index) => { a.timelineNum = index; return a } )

			return Object.assign({}, state, {
				timeline: timelineArray,
				status: "SUCCESS"
			})
		case NOTE_SCROLLVIEW_SUCCESS:
			
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
		case TIMELINE_RENDERING: 

			return Object.assign({}, state, {
				timelineRender: action.data
			})	
		case NOTE_TIMELINE_FAIL:
			return Object.assign({}, state, {
				status: "Why was fail?"
			})
		default:
			return state
	}

}


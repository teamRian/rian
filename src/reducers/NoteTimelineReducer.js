import { 
	NOTE_TIMELINE_SUCCESS,
 	NOTE_ONENOTE_SUCCESS,
 	UPDATE_TIMELINE_RENDER
} from '../constants/index.js'


var TimelineState = {

	timeline: null,
	timelineRender: null,
	status: "Loading",
	HowManyNote: 0,
	HowSorting: 'final_modified'
	
}


export function NoteTimeline(state = TimelineState, action) {

	switch (action.type){
		case NOTE_TIMELINE_SUCCESS:
			var timelineArray = []
			for (var key in action.data) {
				timelineArray[Number(key)] = action.data[key]
			}
			timelineArray.reverse()
	
			if (action.howSorting === 'final_modified') {

				timelineArray.map( (a, index) => { a.timelineNum = index; return a } )
			} 
			return Object.assign({}, state, {
				timeline: timelineArray,
				status: "SUCCESS",
				HowManyNote: timelineArray.length,
				HowSorting: 'final_modified'
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
		default:
			return state
	}

}


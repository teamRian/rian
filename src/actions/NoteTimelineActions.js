import { UPDATE_TIMELINE_RENDER, CHANGE_TIMELINE_STATUS } from '../constants/index.js';





export function changeTimelineUpdate(value){

	return { 
		type: CHANGE_TIMELINE_STATUS,
		data: value
	}
}




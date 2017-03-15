import { UPDATE_TIMELINE_RENDER, CHANGE_TIMELINE_STATUS } from '../constants/index.js';



export function updateTimelineRender(value){

	return { 
		type: UPDATE_TIMELINE_RENDER,
		data: value
	}
}

export function changeTimelineUpdate(value){

	return { 
		type: CHANGE_TIMELINE_STATUS,
		data: value
	}
}




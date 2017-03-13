import { UPDATE_TIMELINE_RENDER } from '../constants/index.js';



export function updateTimelineRender(value){

	return { 
		type: UPDATE_TIMELINE_RENDER,
		data: value
	}
}




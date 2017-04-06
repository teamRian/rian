import { MODE_CHANGE } from '../constants/index.js';
export function changeMode(mode){
	return { 
		type: MODE_CHANGE,
		isProject: mode.isProject,
		currentProject: mode.currentProject
	}
}

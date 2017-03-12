import { NOTE_RENDER_CHANGE, NOTE_EDITOR_STATE } from '../constants/index.js';



export function changEditorState(value){

	return { 
		type: NOTE_EDITOR_STATE,
		data: value
	}
}



export function changeRenderedNote(value){
	   
	return { 
		type: NOTE_RENDER_CHANGE, 
		data: value 
	}
}


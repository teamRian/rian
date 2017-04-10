import { NOTE_RENDER_CHANGE, NOTE_EDITOR_STATE } from '../constants/index.js';



export function changEditorState(value){

	return { 
		type: NOTE_EDITOR_STATE,
		data: value
	}
}



export function changeRenderedNote(notelocation, inforlocation, indexlocation){
	   
	return { 
		type: NOTE_RENDER_CHANGE, 
		notelocation: notelocation,
		inforlocation: inforlocation,
		indexlocation: indexlocation, 
	}
}


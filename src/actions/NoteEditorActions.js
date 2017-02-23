import { NOTE_WRITE, NOTE_ONCHANGE } from '../constants/index.js';

export function NoteWrite(value){
	return {
		type: NOTE_WRITE,
		data: value
	}
}

export function onChangeDispatch(value){
	
	return { type: NOTE_ONCHANGE, 
		data: value 
	}
}

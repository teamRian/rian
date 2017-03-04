import { CHANGE_CONTENT_STATE, CHANGE_EDITOR_STATE, ADD_EDITOR_STATE } from '../constants';

export function changeContentState(currentStateRaw){
	return {
		type : CHANGE_CONTENT_STATE,
		currentStateRaw
	}
}


export function changeEditorState(editorState, idx){
	return {
		type : CHANGE_EDITOR_STATE,
		idx : idx,
		editorState : editorState
	}
}


export function addEditorState(editorState){
	return{
		type : ADD_EDITOR_STATE,
		editorState
	}
}


import { changeContentState, changeEditorStore } from '../actions/WhiteBoardActions.js';

const contentInitState = {
	currentStateRaw : {}
}

export const content = ( state = contentInitState, action) => {

	switch(action.type){
		case 'CHANGE_CONTENT_STATE':
			return Object.assign({}, state, {
				currentStateRaw : action.currentStateRaw
			});
		default:
			return state;
	}

}

const editorStoreInit = {
	editors : []
}

export const editorStore = ( state = editorStoreInit, action) => {

	switch(action.type){
		case 'CHANGE_EDITOR_STATE':
			return Object.assign({}, state, {
				
				editors : [ 
					...state.editors.slice(0, action.idx),
					action.editorState,
					...state.editors.slice(action.idx + 1)
				]
			});
		case 'ADD_EDITOR_STATE':
			return Object.assign({}, state, {
				editors : [ ...state.editors, action.editorState ]
			});
		default:
			return state;
	}

}


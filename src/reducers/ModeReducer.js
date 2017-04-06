import { changeMode } from '../actions/ModeActions.js'
import { MODE_CHANGE } from '../constants/index.js'

var ModeState = {
	isProject: false,
	currentProject: null
}

export function Mode(state = ModeState, action) {
	switch (action.type){
		case MODE_CHANGE:
			return Object.assign({}, state, {
				isProject: action.isProject,
				currentProject: action.currentProject,
				currentComponent: aciton.currentComponent
			})
		default:
			return state
	}
}


import { CHANGE_CONTENT_STATE } from '../constants';

export function changeContentState(currentStateRaw){
	return {
		type : CHANGE_CONTENT_STATE,
		currentStateRaw
	}
}


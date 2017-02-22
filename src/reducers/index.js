import { combineReducers } from 'redux'
import {
  // SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  // REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'
var initstate = {
	data: 1 
}

var tempreducer = function(state = initstate, action){
	switch(action.type) {
		case "PASS":
		return {

		}
		default:
			return state
	}
}



const rootReducer = combineReducers({
	tempreducer
})

export default rootReducer
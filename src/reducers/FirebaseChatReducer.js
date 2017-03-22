import { 
	UPDATE_CHAT_LIST
} from '../constants/index.js'


var FirebaseChatState = {
	chatroomlist: [],
}


export function FirebaseChat(state = FirebaseChatState, action) {

	switch (action.type){
		case UPDATE_CHAT_LIST:
			return Object.assign({}, state, {
				chatroomlist: action.data
			})
		default:
			return state	
	}
}

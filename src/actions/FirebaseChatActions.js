import { UPDATE_CHAT_LIST  } from '../constants/index.js';



export function updateFirebaseChatList(value){

	return { 
		type: UPDATE_CHAT_LIST ,
		data: value
	}
}




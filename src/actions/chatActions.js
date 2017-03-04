import { CHAT_POSTSEND_DATA, CHAT_POSTSUCCESS_DATA, CHAT_POSTFAIL_DATA, CHAT_REQUEST_DATA, CHAT_RECEIVE_DATA, CHAT_FAIL_DATA, CHAT_CHANGE_USER, CHAT_NEW_MESSAGE, CHAT_USER_JOIN, CHAT_NEW_USER, CHAT_USER_LEFT, CHAT_CHANGE_NAME } from '../constants';
import axios from 'axios';

export function chatPostSend(){
	return {
			type: CHAT_POSTSEND_DATA,
			status: 'loading...'
	}
}

export function chatPostSuccess(logs){
	return {
			type: CHAT_POSTSUCCESS_DATA,
			status: 'SUCCESS',
			chatlogs: logs
	}
}

export function chatPostFail(err){
	return {
			type: CHAT_POSTFAIL_DATA,
			status: 'loading failed'
	}
}

export function chatPost(logs){
	return function(dispatch){
			dispatch(chatPostSend())

			return axios.post('/chatLog/postChat', {logs})
							.then(res => {
									dispatch(chatPostSuccess(res));
							})
							.catch(err => {
									dispatch(chatPostFail(err));
							})
	}
}

export function chatRequestData(){
	return {
			type: CHAT_REQUEST_DATA,
			status: 'requst...'
	}
}

export function chatFailData(err){
	return {
			type: CHAT_FAIL_DATA,
			status: 'Request Fail'
	}
}

export function chatReceiveData(data){
	return {
			type: CHAT_RECEIVE_DATA,
			status: 'SUCCESSFULLY RECEIVED CHATLOGS',
			chathistory: data
	}
}

export function chatRequest(){
	return function(dispatch){
			dispatch(chatRequestData())
			
			return axios.get('/chatLog/getChat')
									.then(res => {

											dispatch(chatReceiveData(res));
									})
									.catch(err => {
											dispatch(chatFailData(err));
									})
	}
}

export function changeUsername() {
	return {
		type: CHAT_CHANGE_USER
	}

}

export function newMessage(msg) {
	return {
		type: CHAT_NEW_MESSAGE,
		data: msg
	}	
}

export function userJoin(user) {
		return {
			type: CHAT_USER_JOIN,
			data: user //just name
		}
}

export function newUser(user) {
		return {
			type: CHAT_NEW_USER,
			data: user // list of users
		}
}

export function userLeft(user) {
		return {
			type: CHAT_USER_LEFT,
			data: user
		}
}



export function changeName(name) {
		return {
			type: CHAT_CHANGE_NAME,
			data: name
		}
}

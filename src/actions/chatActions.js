import { CHAT_CHANGE_USER, CHAT_NEW_MESSAGE, CHAT_USER_JOIN, CHAT_NEW_USER, CHAT_USER_LEFT, CHAT_CHANGE_NAME } from '../constants';
import axios from 'axios';

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
import * as chatActions from '../actions/chatActions';

let chatState = {	
    messages: [],
    user: 'TESTUSER!!'
}

export function chatApp(state = chatState, action){
		switch (action.type){
				case 'CHAT_NEW_MESSAGE':
							return Object.assign({}, state, {
										messages: [ 
											...state.messages,
											action.data 
										],
										user: action.data.user
							})
				default:
							return state;						
		}
}

let userState = {
		joinusers: [],
		alertmsg: ''
}

export function chatUser(state = userState, action){
		switch (action.type){
				case 'CHAT_NEW_USER':
							return Object.assign({}, state, {
									joinusers: [...state.joinusers, action.data.name],
									alertmsg: action.data.name + ' Joined'
							})
				case 'CHAT_USER_JOIN':
							return Object.assign({}, state, {
									joinusers: [...state.joinusers, action.data.name],
									alertmsg: `${action.data.name} Joined`
							})			
				case 'CHAT_USER_LEFT':
							return Object.assign({}, state, {
									joinusers: [
										...state.joinusers.slice(0, state.joinusers.indexOf(action.data.name)),
										...state.joinusers.slice(state.joinusers.indexOf(action.data.name) + 1)
									],
									alertmsg: `${action.data.name} Left`
							})			
				case 'CHAT_CHANGE_NAME':
							return Object.assign({}, state, {
									joinusers: [
									...state.joinusers.slice(0, state.joinusers.indexOf(action.data.oldName)), 
									action.data.newName,
									...state.joinusers.slice(state.joinusers.indexOf(action.data.oldName) + 1)
									],
									alertmsg: `Change Name : ${action.data.oldName} ==> ${action.data.newName}`
							})
				default:
							return state;			
		}
}
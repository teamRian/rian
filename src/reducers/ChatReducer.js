import * as chatActions from '../actions/chatActions';

let chatState = {
		users: [],
    messages: [],
    text: 'TEST!!되는'
}

export function chatApp(state = chatState, action){
		switch (action.type){
				case 'CHAT_CHANGE_USER':
							return Object.assign({}, state, {
										users: [0],
										messages: ['changeUser'],
										text: 'hi'
							})
				case 'CHAT_NEW_MESSAGE':
							return Object.assign({}, state, {
										users: [...state.users, action.data.user],
										messages: [...state.messages, action.data],
										text: action.data.text
							})
				default:
							return state;						
		}
}

let userState = {
		joinusers: [],
		user: '',
		alertmsg: ''
}

export function chatUser(state = userState, action){
		switch (action.type){
				case 'CHAT_NEW_USER':
							return Object.assign({}, state, {
									joinusers: [...state.joinusers, ...action.data.users],
									user: action.data.name
							})
				case 'CHAT_USER_JOIN':
							return Object.assign({}, state, {
									joinusers: [...state.joinusers, action.data.name],
									user: action.data.name,
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
							console.log('joinUsers', state.joinusers)
							console.log('oldName',action.data.oldName)
							console.log('newNmae',action.data.newName)
							console.log('index', state.joinusers.indexOf(action.data.oldName))
							return Object.assign({}, state, {

									joinusers: [
										...state.joinusers.slice(0, state.joinusers.indexOf(action.data.oldName)), 
										action.data.newName,
										...state.joinusers.slice(state.joinusers.indexOf(action.data.oldName) + 1)
									],
									user: action.data.newName,
									alertmsg: `Change Name : ${action.data.oldName} ==> ${action.data.newName}`
							})
				default:
							return state;			
		}
}
import { 
	USER_REQUEST_CHECK_AUTH,
	USER_REQUEST_LOG_IN, USER_SUCCESS_LOG_IN, USER_FAIL_LOG_IN,
  USER_REQUEST_SIGN_UP, USER_SUCCESS_SIGN_UP, USER_FAIL_SIGN_UP,
  USER_LOG_OUT, 
  USER_REQUEST_ADD_PROJECT, USER_SUCCESS_ADD_PROJECT, USER_FAIL_ADD_PROJECT
} from '../constants';

var UserState = {
	_id: null,
	email: null,
	name: null,
	picture: null,
	token: null,
	loading: false,
	facebook_id: null,
	projects: []
}

export function User(state = UserState, action) {
	switch (action.type){
		case USER_REQUEST_CHECK_AUTH:
			return Object.assign({}, state, {
				loading: action.loading
			})
		case USER_REQUEST_LOG_IN:
			return Object.assign({}, state, {
				loading: action.loading
			})
		case USER_SUCCESS_LOG_IN:
			return Object.assign({}, state, {
				loading: action.loading,
				_id: action._id,
				email: action.email,
				name: action.name,
				facebook_id: action.facebook_id,
				token: action.token,
			  picture: action.picture,
			  projects: action.projects
			})
		case USER_FAIL_LOG_IN:
			return Object.assign({}, state, {
				loading: action.loading
			})

		case USER_REQUEST_SIGN_UP:
			return Object.assign({}, state, {
				loading: action.loading
			})
		case USER_SUCCESS_SIGN_UP:
			return Object.assign({}, state, {
				loading: action.loading,
				_id: action._id
				// username: action.username,
				// profilePhoto: action.profilePhoto,
				// token: action.token
			})
		case USER_FAIL_SIGN_UP:
			return Object.assign({}, state, {
				loading: action.loading
			})
		case USER_LOG_OUT:
			return Object.assign({}, state, {
				loading: action.loading,
				_id: action._id,
				email: action.email,
				name: action.name,
				facebook_id: action.facebook_id,
				token: action.token,
			  picture: action.picture,
			  projects: action.projects
			})
		case USER_REQUEST_ADD_PROJECT:
			return Object.assign({}, state, {
				loading: action.loading
			})
		case USER_SUCCESS_ADD_PROJECT:
			return Object.assign({}, state, {
				loading: action.loading,
				projects: [...state.projects, action.projects]
			})
		case USER_FAIL_ADD_PROJECT:
			return Object.assign({}, state, {
				loading: action.loading
			})
		default:
			return state
	}
}
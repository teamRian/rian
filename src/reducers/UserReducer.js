var UserState = {
	_id: null,
	email: null,
	name: null,
	picture: null,
	token: null,
	loading: false,
	facebook_id: null
}

export function User(state = UserState, action) {
	switch (action.type){
		case "USER_REQUEST_CHECK_AUTH":
			return Object.assign({}, state, {
				loading: action.loading
			})
		case "USER_REQUEST_LOG_IN":
			return Object.assign({}, state, {
				loading: action.loading
			})
		case "USER_SUCCESS_LOG_IN":
			return Object.assign({}, state, {
				loading: action.loading,
				_id: action._id,
				email: action.email,
				name: action.name,
				facebook_id: action.facebook_id,
				token: action.token,
			  picture: action.picture
			})
		case "USER_FAIL_LOG_IN":
			return Object.assign({}, state, {
				loading: action.loading
			})

		case "USER_REQUEST_SIGN_UP":
			return Object.assign({}, state, {
				loading: action.loading
			})
		case "USER_SUCCESS_SIGN_UP":
			return Object.assign({}, state, {
				loading: action.loading,
				_id: action._id
				// username: action.username,
				// profilePhoto: action.profilePhoto,
				// token: action.token
			})
		case "USER_FAIL_SIGN_UP":
			return Object.assign({}, state, {
				loading: action.loading
			})
		case "USER_LOG_OUT":
			return Object.assign({}, state, {
				loading: action.loading,
				_id: action._id,
				email: action.email,
				name: action.name,
				facebook_id: action.facebook_id,
				token: action.token,
			  picture: action.picture
			})
		default:
			return state
	}
}
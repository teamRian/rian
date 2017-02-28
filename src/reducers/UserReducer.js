var UserState = {
	_id: null,
	username: null,
	profilePhoto: null,
	token: null,
	loading: false
}

export function User(state = UserState, action) {
	switch (action.type){
		case "USER_REQUEST_LOG_IN":
			return Object.assign({}, state, {
				loading: action.loading
			})
		case "USER_SUCCESS_LOG_IN":
			return Object.assign({}, state, {
				loading: action.loading,
				_id: action._id,
				username: action.username,
				// profilePhoto: action.profilePhoto,
				// token: action.token
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
				_userId: action._userId
				// username: action.username,
				// profilePhoto: action.profilePhoto,
				// token: action.token
			})
		case "USER_FAIL_SIGN_UP":
			return Object.assign({}, state, {
				loading: action.loading
			})
		default:
			return state
	}
}
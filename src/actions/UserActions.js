import { 
	USER_REQUEST_LOG_IN, USER_SUCCESS_LOG_IN, USER_FAIL_LOG_IN,
    USER_REQUEST_SIGN_UP, USER_SUCCESS_SIGN_UP, USER_FAIL_SIGN_UP,
    USER_LOG_OUT  
} from '../constants';
import axios from 'axios';

export function userRequestSignUp(){
	return { 
		type: USER_REQUEST_SIGN_UP,
		loading: true
	}
}

export function userSuccessSignUp(res){
	return {
		type: USER_SUCCESS_SIGN_UP,
		loading: false
	}
}

export function userFailSignUp(err){
	return {
		type: USER_FAIL_SIGN_UP,
		loading: false
	}
}

export function userSignUp(form){
	return function(dispatch){
		
		dispatch(userRequestSignUp())

		return axios.post('/user/signUp', {form})
      			.then(res => {
      				console.log("USER POST::!!!", res)
        			dispatch(userSuccessSignUp(res.data))
      			})
      			.catch(err => {
        			dispatch(userFailSignUp(err));
      			})
	}
}

export function userRequestLogIn(){
	return {
		type: USER_REQUEST_LOG_IN,
		loading: true
	}
}

export function userSuccessLogIn(res){
	return {
		type: USER_SUCCESS_LOG_IN,
		loading: false,
		username: res.username,
		_id: res._id
	}
}

export function userFailLogIn(){
	return {
		type: USER_FAIL_LOG_IN,
		loading: false
	}
}

export function userLogIn(form){
	return function(dispatch){
		dispatch(userRequestLogIn())

		return axios.post('/user/logIn', {form})
			.then(res=>{
				console.log("USER!!!!! RES", res)
				dispatch(userSuccessLogIn(res.data))
			})
			.catch(err=>{
				dispatch(userFailLogIn(err))
			})
	}
}

export function userLogOut(){
	return {
		type: USER_LOG_OUT,
		username: null,
		_id: null
	}
}

import { 
	USER_REQUEST_CHECK_AUTH,
	USER_REQUEST_LOG_IN, USER_SUCCESS_LOG_IN, USER_FAIL_LOG_IN,
    USER_REQUEST_SIGN_UP, USER_SUCCESS_SIGN_UP, USER_FAIL_SIGN_UP,
    USER_LOG_OUT  
} from '../constants';
import axios from 'axios';
import firebase from 'firebase';
import firebaseConfig from "../../config/firebaseConfig";

/*----------  USER CHECK  ----------*/

export function userRequestCheckAuth(){
	return {
		type: USER_REQUEST_CHECK_AUTH,
		loading: true
	}
}

export function userCheckAuth(){
	return function(dispatch){
		dispatch(userRequestCheckAuth())
		return axios.get('/checkAuth')
			.then(res =>{
				console.log("CHECK AUTH RES.DATA ", res.data);
				dispatch(userLogIn(res.data))
			})
			.catch(err=>{console.log(err)
				dispatch(userFailSignUp())
			})
	}
}

/*----------  USER SIGN UP  ----------*/

export function userRequestSignUp(){
	return { 
		type: USER_REQUEST_SIGN_UP,
		loading: true
	}
}

// export function userSuccessSignUp(res){
// 	return {
// 		type: USER_SUCCESS_SIGN_UP,
// 		loading: false
// 	}
// }

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
      				console.log("SignUP RES.DATA ", res.data);
        			dispatch(userLogIn(res.data))
      			})
      			.catch(err => {
        			dispatch(userFailSignUp(err));
      			})
	}
}

/*----------  USER LOG IN  ----------*/


export function userRequestLogIn(){
	return {
		type: USER_REQUEST_LOG_IN,
		loading: true
	}
}

export function userSuccessLogIn(data){
	console.log("SUCCESS_LOGIN: ",data);
	return {
		type: USER_SUCCESS_LOG_IN,
		loading: false,
		email: data.email,
		_id: data._id,
		facebook_id: data.facebook_id,
		picture: data.picture,
		token: data.token,
		name: data.name
	}
}

export function userFailLogIn(){
	return {
		type: USER_FAIL_LOG_IN,
		loading: false
	}
}

export function userLogIn(user){
	return function(dispatch){
		dispatch(userRequestLogIn())
		// user = coockie + passport : objectID
		return axios.post('/user/logIn', user)
			.then(res=>{
				console.log("USERLOGIN, with DATA", res.data);
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
		_id: null,
		email: null,
		name: null,
		picture: null,
		token: null,
		loading: false,
		facebook_id: null
	}
}

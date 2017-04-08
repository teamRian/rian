import { 
	PROJECT_REQUEST_GET, PROJECT_SUCCESS_GET, PROJECT_FAIL_GET,
	PROJECT_REQUEST_POST, PROJECT_SUCCESS_POST, PROJECT_FAIL_POST,
	PROJECT_REQUEST_DELETE, PROJECT_SUCCESS_DELETE, PROJECT_FAIL_DELETE
} from '../constants';
import axios from 'axios';

export function projectRequestGet(){
	return { 
		type: PROJECT_REQUEST_GET,
		loading: true
	}
}

export function projectSuccessGet(projects){
	return {
		type: PROJECT_SUCCESS_GET,
		projects: projects,
		loading: false
	}
}

export function projectFailGet(err){
	return {
		type: PROJECT_FAIL_GET,
		loading: false
	}
}

export function projectGet(_id){
	return function(dispatch){
		dispatch(projectRequestGet())
		return axios.get('/project/getProjects', {
			params: { _id }
		})
  			.then(res => {
    			dispatch(projectSuccessGet(res.data))
  			})
  			.catch(err => {
    			dispatch(projectFailGet(err));
  			})
	}
}

export function projectRequestPost(){
	return { 
		type: PROJECT_REQUEST_POST,
		loading: true
	}
}

export function projectSuccessPost(res){
	return {
		type: PROJECT_SUCCESS_POST,
		projects: res,
		loading: false
	}
}

export function projectFailPost(err){
	return {
		type: PROJECT_FAIL_POST,
		loading: false
	}
}

export function projectPost(project){
	return function(dispatch){
		dispatch(projectRequestPost())
		return axios.post('/project/newProject', {project})
			.then(res => {
  			dispatch(projectSuccessPost(res.data))
			})
			.catch(err => {
  			dispatch(projectFailPost(err));
			})
	}
}

export function projectRequestDelete(){
	return { 
		type: PROJECT_REQUEST_DELETE,
		loading: true
	}
}

export function projectSuccessDelete(res){
	return {
		type: PROJECT_SUCCESS_DELETE,
		loading: false
	}
}

export function projectFailDelete(err){
	return {
		type: PROJECT_FAIL_DELETE,
		loading: false
	}
}

export function projectDelete(form){
	return function(dispatch){
	
	dispatch(projectRequestDelete())

	return axios.delete('/project/newProject', {form})
  			.then(res => {
    			dispatch(projectSuccessDelete(res.data))
  			})
  			.catch(err => {
    			dispatch(projectFailDelete(err));
  			})
	}
}

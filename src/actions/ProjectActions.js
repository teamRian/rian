import {
  PROJECT_REQUEST_GET,
  PROJECT_SUCCESS_GET,
  PROJECT_FAIL_GET,
  PROJECT_REQUEST_POST,
  PROJECT_SUCCESS_POST,
  PROJECT_FAIL_POST,
  PROJECT_REQUEST_DELETE,
  PROJECT_SUCCESS_DELETE,
  PROJECT_FAIL_DELETE,
  PROJECT_DETACH
} from "../constants";
import axios from "axios";

export function projectRequestGet() {
  return {
    type: PROJECT_REQUEST_GET,
    loading: true
  };
}

export function projectSuccessGet(project) {
  return {
    type: PROJECT_SUCCESS_GET,
    _id: project._id,
    name: project.name,
    creator: project.creator,
    member: project.member,
    link: project.link,
    chatroom: project.chatroom,
    whiteboard: project.whiteboard,
    created_at: project.created_at,
    loading: false
  };
}

export function projectFailGet(err) {
  return {
    type: PROJECT_FAIL_GET,
    loading: false
  };
}

export function projectGet(_id) {
  return function(dispatch) {
    dispatch(projectRequestGet());
    return axios
      .get("/api/project/getProject", {
        params: { _id }
      })
      .then(res => {
        dispatch(projectSuccessGet(res.data));
      })
      .catch(err => {
        dispatch(projectFailGet(err));
      });
  };
}

export function projectDetach() {
  return {
    type: PROJECT_DETACH,
    loading: false,
    _id: null,
    name: null,
    creator: null,
    member: [],
    link: null,
    chatroom: null,
    whiteboard: [],
    created_at: null
  };
}

// export function projectRequestPost(){
// 	return {
// 		type: PROJECT_REQUEST_POST,
// 		loading: true
// 	}
// }

// export function projectSuccessPost(res){
// 	return {
// 		type: PROJECT_SUCCESS_POST,
// 		projects: res,
// 		loading: false
// 	}
// }

// export function projectFailPost(err){
// 	return {
// 		type: PROJECT_FAIL_POST,
// 		loading: false
// 	}
// }

// export function projectPost(project){
// 	return function(dispatch){
// 		dispatch(projectRequestPost())
// 		return axios.post('/api/project/newProject', {project})
// 			.then(res => {
//   			dispatch(projectSuccessPost(res.data))
// 			})
// 			.catch(err => {
//   			dispatch(projectFailPost(err));
// 			})
// 	}
// }

export function projectRequestDelete() {
  return {
    type: PROJECT_REQUEST_DELETE,
    loading: true
  };
}

export function projectSuccessDelete(res) {
  return {
    type: PROJECT_SUCCESS_DELETE,
    loading: false
  };
}

export function projectFailDelete(err) {
  return {
    type: PROJECT_FAIL_DELETE,
    loading: false
  };
}

export function projectDelete(form) {
  return function(dispatch) {
    dispatch(projectRequestDelete());

    return axios
      .delete("/api/project/newProject", { form })
      .then(res => {
        dispatch(projectSuccessDelete(res.data));
      })
      .catch(err => {
        dispatch(projectFailDelete(err));
      });
  };
}

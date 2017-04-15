import React from "react";
import { Observable } from "rxjs";
import axios from 'axios';
import {
  PROJECT_EPIC_REQUEST_DATA,
  PROJECT_EPIC_FAIL_DATA,
  PROJECT_EPIC_SUCCESS_DATA,
  PROJECT_EPIC_CANCLE_DATA,
  PROJECT_EPIC_REQUEST_LINK,
  PROJECT_EPIC_LINK_CREATE_OR_EXTEND,
	PROJECT_EPIC_LINK_FAIL,
	PROJECT_EPIC_LINK_SUCCESS
} from "../constants";

/*----------  REQUEST DATA  ----------*/
export const ProjectEpicData = (action$, {getState, dispatch}) => {
	return action$.ofType(PROJECT_EPIC_REQUEST_DATA).switchMap(action =>{
		const { _id } = action;
		return Observable.fromPromise(axios.get("/api/project/getProject", {params: { _id } }))
      	.map(response =>{
      		return projectEpicSuccessData(response.data);
      	})
      	.takeUntil(action$.ofType(PROJECT_EPIC_CANCLE_DATA))
      	.catch(err => projectEpicFailData())
	})
}

export function projectEpicRequestData(_id) {
  return {
    type: PROJECT_EPIC_REQUEST_DATA,
    loading: true,
    _id
  };
}

export function projectEpicSuccessData(project) {
  return {
    type: PROJECT_EPIC_SUCCESS_DATA,
    loading: project.loading,
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
export function projectEpicFailData(err) {
  return {
    type: PROJECT_EPIC_FAIL_DATA
  };
}
export function projectEpicCancleData() {
 	return {
    type: PROJECT_EPIC_CANCLE_DATA,
    loading: false,
    _id: null,
    name: null,
    creator: null,
    member: [],
    link: [],
    chatroom: null,
    whiteboard: [],
    created_at: null
  };
}



/*----------  LINK  ----------*/
export const ProjectEpicLinkCreateOrExtend = (action$, {getState, dispatch}) => {
	return action$.ofType(PROJECT_EPIC_REQUEST_LINK).switchMap(action =>{
		const { link, _id, creator } = action;
		return Observable.fromPromise(axios.post("/api/project/link_create", {params: { link, _id, creator } }))
      	.map(response =>{
      		return projectEpicLinkSuccess(response.data);
      	})
      	.catch(err => projectEpicLinkFail())
	})
}
export function projectEpicRequestLink(link,_id, creator){
	return {
		type: PROJECT_EPIC_REQUEST_LINK,
		link, _id, creator
	}
}
export function projectEpicLinkSuccess(){
	return {
		type: PROJECT_EPIC_LINK_SUCCESS
	}
}
export function projectEpicLinkFail(){
	return {
		type: PROJECT_EPIC_LINK_FAIL
	}
}


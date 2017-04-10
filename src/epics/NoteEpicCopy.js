import Rx from 'rxjs/Rx';
import firebase from 'firebase';
import React from 'react';
import { changeRenderedNote, changEditorState } from '../actions/NoteEditorActions.js'
import { 
	NOTE_TIMELINE_GET, 
	NOTE_TIMELINE_SUCCESS, 
	NOTE_TIMELINE_CANCLE,
	NOTE_ONENOTE_GET,
	NOTE_ONENOTE_SUCCESS,
	NOTE_ONENOTE_CANCLE,
} from '../constants/index.js'




export const NoteEpic = (action$, store) => {

	return action$.ofType(NOTE_TIMELINE_GET)
		.switchMap(action=>{
			store.dispatch(noteOneCancle)
			return Rx.Observable.fromPromise(firebase.database().ref('/users' + '/' + store.getState().User._id + '/timeline').once('value'))
				.map(response => { 	
					// console.log("GET ALLOFTIMELINE!!!", response.val()) 
					return noteSuccess(response.val(), action.howSorting) 
				})
				.takeUntil(action$.ofType(NOTE_TIMELINE_CANCLE))
				.catch(err => console.log("NOTE EPIC ERROR!"))
		})

}


export function noteGet(sorting){
	return {
		type: NOTE_TIMELINE_GET,
		howSorting: sorting
	}
}

export function noteSuccess(response, b){
	return {
		type: NOTE_TIMELINE_SUCCESS,
		data: response,
		howSorting: b
	}
}

export function noteCancle(response){
	return {
		type: NOTE_TIMELINE_CANCLE
	}
}




export const NoteOneEpic = (action$, store) => {

	return action$.ofType(NOTE_ONENOTE_GET)
		.mergeMap(action=>{
			return Rx.Observable.fromPromise(firebase.database().ref('/users' + '/' + store.getState().User._id + '/notes/' + action.noteNum).once('value'))
				.map(response => { 	
					// console.log("GET ONEOFTIMELINE!!!", response.val()) 
					return noteScrollSuccess(response.val(), action.noteNum, action.timelineNum) 
				})
				.takeUntil(action$.ofType(NOTE_ONENOTE_CANCLE))
				.catch(err => console.log("NOTE ONE ERROR!"))
		})
}


export function noteOneGet(a, b){
	return {
		type: NOTE_ONENOTE_GET,
		noteNum: a,
		timelineNum: b
	}
}


export function noteScrollSuccess(response, a, b){
	return {
		type: NOTE_ONENOTE_SUCCESS,
		data: response,
		noteNum: a,
		timelineNum: b
	}
}

export function noteOneCancle(response){
	return {
		type: NOTE_ONENOTE_CANCLE
	}
}

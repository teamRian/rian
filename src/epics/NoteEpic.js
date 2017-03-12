import Rx from 'rxjs/Rx';
import firebase from 'firebase';
import React from 'react';
import { changeRenderedNote, changEditorState } from '../actions/NoteEditorActions.js'
import { 
	NOTE_TIMELINE_GET, 
	NOTE_TIMELINE_FAIL, 
	NOTE_TIMELINE_SUCCESS, 
	NOTE_TIMELINE_CANCLE,
	NOTE_SCROLLVIEW_GET,
	NOTE_SCROLLVIEW_SUCCESS,
	NOTE_ONENOTEGET_CANCLE,
	TIMELINE_RENDER_REQUEST,
	TIMELINE_RENDERING,
	NOTE_RENDER_CHANGE,
} from '../constants/index.js'



const firebaseSet$ = (getFirebase) => Rx.Observable.fromPromise(getFirebase().ref('/users').once('value'));


export const NoteEpic = (action$, store, getFirebase) => {

	return action$.ofType(NOTE_TIMELINE_GET)
		.mergeMap(action=>{
			return Rx.Observable.fromPromise(getFirebase().ref('/users' + '/' + store.getState().User._id + '/timeline').once('value'))
				.map(response => { 	
					console.log("GET Timelineresponse!!!", response.val()) 
					return noteSuccess(response.val()) 
				})
				.takeUntil(action$.ofType(NOTE_TIMELINE_CANCLE))
				.catch(err => console.log("NOTE EPIC ERROR!"))
		})

}

export const NoteOneEpic = (action$, store, getFirebase) => {

	return action$.ofType(NOTE_SCROLLVIEW_GET)
		.mergeMap(action=>{
			return Rx.Observable.fromPromise(getFirebase().ref('/users' + '/' + store.getState().User._id + '/notes/' + action.noteNum).once('value'))
				.map(response => { 	
					// console.log("GET Onenoteresponse!!!", response.val()) 
					return noteScrollSuccess(response.val(), action.noteNum, action.timelineNum) 
				})
				.takeUntil(action$.ofType(NOTE_ONENOTEGET_CANCLE))
				.catch(err => console.log("NOTE ONE ERROR!"))
		})
}

export const RenderTimelineEpic = (action$, store, getFirebase) => {

	return action$.ofType(TIMELINE_RENDER_REQUEST)
		.map( action => {
			// console.log("render")


			//이전의 NOTE 요청들을 캔슬할 것인가?
			if (action.rendering === "GET") {
			  store.dispatch(noteOneCancle())
			}
			
			
			//만약 타임라인 자체에 아무것도 없으면 이걸로 리턴
			if (!store.getState().NoteTimeline.timeline) return timelinerender("Haimei")
			
			var sink = action.position*3
			var result = store.getState().NoteTimeline.timeline.slice(sink, 10+sink)

			result = result.map( a => {
				// console.log('action', action)
				if (action.rendering === "GET") {
					store.dispatch(noteOneGet(a.id, a.timelineNum))
				}
				
				return (						
						<div className="timelinebox" 
						  key={a.id} 
						  style={{height: "150px"}} 
						  onClick={
						  	()=> { 
						  		store.dispatch(changeRenderedNote(a.id)) 
						  		store.dispatch(changEditorState(true))
						  	}
						}>
							  <div className="timelineTitle">
								{store.getState().NoteTimeline.timeline[a.id].title ? store.getState().NoteTimeline.timeline[a.id].title + " ####" + store.getState().NoteTimeline.timeline[a.id].id : "Loading" }
				 			  </div>
						 	
						 	  <div>
							 	{store.getState().NoteTimeline.timeline[a.id].content ? store.getState().NoteTimeline.timeline[a.id].content.slice(0, 160) : "Loading...................."}
							  </div>
						</div>
					)
			})
	
			return timelinerender(result)
		})
		.catch(err => console.log("RENDER ERROR!"))
}

export function noteGet(sorting){
	return {
		type: NOTE_TIMELINE_GET,
		howSorting: sorting
	}
}

export function noteOneGet(a, b){
	return {
		type: NOTE_SCROLLVIEW_GET,
		noteNum: a,
		timelineNum: b
	}
}

export function timelineRenderGet(a, b){
	return {
		type: TIMELINE_RENDER_REQUEST,
		position: a,
		rendering: b
	}

}


export function noteSuccess(response){
	return {
		type: NOTE_TIMELINE_SUCCESS,
		data: response
	}
}


export function noteScrollSuccess(response, a, b){
	return {
		type: NOTE_SCROLLVIEW_SUCCESS,
		data: response,
		noteNum: a,
		timelineNum: b
	}
}


export function timelinerender(response){
	
	return {
		type: TIMELINE_RENDERING,
		data: response
	}
}

export function noteCancle(response){
	return {
		type: NOTE_TIMELINE_CANCLE
	}
}

export function noteOneCancle(response){
	return {
		type: NOTE_ONENOTEGET_CANCLE
	}
}


export function noteTimelineFail(err){
	return {
		type: NOTE_TIMELINE_FAIL,
	}
}









import Rx from 'rxjs/Rx';
// import { getFirebase } from 'react-redux-firebase'
// import Firepad from 'firepad';
import firebase from 'firebase';
// var config = {
//     apiKey: "AIzaSyBX3jBV3-jGNqLwhSznY864MfPlp5H89Tw",
//     authDomain: "riandev-d7a54.firebaseapp.com",
//     databaseURL: "https://riandev-d7a54.firebaseio.com",
//     storageBucket: "riandev-d7a54.appspot.com",
//     messagingSenderId: "559609159517"	
// }
// firebase.initializeApp(config);

const firebaseSet$ = (getFirebase) => Rx.Observable.fromPromise(getFirebase().ref('/users').once('value'));


export const NoteEpic = (action$, store, getFirebase) => {
	console.log("i am rock", action$) 
	return action$.ofType(NOTE_TIMELINE_GET)
		.mergeMap(action=>{
				console.log("i am duck", getFirebase) 
			return firebaseSet$(getFirebase)
				.map(response => { 
					return noteSuccess(response) })
				.takeUntil(action$.ofType(NOTE_TIMELINE_CANCLE))
		})
}

export function noteGet(){
	return {
		type: NOTE_TIMELINE_GET
	}
}

export function noteSuccess(response){
	return {
		type: NOTE_TIMELINE_SUCCESS,
		data: response
	}
}

export function noteCancle(response){
	return {
		type: NOTE_TIMELINE_CANCLE
	}
}


const NOTE_TIMELINE_GET = 'NOTE_TIMELINE_GET';
const NOTE_TIMELINE_FAIL = 'NOTE_TIMELINE_FAIL';
const NOTE_TIMELINE_SUCCESS = 'NOTE_TIMELINE_SUCCESS';
const NOTE_TIMELINE_CANCLE = 'NOTE_TIMELINE_CANCLE';


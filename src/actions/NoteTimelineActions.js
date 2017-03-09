import { NOTE_TIMELINE_LOADING, NOTE_TIMELINE_SUCCESS, NOTE_TIMELINE_FAIL, NOTE_SCROLLVIEW_SUCCESS } from '../constants/index.js';
import firebase from 'firebase';




export function noteTimelineLoading(){
	return { 
		type: NOTE_TIMELINE_LOADING,
	}
}

export function noteTimelineSuccess(res){
	return {
		type: NOTE_TIMELINE_SUCCESS,
		data: res
	}
}

export function noteTimelineFail(err){
	return {
		type: NOTE_TIMELINE_FAIL,
	}
}

export function getNoteTimlineRequest(userid){

	return function(dispatch){
		
		dispatch(noteTimelineLoading())

		return firebase.database().ref('/users/' + userid + '/timeline').once('value')
			.then(function(snapshot){
				var newArr = []
			
				for (var key in snapshot.val()) {
					newArr[Number(key)] = snapshot.val()[key]
				}
				dispatch(noteTimelineSuccess(newArr))
			
			})

			.catch(function(err){
				dispatch(noteTimelineFail())
			})

	}	

}


export function getScrollViewSuccess(res, objectId, listNum){
	
	return {
		type: NOTE_SCROLLVIEW_SUCCESS,
		data: {
			Note: res,
			objectId: objectId,
			listNum: listNum
		}
	}

}


export function getScrollViewRequest(userid, objectId, listNum){
	
	return function(dispatch){
		
		dispatch(noteTimelineLoading())
		
		return firebase.database().ref('/users/' + userid + '/notes/' + objectId).once('value')
			.then(function(snapshot){
				
				console.log("get TimelineArray!!!!!!!", snapshot.val())
				dispatch(getScrollViewSuccess(snapshot.val(), objectId, listNum))
			})
			.catch(function(err){
				dispatch(noteTimelineFail())
			})

	}	

}
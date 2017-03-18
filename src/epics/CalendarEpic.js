import Rx from 'rxjs/Rx';
import firebase from 'firebase';
import React from 'react';
import { 
	CALENDAR_EPIC_REQUEST_DATA,
	CALENDAR_EPIC_FAIL_DATA,
	CALENDAR_EPIC_SUCCESS_DATA,
	CALENDAR_EPIC_CANCLE_DATA 
} from '../constants'

export const CalendarEpic = (action$, { getState, dispatch }, getFirebase) => {

	return action$.ofType(CALENDAR_EPIC_REQUEST_DATA)
		.switchMap(action=>{
			debugger
			// have to get data from action (query)
			return getFirebase()
				.ref('/users' + '/' + '58b5128650f654071bf1e8c4' + '/timeline')
				.on('value',(snapshot)=>{
					debugger
					calendarEpicSuccessData(snapshot.val())
					}
					) 
				// .takeUntil(action$.ofType(CALENDAR_EPIC_CANCLE_DATA))
		})

}
		// .catch(err => calendarEpicFailData(err))



export function calendarEpicRequestData(date){
	return {
		type: CALENDAR_EPIC_REQUEST_DATA,
		date: date
	}
}

export function calendarEpicSuccessData(snapshot){
	return {
		type: CALENDAR_EPIC_SUCCESS_DATA,
		data: snapshot
	}
}

export function calendarEpicCancleData(response){
	return {
		type: CALENDAR_EPIC_CANCLE_DATA
	}
}

export function calendarEpicFailData(err){
	return {
		type: CALENDAR_EPIC_FAIL_DATA
	}
}
import Rx from 'rxjs/Rx';
import firebase from 'firebase';
import React from 'react';
import { 
	CALENDAR_EPIC_REQUEST_DATA,
	CALENDAR_EPIC_FAIL_DATA,
	CALENDAR_EPIC_SUCCESS_DATA,
	CALENDAR_EPIC_CANCLE_DATA 
} from '../constants'

export const CalendarEpic = (action$, { getState, dispatch }, getFirebase) => 
	action$.ofType(CALENDAR_EPIC_REQUEST_DATA)
		.switchMap(action=>
			// have to get data from action (query)
			getFirebase()
				.ref(`/duck/${getState().User._id}/plans`)
				.on('value', (snapshot)=>
					calendarEpicRequestData(snapshot.val())
				)
				// .takeUntil(action$.ofType(CALENDAR_EPIC_CANCLE_DATA))
		)
		// .catch(err => calendarEpicFailData(err))



export function calendarEpicRequestData(date){
	return {
		type: CALENDAR_EPIC_REQUEST_DATA,
		date: date
	}
}

export function calendarEpicSuccessData(response, b){
	return {
		type: CALENDAR_EPIC_SUCCESS_DATA,
		data: response,
		howSorting: b
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
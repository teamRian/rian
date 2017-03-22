import { Observable } from 'rxjs';
import firebase from 'firebase';
import React from 'react';
import { 
	CALENDAR_EPIC_REQUEST_DATA,
	CALENDAR_EPIC_FAIL_DATA,
	CALENDAR_EPIC_SUCCESS_DATA,
	CALENDAR_REQUEST_DATA	
} from '../constants'

/*----------  REQUEST DATA  ----------*/

export const CalendarEpicData = (action$, { getState, dispatch }) => {
	return action$.ofType(CALENDAR_EPIC_REQUEST_DATA)
		.switchMap(action=>{
			//프로미스들을 옵저버블로 바꾼다음 포크조인 ! (포크조인은 프로미스.올이랑 비슷하네요)
			// dispatch(calendarRequestData());
			const converted = action.refs.map(ref=>Observable.fromPromise(ref.once("value")));
			return Observable.forkJoin(...converted)
				.map(response=> calendarEpicSuccessData(response))
				.catch(err=> console.log(err))
		})
}

export function calendarRequestData(){
	return { 
		type: CALENDAR_REQUEST_DATA,
		loading: true
	}
}

export function calendarEpicRequestData(refs){
	return {
		type: CALENDAR_EPIC_REQUEST_DATA,
		refs,
		loading: true
	}
}

export function calendarEpicSuccessData(snaps){
	return {
		type: CALENDAR_EPIC_SUCCESS_DATA,
		plans: snaps.map(snap=>snap.val()).concat(),
		loading: false
	}
}

export function calendarEpicFailData(err){
	return {
		type: CALENDAR_EPIC_FAIL_DATA
	}
}

/*----------  REQUEST POST  ----------*/

// export const CalendarEpicPost = (action$, {getState, disaptch}) => {
// 	return action$.ofType(CALENDAR_EPIC_REQUEST_POST)
// 		.
// }



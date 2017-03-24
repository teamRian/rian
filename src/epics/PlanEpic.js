import { Observable } from 'rxjs';
import firebase from 'firebase';
import React from 'react';
import { 
	PLAN_EPIC_REQUEST_DATA,
	PLAN_EPIC_FAIL_DATA,
	PLAN_EPIC_SUCCESS_DATA,
	PLAN_REQUEST_DATA
} from '../constants'

/*----------  REQUEST DATA  ----------*/

export const PlanEpicData = (action$, { getState, dispatch }) => {
	return action$.ofType(PLAN_EPIC_REQUEST_DATA)
		.switchMap(action=>{
			//프로미스들을 옵저버블로 바꾼다음 포크조인 ! (포크조인은 프로미스.올이랑 비슷하네요)
			const converted = action.refs.map(ref=>Observable.fromPromise(ref.once("value")));
			return Observable.forkJoin(...converted)
				.map(response=> {
					const snaps = response.reduce((a,b)=> Object.assign(a,b.val()), {})
					return planEpicSuccessData(snaps)
				})
				.catch(err=> console.log(err))
		})
}

export function planEpicRequestData(refs){
	return {
		type: PLAN_EPIC_REQUEST_DATA,
		refs,
		loading: true
	}
}

export function planEpicSuccessData(snaps){
	return {
		type: PLAN_EPIC_SUCCESS_DATA,
		plans: snaps,
		loading: false
	}
}

export function planEpicFailData(err){
	return {
		type: PLAN_EPIC_FAIL_DATA
	}
}

/*----------  REQUEST POST  ----------*/

// export const CalendarEpicPost = (action$, {getState, disaptch}) => {
// 	return action$.ofType(CALENDAR_EPIC_REQUEST_POST)
// 		.
// }



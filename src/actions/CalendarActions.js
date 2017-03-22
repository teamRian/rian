import { 
	CALENDAR_GET_DATA, CALENDAR_REQUEST_DATA, CALENDAR_FAIL_DATA,
	CALENDAR_POST_SEND, CALENDAR_POST_SUCCESS,CALENDAR_POST_FAIL,
	CALENDAR_CHANGE_MONTH, CALENDAR_CHANGE_WEEK, CALENDAR_SELECT_DATE, CALENDAR_TOGGLE,
	CALENDAR_UPDATE_CHILD_ADDED, CALENDAR_UPDATE_CHILD_REMOVED, CALENDAR_UPDATE_CHILD_CHANGED   } from '../constants';
import axios from 'axios';
import database from "firebase/database";


/*========================================
=            CALENDAR ACTIONS            =
========================================*/

/*----------  CALENDAR DATA  ----------*/
export function calendarRequestData(){
	return { 
		type: CALENDAR_REQUEST_DATA,
		loading: true
	}
}
export function calendarReceiveData(res){
	return {
		type: CALENDAR_GET_DATA,
		loading: false,
		plans: res
	}
}
export function calendarFailData(err){
	return {
		type: CALENDAR_FAIL_DATA,
		loading: false
	}
}
export function calendarRequest(form){
	return (dispatch)=>{
		
		dispatch(calendarRequestData())

		return axios.post('/plan/getPlans', {form})
      			.then(res => {
        			dispatch(calendarReceiveData(res.data.plans))
      			})
      			.catch(err => {
        			dispatch(calendarFailData(err));
      			})
	}
}

/*----------  CALENDAR POST  ----------*/
export function calendarPostSend(){
	return {
		type: CALENDAR_POST_SEND,
		loading: true
	}
}

export function calendarPostSuccess(res){
	return {
		type: CALENDAR_POST_SUCCESS,
		loading: false,
		plans: [res.data]
	}
}

export function calendarPostFail(){
	return {
		type: CALENDAR_POST_SUCCESS,
		loading: false,
	}
}

export function calendarPost(form){
	return (dispatch, getState)=>{
		dispatch(calendarPostSend());

		const db = database();
		let ref = db.ref(`duck/users/${userId}/plans`);


		return axios.post('/plan/newPlan', {form})
			.then(res=>dispatch(calendarPostSuccess(res)))
			.catch(err=>dispatch(calendarPostFail()));
	}
}

/*----------  CALENDAR CHANGE DATE  ----------*/
export function calendarChangeMonth(date){
	return {
		type: CALENDAR_CHANGE_MONTH,
		month: date.month,
		year: date.year,
		selectedDay: date.selectedDay,
		selectedWeek: date.selectedWeek,
		selectedMonth: date.selectedMonth,
		selectedYear: date.selectedYear,
		maxWeeks: date.maxWeeks
	}
}

export function calendarChangeWeek(date){
	return {
		type: CALENDAR_CHANGE_WEEK,
		selectedDay: date.selectedDay,
		selectedWeek: date.selectedWeek,
		selectedMonth: date.selectedMonth,
		selectedYear: date.selectedYear
	}
}

export function calendarSelectDate(date){
	return {
		type: CALENDAR_SELECT_DATE,
		selectedDay: date.day,
		selectedMonth: date.month,
		selectedYear: date.year
	}
}

export function calendarToggle(kind){
	return {
		type: CALENDAR_TOGGLE,
		kind: kind
	}
}

/*----------  CALENDAR FIREBASE UPDATE  ----------*/
export function calendarChildAdded(newChild){
	return {
		type: CALENDAR_UPDATE_CHILD_ADDED,
		value: newChild
	}
}
export function calendarChildRemoved(removedChild){
	return {
		type: CALENDAR_UPDATE_CHILD_REMOVED,
		value: removedChild
	}
}export function calendarChildChanged(changedChild){
	return {
		type: CALENDAR_UPDATE_CHILD_CHANGED,
		value: changedChild
	}
}

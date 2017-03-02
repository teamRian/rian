import { 
	CALENDAR_GET_DATA, CALENDAR_REQUEST_DATA, CALENDAR_FAIL_DATA,
	CALENDAR_POST_SEND, CALENDAR_POST_SUCCESS,CALENDAR_POST_FAIL,
	CALENDAR_CHANGE_DATE, CALENDAR_SELECT_DATE, CALENDAR_TOGGLE   } from '../constants';
import axios from 'axios';

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
	return function(dispatch){
		
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
	return function(dispatch){
		dispatch(calendarPostSend());

		return axios.post('/plan/newPlan', {form})
			.then(res=>dispatch(calendarPostSuccess(res)))
			.catch(err=>dispatch(calendarPostFail()));
	}
}

export function calendarChangeDate(date){
	return {
		type: CALENDAR_CHANGE_DATE,
		day: date.day,
		month: date.month,
		year: date.year
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
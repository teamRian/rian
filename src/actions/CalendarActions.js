import { 
	CALENDAR_GET_DATA, CALENDAR_REQUEST_DATA, CALENDAR_FAIL_DATA,
	CALENDAR_POST_SEND, CALENDAR_POST_SUCCESS,CALENDAR_POST_FAIL,
	CALENDAR_CHANGE_DATE   } from '../constants';
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
		data: res
	}
}

export function calendarFailData(err){
	return {
		type: CALENDAR_FAIL_DATA,
		loading: false,
		data: null
	}
}
export function calendarRequest(query){
	return function(dispatch){
		
		dispatch(calendarRequestData())

		return axios.get('/plan', { params: query })
      			.then(res => {
        			dispatch(calendarReceiveData(res.data))
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
	console.log("CALENDAR POST SUCCESS: RES:", res.data)
	return {
		type: CALENDAR_POST_SUCCESS,
		loading: false,
		data: res.data
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

		return axios.post('/plan', form)
			.then(res=>{
				dispatch(calendarPostSuccess(res));
			})
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
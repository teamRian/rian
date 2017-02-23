import { CALENDAR_GET_DATA, CALENDAR_REQUEST_DATA, CALENDAR_FAIL_DATA } from '../constants';
import axios from 'axios';

export function calendarRequestData(){
	return { 
		type: CALENDAR_REQUEST_DATA,
		status: "Loading"
	}
}

export function calendarReceiveData(res){
	return {
		type: CALENDAR_GET_DATA,
		status: true,
		data: res
	}
}

export function calendarFailData(err){
	return {
		type: CALENDAR_FAIL_DATA,
		status: false,
		data: err
	}
}
export function calendarRequest(query){
	console.log('inside calendar actions: ', query)
	return function(dispatch){
		
		dispatch(calendarRequestData())

		return axios.get('/plan', { params: { years: query } })
      			.then(res => {
      				console.log(query)
   				   	console.log(res)
        			dispatch(calendarReceiveData(res.data))
      			})
      			.catch(err => {
        			dispatch(calendarFailData(err));
      			})
	}

}

import { CALENDAR_REQUEST_DATA } from '../actions/CalendarActions.js'

var CalendarState = {
	type: 'month',
	status: false,
	data: {1:[{type:'repeat', title:'WORKING', startTime:'18:00', endTime:'20:00'}]}
}
 // CALENDAR_GET_DATA, CALENDAR_REQUEST_DATA, CALENDAR_FAIL_DATA 

export function Calendar(state = CalendarState, action) {
	switch (action.type){
		case "CALENDAR_REQUEST_DATA":
			return Object.assign({}, state, {
				status: action.status,
				data: action.data
			})
		case "CALENDAR_GET_DATA":
			return Object.assign({}, state, {
				status: action.status,
				data: action.data
			})
		case "CALENDAR_FAIL_DATA":
			return Object.assign({}, state, {
				status: action.status,
				data: action.data
			})
		default:
			return state
	}
}
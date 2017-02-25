import moment from 'moment';
var currentDate = moment().format('l').split('/').map(item=>parseInt(item));
var CalendarState = {
	type: 'month',
	loading: false,
	day: currentDate[1],
	month: currentDate[0],
	year: currentDate[2],
	locale: moment.locale(),
	data: [] // [plan, plan, plan]
}
 // CALENDAR_GET_DATA, CALENDAR_REQUEST_DATA, CALENDAR_FAIL_DATA 

export function Calendar(state = CalendarState, action) {
	switch (action.type){
		case "CALENDAR_REQUEST_DATA":
			return Object.assign({}, state, {
				loading: action.loading
			})
		case "CALENDAR_GET_DATA":
			return Object.assign({}, state, {
				loading: action.loading,
				data: action.data
			})
		case "CALENDAR_FAIL_DATA":
			return Object.assign({}, state, {
				loading: action.loading,
				data: action.data
			})
		case "CALENDAR_POST_SEND":
			return Object.assign({}, state, {
				loading: action.loading
			})
		case "CALENDAR_POST_SUCCESS":
			return Object.assign({}, state, {
				loading: action.loading,
				data: [...state.data, action.data]
			})
		case "CALENDAR_POST_FAIL":
			return Object.assign({}, state, {
				loading: action.loading
			})
		case "CALENDAR_CHANGE_DATE":
			return Object.assign({}, state, {
				day: action.day,
				month: action.month,
				year: action.year
			})
		default:
			return state
	}
}
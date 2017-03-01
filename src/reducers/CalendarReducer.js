import moment from 'moment';
var currentDate = moment().format('l').split('/').map(item=>parseInt(item));
var CalendarState = {
	kind: 'month',
	loading: false,
	day: currentDate[1],
	month: currentDate[0],
	year: currentDate[2],
	selectedDay: null,
	selectedMonth: null,
	selectedYear: null,
	currentDay: currentDate[1],
	currentMonth: currentDate[0],
	currentYear: currentDate[2],
	locale: moment.locale(),
	plans: [] // [plan, plan, plan]
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
				plans: action.plans
			})
		case "CALENDAR_FAIL_DATA":
			return Object.assign({}, state, {
				loading: action.loading,
				plans: action.plans
			})
		case "CALENDAR_POST_SEND":
			return Object.assign({}, state, {
				loading: action.loading
			})
		case "CALENDAR_POST_SUCCESS":
			return Object.assign({}, state, {
				loading: action.loading,
				plans: [...state.plans, action.plans]
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
		case "CALENDAR_SELECT_DATE":
			return Object.assign({}, state, {
				selectedDay: action.selectedDay,
				selectedMonth: action.selectedMonth,
				selectedYear: action.selectedYear
			})
		case "CALENDAR_TOGGLE":
			return Object.assign({}, state, {
				kind: action.kind
			})
		default:
			return state
	}
}
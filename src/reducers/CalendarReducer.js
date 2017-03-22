import moment from 'moment';
import { Calendar as calen } from 'calendar';
import { 
	CALENDAR_EPIC_REQUEST_DATA,
	CALENDAR_EPIC_SUCCESS_DATA,
	CALENDAR_EPIC_FAIL_DATA,
	CALENDAR_UPDATE_CHILD_ADDED, 
	CALENDAR_UPDATE_CHILD_REMOVED, 
	CALENDAR_UPDATE_CHILD_CHANGED
} from '../constants';

var currentDate = moment().format('l').split('/').map(item=>parseInt(item));
var cal = new calen(0);
var weeks = cal.monthDays(currentDate[2],currentDate[0]-1);
var maxWeeks = weeks.length;
var currentWeek =  Math.floor(
	weeks
		.reduce((a,b)=>{
		return a.concat(b)
		})
		.indexOf(currentDate[1])/7)

var CalendarState = {
	kind: 'month',
	loading: false,
	month: currentDate[0], // current displaying Calendar Month
	year: currentDate[2],
	selectedDay: currentDate[1], // selected Day 
	selectedMonth: currentDate[0],
	selectedYear: currentDate[2], 
	selectedWeek: currentWeek, // for change week
	maxWeeks: maxWeeks,
	currentDay: currentDate[1], // for display Today and go to Today
	currentMonth: currentDate[0],	
	currentYear: currentDate[2],
	locale: moment.locale(),
	plans: [] // [plan, plan, plan]
}

export function Calendar(state = CalendarState, action) {
	
	switch (action.type){
		case CALENDAR_EPIC_REQUEST_DATA: {
			return Object.assign({}, state, {
				loading: true
			})
		}
		case CALENDAR_EPIC_SUCCESS_DATA:
			return Object.assign({}, state, {
				plans: action.plans,
				loading: false
			})
		case "CALENDAR_REQUEST_DATA":
			return Object.assign({}, state, {
				loading: true
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
		case "CALENDAR_CHANGE_MONTH":
			return Object.assign({}, state, {
				month: action.month,
				year: action.year,
				selectedDay: action.selectedDay,
				selectedWeek: action.selectedWeek,
				selectedMonth: action.selectedMonth,
				selectedYear: action.selectedYear,
				maxWeeks: action.maxWeeks
			})
		case "CALENDAR_CHANGE_WEEK":
			return Object.assign({}, state, {
				selectedDay: action.selectedDay,
				selectedWeek: action.selectedWeek,
				selectedMonth: action.selectedMonth,
				selectedYear: action.selectedYear
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
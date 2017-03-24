import { 
	CALENDAR_CHANGE_MONTH, CALENDAR_CHANGE_WEEK, CALENDAR_SELECT_DATE, CALENDAR_TOGGLE
} from "../constants";
import axios from "axios";
import database from "firebase/database";

/*========================================
=            CALENDAR ACTIONS            =
========================================*/
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
	};
}

export function calendarChangeWeek(date){
	return {
		type: CALENDAR_CHANGE_WEEK,
		selectedDay: date.selectedDay,
		selectedWeek: date.selectedWeek,
		selectedMonth: date.selectedMonth,
		selectedYear: date.selectedYear
	};
}

export function calendarSelectDate(date){
	return {
		type: CALENDAR_SELECT_DATE,
		selectedDay: date.day,
		selectedMonth: date.month,
		selectedYear: date.year
	};
}

export function calendarToggle(kind){
	return {
		type: CALENDAR_TOGGLE,
		kind: kind
	};
}

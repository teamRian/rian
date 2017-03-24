import moment from "moment";
import { Calendar as calen } from "calendar";
import {
  CALENDAR_EPIC_REQUEST_DATA,
  CALENDAR_EPIC_SUCCESS_DATA,
  CALENDAR_EPIC_FAIL_DATA,
  CALENDAR_UPDATE_CHILD_ADDED,
  CALENDAR_UPDATE_CHILD_REMOVED,
  CALENDAR_UPDATE_CHILD_CHANGED,
  CALENDAR_UPDATE_COMPLETE
} from "../constants";

var currentDate = moment().format("l").split("/").map(item => parseInt(item));
var cal = new calen(0);
var weeks = cal.monthDays(currentDate[2], currentDate[0] - 1);
var maxWeeks = weeks.length;
var currentWeek = Math.floor(
  weeks
    .reduce((a, b) => {
      return a.concat(b);
    })
    .indexOf(currentDate[1]) / 7
);

const firstMonthDays = renderTime(currentDate[2], currentDate[0]);
var CalendarState = {
  kind: "month",
  loading: false,
  month: currentDate[0], // current displaying Calendar Month
  year: currentDate[2],
  selectedDay: currentDate[1], // selected Day
  selectedMonth: currentDate[0],
  selectedYear: currentDate[2],
  selectedWeek: currentWeek, // for change week
  maxWeeks: maxWeeks,
  monthDays: firstMonthDays,
  currentDay: currentDate[1], // for display Today and go to Today
  currentMonth: currentDate[0],
  currentYear: currentDate[2],
  locale: moment.locale()
};

export function Calendar(state = CalendarState, action) {
  switch (action.type) {
    case "CALENDAR_REQUEST_DATA":
      return Object.assign({}, state, {
        loading: true
      });
    case "CALENDAR_GET_DATA":
      return Object.assign({}, state, {
        loading: action.loading,
        plans: action.plans
      });
    case "CALENDAR_FAIL_DATA":
      return Object.assign({}, state, {
        loading: action.loading,
        plans: action.plans
      });
    case "CALENDAR_POST_SEND":
      return Object.assign({}, state, {
        loading: action.loading
      });
    case "CALENDAR_POST_SUCCESS":
      return Object.assign({}, state, {
        loading: action.loading,
        plans: [...state.plans, action.plans]
      });
    case "CALENDAR_POST_FAIL":
      return Object.assign({}, state, {
        loading: action.loading
      });
    case "CALENDAR_CHANGE_MONTH":
      return Object.assign({}, state, {
        month: action.month,
        year: action.year,
        selectedDay: action.selectedDay,
        selectedWeek: action.selectedWeek,
        selectedMonth: action.selectedMonth,
        selectedYear: action.selectedYear,
        maxWeeks: action.maxWeeks,
        monthDays: renderTime(action.year, action.month)
      });
    case "CALENDAR_CHANGE_WEEK":
      return Object.assign({}, state, {
        selectedDay: action.selectedDay,
        selectedWeek: action.selectedWeek,
        selectedMonth: action.selectedMonth,
        selectedYear: action.selectedYear
      });
    case "CALENDAR_SELECT_DATE":
      return Object.assign({}, state, {
        selectedDay: action.selectedDay,
        selectedMonth: action.selectedMonth,
        selectedYear: action.selectedYear
      });
    case "CALENDAR_TOGGLE":
      return Object.assign({}, state, {
        kind: action.kind
      });

    default:
      return state;
  }
}

function renderTime(year, month) {
  const cal = new calen(0);
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  const lastYear = month === 1 ? year - 1 : year;
  const lastMonth = month === 1 ? 12 : month - 1;
  const thisMonthWeeks = cal.monthDays(year, month - 1);
  const nextMonthWeeks = cal.monthDays(nextYear, nextMonth - 1);
  const lastMonthWeeks = cal.monthDays(lastYear, lastMonth - 1);
  const resultWeeks = thisMonthWeeks.map((week, i) => {
    if (i === 0) {
      return week.map((day, n) => {
        if (day !== 0) {
          return {
            red: false,
            day: day,
            month: month,
            year: year,
            week: i
          };
        } else {
          return {
            red: false,
            day: lastMonthWeeks[lastMonthWeeks.length - 1][n],
            month: lastMonth,
            year: year,
            week: i
          };
        }
      });
    } else if (i === thisMonthWeeks.length - 1) {
      return week.map((day, n) => {
        if (day !== 0) {
          return {
            red: false,
            day: day,
            month: month,
            year: year,
            week: i
          };
        } else {
          return {
            red: false,
            day: nextMonthWeeks[0][n],
            month: nextMonth,
            year: year,
            week: i
          };
        }
      });
    } else {
      return week.map(day => {
        return {
          red: false,
          day: day,
          month: month,
          year: year,
          week: i
        };
      });
    }
  });
  return resultWeeks;
}

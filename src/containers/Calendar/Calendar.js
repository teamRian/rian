import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Calendar } from "calendar";
import { calendarRequest, calendarPost, calendarChangeWeek, calendarChangeMonth, calendarSelectDate, calendarToggle } from "../../actions/CalendarActions";
import { calendarPostEpic } from "../../epics/CalendarEpic";
import FlexCalendarHeader from "../../components/FlexCalendar/FlexCalendarHeader";
import FlexCalendarBody from "../../components/FlexCalendar/FlexCalendarBody";
import "../../styles/FlexCalendar.css";

class FlexCalendar extends Component {
	constructor(props){
		super(props);
	}

	renderTime(year, month) {
		const cal = new Calendar(0);
		var nextYear = month === 12 ? year + 1 : year;
		var nextMonth = month === 12 ? 1 : month+1;
		var lastYear = month === 1 ? year - 1 : year;
		var lastMonth = month === 1 ? 12 : month-1;
		var thisMonthWeeks = cal.monthDays(year, month-1);
		var nextMonthWeeks = cal.monthDays(nextYear,nextMonth-1);
		var lastMonthWeeks = cal.monthDays(lastYear, lastMonth-1);
		var resultWeeks = thisMonthWeeks.map((week,i)=>{
			if(i === 0){
				return week.map((day, n)=>{
					if(day !== 0){
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
							day: lastMonthWeeks[lastMonthWeeks.length-1][n],
							month: lastMonth,
							year: year,
							week: i

						};
					}
				});
			} else if (i === thisMonthWeeks.length-1) {
				return week.map((day, n)=>{
					if(day !== 0){
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
				return week.map(day=>{
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
					
	render() {
		const days = ["Sun","Mon","Tu","Wed","Th","Fri","Sat"];
		// 여기서 만든 날짜 데이터들을 props로 내려준다
		const monthDays = this.renderTime(this.props.Calendar.year,this.props.Calendar.month);

		return (
				<div id="FlexCalendar">
					<FlexCalendarHeader
					User={this.props.User}
					Calendar={this.props.Calendar}
					calendarChangeWeek={date=>this.props.calendarChangeWeek.bind(this)(date)}
					calendarChangeMonth={date=>this.props.calendarChangeMonth.bind(this)(date)}
					calendarToggle={(kind)=>this.props.calendarToggle.bind(this)(kind)}
				/>
				<ul id='weekDays'>
					{ 
					days.map((day, n)=>{
							 return <li key={day} className='weekDay'>{day}</li>;})
						}
				</ul>
				<FlexCalendarBody
					User={this.props.User}
					Calendar={this.props.Calendar}
					Project={this.props.Project}
					calendarEpicRequestData={(date)=>this.props.calendarEpicRequestData.bind(this)(date)}
					calendarRequest={(user, query)=>this.props.calendarRequest.bind(this)(user, query)}
					calendarSelectDate={(date)=>this.props.calendarSelectDate.bind(this)(date)}
					calendarToggle={(kind)=>this.props.calendarToggle.bind(this)(kind)}
					monthDays={monthDays}
				/>
			</div>
		);
	}
}

function mapState(state) {
	return {
		User: state.User,
		Calendar: state.Calendar,
		Project: state.Project
	};
}

function mapDispatch(dispatch) {
	return {
		calendarEpicRequestData: (date)=> {
			dispatch(calendarEpicRequestData(date));
		},
		calendarRequest: (user, query)=> {
			dispatch(calendarRequest(user, query));
		},
		calendarChangeWeek: (date)=>{
			dispatch(calendarChangeWeek(date));
		},
		calendarChangeMonth: (date)=>{
			dispatch(calendarChangeMonth(date));
		},
		calendarSelectDate: (date)=>{
			dispatch(calendarSelectDate(date));
		},
		calendarToggle: (kind)=>{
			dispatch(calendarToggle(kind));
		}
	};
}

export default connect(mapState, mapDispatch)(FlexCalendar);
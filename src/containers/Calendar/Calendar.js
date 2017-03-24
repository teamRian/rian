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

	render() {
		const days = ["Sun","Mon","Tu","Wed","Th","Fri","Sat"];
		// 여기서 만든 날짜 데이터들을 props로 내려준다
		return (
				<div id="FlexCalendar">
				<ul id='weekDays'>
					{ 
					days.map((day, n)=>{
							 return <li key={day} className='weekDay'>{day}</li>;})
						}
				</ul>
				<FlexCalendarBody />
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
		}
	};
}

export default connect(mapState, mapDispatch)(FlexCalendar);
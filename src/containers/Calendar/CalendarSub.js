import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { calendarRequest, calendarPost, calendarChangeWeek, calendarChangeMonth, calendarSelectDate, calendarToggle } from "../../actions/CalendarActions";
import { Button } from "react-bootstrap";
import MotionMenu from "react-motion-menu";
import FlexCalendarHeader from "../../components/FlexCalendar/Sub/FlexCalendarHeader";
import FlexMonth from "../../components/FlexCalendar/Sub/FlexMonth";
import "../../styles/FlexCalendar.css";

class CalendarSub extends Component {
	constructor(props){
		super(props);
	}
	// clickToggle(){
	// 	this.props.Calendar.kind === "month"
	// 	? this.props.calendarToggle("week")
	// 	: this.props.calendarToggle("month");
	// }
	render() {
		return (
			<div id="CalendarSide">
				<FlexCalendarHeader
					User={this.props.User}
					Calendar={this.props.Calendar}
					calendarChangeWeek={date=>this.props.calendarChangeWeek.bind(this)(date)}
					calendarChangeMonth={date=>this.props.calendarChangeMonth.bind(this)(date)}
					calendarToggle={(kind)=>this.props.calendarToggle.bind(this)(kind)}
				/>
				<FlexMonth
					// Calendar={this.props.Calendar}
					// monthDays={this.props.monthDays}
				/>
			</div>
		);
	}
}

function mapState(state) {
	return {
		User: state.User,
		Calendar: state.Calendar
	};
}

function mapDispatch(dispatch) {
	return {
		calendarRequest: (user, query)=> {
			dispatch(calendarRequest(user, query));
		},
		calendarPost: (form)=> {
			dispatch(calendarPost(form));
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

export default connect(mapState, mapDispatch)(CalendarSub);
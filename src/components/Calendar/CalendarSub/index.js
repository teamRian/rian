import React, { Component } from "react";
import { connect } from "react-redux";
import { calendarRequest, calendarPost, calendarChangeWeek, calendarChangeMonth, calendarSelectDate, calendarToggle } from "../../../actions/CalendarActions";
import CalendarHeader from "./CalendarHeader";
import CalendarMonth from "./CalendarMonth";
import "./CalendarSub.css";

@connect(mapState, mapDispatch)
export default class CalendarSub extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div id="CalendarSide">
				<CalendarHeader
					User={this.props.User}
					Calendar={this.props.Calendar}
					calendarChangeWeek={date=>this.props.calendarChangeWeek.bind(this)(date)}
					calendarChangeMonth={date=>this.props.calendarChangeMonth.bind(this)(date)}
					calendarToggle={(kind)=>this.props.calendarToggle.bind(this)(kind)}
				/>
				<CalendarMonth
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
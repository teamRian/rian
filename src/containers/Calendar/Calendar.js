import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import FlexCalendarHeader from "../../components/FlexCalendar/FlexCalendarHeader";
import FlexCalendarBody from "../../components/FlexCalendar/FlexCalendarBody";
import "../../styles/FlexCalendar.css";

export default class FlexCalendar extends Component {
	constructor(props){
		super(props);
	}

	render() {
		const days = ["Sun","Mon","Tu","Wed","Th","Fri","Sat"];
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
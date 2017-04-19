import React, { Component, PropTypes } from 'react';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

export default class FlexCalendarDatePicker extends Component {
	constructor(props){
		super(props);
		var value = new Date().toISOString();
		if(this.props.Calendar.selectedDay !== null){
			var {selectedYear,selectedMonth,selectedDay} = this.props.Calendar;
			selectedMonth--;
			selectedDay++;
			value = new Date(selectedYear,selectedMonth,selectedDay).toISOString();
		} 
		this.state = {
			value: value
		}
	}
	handleChange (value, formattedValue) {
	    this.setState({
	      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
	      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
	    });
	}
	render(){
		return (
		  <DatePicker 
		  	id="calendar-datepicker" 
		  	// cellPadding={"6 12px"}
		  	showTodayButton={true}
		  	value={this.state.value} 
		  	onChange={(value, formattedValue)=>this.handleChange(value, formattedValue)}
		  />
		)
	}
}

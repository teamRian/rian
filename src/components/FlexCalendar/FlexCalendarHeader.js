import React, { Component, PropTypes } from 'react';
import { Button, Modal, Glyphicon } from 'react-bootstrap';
import FlexCalendarPostModal from './FlexCalendarPostModal';



export default class FlexCalendarHeader extends Component {
  constructor(props){
    super(props);
  }

  changeMonth(direction, date){
    const { day, month, year } = this.props.Calendar;
    var nextDay = day, nextMonth = month, nextYear = year;
    if(direction === 'left'){
      if(month === 1){
        nextYear--;
        nextMonth = 12
      } else {
        nextMonth--;
      }
    } else if (direction === 'right'){
      if(month === 12){
        nextYear++;
        nextMonth = 1
      } else {
        nextMonth++;
      }
    } else {
      nextDay = date.day;
      nextMonth = date.month;
      nextYear = date.year;
    }
    let dateObj = {
      day : nextDay,
      month : nextMonth,
      year : nextYear
    }
    this.props.calendarChangeDate(dateObj);
  }

  render() {
  	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return (
      <div id="FlexCalendarHeader">
        <div id="DateControl">
	        <Button type="button" className="btn btn-default" onClick={()=>this.changeMonth('left')}>
	          <Glyphicon glyph="menu-left" />
	        </Button>      
	         <span>{months[this.props.Calendar.month-1]} {this.props.Calendar.year}</span>
	        <Button type="button" className="btn btn-default" onClick={()=>this.changeMonth('right')}>
	          <Glyphicon glyph="menu-right" />
	        </Button> 
	    </div>
	    <div id="CalendarButtons">
	        <FlexCalendarPostModal
	          User={this.props.User}
	          Calendar={this.props.Calendar}
	          calendarPost={(form)=>this.props.calendarPost(form)}
	        />
          <Button
            onClick={this.props.calendarToggle}
          >
          {this.props.Calendar.kind}
          </Button>
        </div>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';  
import { Button, Modal, Glyphicon } from 'react-bootstrap';


export default class CalendarHeader extends Component {
  constructor(props){
    super(props);
  }

  // componentWillReceiveProps(nextProps){
  // }
  changeMonth(direction, date){
    console.log(this.props.Calendar);
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
    return (
      <div id="calendar-header">
        <Button type="button" className="btn btn-default" onClick={()=>this.changeMonth('left')}>
          <Glyphicon glyph="menu-left" />
        </Button>      
         <span>{this.props.Calendar.year} {this.props.Calendar.month}월</span>
        <Button type="button" className="btn btn-default" onClick={()=>this.changeMonth('right')}>
          <Glyphicon glyph="menu-right" />
        </Button> 
      </div>
    );
  }
}

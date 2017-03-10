import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

export default class NewComponent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className='weekTimeline'>
      	{this.props.monthDays[this.props.Calendar.selectedWeek].map((day,k)=>{
          let dayClass = classNames({
            day: true,
            [`month${day.month}`]: true,
            [`week${day.week}`]: true,
            [`week${day.day}`]: true,
            holiday: k === 6 || k === 0,
            today: day.month === this.props.Calendar.currentMonth && day.day === this.props.Calendar.currentDay && day.year === this.props.Calendar.currentYear,
            selected: day.month === this.props.Calendar.selectedMonth && day.day === this.props.Calendar.selectedDay && day.year === this.props.Calendar.selectedYear 
          })
          return (
            <li 
              key={day.day}
              className={dayClass}>
              {day.day}
            </li>
          )
        })}
      </div>
    );
  }
}

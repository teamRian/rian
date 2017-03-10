import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

export default class NewComponent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className='week'>
      	{this.props.monthDays[this.props.Calendar.selectedWeek].map((day,k)=>{
          let dayClass = classNames({
            day: true,
            [`month${day.month}`]: true,
            [`week${day.week}`]: true,
            [`week${day.day}`]: true,
            holiday: k === 6 || k === 0,
            today: day.month === this.props.Calendar.currentMonth && day.day === this.props.Calendar.currentDay && day.year === this.props.Calendar.currentYear 
          })
          return (
            <div 
              key={day.day}
              className={dayClass}>
              {day.day}
            </div>
          )
        })}
      </div>
    );
  }
}

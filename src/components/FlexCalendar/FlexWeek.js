import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import FlexSmallBrick from './FlexSmallBrick';

export default class FlexWeek extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className='weekTimeline'>
        <div className='weekCalendarWeekDays'>
          {this.props.monthDays[this.props.Calendar.selectedWeek].map((day,k)=>{
            let dayClass = classNames({
              weekCalendarWeekDay: true,
              [`month${day.month}`]: true,
              [`week${day.week}`]: true,
              [`week${day.day}`]: true,
              holiday: k === 6 || k === 0,
              today: day.month === this.props.Calendar.currentMonth && day.day === this.props.Calendar.currentDay && day.year === this.props.Calendar.currentYear,
              selected: day.month === this.props.Calendar.selectedMonth && day.day === this.props.Calendar.selectedDay && day.year === this.props.Calendar.selectedYear 
            })
            return (
              <div key={day.day} className={dayClass}>
                {day.day}
              </div>
            )
          })}
        </div>
        <div className='weekCalendarWeek'>
        	{this.props.monthDays[this.props.Calendar.selectedWeek].map((day,k)=>{
            let dayClass = classNames({
              weeklyDay: true,
              [`month${day.month}`]: true,
              [`week${day.week}`]: true,
              [`week${day.day}`]: true,
              holiday: k === 6 || k === 0,
              today: day.month === this.props.Calendar.currentMonth && day.day === this.props.Calendar.currentDay && day.year === this.props.Calendar.currentYear,
              selected: day.month === this.props.Calendar.selectedMonth && day.day === this.props.Calendar.selectedDay && day.year === this.props.Calendar.selectedYear 
            });
            return (
              <div key={`${day.day}`}className={dayClass}>
              { [...Array(72)].map((x,i)=>{
                  return (
                    <FlexSmallBrick 
                      key={`${day.day}${i}`}>
                    </FlexSmallBrick>
                  )
                })
              }
              </div>) 
            
          })}
        </div>
      </div>
    );
  }
}


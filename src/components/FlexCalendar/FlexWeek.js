import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import FlexSmallBrick from './FlexSmallBrick';
import { calendarPost } from '../../actions/CalendarActions';



class FlexWeek extends Component {
  constructor(props){
    super(props);
    this.smallBricksArray = [...Array(72)]
  }

  handleOnDrop(form){
    console.log("HANDLE", form)
    const chosenDay = this.props.monthDays[this.props.Calendar.selectedWeek][form.dayIndex]
    const startingTime = form.timeIndex;
    const endingTime = form.timeIndex + form.durationLength;
    const finalForm = Object.assign({}, form, {
      _userId : this.props.User._id,
      title : `Event ${this.props.Calendar.plans.length}`,
      day : chosenDay.day,
      month : chosenDay.month,
      year : chosenDay.year,
      startingTime,
      endingTime
    })
    console.log("FINAL", finalForm)
    this.props.calendarPost(finalForm);
  }

  render() {
    return (
      <div id='FlexCalendarWeek'>
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
              { this.smallBricksArray.map((x,i)=>{
                  return (
                    <FlexSmallBrick 
                      key={`${k}.${i}`}
                      timeIndex={i}
                      dayIndex={k}
                      _userId={this.props.User._id}
                      handleOnDrop={form=>this.handleOnDrop.bind(this)(form)}
                    />
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

function mapState(state) {
  return {
    User: state.User,
    Calendar: state.Calendar
  };
}

function mapDispatch(dispatch) {
  return {
    calendarPost: (form)=> {
      dispatch(calendarPost(form));
    }
  };
}

export default connect(mapState, mapDispatch)(FlexWeek);

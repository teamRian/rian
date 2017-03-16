import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { calendarRequest, calendarPost, calendarChangeWeek, calendarChangeMonth, calendarSelectDate, calendarToggle } from '../../actions/CalendarActions';
import { calendarPostEpic } from '../../epics/CalendarEpic';
import FlexCalendarHeader from '../../components/FlexCalendar/FlexCalendarHeader'
import FlexCalendarBody from '../../components/FlexCalendar/FlexCalendarBody';
import '../../styles/FlexCalendar.css';
import { calendarEpicRequestData } from '../../epics/CalendarEpic';


class Calendar extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
  }

  render() {
    const days = ['Sun','Mon','Tu','Wed','Th','Fri',"Sat"]
    return (
      <div id="FlexCalendar">
        <FlexCalendarHeader
          User={this.props.User}
          Calendar={this.props.Calendar}
          calendarChangeWeek={date=>this.props.calendarChangeWeek.bind(this)(date)}
          calendarChangeMonth={date=>this.props.calendarChangeMonth.bind(this)(date)}
          calendarToggle={(kind)=>this.props.calendarToggle.bind(this)(kind)}
        />
        <ul id='weekDays'>
            { days.map((day, n)=>{
              return <li key={day} className='weekDay'>{day}</li>
            })}
        </ul>
        <FlexCalendarBody
          User={this.props.User}
          Calendar={this.props.Calendar}
          calendarEpicRequestData={(date)=>this.props.calendarEpicRequestData.bind(this)(date)}
          calendarRequest={(user, query)=>this.props.calendarRequest.bind(this)(user, query)}
          calendarSelectDate={(date)=>this.props.calendarSelectDate.bind(this)(date)}
          calendarToggle={(kind)=>this.props.calendarToggle.bind(this)(kind)}
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
    calendarEpicRequestData: (date)=> {
      dispatch(calendarEpicRequestData(date));
    },
    calendarRequest: (user, query)=> {
      dispatch(calendarRequest(user, query));
    },
    calendarChangeWeek: (date)=>{
      dispatch(calendarChangeWeek(date))
    },
    calendarChangeMonth: (date)=>{
      dispatch(calendarChangeMonth(date))
    },
    calendarSelectDate: (date)=>{
      dispatch(calendarSelectDate(date))
    },
    calendarToggle: (kind)=>{
      dispatch(calendarToggle(kind))
    }
  };
}

export default connect(mapState, mapDispatch)(Calendar);
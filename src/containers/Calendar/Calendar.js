import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { calendarRequest, calendarPost, calendarChangeDate, calendarSelectDate, calendarToggle } from '../../actions/CalendarActions';
import {} from '../../actions';
import FlexCalendarHeader from '../../components/FlexCalendar/FlexCalendarHeader'
import FlexCalendarBody from '../../components/FlexCalendar/FlexCalendar';
import '../../styles/FlexCalendar.css';

class Calendar extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
  }

        //   <CalendarHeader
        //   User={this.props.User}
        //   Calendar={this.props.Calendar}
        //   calendarChangeDate={date=>this.props.calendarChangeDate.bind(this)(date)}
        // />
        // <CalendarBody 
        //   User={this.props.User}
        //   Calendar={this.props.Calendar}
        //   calendarRequest={(user, query)=>this.props.calendarRequest.bind(this)(user, query)}
        //   calendarPost={(form)=>this.props.calendarPost.bind(this)(form)}
        //   calendarSelectDate={(date)=>this.props.calendarSelectDate.bind(this)(date)}
        //   calendarToggle={(kind)=>this.props.calendarToggle.bind(this)(kind)}
        // />
  render() {
    return (
      <div id="FlexCalendar">
        <FlexCalendarHeader
          User={this.props.User}
          Calendar={this.props.Calendar}
          calendarChangeDate={date=>this.props.calendarChangeDate.bind(this)(date)}
          calendarPost={(form)=>this.props.calendarPost.bind(this)(form)}
          calendarToggle={(kind)=>this.props.calendarToggle.bind(this)(kind)}
        />
        <FlexCalendarBody
          User={this.props.User}
          Calendar={this.props.Calendar}
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
    calendarRequest: (user, query)=> {
      dispatch(calendarRequest(user, query));
    },
    calendarPost: (form)=> {
      dispatch(calendarPost(form));
    },
    calendarChangeDate: (date)=>{
      dispatch(calendarChangeDate(date))
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
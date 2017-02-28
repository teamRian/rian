import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { calendarRequest, calendarPost, calendarChangeDate, calendarSelectDate } from '../../actions/CalendarActions';

import d3 from 'd3';
import {} from '../../actions';
import CalendarHeader from '../../components/Calendar/CalendarHeader'
import CalendarBody from '../../components/Calendar/CalendarBody';
import '../../styles/Calendar.css';

class Calendar extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
  }

  render() {
    return (
      <div id="calendar-container">
        <CalendarHeader
          User={this.props.User}
          Calendar={this.props.Calendar}
          calendarChangeDate={date=>this.props.calendarChangeDate.bind(this)(date)}
        />
        <CalendarBody 
          User={this.props.User}
          Calendar={this.props.Calendar}
          calendarRequest={(user, query)=>this.props.calendarRequest.bind(this)(user, query)}
          calendarPost={(form)=>this.props.calendarPost.bind(this)(form)}
          calendarSelectDate={(date)=>this.props.calendarSelectDate.bind(this)(date)}
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
    }
  };
}

export default connect(mapState, mapDispatch)(Calendar);
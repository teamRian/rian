import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { calendarRequest, calendarPost, calendarChangeDate, calendarSelectDate, calendarToggle } from '../../actions/CalendarActions';
import {} from '../../actions';

class Calendar extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div id="CalendarSide">
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
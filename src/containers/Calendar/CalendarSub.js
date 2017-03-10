import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { calendarRequest, calendarPost, calendarChangeDate, calendarSelectDate, calendarToggle } from '../../actions/CalendarActions';
import { Button } from 'react-bootstrap';
// import CalendarList from 
class Calendar extends Component {
  constructor(props){
    super(props)
  }

  clickToggle(){
    this.props.Calendar.kind === 'month'
    ? this.props.calendarToggle('week')
    : this.props.calendarToggle('month');
  }
  render() {
    return (
      <div id="CalendarSide">
        <Button onClick={()=>this.clickToggle.bind(this)()}>
        {this.props.Calendar.kind.toUpperCase()}
        </Button>
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
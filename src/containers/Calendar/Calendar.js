import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { calendarRequest, calendarPost, calendarChangeDate } from '../../actions/CalendarActions';

import d3 from 'd3';
import {} from '../../actions';
import CalendarHeader from '../../components/Calendar/CalendarHeader'
import CalendarBody from '../../components/Calendar/CalendarBody';
import '../../styles/Calendar.css';

class Calendar extends Component {
  constructor(props){
    super(props)
    console.log('props: ',this.props);
  }

  componentDidMount(){
  }

  render() {
    return (
      <div id="calendar-container">
        <CalendarHeader
          Calendar={this.props.Calendar}
          calendarChangeDate={date=>this.props.calendarChangeDate.bind(this)(date)}
        />
        <CalendarBody 
          Calendar={this.props.Calendar}
          calendarRequest={query=>this.props.calendarRequest.bind(this)(query)}
          calendarPost={form=>this.props.calendarPost.bind(this)(form)}
        />
      </div>
    );
  }
}

function mapState(state) {
  return {
    Calendar: state.Calendar
  };
}

function mapDispatch(dispatch) {
  return {
    calendarRequest: (query)=> {
      dispatch(calendarRequest(query));
    },
    calendarPost: (form)=> {
      dispatch(calendarPost(form));
    },
    calendarChangeDate: (date)=>{
      dispatch(calendarChangeDate(date))
    }
  };
}

export default connect(mapState, mapDispatch)(Calendar);
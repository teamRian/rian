import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { calendarRequest, calendarPost, calendarChangeDate, calendarSelectDate, calendarToggle } from '../../actions/CalendarActions';
import { Button } from 'react-bootstrap';
import MotionMenu from 'react-motion-menu';
import FlexCalendarPostModal from '../../components/FlexCalendar/FlexCalendarPostModal'; 
import FlexCalendarColorBrick from '../../components/FlexCalendar/FlexCalendarColorBrick';
import FlexPalette from '../../components/FlexCalendar/FlexPalette';
import { CirclePicker } from 'react-color';
import '../../styles/FlexCalendar.css';
import FlexCalendarPostModal from '../../components/FlexCalendar/FlexCalendarPostModal';
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
        <FlexCalendarPostModal
            User={this.props.User}
            Calendar={this.props.Calendar}
            calendarPost={(form)=>this.props.calendarPost.bind(this)(form)}/>
        <MotionMenu
          type="circle"
          margin={60}
          openSpeed={50}>
          <Button>HEY</Button>
          <div className="colorBrick"/>
          <div className="colorBrick"/>
          <div className="colorBrick"/>
          <div className="colorBrick"/>
        </MotionMenu>
        <br/>
        <br/>
        <br/>
        <FlexCalendarColorBrick 
            Calendar={this.props.Calendar} 
            calendarToggle={()=>this.clickToggle.bind(this)()}
            text={"HEY!!!!"} 
            id={1}
            color={'lightgreen'}
            durationLength={2}
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
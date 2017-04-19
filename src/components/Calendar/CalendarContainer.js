import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarSub from "./CalendarSub";
import CalendarMain from "./CalendarMain";
import CalendarInbox from "./CalendarInbox";
import "./Calendar.css";

@connect(mapState, mapDispatch)
export default class Calendar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props;
    return (
      <div className="body-3-calendar">
        <CalendarSub  />
        <CalendarMain {...props} />
        <CalendarInbox {...props} />
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
    projectEpicRequestData: _id => {
      dispatch(projectEpicRequestData(_id));
    },
    projectEpicCancleData: () => {
      dispatch(projectEpicCancleData());
    }
  }
}
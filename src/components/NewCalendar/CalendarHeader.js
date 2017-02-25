import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class CalendarHeader extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div id="calendar-header">
        2017 2월
      </div>
    );
  }
}

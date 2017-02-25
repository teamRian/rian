import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';  
import { Button, Modal, Glyphicon } from 'react-bootstrap';


export default class CalendarHeader extends Component {
  constructor(props){
    super(props);
  }

  // componentWillReceiveProps(nextProps){
  // }

  render() {
    return (
      <div id="calendar-header">
        <Button type="button" className="btn btn-default">
          <Glyphicon glyph="menu-left" />
        </Button>      
         <span>{this.props.year} {this.props.month}월</span>
        <Button type="button" className="btn btn-default">
          <Glyphicon glyph="menu-right" />
        </Button> 
      </div>
    );
  }
}

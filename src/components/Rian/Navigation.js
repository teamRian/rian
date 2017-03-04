import React from 'react';
import { Link } from 'react-router';
import {Grid, Col, Row} from 'react-bootstrap';
import '../../styles/Navigation.css';

class Navigation extends React.Component {

  render() {
    const marginZero = {
      margin: "0px 0px",
      padding: "0px 0px"
    }
    const textWhite = {
      color: "white"
    }

    return (
      <div id="navigation" className="row" style={marginZero}>
          <div className="col-xs-3" id="calendar"><span><Link to='/calendar'>캘린더</Link></span></div>
          <div className="col-xs-2" id="todolist"><span><Link to='/todolist'>투두</Link></span></div>
          <div className="col-xs-2" id="editor"><span><Link to='/editor'>노트</Link></span></div>
          <div className="col-xs-2" id="chat"><span><Link to='/chat'>채팅</Link></span></div>
          <div className="col-xs-3" id="whiteboard"><span><Link to='/whiteboard'>화이트보드</Link></span></div>
      </div>
    )
  }
}

export default Navigation;
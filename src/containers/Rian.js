import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Grid, Col, Row} from 'react-bootstrap';

// Import Actions
import * as RianActions from '../actions';

// Import Component
import Header from '../components/Rian/Header';
import Navigation from '../components/Rian/Navigation.js'
import Calendar from './Calendar/Calendar.js';
import Chat from './Chat/ChatApp';
import TodoContainer from './Todo/TodoContainer.js';
import WhiteBoard from './WhiteBoard/WhiteBoardContainer.js';
import '../styles/Rian.css';

class RianApp extends Component {

  render() {
    const marginZero = {
      margin: "0px 0px",
      padding: "0px 0px"
    }

    const fullheight = {
      height: "100vh"
    }

    const navColor = {
      backgroundColor: "rgba(245,245,245,1)",
      height: "100vh",
      borderRight: "1px solid rgba(210,210,210,1)",
      padding: "0px 0px"
    }

    return (

      <div className="App">
        <div style={marginZero}>
          <div className="row" style={marginZero}>             
              <Header />
          </div>
          <div className="row" style={marginZero}>
            <div className="col-xs-1" style={navColor}>
              <Navigation />
            </div>
            <div className="col-xs-11" style={fullheight}>
            {this.props.children}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

function mapState(state) {
  return {
  };
}

function mapDispatch(dispatch) {
  return {
  };
}

export default connect(mapState, mapDispatch)(RianApp);
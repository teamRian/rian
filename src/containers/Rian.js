import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Grid, Col, Row} from 'react-bootstrap';

// Import Actions
import { userSignUp, userLogIn, userLogOut } from '../actions/UserActions';

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
              <Header 
                User={this.props.User}
                userLogIn={form=>this.props.userLogIn.bind(this)(form)}
                userSignUp={form=>this.props.userSignUp.bind(this)(form)} 
                userLogOut={()=>this.props.userLogOut.bind(this)()}
              />
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
    User: state.User
  };
}

function mapDispatch(dispatch) {
  return {
    userSignUp: (form)=> {
      dispatch(userSignUp(form))
    },
    userLogIn: (form)=>{
      dispatch(userLogIn(form))
    },
    userLogOut: ()=>{
      dispatch(userLogOut())
    }
  };
}

export default connect(mapState, mapDispatch)(RianApp);
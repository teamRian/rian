import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Grid, Col, Row} from 'react-bootstrap';

// Import Actions
import { userSignUp, userLogIn, userLogOut } from '../actions/UserActions';
import { projectGet, projectPost } from '../actions/ProjectActions';
// Import Component
import Header from '../components/Rian/Header';
import Navigation from '../components/Rian/Navigation.js'
import Calendar from './Calendar/Calendar.js';
import Chat from './Chat/ChatApp';
import TodoContainer from './Todo/TodoContainer.js';
import WhiteBoard from './WhiteBoard/WhiteBoardContainer.js';

import LogIn from '../components/Rian/LogIn';

import '../styles/Rian.css';

class RianApp extends Component {

  render() {
    if(this.props.User.username === null){
      return (
        <LogIn
          userSignUp={(form)=>this.props.userSignUp.bind(this)(form)}
          userLogIn={(form)=>this.props.userLogIn.bind(this)(form)}
        />
      )
    } else {

      return (

        <div className="App">
              <div className="Header">
                <Header 
                  User={this.props.User}
                  Project={this.props.Project}
                  projectGet={(userId)=>this.props.projectGet.bind(this)(userId)}
                />
              </div>
              <div className="Navigation">
                <Navigation />
              </div>
              <div className="MainContent">
                {this.props.children}
              </div>
        </div>
      )
    }
  }
}

function mapState(state) {
  return {
    User: state.User,
    Project: state.Project
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
    },
    projectGet: (userId)=>{
      dispatch(projectGet(userId))
    }
  };
}

export default connect(mapState, mapDispatch)(RianApp);
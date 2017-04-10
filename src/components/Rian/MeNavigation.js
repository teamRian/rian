import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import '../../styles/Navigation.css';

class MeNavigation extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div id="nav-bar">
        <NavLink to='/me'>HOME</NavLink>
        <NavLink to='/me/note'>NOTE</NavLink>
        <NavLink to='/me/calendar'>CALENDAR</NavLink>
      </div>
    )
  }
}

function mapState(state) {
  return {
    User: state.User
  };
}

function mapDispatch(dispatch) {
  return {
  };
}

export default connect(mapState, mapDispatch)(MeNavigation);



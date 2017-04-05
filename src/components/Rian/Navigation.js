import React from 'react';

import { NavLink } from 'react-router-dom';

import '../../styles/Navigation.css';

export class MeNavigation extends React.Component {
  render() {
    return (
      <div id="nav-bar">
        <NavLink to='/me'>HOME</NavLink>
        <NavLink to='/me/editor'>NOTE</NavLink>
        <NavLink to='/me/calendar'>CALENDAR</NavLink>
      </div>
    )
  }
}

export class ProjectNavigation extends React.Component {
  render() {
    return (
      <div id="nav-bar">
        <NavLink to='/projectPage'>HOME</NavLink>
        <NavLink to='/projectPage/whiteboard'>BOARD</NavLink>
      </div>
    )
  }
}

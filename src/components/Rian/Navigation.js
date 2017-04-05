import React from 'react';

import { NavLink } from 'react-router-dom';

import '../../styles/Navigation.css';

class Navigation extends React.Component {
  constructor(props){
    super(props);
    console.log(props, "PROPS!!! NAV")
  }
  clickLink(link){
    browserHistory.push(link);
  }
  render() {
    return (
      <div id="nav-bar">
        <NavLink to='/home'>HOME</NavLink>
        <NavLink to='/calendar'>캘린더</NavLink>
        <NavLink to='/editor'>노트</NavLink>
        <NavLink to='/whiteboard'>화이트보드</NavLink>
      </div>
    )
  }
}

export default Navigation;
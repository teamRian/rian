import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./Navigation.css";

export default class MeNavigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="nav-bar">
        <NavLink exact className="link" to="/me">HOME</NavLink>
        <NavLink exact className="link" to="/me/note">NOTE</NavLink>
        <NavLink exact className="link" to="/me/calendar">CALENDAR</NavLink>
      </div>
    );
  }
}

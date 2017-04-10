import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import moment from "moment";
import { withRouter } from "react-router";

import "../../styles/Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    // if (
    //   nextProps.User.projects.length === this.props.User.projects.length + 1
    // ) {
    //   this.props.history.push("/project");
    // }
  }
  render() {
    const { projects, loading, _id } = this.props.User;
    if (_id === null || loading === true) {
      return <div className="Header" />;
    }
    return (
      <div className="Header">
        <NavLink to="/me" className="headerMenu" id="home">RIAN</NavLink>
        {projects.map((project, i) => {
          return (
            <NavLink to={`/project/${project._id}`} key={project._id} className="headerMenu">
              {project.name}
            </NavLink>
          );
        })}
        <NavLink id="addButton" to="/me/new_project">+</NavLink>
      </div>
    );
  }
}

export default withRouter(Header);

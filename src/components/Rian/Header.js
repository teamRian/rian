import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { TransitionMotion, spring, presets } from "react-motion";
// import HeaderHoverMenu from "./HeaderHoverMenu";
import "../../styles/Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    const { location, Project, User } = nextProps;
    const next = location.pathname.split("/");
    const isProject = next[1] === "project";

    if (User._id !== null && isProject && Project.loading === false) {
      // 프로젝트를 가져오자
      const nextProject = next[2];
      if (nextProject !== Project._id) {
        this.props.projectEpicRequestData(nextProject);
      }
    } else if (!isProject && Project._id) {
      // 프로젝트
      this.props.projectEpicCancleData();
    }
  }

  render() {
    const { User, Project, projectGet } = this.props;
    const { projects, loading, _id } = User;
    console.log(projects);
    return (
      <div className="Header">
        <NavLink to="/me" className="headerMenu" id="home" key="me">
          RIAN
        </NavLink>
        {projects.map((project, i) => {
          return (
            <NavLink
              to={`/project/${project._id}`}
              key={project._id}
              className="headerMenu"
            >
              {project.name}
            </NavLink>
          );
        })}
        <NavLink id="addButton" to="/me/new_project" key="button">+</NavLink>
      </div>
    );
  }
}
        // <HeaderHoverMenu 
        //   User={User}
        //   Project={Project}
        // />
export default withRouter(Header);




import React, { Component } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { TransitionMotion, spring, presets } from "react-motion";
import "../../styles/Header.css";
import HeaderHoverMenu from "./HeaderHoverMenu";
import MeNavigation from "./Me/MeNavigation";
import ProjectNavigation from "./Project/ProjectNavigation";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    const { location, Project, User } = nextProps;
    const next = location.pathname.split("/");
    const isProject = next[1] === "project";
    if (isProject && !Project.loading) {
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
    const { User, Project, projectGet, match, history, location } = this.props;
    const { projects, loading, _id } = User;
    return (
      <div className="Header">
        <HeaderHoverMenu
          User={User}
          Project={Project}
          match={match}
          history={history}
          location={location}
        />
        <Switch>
          <Route
            path="/project/:projectId"
            render={props => <ProjectNavigation {...props} />}
          />
          <Route
            path="/me"
            render={props => <MeNavigation {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

// <div className="HeaderHoverMenu">
          
//           <NavLink to="/me" className="headerMenu" id="home" key="me">
//             RIAN
//           </NavLink>
//           {projects.map((project, i) => {
//             return (
//               <NavLink
//                 to={`/project/${project._id}`}
//                 key={project._id}
//                 className="headerMenu"
//               >
//                 {project.name}
//               </NavLink>
//             );
//           })}
//           <NavLink className="headerMenu" to="/me/new_project" key="button">+</NavLink>
//         </div>
export default withRouter(Header);

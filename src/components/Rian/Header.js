import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import moment from "moment";
import { withRouter } from "react-router";
import { TransitionMotion, spring, presets } from "react-motion";

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

  getStyles(){
    const { projects } = this.props.User;
    const homeButton = {
      key: "rianHome",
      data: {name:"Rian"},
      style: {flex:1}
    }
    let styleArray = [homeButton];
    console.log(projects,"PROJECTs");
    if(projects.length > 0){
      styleArray= styleArray.concat(
        projects.map(project=> ({
          key: `${project._id}`,
          data: {name:project.name},
          style: {flex: 1}
        }))
      )  
    }
    return styleArray;
  }

  willEnter() {
    return {
      flex: 0,
      opacity: 1
    };
  }

  willLeave() {
    return {
      flex: spring(0),
      opacity: spring(0)
    };
  }
  render() {
    const { projects, loading, _id } = this.props.User;
    const { Project, projectGet } = this.props;
    if (_id === null || loading === true) {
      return <div className="Header" />;
    }
    return (
      <div className="Header">
        
        <TransitionMotion
          styles={this.getStyles()}
          willLeave={this.willLeave}
          willEnter={this.willEnter}
        >
        {styles=>
          <div className="HeaderHoverMenu">
            {
              styles.map(config=>{
                console.log(config, " STYLES CONFIG ");
                return (<NavLink to="/me" key={config.key} style={{...config.style, border: '1px solid'}}>
                  {config.data.name}
                </NavLink>)
              })
            }
          </div>
        }
        </TransitionMotion>
      </div>
    );
  }
}

export default withRouter(Header);


          // <NavLink to="/me" className="headerMenu" id="home" key="me">
          //   RIAN
          // </NavLink>
          // {projects.map((project, i) => {
          //   return (
          //     <NavLink
          //       to={`/project/${project._id}`}
          //       key={project._id}
          //       className="headerMenu"
          //     >
          //       {project.name}
          //     </NavLink>
          //   );
          // })}
          // <NavLink id="addButton" to="/me/new_project" key="button">+</NavLink>

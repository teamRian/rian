import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import '../../styles/Navigation.css';

import { projectGet } from "../../actions/ProjectActions";

class ProjectNavigation extends Component {
  constructor(props){
    super(props);
    console.log(props,"PROJECT NAVI");
  }
  render() {
    const { match } = this.props;
    return (
      <div id="nav-bar">
        <NavLink exact className="link" to={`/project/${match.params.projectId}`}>HOME</NavLink>
        <NavLink exact className="link" to={`/project/${match.params.projectId}/whiteboard`}>BOARD</NavLink>
        <NavLink exact className="link" to={`/project/${match.params.projectId}/file`}>FILE</NavLink>
      </div>
    )
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
    projectGet: projectId => {
      dispatch(projectGet(projectId));
    }
  };
}

export default connect(mapState, mapDispatch)(ProjectNavigation);
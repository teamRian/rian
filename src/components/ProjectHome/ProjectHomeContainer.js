import React, { Component } from "react";
import { connect } from "react-redux";
import ProjectHomeNav from "./ProjectHomeNav";
@connect(mapState)
export default class ProjectHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Project } = this.props;
    return (
      <div className="body-3">
        <ProjectHomeNav Project={Project} />
        <div className="middle"> HEY2 </div>
        <div className="right"> HEY3 </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    User: state.User,
    Project: state.Project
  };
}
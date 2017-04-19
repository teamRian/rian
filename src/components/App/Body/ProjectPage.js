import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ProjectHome from "../../ProjectHome/ProjectHomeContainer";
import LiveNote from "../../LiveNote/LiveNoteContainer";
import File from "../../File/FileContainer";
// import AddMember from "../../ProjectHome/AddMember";

const ProjectPage = () => (
  <Switch>
    <Route exact path="/project/:projectId" component={ProjectHome} />
    <Route exact path="/project/:projectId/note" component={LiveNote} />
    <Route exact path="/project/:projectId/file" component={File} />
    <Route exact path="/project/:projectId/add-member" />
  </Switch>
)

export default ProjectPage;
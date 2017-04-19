import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import MePage from "./MePage";
import ProjectPage from "./ProjectPage";
import "./Body.css";

const BodyContainer = () => (
	<Switch>
		<Route path="/me" component={MePage} />
		<Route path="/project" component={ProjectPage} />
	</Switch>
);

export default BodyContainer
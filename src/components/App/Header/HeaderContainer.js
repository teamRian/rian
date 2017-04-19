// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import HeaderHoverMenu from "./HeaderHoverMenu";
import MeNavigation from "../Navigation/MeNavigation";
import ProjectNavigation from "../Navigation/ProjectNavigation";

import {
	projectEpicRequestData,
	projectEpicCancleData,
	projectEpicRequestLink
} from "../../../epics/ProjectEpic";

import "./Header.css";

function mapState(state) {
	return {
		User: state.User,
		Project: state.Project
	};
}

function mapDispatch(dispatch) {
	return {
		projectEpicRequestData: _id => {
			dispatch(projectEpicRequestData(_id));
		},
		projectEpicCancleData: () => {
			dispatch(projectEpicCancleData());
		}
	};
}

@withRouter
@connect(mapState, mapDispatch)
export default class HeaderContainer extends React.Component {
	props: {
		User: Object,
		Project: Object,
		location: Object,
		match: Object,
		history: Object,
		projectDetach: Function,
		projectEpicRequestData: Function,
		projectEpicCancleData: Function
	};

	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps: Object) {
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
		const { User, Project, match, history, location } = this.props;
		const { projects, loading, _id } = User;
		return (
			<section className="header">
				<HeaderHoverMenu
					User={User}
					Project={Project}
					match={match}
					history={history}
					location={location}
				/>
				<Switch>
					<Route path="/project" component={ProjectNavigation} />
					<Route path="/me" component={MeNavigation} />
				</Switch>
			</section>
		);
	}
}

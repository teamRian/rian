import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import MeHome from "../../MeHome/MeHomeContainer";
import Note from "../../Note/NoteContainer";
import Calendar from "../../Calendar/CalendarContainer";
import AddProject from "../../MeHome/AddProject";

const MePage = () => (
	<Switch>
		<Route exact path="/me" component={MeHome} />
		<Route exact path="/me/note" component={Note} />
		<Route exact path="/me/calendar" component={Calendar} />
		<Route exact path="/me/new_project" component={AddProject} />
	</Switch>
)

export default MePage
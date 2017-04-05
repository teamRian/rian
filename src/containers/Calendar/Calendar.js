import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import FlexCalendarBody from "../../components/FlexCalendar/Container/FlexCalendarBody";

import "../../styles/FlexCalendar.css";

export default class FlexCalendar extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div id="FlexCalendar">
				<div id="FlexContainer">
					<FlexCalendarBody />
				</div>
				<div id="FlexInboxContainer">
					<div id="FlexCreateBox">
					</div>
					<div id="FlexInbox">
					</div>
				</div>
			</div>
		);
	}
}
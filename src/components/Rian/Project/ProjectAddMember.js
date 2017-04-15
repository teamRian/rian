import React, { Component } from "react";
import "../../../styles/AddMember.css";

export default class ProjectAddMember extends Component {
	constructor(props){
		super(props);
		console.log(props);
	}
	render() {
		const { link, _id } = this.props.Project;
		const creator = this.props.User._id;
		return (
			<div className="add_member">
				<div className="add_link" onClick={()=>this.props.projectEpicRequestLink(link, _id, creator)}>
					<div className="current_link">
						{
							link === undefined
							? "Press to Add New Link"
							: "LINK"
						}
					</div>
				</div>
				<div className="add_options">
					SEND EMAIL, QR, RIANID
				</div>
			</div>
		);
	}
}

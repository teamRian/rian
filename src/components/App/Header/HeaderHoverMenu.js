import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { TransitionMotion, spring, presets } from  "react-motion";

export default class HeaderHoverMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuActive: false,
			top: 70
		};
		this.handleMouseClick = this.handleMouseClick.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
	}
	handleMouseClick(key) {
		this.setState({
			menuActive:false,
			top:70
		})
		this.props.history.push(key);
	}
	handleMouseEnter() {
		this.setState({
			menuActive: true,
			top:70
		});
	}
	handleMouseLeave() {
		this.setState({
			menuActive: false,
			top:70
		});
	}
	getStyles(topPx) {
		const newProject = (top) => ({
			key: '/me/new_project',
			data: { name: "Add Project"},
			style: { 
				height: 70,					
				top: spring(top, {stiffness: 300, damping: 50} )
			}
		});
		const { User, Project, location } = this.props;
		let top = topPx;
		let { projects } = User;
		const { _id, name } = Project;
		const isProject = Project._id === null ? false : true;
		const opacity = this.state.menuActive ? 1 : 0;
		let styleArray = [];
		let stringProjects = projects.map(project => project._id.toString());
		if (isProject) {
			styleArray.push({
				key: `/project/${_id}`,
				data: { name },
				style: { height: 70 }
			});
			if (!this.state.menuActive) {
				return styleArray;
			}
			if (Project._id !== location.pathname.split("/")[2]){
				return styleArray;
			}
			let currentIndex = stringProjects.indexOf(_id);
			styleArray.push({
				key: `/me`,
				data: { name: "rian" },
				style: {
					height: 70,
					top: spring(top, {stiffness: 300, damping: 50} )
				}
			});
			top += 70;
			projects.forEach((item,i) => {
				if(i === currentIndex){
					return;
				}
				styleArray.push({
					key: `/project/${item._id}`,
					data: { name: item.name },
					style: {
						height: 70,
						top: spring(top, {stiffness: 300, damping: 50} )
					}
				});
				top += 70;
			});
		} else {
			styleArray.push({
				key: `/me`,
				data: { name: "rian" },
				style: { height: 70 }
			});
			if (!this.state.menuActive) {
				return styleArray;
			}
			projects.forEach((item,i) => {
				styleArray.push({
					key: `/project/${item._id}`,
					data: { name: item.name },
					style: {
						height: 70,
						top: spring(top, {stiffness: 300, damping: 50} )
					}
				});
				top +=70;
			});
		}
		styleArray.push(newProject(top));
		return styleArray;
	}

	willEnter() {
		return {
			top: 70,
			height: 0,
			opacity: 0
		};
	}

	willLeave() {
		return {
			top: 70,
			height: 0,
			opacity: 0
		};
	}

	render() {
		return (
			<TransitionMotion
				styles={this.getStyles(70)}
				willLeave={this.willLeave}
				willEnter={this.willEnter}
			>
				{styles => (
					<div
						className="project-list"
						onMouseEnter={this.handleMouseEnter}
						onMouseLeave={this.handleMouseLeave}
					>
						{styles.map(config => {
							return (
								<div
									key={config.key}
									style={{ ...config.style }}
									onClick={()=>this.handleMouseClick(config.key)}
									>
									{config.data.name}
								</div>
							);
						})}
					</div>
				)}
			</TransitionMotion>
		);
	}
}

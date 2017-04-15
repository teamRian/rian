// import React, { Component } from "react";
// import { withRouter } from "react-router";
// import { NavLink } from "react-router-dom";
// import { TransitionMotion, spring, presets } from "react-motion";

// class HeaderHoverMenu extends Component {
// 	constructor(props){
// 		super(props);
// 		this.state = {
// 			menuActive: false,
// 			currentHome: HomeLink
// 		};
		
// 	}

//   getStyles(){
//   	const { User, Project } = this.props;
//     const { projects } = User;
//     const { _id, name } = Project;
//     const HomeButton = {
//     	key: "/me",
//     	data: {name:"Rian"},
//     	style: { flex:1 }
//     }
//     if(_id){
//     	const isProject = true
//     } else {
//     	return [HomeButton]
//     }	

//     const firstButton = isProject 
//     ? [{
//       key: `/project/${_id}`,
//       data: { name },
//       style: { flex: 1 }
//     }, HomeButton]
//     : [HomeButton];
//     if(isProject){
//     	for (let i of projects){
//     		if(projects[i]._id === _id){
//     			projects.splice(i,1);
//     		}
//     	}
//     }
//     let styleArray;
//     console.log(projects,"PROJECTs");
//     if(projects.length > 0){
//       styleArray = firstButton.concat(
//       	projects.map(project=> ({
//           key: `/project/${project._id}`,
//           data: {name:project.name},
//           style: {flex: 0}
//         }))
//       )
//     }
//     return styleArray;
//   }

//   willEnter() {
//     return {
//       flex: 0,
//       opacity: 1
//     };
//   }

//   willLeave() {
//     return {
//       flex: spring(0),
//       opacity: spring(0)
//     };
//   }

// 	render() {
// 		return (
// 			<div className="HeaderHoverMenu">
// 			 <TransitionMotion
//           styles={this.getStyles()}
//           willLeave={this.willLeave}
//           willEnter={this.willEnter}
//         >

//         </TransitionMotion>
//        </div>
// 		);
// 	}
// }

// export default withRouter(HeaderHoverMenu);

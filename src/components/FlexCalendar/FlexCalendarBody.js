import React, { Component, PropTypes } from "react";
// import { Calendar } from "calendar";
// import {Motion, spring, StaggeredMotion, TransitionMotion} from "react-motion";
import FlexMonth from "./FlexMonth";
import FlexWeek from "./FlexWeek";
import { connect } from "react-redux";
import { getStampFire } from "./Utils/FlexUtils.js";
import { calendarEpicRequestData } from "../../epics/CalendarEpic";

class FlexCalendarBody extends Component {
	constructor(props){
		super(props);
		this.loaded = false;
		this.projectsLoaded = false;
	}

	componentDidMount() {
		const { monthDays, User, Project } = this.props;
		this.ref = getStampFire(this.setState, monthDays, User._id, Project, this.loaded, this.projectsLoaded);
	  const allPromises = this.ref.map(ref=>ref.once("value"));
	  this.props.calendarEpicRequestData(allPromises);
	}

	componentWillUnmount(){
		// Unmount 될 때 파이어베이스 통신을 제거합시다
		this.ref.forEach(item=>item.off());
	}

	componentWillReceiveProps(nextProps) {
		// 달이 바뀌면 기존 연결을 갱신하죠
		if( nextProps.Calendar.month !== this.props.Calendar.month ){
			if(this.ref){

				const { monthDays, User, Project } = nextProps;
				this.ref.forEach(item=>item.off());
				this.ref = getStampFire(this.setState, monthDays, User._id, Project, this.loaded, this.projectsLoaded);

				const allPromises = this.ref.map(ref=>ref.once("value"));
	  		this.props.calendarEpicRequestData(allPromises);
			}
		}
	}
	render() {
		const { plans, projectsPlans } = this.props;
		// 파이어베이스에서 가져온 데이터가 준비되면 props로 내려준다
		// const plansList = !isLoaded(plans)
		//	? 'Loading'
		//	: isEmpty(plans)
		//	? 'Todo list is empty'
		//	: plans
		// const projectsPlansList = !isLoaded(projectsPlans)
		//   ? 'Loading'
		//   : isEmpty(projectsPlans)
		//	? 'Todo list is empty'
		//	: projectsPlans

		// 여기서 만든 날짜 데이터들을 props로 내려준다
		// const monthDays = this.renderTime(this.props.Calendar.year,this.props.Calendar.month);

		return (
		<div id="FlexCalendarBody">
			{ this.props.Calendar.kind === "month"
				// FlexMonth를 기본적으로 쏴주기 때문에 컨스트럭터에는 플랜들이 없다
				? <FlexMonth 
					Calendar={this.props.Calendar}
					monthDays={this.props.monthDays}
					plansList={plans}
					projectsPlansList={projectsPlans}
					/>
				// FlexWeek를 누를때면 이미 플랜들이 있을것이다
				: <FlexWeek
					User={this.props.User}
					Calendar={this.props.Calendar}
					monthDays={this.props.monthDays}
					plansList={this.props.plans}
					projectsPlansList={this.props.projectsPlans}
				/>
			}
		</div>
		);
	}
}

function mapState(state) {
	const {User, Calendar} = state;
	return {
		User, Calendar
	};
}	

function mapDispatch(dispatch) {
  return {
    calendarEpicRequestData: (promises)=> {
      dispatch(calendarEpicRequestData(promises))
    }
  };
}
// const authConnected = connect(
//  ({ User }) => (
// 	{ User: User }
// 	)
// )(FlexCalendarBody);
	
// const firebaseConnected = firebaseConnect(
// 	({ User }) => {
// 		// 프로젝트마다의 플랜들을 불러온다
// 		// 처음 가져오는 프로젝트만 로드되기 때문에 프로젝트가 추가되거나 제거되면 Redirect 필요
// 		const projects = [];
// 		User.projects.forEach(project=>projects.push(`duck/projects/${project}/plans`));
// 		return ([`duck/users/${User._id}/plans#orderByChild=`, ...projects]);
// 	}
// )(authConnected);

FlexCalendarBody.PropTypes = {
	User: PropTypes.object,
	Calendar: PropTypes.object,
	monthDays: PropTypes.object,
	projectsPlans: PropTypes.object,
	plans: PropTypes.object,
	firebase: PropTypes.object
};

export default connect(mapState, mapDispatch)(FlexCalendarBody);

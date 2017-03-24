import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import FlexSmallBrick from "./FlexSmallBrick";
import { calendarEpicRequestPost } from "../../epics/CalendarEpic";
import moment from "moment";

class FlexWeek extends Component {
	constructor(props){
		super(props);
	// 빈 7 x 72 매트릭스를 만들고 FlexSmallBrick들로 채웁니다
		const smallBricksMatrix = [...Array(7)].map((x,k)=>{
			return (
				<div key={`${k}`} className={"weeklyDay"}>
				  { [...Array(72)]
						.map((x,i)=>
							<FlexSmallBrick 
							  key={`${k}.${i}`}
							  timeIndex={i}
							  dayIndex={k}
							  _userId={this.props.User._id}
							  handleOnDrop={form=>this.handleOnDrop.bind(this)(form)}
							  handleCanDrop={(timeIndex, dayIndex)=>this.handleCanDrop.bind(this)(timeIndex, dayIndex)}
							/>
						)
				  }
				</div>
	  	);
		});
		this.smallBricksMatrix = smallBricksMatrix;
	}

	componentWillReceiveProps(nextProps){
		// console.log(nextProps, "FLEXWEEK NEXTPROPS") fdre
		if(!this.props.Calendar.update && nextProps.Calendar.update){
			console.log("SOME UPDATE!!", nextProps.Calendar.type);
		}
	}
	handleCanDrop(timeIndex, dayIndex, durationLength){
	// var = 0
	}

	handleOnDrop(form){
		const chosenDate = this.props.Calendar.monthDays[this.props.Calendar.selectedWeek][form.dayIndex];
		const startingTime = form.timeIndex;
		const endingTime = form.timeIndex + form.durationLength;
		const timeStamp = this.fromTimetoStamp(chosenDate, startingTime);
		const finalForm = Object.assign({}, form, {
			_userId : this.props.User._id,
			title : `Event ${this.props.Calendar.plans.length}`,
			day : chosenDate.day,
			month : chosenDate.month,
			year : chosenDate.year,
			startingTime,
			endingTime,
			timeStamp
		});
		var postRef = firebase.database().ref(`duck/users/${this.props.User._id}/plans`);
		var newPostKey = postRef.push().key;
	  var updates = {};
	  updates[`duck/users/${this.props.User._id}/plans/${newPostKey}`] = finalForm;
		return firebase.database().ref().update(updates);
	}

	fromTimetoStamp(date, startingTime){
		const totalMinutes = (startingTime + 22) * 15; // 5.30AM
		const hour = Math.floor(totalMinutes/60);
		const minutes = totalMinutes % 60;
		return moment([date.year, date.month+1, date.day, hour, minutes]).format('X');
	}

	render() {
		const { Calendar } = this.props;
		return (
		  <div id="FlexCalendarWeek">
				<div className="weekCalendarWeekDays">
				  { Calendar.monthDays[Calendar.selectedWeek].map((day,k)=>{
						let dayClass = classNames({
							weekCalendarWeekDay: true,
							[`month${day.month}`]: true,
							[`week${day.week}`]: true,
							[`week${day.day}`]: true,
							holiday: k === 6 || k === 0,
							today: day.month === Calendar.currentMonth && day.day === Calendar.currentDay && day.year === Calendar.currentYear,
							selected: day.month === Calendar.selectedMonth && day.day === Calendar.selectedDay && day.year === Calendar.selectedYear 
						});
						return (
							<div key={day.day} className={dayClass}>
								{day.day}
							</div>
						);
					})}
				</div>
				<div className="weekCalendarWeek">
				  { this.smallBricksMatrix }
				</div>
			</div>
	);
	}
}

function mapState(state) {
	return {
		User: state.User,
		Calendar: state.Calendar,
	};
}


FlexWeek.PropTypes = {
	User: PropTypes.object,
	Calendar: PropTypes.object,
	monthDays: PropTypes.object,
	calendarPost: PropTypes.function
};

export default connect(mapState)(FlexWeek);

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { planUpdateComplete } from "../../../actions/PlanActions";


class FlexMonth extends Component {
	constructor(props){
		super(props);
	}

	componentWillReceiveProps(nextProps){
		// if(this.props.Calendar.plans !== nextProps.Calendar.plans){
		// }
		// const printPlans = Object.keys(nextProps.Calendar.plans).length === 0 ? false : true;
		// this.renderPlans(nextProps.Calendar.plans);
	}

	shouldComponentUpdate(nextProps) {
		if(this.props.Calendar === nextProps.Calendar){
			return false;
		} 
		return true;
	}

	renderPlans(plans){
		for ( var key in plans ){
			console.log(plans[key], "PLANS")
			const plan = plans[key];
			const planDOM = <div className="event"></div>
			this.refs[`day_${plan.day}_${plan.month}`].append(planDOM)
		}
	}

	render() {
		const { Calendar } = this.props;
		const dayday = ["일","월","화","수","목","금","토"];

		return (
		<div id="SideMonth">
			<ul id="weekDays">
	      { 
					dayday.map((day, n)=>{
							 return <li key={day} className='weekDay'>{day}</li>;})
				}
	    </ul>
			{Calendar.monthDays.map((weeks,i)=>{
				return (<ul key={`week${i}`} className={`subWeek week${i}`}>
					{ weeks.map((day,k)=>{
						let dayClass = classNames({
							subDay: true,
							[`month${day.month}`]: true,
							[`week${day.week}`]: true,
							[`week${day.day}`]: true,
							holiday: k === 6 || k === 0,
							today: day.month === Calendar.currentMonth && day.day === Calendar.currentDay && day.year === Calendar.currentYear,
							selected: day.month === Calendar.selectedMonth && day.day === Calendar.selectedDay && day.year === Calendar.selectedYear
						});
						return <li 
							key={day.day} 
							className={dayClass}
							onClick={(d,i)=>this.calendarSelectDate(d,i)}
							ref={`day_${day.day}_${day.month}`}>
								{day.day} 
							</li>; })
					}				
					</ul>);})
			}
		</div>
    );
	}
}

FlexMonth.PropTypes = {
	Calendar: PropTypes.object,
	monthDays: PropTypes.object,
	calendarPost: PropTypes.function
};

function mapState(state) {
	return {
		User: state.User,
		Calendar: state.Calendar,
		Plan: state.Plan
	};
}

function mapDispatch(dispatch) {
	return {
		planUpdateComplete: ()=>{
			dispatch(planUpdateComplete());
		}
	};
}

export default connect(mapState, mapDispatch)(FlexMonth);

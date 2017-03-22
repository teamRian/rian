import React, { Component, PropTypes } from "react";
import classNames from "classnames";

export default class FlexMonth extends Component {
	constructor(props){
		super(props);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.Calendar.plans !== nextProps.Calendar.plans){
		}
	}

	shouldComponentUpdate(nextProps) {
		if(this.props.Calendar === nextProps.Calendar){
			return false;
		} 
		return true;
	}

	render() {
		const { Calendar } = this.props;
		return (
		<div className='month'>
			{this.props.monthDays.map((weeks,i)=>{
				return (<ul key={`week${i}`} className={`week week${i}`}>
					{ weeks.map((day,k)=>{
						let dayClass = classNames({
							day: true,
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
							ref={`day_${day.day}_${day.month}`}
							>
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
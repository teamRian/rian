import React, { Component, PropTypes } from 'react';
import { Calendar } from 'calendar';

export default class FlexCalendarBody extends Component {
	constructor(props){
	  super(props);
	}
	// componentWillReceiveProps(nextProps){
	// 	if(nextProps.Calendar.month !== this.props.Calendar.month){

	// 	}
	// }


	renderTime(year, month) {
		const cal = new Calendar(0);
		var nextYear = month === 12 ? year + 1 : year;
		var nextMonth = month === 12 ? 1 : month+1;
		var lastYear = month === 1 ? year - 1 : year;
		var lastMonth = month === 1 ? 12 : month-1;
		var thisMonthWeeks = cal.monthDays(year, month-1);
		var nextMonthWeeks = cal.monthDays(nextYear,nextMonth-1);
		var lastMonthWeeks = cal.monthDays(lastYear, lastMonth-1);
		var resultWeeks = thisMonthWeeks.map((week,i)=>{
			if(i === 0){
				return week.map((day, n)=>{
		    		if(day !== 0){
		    			return {
		    				red: false,
		    				day: day,
		    				month: month,
		    				week: i
		    			}
		    		} else {
		    			return {
		    				red: false,
		    				day: lastMonthWeeks[lastMonthWeeks.length-1][n],
		    				month: lastMonth,
		    				week: i

		    			}
		    		}
				})
			} else if (i === thisMonthWeeks.length-1) {
				return week.map((day, n)=>{
		    		if(day !== 0){
		    			return {
		    				red: false,
		    				day: day,
		    				month: month,
		    				week: i

		    			}
		    		} else {
		    			return {
		    				red: false,
		    				day: nextMonthWeeks[0][n],
		    				month: nextMonth,
		    				week: i
		    			}
		    		}
				})
			} else {
				return week.map(day=>{
					return {
						red: false,
						day: day,
						month: month,
						week: i
					}
				})
			}
			
		})
		return resultWeeks;
	}

    render() {
  		const days = ['Sun','Mon','Tu','Wed','Th','Fri',"Sat"]
  		const monthDays = this.renderTime(this.props.Calendar.year,this.props.Calendar.month);

    	return (
	      <div id="FlexCalendarBody">
	      	<div className='weekDays'>
		      	{ days.map((day, n)=>{
		      		return <div key={day} className='weekDay'>{day}</div>
		      	})}
		    </div>
		    {monthDays.map((weeks,i)=>{
		    	console.log(i);
		    	return (<div key={`week${i}`} className={`week week${i}`}>
		    		{ weeks.map((day,k)=>{
		    			return <div key={day.day} className={k === 0 | k === 6 ? `holiday day month${day.month} week${day.week} day${day.day}` :
		    			 `day month${day.month} week${day.week} day${day.day}` }>
		    			{day.day} </div>
		    		})}
		    	</div>)
		    })}
	      </div>
	    );
	}
}

import React, { Component, PropTypes } from 'react';
import { Calendar } from 'calendar';
import classNames from 'classnames';
import {Motion, spring, StaggeredMotion, TransitionMotion} from 'react-motion';
import FlexMonth from './FlexMonth';
import FlexWeek from './FlexWeek';

export default class FlexCalendarBody extends Component {
	constructor(props){
	  super(props);
	}

	componentDidMount(){
		// 캘린더가 로드 되었으니 파이어베이스를 콜해보자
		 
	}

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
		    				year: year,
		    				week: i
		    			}
		    		} else {
		    			return {
		    				red: false,
		    				day: lastMonthWeeks[lastMonthWeeks.length-1][n],
		    				month: lastMonth,
		    				year: year,
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
		    				year: year,
		    				week: i

		    			}
		    		} else {
		    			return {
		    				red: false,
		    				day: nextMonthWeeks[0][n],
		    				month: nextMonth,
		    				year: year,
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
						year: year,
						week: i
					}
				})
			}
			
		})
		return resultWeeks;
	}

    render() {
  		const monthDays = this.renderTime(this.props.Calendar.year,this.props.Calendar.month);
    	return (
	      <div id="FlexCalendarBody">
		    { this.props.Calendar.kind === 'month'
		    	? <FlexMonth // toggle Month/Week
		    		Calendar={this.props.Calendar}
		    		monthDays={monthDays}
		    	  />
		 	    : <FlexWeek
		 	    	monthDays={monthDays}
		 	      />
		    }
	      </div>
	    );
	}
}

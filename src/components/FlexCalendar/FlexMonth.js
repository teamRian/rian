import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

export default class FlexMonth extends Component {
  constructor(props){
    super(props);
  }

  render() {
	return (
		<div className='month'>
			{this.props.monthDays.map((weeks,i)=>{
			    	return (<div key={`week${i}`} className={`week week${i}`}>
			    		{ weeks.map((day,k)=>{
			    			let dayClass = classNames({
			    				day: true,
			    				[`month${day.month}`]: true,
			    				[`week${day.week}`]: true,
			    				[`week${day.day}`]: true,
			    				holiday: k === 6 || k === 0,
			    				today: day.month === this.props.Calendar.currentMonth && day.day === this.props.Calendar.currentDay && day.year === this.props.Calendar.currentYear 
			    			})
			    			return <div 
					    			key={day.day} 
					    			className={dayClass}
					    			onClick={(d,i)=>this.calendarSelectDate(d,i)}
					    			>
					    				{day.day} 
					    			</div> })
					    }			    	
					    </div>)})
			}
		</div>
    )
  }
}

// monthDays.map((weeks,i)=>{
// 			    	return (<div key={`week${i}`} className={`week week${i}`}>
// 			    		{ weeks.map((day,k)=>{
// 			    			let dayClass = classNames({
// 			    				day: true,
// 			    				[`month${day.month}`]: true,
// 			    				[`week${day.week}`]: true,
// 			    				[`week${day.day}`]: true,
// 			    				holiday: k === 6 || k === 0,
// 			    				today: day.month === this.props.Calendar.currentMonth && day.day === this.props.Calendar.currentDay && day.year === this.props.Calendar.currentYear 
// 			    			})
// 			    			return <div 
// 					    			key={day.day} 
// 					    			className={dayClass}
// 					    			onClick={(d,i)=>this.calendarSelectDate(d,i)}
// 					    			>
// 					    				{day.day} 
// 					    			</div> })
// 					    }			    	
// 					    </div>)
// 		 	    })
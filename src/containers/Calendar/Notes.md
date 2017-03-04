
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
	    				current: true
	    			}
	    		} else {
	    			return {
	    				red: false,
	    				day: lastMonthWeeks[lastMonthWeeks.length-1][n],
	    				current: false
	    			}
	    		}
    		})
    	} else if (i === thisMonthWeeks.length-1) {
    		return week.map((day, n)=>{
	    		if(day !== 0){
	    			return {
	    				red: false,
	    				day: day,
	    				current: true
	    			}
	    		} else {
	    			return {
	    				red: false,
	    				day: nextMonthWeeks[0][n],
	    				current: false
	    			}
	    		}
    		})
    	} else {
    		return week.map(day=>{
    			return {
    				red: false,
    				day: day
    			}
    		})
    	}
    	
    })
    console.log(resultWeeks);
    resultWeeks[2][4].red = true;
    return resultWeeks;


  }




  import React, { Component, PropTypes }  from 'react';
import { times }                        from 'lodash';
import classNames                       from 'classnames';
import FlipMove from 'react-flip-move';
import './array.js';
import throttle from './throttle';

import { Calendar } from 'calendar';
import moment from 'moment';


const SQUARES_WIDTH   = 7;
const SQUARES_HEIGHT  = 5;
const NUM_SQUARES     = SQUARES_WIDTH * SQUARES_HEIGHT;
const RED_SQUARE      = Math.floor(NUM_SQUARES / 2);
const FLIP_DURATION   = 750;
const [ LEFT, UP, RIGHT, DOWN ] = [37, 38, 39, 40];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri',"Sat"]
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

import '../../styles/FlipCalendar.scss';

export default class CalendarBody extends Component {
	constructor(props){
		super(props);
		var weeks = this.renderTime(2016,3);
		this.state = {
			weeks: weeks
		}
		console.log(weeks);
		this.move = throttle(this.move, { context: this });

	}

	componentDidMount() {
	    window.addEventListener('keydown', this.move);
	}
	componentWillUnmount() {
	    window.removeEventListener('keydown', this.move);
	
	}

	renderSquares(){
		
		return this.state.weeks.map( (week,weekN) => {
	    	return (
	  			<div id={weekN} key={weekN}>
				{ week.map((day)=>{
					const classes = classNames({
				        days: true,
				        red: day.red
				    });
					return (
						<div
			  				key={day.day}
			  				id={day.day}
			  				className={classes}
	  				        onClick={(e)=>this.move(e)}
				            // data-square={day.day}
				            data-red={day.red}
						/>
					)				
				})}
	  			</div>
	  		)
	    
  		})
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
		    				current: true
		    			}
		    		} else {
		    			return {
		    				red: false,
		    				day: lastMonthWeeks[lastMonthWeeks.length-1][n],
		    				current: false
		    			}
		    		}
				})
			} else if (i === thisMonthWeeks.length-1) {
				return week.map((day, n)=>{
		    		if(day !== 0){
		    			return {
		    				red: false,
		    				day: day,
		    				current: true
		    			}
		    		} else {
		    			return {
		    				red: false,
		    				day: nextMonthWeeks[0][n],
		    				current: false
		    			}
		    		}
				})
			} else {
				return week.map(day=>{
					return {
						red: false,
						day: day
					}
				})
			}
			
		})
		resultWeeks[2][4].red = true;
		return resultWeeks;
	}

	move(event) {
	    event.preventDefault();

	    const currentIndex = this.state.squares.findIndex( square => square.red );
	    let newIndex;

	    switch (event.which) {
	      case UP:
	        newIndex = currentIndex - SQUARES_WIDTH;
	        break;
	      case DOWN:
	        newIndex = currentIndex + SQUARES_WIDTH;
	        break;
	      case LEFT:
	        newIndex = currentIndex - 1;
	        break;
	      case RIGHT:
	        newIndex = currentIndex + 1;
	        break;
	      default:
	        // This could be a click event, not a keyboard arrow event.
	        newIndex = this.state.squares.findIndex( square => {
	          return square.id === parseInt(event.target.id);
	        });
	        break;
	    }

	    // If it wasn't a click or an arrow key, do nothing.
	    if ( !newIndex ) return;

	    this.setState({
	      squares: this.state.squares.slice().swap(currentIndex, newIndex)
	    });
	}

	paintSquare(element, node) {
		// For visual flair, we're going to colour the tiles as they pass under us.
		// We'll do this by adding a state to the square, and we'll delay it so
		// that it happens while the Fuscia Square is covering it.

		// Don't paint the Fuscia square!
		if ( element.props['data-red'] ) return;

		// Wait half the duration of the FlipMove animation, and then paint it!
		setTimeout(() => node.classList.add('painted'), FLIP_DURATION / 6)
	}

	startMove(element, node) {
		this.paintSquare(element, node);
	}
	render(){
		return (
			<div id="square">
		        <div className="board">
		          <FlipMove
		            duration={FLIP_DURATION}
		            easing="cubic-bezier(.12,.36,.14,1.2)"
		            onStart={this.startMove.bind(this)}
		          >
		            { this.renderSquares() }
		          </FlipMove>
		        </div>
		        <div className="controls">
		          <i className="fa fa-mouse-pointer" />
		          <span className="or">OR</span>
		          <span className="arrow-key">
		            <i className="fa fa-fw fa-arrow-left" />
		          </span>
		          <span className="arrow-key">
		            <i className="fa fa-fw fa-arrow-down" />
		          </span>
		          <span className="arrow-key">
		            <i className="fa fa-fw fa-arrow-up" />
		          </span>
		          <span className="arrow-key">
		            <i className="fa fa-fw fa-arrow-right" />
		          </span>
		        </div>
		    </div>
		)
	}
}
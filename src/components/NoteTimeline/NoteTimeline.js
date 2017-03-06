import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import './css/timeline.css'




class NoteTimeline extends Component {

	constructor(props) {
		super(props);
		this.state = {
			renderTimeline: [],
			keyNowRender: 1
		}
		this.renderTimeline = this.renderTimeline.bind(this)
		this.count = 0
		this.topSpacer = -800
		this.bottomSpacer = 0
	}

	componentWillMount() {
		this.renderTimeline(this.props.timeline)
	}

	renderTimeline(asset){
		var result = asset.slice(this.state.keyNowRender, this.state.keyNowRender+9)
		result = result.map( a => {
			this.count++
			
			return (
			
					<div className="timelinebox" key={this.count}>
						  <div className="timelineTitle">
						  	{a.title}
						  </div>
					 	
					 	  <div>
						 	 {a.content.slice(0, 100)}
						  </div>
					</div>
				 
			)
		})
	
		this.setState({
			renderTimeline: result
		})
	

	}



	renderWaypoint(){
		var a = this.props.timeline
		return(
			<Waypoint 
			  fireOnRapidScroll={true}
			  onEnter={ ({onPositionChange, previousPosition, currentPosition, event, waypointTop, viewportTop, viewportBottom}) => {
			 
			  	console.log("Waypoint Enter!!!!!!")		
			  	console.log("previousPosition", previousPosition)
			  	console.log("currentPosition", currentPosition)
			  	console.log("event", event)
			  	console.log("waypointTop", waypointTop)
			  	console.log("viewportTop", viewportTop)
			  	console.log("viewportBottom", viewportBottom)
			  	this.renderTimeline(a)    	
			  	} 
			  }
			  onLeave={ ({onPositionChange, previousPosition, currentPosition, event, waypointTop, viewportTop, viewportBottom}) => {
			 	console.log("Waypoint Leave!!!!!!")		 
			 	console.log("Waypoint Enter!!!!!!")		
			  	console.log("previousPosition", previousPosition)
			  	console.log("currentPosition", currentPosition)
			  	console.log("event", event)
			  	console.log("waypointTop", waypointTop)
			  	console.log("viewportTop", viewportTop)
			  	console.log("viewportBottom", viewportBottom) 
			  	this.renderTimeline(a)    	
			  	}
			  }
			/>
		)
	}

	componentWillReceiveProps(nextProps) {
		this.renderTimeline(nextProps)
	}

	render(){
		return (
		  <div className='parentWaypoint'>
			<div className='renderWaypoint'>
			    <div className="topspacer" style={ {height: this.topSpacer + "px"} }></div>
				{this.state.renderTimeline}
				{this.renderWaypoint()}
				<div className="bottomspacer" style={ {height: this.bottomSpacer + "px"} }></div>
			</div>
	      </div>
		)
	}
}

export default NoteTimeline
import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import './css/timeline.css'




class NoteTimeline extends Component {

	constructor(props) {
		super(props);
		this.state = {
			renderTimeline: null
		}
		this.renderTimeline = this.renderTimeline.bind(this)
	}

	componentWillMount() {
		this.renderTimeline(this.props.timeline)
	}

	renderTimeline(asset){

		var result = asset
		result = result.map( a => {
			
			return (
				<div className="timelinebox">

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
		return(
			<Waypoint 
			  onEnter={ () => {
			 	 console.log("Waypoint!!!!")		  
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
				{this.state.renderTimeline}
				{this.renderWaypoint()}
				{this.state.renderTimeline}
			</div>
	      </div>
		)
	}
}

export default NoteTimeline
import React, { Component } from 'react'
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

	componentWillReceiveProps(nextProps) {
		this.renderTimeline(nextProps)
	}

	render(){
		return (
			<div>
				{this.state.renderTimeline}
			</div>
		)
	}
}

export default NoteTimeline
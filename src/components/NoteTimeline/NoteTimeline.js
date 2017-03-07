import React, { Component } from 'react';
import './css/timeline.css'




class NoteTimeline extends Component {

	constructor(props) {
		super(props);
		this.state = {
			renderTimeline: [],
			keyNowRender: 1,
			
		}
		this.renderTimeline = this.renderTimeline.bind(this)
		this.count = 0
		this.topSpacer = 0
		this.bottomSpacer = 0
		this.currentScrollPosition = 0
		this.divNum = 450
	}

	componentWillMount() {

		this.renderTimeline(this.props.timeline, 0)
	}


    

	renderTimeline(asset, position){
		var sink = position*3
		var result = asset.slice(sink, 10+sink)
		console.log('result', result)
		result = result.map( a => {
		
			
			return (
			
					<div className="timelinebox" key={a.objectId} style={{height: "150px"}}>
						  <div className="timelineTitle">
							{a.title + "####" + a.objectId}
						  </div>
					 	
					 	  <div>
						 	{a.content.slice(0, 160)}
						  </div>
					</div>
				 
			)
		})

		if (result.length !== 10) {
			this.topSpacer = 150000 - result.length*150 
			this.bottomSpacer = 0
		}

		this.setState({
			renderTimeline: result
		})
	

	}


	findDomScrollPosition(){
		console.log("ScrollTop", this.refs.parentContainer.scrollTop)
		console.log(this.currentScrollPosition, Math.floor(this.refs.parentContainer.scrollTop/this.divNum))

		if (Math.floor(this.refs.parentContainer.scrollTop/this.divNum) === 0 ) {

			this.topSpacer = 0
			this.bottomSpacer = 150000 - this.topSpacer - 150*10
			this.renderTimeline(this.props.timeline, 0)
			this.currentScrollPosition = Math.floor(this.refs.parentContainer.scrollTop/this.divNum)
			console.log("Arrive")

		} else if ( this.refs.parentContainer.scrollTop > (150000-400) ) {

			console.log("Stop")
			
			this.renderTimeline(this.props.timeline, 332)
			this.currentScrollPosition = Math.floor(this.refs.parentContainer.scrollTop/this.divNum)

		} else if (  this.currentScrollPosition === Math.floor(this.refs.parentContainer.scrollTop/this.divNum) ) {
			console.log("inside")

		} else if ( this.currentScrollPosition !== Math.floor(this.refs.parentContainer.scrollTop/this.divNum) && this.currentScrollPosition !== Math.floor(this.refs.parentContainer.scrollTop/this.divNum)) {
			
			var position = this.refs.parentContainer.scrollTop/this.divNum 
			this.topSpacer = (position*3*150) - 300
			this.bottomSpacer = 150000 - this.topSpacer - 150*10
			this.renderTimeline(this.props.timeline, this.refs.parentContainer.scrollTop/this.divNum)
			this.currentScrollPosition = Math.floor(this.refs.parentContainer.scrollTop/this.divNum)
			console.log("Down Scroll Rerender!!!!")

		} 

	}


	

	componentWillReceiveProps(nextProps) {
		this.renderTimeline(nextProps)
	}

	

	render(){
		return (
		  <div ref='parentContainer' className='parentWaypoint' onScroll={ this.findDomScrollPosition.bind(this) }>
		  		<div className='renderWaypoint'>
					<div className="topspacer" style={ {height: this.topSpacer + "px"} }></div>
					{this.state.renderTimeline}
					<div className="bottomspacer" style={ {height: this.bottomSpacer + "px"} }></div>
				</div>
				
	      </div>
		)
	}
}


export default NoteTimeline
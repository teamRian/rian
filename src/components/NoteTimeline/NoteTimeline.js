import React, { Component } from 'react';
import './css/timeline.css'
import debounce from 'lodash.debounce'




class NoteTimeline extends Component {

	constructor(props) {
		super(props);
		this.state = {
			renderTimeline: [],
			keyNowRender: 1,
			renderIng: false
		}
		// this.renderTimeline = this.renderTimeline.bind(this)
		this.firstUmount = true
		this.topSpacer = 0
		this.bottomSpacer = 0
		this.currentScrollPosition = 0
		//현재는 13인치 15인치 등 기준임, 차후 알고리즘을 다시 짜야함
		this.oneBoxsize = 150
		this.divNum = this.oneBoxsize*3
		this.position 

	}

	componentDidMount() {
	   this.props.noteGet()			
	}

	findDomScrollPosition(){

		// console.log("iam", this.currentScrollPosition, Math.floor(this.refs.parentContainer.scrollTop/this.divNum))

		if (Math.floor(this.refs.parentContainer.scrollTop/this.divNum) === 0 &&  this.currentScrollPosition !== Math.floor(this.refs.parentContainer.scrollTop/this.divNum)) {
			this.props.noteOneCancle()
			// console.log("FIRST")
			this.topSpacer = 0
			this.bottomSpacer = this.oneBoxsize*this.props.HowManyNote - this.topSpacer - this.oneBoxsize*10
			this.props.timelineRenderGet(0, "GET")
			// this.renderTimeline(this.props.timeline, 0, this.props.noteOneGet, this.props.noteOneCancle)
			this.currentScrollPosition = Math.floor(this.refs.parentContainer.scrollTop/this.divNum)

		} else if (Math.floor(this.refs.parentContainer.scrollTop/this.divNum) === 0 && this.currentScrollPosition === Math.floor(this.refs.parentContainer.scrollTop/this.divNum)){
			this.props.noteOneCancle()
			console.log("OTHER")
			this.topSpacer = 0
			this.bottomSpacer = this.oneBoxsize*this.props.HowManyNote - this.topSpacer - this.oneBoxsize*10
			this.props.timelineRenderGet(0, "PASS")
			// this.renderTimeline(this.props.timeline, 0, this.props.noteOneGet, this.props.noteOneCancle)
			this.currentScrollPosition = Math.floor(this.refs.parentContainer.scrollTop/this.divNum)
		} else if ( this.refs.parentContainer.scrollTop > (this.oneBoxsize*this.props.HowManyNote-400) ) {
			this.props.noteOneCancle()
			// console.log("LAST")
			this.topSpacer = this.oneBoxsize*this.props.HowManyNote - 3*this.oneBoxsize
			this.bottomSpacer = 0
			this.props.timelineRenderGet(332, "PASS")
			// this.renderTimeline(this.props.timeline, 332, this.props.noteOneGet, this.props.noteOneCancle)
			this.currentScrollPosition = Math.floor(this.refs.parentContainer.scrollTop/this.divNum)

		} else if ( this.currentScrollPosition !== Math.floor(this.refs.parentContainer.scrollTop/this.divNum)) {
			// console.log("----CHANGE---")
			this.props.noteOneCancle()
			this.position = Math.floor(this.refs.parentContainer.scrollTop/this.divNum)
			this.topSpacer = (this.position*3*this.oneBoxsize) - this.oneBoxsize*2
			this.bottomSpacer = this.oneBoxsize*this.props.HowManyNote- this.topSpacer - this.oneBoxsize*10
			this.props.timelineRenderGet(this.position, "GET")
			// this.renderTimeline(this.props.timeline, this.refs.parentContainer.scrollTop/this.divNum, this.props.noteOneGet, this.props.noteOneCancle)
			this.currentScrollPosition = Math.floor(this.refs.parentContainer.scrollTop/this.divNum)
		} else {
			// console.log("No Change")
		}

	}


	

   	componentWillReceiveProps(nextProps) {
   		// console.log("Component")
   			if (this.firstUmount) {
   				// console.log("firstU!!")
   				this.firstUmount = false
   				this.position = 0
   				this.props.timelineRenderGet(0, "GET")
   			}
   			if (this.props.timeline !== nextProps.timeline) {
   				// console.log("Timeline!!")
   				this.props.timelineRenderGet(this.position, "PASS")
   			}
   			

   	}



	

	render(){
		return (
		  <div ref='parentContainer' 
		  	className='parentWaypoint' 
		  	onScroll={ (e)=>{ e.preventDefault();
		  	 this.findDomScrollPosition.bind(this)()} 
		  	}
		  	style={{ height: (window.innerHeight-50) + "px" }}
		  >
		  		<div className='renderWaypoint' style={{ height: this.oneBoxsize*this.props.HowManyNote + "px" }}>
					<div className="topspacer" style={ {height: this.topSpacer + "px"} }></div>
					{this.props.timelineRender}
					<div className="bottomspacer" style={ {height: this.bottomSpacer + "px"} }></div>
				</div>
				
	      </div>
		)
	}
}


export default NoteTimeline
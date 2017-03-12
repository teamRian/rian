import React, { Component } from 'react';
import './css/timeline.css'
import debounce from 'lodash.debounce'




class NoteTimeline extends Component {

	constructor(props) {

		super(props);

		

		this.oneBoxsize = 150
	    this.divNum = this.oneBoxsize*3
		this.topSpacer = 0
		this.bottomSpacer = 0
		this.oneBoxsize = 150
		this.currentScrollPosition = 0
		this.oneBoxsize = 150
		this.divNum = this.oneBoxsize*3
	
	}

	componentDidMount() {
	   //컴포넌트가 마운트 되면 전체 타임라인 리스트를 서버에 요청.
	   this.props.noteGet()			
	}

	
	findDomScrollPosition(){


		console.log("iam", this.currentScrollPosition, Math.floor(this.refs.parentContainer.scrollTop/this.divNum))

		if ( (this.refs.parentContainer.scrollTop-this.divNum) === 0) {
			console.log("----FIRST----")

			this.topSpacer = 0
			this.bottomSpacer = this.oneBoxsize*this.props.HowManyNote - this.topSpacer - this.oneBoxsize*10
			this.props.timelineRenderGet(0, "GET")
			this.currentScrollPosition = Math.floor(this.refs.parentContainer.scrollTop/this.divNum)
 
		}  else if ( this.currentScrollPosition !== Math.floor(this.refs.parentContainer.scrollTop/this.divNum)) {			
			console.log("----CHANGE----")

			this.position = Math.floor(this.refs.parentContainer.scrollTop/this.divNum)
			this.topSpacer = (this.position*3*this.oneBoxsize) - this.oneBoxsize*2
			this.bottomSpacer = this.oneBoxsize*this.props.HowManyNote- this.topSpacer - this.oneBoxsize*10
			this.props.timelineRenderGet(this.position, "GET")
			this.currentScrollPosition = Math.floor(this.refs.parentContainer.scrollTop/this.divNum)
		
		} else if ( this.refs.parentContainer.scrollTop > (this.oneBoxsize*this.props.HowManyNote-400) ) {
            console.log("----LAST----")
			this.bottomSpacer = 0
			this.topSpacer = this.oneBoxsize*this.props.HowManyNote - 3*this.oneBoxsize
			this.props.timelineRenderGet(332, "PASS")
			this.currentScrollPosition = Math.floor(this.refs.parentContainer.scrollTop/this.divNum)

		}

	}




   	componentWillReceiveProps(nextProps) {
   		// console.log("Component")

   			//첫번째 프롭스가 바뀔때는 타임라인 
   			if (this.props.timeline !== nextProps.timeline && this.firstRecieveTimeline) {
   				// console.log("firstU!!")
   				this.firstRecieveTimeline = false
   				this.position = 0
   				//최상위의 타임라인을 렌더링 시키러 요청
   				this.props.timelineRenderGet(this.position, "GET")
   			}

   			//그외 타임라인이 갱신될때마다
   			if (this.props.timeline !== nextProps.timeline && !this.firstRecieveTimeline) {
   				// console.log("Timeline!!")
   				this.props.timelineRenderGet(this.position, "PASS")
   			}
   			
   	}

   	// shouldComponentUpdate(nextProps, nextState) {
   	// 	if (nextProps.timelineRender === nextState.timelineRender) {
   	// 		console.log("No Change")
   	// 		return false
   	// 	} else {
   	// 		console.log("Change")
   	// 		return true
   	// 	}
   	// }



	

	render(){
		return (
		  <div ref='parentContainer' 
		  	className='parentWaypoint' 
		  	onScroll={ 
		  		(e) => { 
		  			e.preventDefault();
		  	 		if (this.currentScrollPosition !== Math.floor(this.refs.parentContainer.scrollTop/this.divNum)) {
		  	 			this.findDomScrollPosition.bind(this)()
		  	 		} else {
		  	 			console.log("SAME!!!!!")
		  	 		}  
		  	  	}
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
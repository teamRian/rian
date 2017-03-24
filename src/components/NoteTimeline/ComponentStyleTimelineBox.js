import React, { Component } from 'react';


class TemplineBox extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			LoadingComplete: false
		}
		
		this.changeLoadingComplete = this.changeLoadingComplete.bind(this)

	}

	componentDidMount() {
		// console.log('tempbox Didmount', this.props.timelinekey)
		//만약 해당 타임라인에 데이터가 없으면
		if (!this.props.timeline.title) {
			this.props.oneOfTimelineGet(this.props.timelineId, this.props.timelinekey)
		} else {
		//데이터가 있으면
			this.changeLoadingComplete(true)
		}
		
	}


	componentWillReceiveProps(nextProps) {
		// console.log("RECIEVE NEXTPRP", this.props.TimelineUpdate)
		if (nextProps.TimelineUpdate) {
		//전체 타임라인 업데이트일 경우
			// console.log("Timeline Update")
			this.changeLoadingComplete(false)
			//새로운 타임라인 아이디로 요청을 보낸다.
			this.props.oneOfTimelineGet(nextProps.timelineId, nextProps.timelinekey)
		} else {
			// console.log("Props Update")
		//타임라인 아이디 없데이트가 아니고 개별 업데이트일 경우

			if (!this.state.LoadingComplete && nextProps.timeline.title) {
			//그전에 내용이 없는 로딩상태였다가 첫번째로 받은 경우
				// console.log('props hcage')
			  this.changeLoadingComplete(true)
			}
		}
		//다른 케이스는 없는듯 아무것도 않한다. 그때는
	}

	componentDidUpdate(prevProps, prevState) {
	
	}

	componentWillUnmount() {
		// console.log('tempbox Unmount', this.props.timelinekey )
	}

	changeLoadingComplete(a){
		this.setState((prevState, props)=>{
			return {
				LoadingComplete: a
			}
		})
	}

	
	render(){
		return (
			<div className="timelinebox" style={{height: "150px", width: '100%'}} key={this.props.timelinekey} onClick={

				() => {
					this.props.changEditorState(true)
					this.props.changeRenderedNote(this.props.timelineId)
					this.props.allofTimelineGet('final_modified')

				}

			}>
				  <div className="timelineTitle">
				  	{this.state.LoadingComplete ? this.props.timeline.title + this.props.timeline.create_at + '###' + this.props.timelinekey : this.props.timelinekey}
	 			  </div>						 	
			 	  <div className='timelineContent'>
			 	    <p>{this.state.LoadingComplete ? this.props.timeline.content.slice(0, 160) : "Loading"}</p>
				  </div>
			</div>
		)
	
	
	}
}


export default TemplineBox
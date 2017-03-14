import React, { Component } from 'react';


class TemplineBox extends Component {
	
	constructor(props) {
		super(props);
		this.timelinekey = this.props.timelinekey 
		this.timelineId = this.props.timelineId

	}

	componentDidMount() {
		// console.log('tempbox Didmount')
	}


	componentWillReceiveProps(nextProps) {
	}

	componentWillUnmount() {
		// console.log('tempbox Unmount ')
	}


	
	render(){

		return (
			<div className="timelinebox" style={{height: "150px", width: '100%'}} key={this.timelinekey} onClick={

				() => {
					this.props.changEditorState(true)
					this.props.changeRenderedNote(this.timelineId)
					this.props.allofTimelineGet('final_modified')

				}

			}>
				  <div className="timelineTitle">
				  	{this.props.timeline.title ? this.props.timeline.title + this.props.timeline.create_at + '###' + this.timelinekey: this.timelinekey}
	 			  </div>						 	
			 	  <div className='timelineContent'>
			 	    <p>{this.props.timeline.content ? this.props.timeline.content.slice(0, 160) : "Loading"}</p>
				  </div>
			</div>
		)
	
	
	}
}


// function mapState(state) {

//   return { 
//     timeline: state.NoteTimeline.timeline, 
//     HowManyNote: state.NoteTimeline.HowManyNote,
//     timelineRender: state.NoteTimeline.timelineRender
//   }

// }

// function mapDispatch(dispatch) {
//   return {
//     oneOfTimelineGet: (a, b) => dispatch(noteOneGet(a, b)),
//     noteCancle: () => dispatch(noteCancle()),
//     noteOneCancle: () => {
//     	console.log('------------------Cancle---------------------------'); 
//     	dispatch(noteOneCancle())
//     },
//     changeRenderedNote: (a) => dispatch(changeRenderedNote(a)),
//     changEditorState: (a) => dispatch(changEditorState(a))
//   };
// }

// export default connect(mapState, mapDispatch)(TemplineBox)
export default TemplineBox
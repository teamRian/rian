import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ComponentStyleTimelineBox from '../../components/NoteTimeline/ComponentStyleTimelineBox.js'
import { noteGet, noteOneGet, noteCancle, noteOneCancle } from '../../epics/NoteEpic';
import LazyLoad from 'react-lazyload';
import './css/timeline.css'




class NoteTimelineContainer extends Component {
  constructor(props) {
    super(props);
 
    this.makeTimelineRender = this.makeTimelineRender.bind(this)  
  }



  componentDidMount() {
    this.props.allofTimelineGet('final_modified')
  } 


  componentWillReceiveProps(nextProps) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.timeline === nextProps.timeline) {
      console.log('do not need Change')
      return false
    } else {
      console.log("need Change")
      this.renderLazyloading = this.makeTimelineRender(nextProps)
      return true
    }
  }

  componentWillUnmount() {
    this.props.noteCancle()
    this.props.noteOneCancle()
  }


  makeTimelineRender(nextProps){

    if (nextProps.timeline === null) return "Loading"    
    var renderLazyloading = nextProps.timeline.map((timeline, i) => {
      return <ComponentStyleTimelineBox key={i} timelinekey={i} timeline={timeline} oneOfTimelineGet={this.props.oneOfTimelineGet} noteOneCancle={this.props.noteOneCancle}/>
    })
    return renderLazyloading
    
  }


  render(){

      return (
          <div className="parentWaypoint" >
            {this.renderLazyloading}   
          </div>
      )
  }

}


function mapState(state) {

  return { 
    timeline: state.NoteTimeline.timeline, 
    HowManyNote: state.NoteTimeline.HowManyNote
  }

}

function mapDispatch(dispatch) {
  return {
    allofTimelineGet: (sorting) => dispatch(noteGet(sorting)),
    oneOfTimelineGet: (a, b) => dispatch(noteOneGet(a, b)),
    noteCancle: () => dispatch(noteCancle()),
    noteOneCancle: () => dispatch(noteOneCancle())
  };
}

export default connect(mapState, mapDispatch)(NoteTimelineContainer)
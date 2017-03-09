import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NoteTimeline from '../../components/NoteTimeline/NoteTimeline.js'
import * as noteEpic from '../../epics/NoteEpic';

class NoteTimelineContainer extends Component {
  
  render() {
    return (
      <div>
        <div>
          <NoteTimeline 
            user={this.props.username} 
            timeline={this.props.timeline} 
            noteGet={this.props.noteGet}
            noteOneGet={this.props.noteOneGet} 
            noteOneCancle={this.props.noteOneCancle}
            timelineRender={this.props.timelineRender} 
            timelineRenderGet={this.props.timelineRenderGet}
            HowManyNote={this.props.HowManyNote}
          />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return { 
    timeline: state.NoteTimeline.timeline,
    user: state.User.username,
    timelineRender: state.NoteTimeline.timelineRender,
    HowManyNote: state.NoteTimeline.HowManyNote
  }
}

function mapDispatch(dispatch) {
  return {
    noteGet: (value) => dispatch(noteEpic.noteGet()),
    noteOneGet: (a, b) => dispatch(noteEpic.noteOneGet(a,b)),
    noteOneCancle: () => dispatch(noteEpic.noteOneCancle()), 
    timelineRenderGet: (a, b) => dispatch(noteEpic.timelineRenderGet(a, b))
  };
}

export default connect(mapState, mapDispatch)(NoteTimelineContainer);
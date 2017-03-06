import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NoteTimeline from '../../components/NoteTimeline/NoteTimeline.js'

class NoteTimelineContainer extends Component {
  
  render() {
    return (
      <div>
        <div>
          <NoteTimeline user={this.props.username} timeline={this.props.timeline}/>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return { 
    timeline: state.NoteEditor.noteTimeline,
    user: state.User.username
  }
}

function mapDispatch(dispatch) {
  return {
    onChangeDispatch: (value) => dispatch(actions.onChangeDispatch(value)) 
  };
}

export default connect(mapState, mapDispatch)(NoteTimelineContainer);
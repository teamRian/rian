import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import QrofRian from '../../components/QRofRian/QrofRian.js'
import RockofRian from '../../components/NoteEditor/RockofRianCollaboEditor.js'
import NoteTimeline from '../../components/NoteTimeline/NoteTimeline.js'
import * as actions from '../../actions/NoteEditorActions.js';

class NoteEditorContainer extends Component {
  
  render() {
    
    return (
      <div>
        <div className='col-xs-4'>  
          <NoteTimeline timeline={this.props.timeline}/>
        </div>
        <div className='col-xs-8' style={{ margin: "0", height: "800px", position: "relative"}}>
          <RockofRian  />
        </div>
     </div>
    );
  }
}

function mapState(state) {
  return { 
    data: state.NoteEditor.data,
    timeline: state.NoteEditor.noteTimeline
  }
}

function mapDispatch(dispatch) {
  return {
    onChangeDispatch: (value) => dispatch(actions.onChangeDispatch(value)) 
  };
}

export default connect(mapState, mapDispatch)(NoteEditorContainer);
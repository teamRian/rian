import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NoteEditor from '../../components/NoteEditor/containers/RichEditor.js';
import * as NoteEditorActions from '../../actions/NoteEditorActions.js';

class NoteEditorContainer extends Component {
  
  render() {
    
    return (
      <div className="NoteEditor">
        <NoteEditor />
      </div>
    );
  }
}

function mapState(state) {
  return {    
  };
}

function mapDispatch(dispatch) {
  return {
  };
}

export default connect(mapState, mapDispatch)(NoteEditor);
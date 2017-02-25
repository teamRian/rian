import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NoteEditor from '../../components/NoteEditor/NoteEditor.js';
import * as actions from '../../actions/NoteEditorActions.js';

class NoteEditorContainer extends Component {
  
  render() {
    
    return (
     <div className='col-xs-6 col-xs-offset-3'>
      <div className="NoteEditor">
        <NoteEditor editorState={this.props.editorState} puttext={this.props.puttext}/>
      </div>
     </div>
    );
  }
}

function mapState(state) {
  return { 
    data: state.NoteEditor.data 
  }
}

function mapDispatch(dispatch) {
  return {
    onChangeDispatch: (value) => dispatch(actions.onChangeDispatch(value)) 
  };
}

export default connect(mapState, mapDispatch)(NoteEditorContainer);
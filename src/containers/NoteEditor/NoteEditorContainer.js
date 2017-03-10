import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-bootstrap'
import QrofRian from '../../components/QRofRian/QrofRian.js'
import RockofRian from '../../components/NoteEditor/RockofRianCollaboEditor.js'
import * as noteEpic from '../../epics/NoteEpic';
// import * as actions from '../../actions/NoteEditorActions.js';

        // <div style={{ margin: "0", height: "800px", position: "relative"}}>
        //   <Button onClick={this.props.noteGet}/>
        // </div>
class NoteEditorContainer extends Component {
  
  render() {
    
    return (
      <div>
                <Button onClick={this.props.noteGet}/>
                <Button onClick={this.props.noteCancle}/>
      </div>
    );
  }
}

          // <RockofRian  user={this.props.username}/>

function mapState(state) {
  return { 
    data: state.NoteEditor.data,
    user: state.User.username
  }
}

function mapDispatch(dispatch) {
  return {
    onChangeDispatch: (value) => dispatch(actions.onChangeDispatch(value)),
    noteGet: (value) => dispatch(noteEpic.noteGet()),
    noteCancle: () => dispatch(noteEpic.timelineRenderGet(0))
  };
}

export default connect(mapState, mapDispatch)(NoteEditorContainer);
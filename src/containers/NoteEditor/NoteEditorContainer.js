import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-bootstrap'
import QrofRian from '../../components/QRofRian/QrofRian.js'
import RockofRian from '../../components/NoteEditor/RockofRianCollaboEditor.js'
import * as actions from '../../actions/NoteEditorActions.js';
import * as noteEpic from '../../epics/NoteEpic';

class NoteEditorContainer extends Component {

  
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.nowRenderedNote !== nextProps.nowRenderedNote) {
        console.log("RenderNoteEditor")
      return true
    } else if ( this.props.onEditor !== nextProps.onEditor ){
      return true
    } else {
      return false
    }
  }

  render() {
    
    return (
      <div>
        { this.props.onEditor &&
          <div style={{ margin: "0", height: "800px", position: "relative"}}>
            <RockofRian 
            user={this.props.userid} 
            nowRenderedNote={this.props.nowRenderedNote}
            />
          </div>
        }
        { !this.props.onEditor &&
          <Button onClick={
            this.props.ChangeEditorState
          }/>
        }

      </div>
    );
  }
}



function mapState(state) {
  return { 
    data: state.NoteEditor.data,
    userid: state.User._id,
    onEditor: state.NoteEditor.onEditor,
    nowRenderedNote: state.NoteEditor.nowRenderedNote
  }
}

function mapDispatch(dispatch) {
  return {
    ChangeEditorState: () => { dispatch(actions.changEditorState(true)) },

  };
}

export default connect(mapState, mapDispatch)(NoteEditorContainer);
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import QrofRian from "../../components/QRofRian/QrofRian.js";
import RockofRian from "../../components/NoteEditor/RockofRianCollaboEditor.js";
import {
  changeRenderedNote,
  changEditorState
} from "../../actions/NoteEditorActions.js";
import { noteGet } from "../../epics/NoteEpic";

import * as noteEpic from "../../epics/NoteEpic";

class NoteEditorContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.nowRenderedNote !== nextProps.nowRenderedNote) {
      console.log("RenderNoteEditor");
      return true;
    } else if (this.props.onEditor !== nextProps.onEditor) {
      return true;
    } else {
      return false;
    }
  }

  componentWillUnmount() {
    this.props.changeEditorState(false);
  }

  render() {
    return (
      <div>
        {this.props.onEditor &&
          <div
            ref="Editor"
            style={{ margin: "0", height: "800px", position: "relative" }}
          >
            <RockofRian
              user={this.props.userid}
              nowRenderedNote={this.props.nowRenderedNote}
              changeRenderedNote={this.props.changeRenderedNote}
              allofTimelineGet={this.props.allofTimelineGet}
            />
          </div>}
        {!this.props.onEditor &&
          <Button
            onClick={() => {
              this.props.changeEditorState(true);
              this.props.changeRenderedNote(false);
            }}
          />}

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
  };
}

function mapDispatch(dispatch) {
  return {
    changeEditorState: a => dispatch(changEditorState(a)),
    changeRenderedNote: a => {
      dispatch(changeRenderedNote(a));
    },
    allofTimelineGet: sorting => dispatch(noteGet(sorting))
  };
}

export default connect(mapState, mapDispatch)(NoteEditorContainer);

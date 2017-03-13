import React from 'react';
import { connect } from 'react-redux';


import { changeContentState, changeEditorState, addEditorState } from '../../actions/WhiteBoardActions.js';
import WhiteBoard from '../../components/WhiteBoard/WhiteBoard.js';
import '../../styles/WhiteBoard.css';

class WhiteBoardContainer extends React.Component {
  
  constructor(props){
    super(props)
  }

  render() {
    
    return (
      
      <WhiteBoard
        user={this.props.user}
        contentCurrentStateRaw={this.props.contentCurrentStateRaw}
        changeContentState={this.props.changeContentState}
        editors={this.props.editors}
        changeEditorState={this.props.changeEditorState}
        addEditorState={this.props.addEditorState}
      />
    
    );

  }

}

function mapStateToProp(state) {
  return {
    user : state.User,
    contentCurrentStateRaw : state.content.currentStateRaw,
    editors : state.editorStore.editors
  };
}

function mapDispatchToProp(dispatch) {
  return {
    changeContentState : (currentStateRaw) => dispatch(changeContentState(currentStateRaw)),
    changeEditorState : function(editorState, idx){
      dispatch(changeEditorState(editorState, idx))
    },
    addEditorState : (editorState) => dispatch(addEditorState(editorState))
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(WhiteBoardContainer);
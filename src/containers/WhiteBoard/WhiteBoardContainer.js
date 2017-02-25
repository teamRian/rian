import React from 'react';
import { connect } from 'react-redux';


import { changeContentState } from '../../actions/WhiteBoardActions.js';
import WhiteBoard from '../../components/WhiteBoard/WhiteBoard.js';
import '../../styles/WhiteBoard.css';

class WhiteBoardContainer extends React.Component {
  
  constructor(props){
    super(props)
  }

  render() {
    return (
      
      <WhiteBoard 
        contentCurrentStateRaw={this.props.contentCurrentStateRaw}
        changeContentState={this.props.changeContentState}  />

    );
  }
}

function mapStateToProp(state) {
  return {
    contentCurrentStateRaw : state.content.currentStateRaw
  };
}

function mapDispatchToProp(dispatch) {
  return {
    changeContentState : (currentStateRaw) => dispatch(changeContentState(currentStateRaw))
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(WhiteBoardContainer);
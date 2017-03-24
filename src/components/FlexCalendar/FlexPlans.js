import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';;

class FlexPlans extends Component {
  constructor(props){
    super(props);
    console.log(props,"PROPS FLEXPLANS")
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, "NEXT PROPS")
  }
  shouldComponentUpdate(nextProps, nextState) {
    debugger
    if(nextProps.Plan.update === true){
      return true;
    }  else if (nextProps.Plan.loading === false){
      return true;
    }

    return false;
  }
  render() {
    return (
      <div className="weeklyDay">
        {this.props.bricks}
      </div>
    );
  }
}

function mapState(state) {
  return {
    Plan: state.Plan
  };
}

export default connect(mapState)(FlexPlans);

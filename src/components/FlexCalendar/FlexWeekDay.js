import React, { Component, PropTypes } from 'react';
import FlexSmallBrick from "./FlexSmallBrick";
// import { connect } from 'react-redux';;

export default class FlexWeekDay extends Component {
  constructor(props){
    super(props);
    console.log(props,"PROPS FLEXPLANS")
    this.smallBricks = [...Array(72)].map((x, i) => (
          <FlexSmallBrick
            key={i}
            timeIndex={i}
            dayIndex={this.props.place}
            _userId={this.props.userId}
            handleOnDrop={form => this.props.handleOnDrop(form)}
            handleCanDrop={(timeIndex, dayIndex) =>
              this.props.handleCanDrop(timeIndex, dayIndex)
            }
          />
        ));
    // this.
  }
  componentWillReceiveProps(nextProps) {
    console.log("WEEKDAY NEXTPROPS: ", nextProps);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }
  render() {
    return (
      <div className="weeklyDay">
        {this.smallBricks}
      </div>
    );
  }
}

// function mapState(state) {
//   return {
//     Plan: state.Plan
//   };
// }

// export default connect(mapState)(FlexPlans);

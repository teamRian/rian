import React, { Component, PropTypes } from 'react';
import FlexSmallBrick from "./FlexSmallBrick";
import FlexResizable from "./FlexResizable";

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
        {this.props.filteredPlan.map(plan=>{
          return (
            <FlexResizable plan={plan} key={plan._id} onResizeStop={this.props.handleOnResize} />
           //  <Resizable className="plan" width={200} height={200} handleSize={[10,10]} onResize={this.onResize}
           //    minConstraints={[100, 100]} maxConstraints={[300, 300]}>
           //  }
           //  <div className="plan" style={{width: this.props.width + 'px', height: this.props.height + 'px'}}>
           //    {plan.color}
           //  </div>

           // </Resizable>
            // <div className="plan" style={style} key={plan.timeStamp}>
            //   {plan.color}
            // </div>
          )
        })}
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

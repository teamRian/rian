import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

@connect(mapState)
export default class MeHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="body-3">
        <div className="left"> HEY1 </div>
        <div className="middle"> HEY2 </div>
        <div className="right"> HEY3 </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    User: state.User,
    Project: state.Project
  };
}

// function mapDispatch(dispatch) {
//   return {
//     projectEpicRequestData: _id => {
//       dispatch(projectEpicRequestData(_id));
//     },
//     projectEpicCancleData: () => {
//       dispatch(projectEpicCancleData());
//     }
//   }
// }

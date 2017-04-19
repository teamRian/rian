import React, { Component } from "react";
// import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
// function mapState(state) {
//   return {
//     User: state.User,
//     Project: state.Project
//   };
// }

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

export default class Note extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="body-3">
        <div className="left"> Note1 </div>
        <div className="middle"> Note2 </div>
        <div className="right"> Note3 </div>
      </div>
    );
  }
}

// <div className="left"> HEY1 </div>
// <div className="middle"> HEY2 </div>
// <div className="right"> HEY3 </div>
